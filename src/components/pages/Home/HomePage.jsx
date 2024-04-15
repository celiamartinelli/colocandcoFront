import './HomePage.scss';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import Header from '../../Header/Header';
import HeaderPhone from '../../Phone/HeaderPhone/HeaderPhone';
import HomeMenuPhone from '../../Phone/HomeMenuPhone/HomeMenuPhone';
import HomeMenu from '../../HomeMenu/HomeMenu';
import Footer from '../../Footer/Footer';

export default function HomePage() {
  const dispatch = useDispatch();
  const settingUser = useSelector((state) => state.user.settingUser);

  const isMobile = useMediaQuery({ query: '(min-width: 500px)' });

  useEffect(() => {
    // Récupérer le règlement lors du chargement du composant
    dispatch({ type: 'GET_USER_PARAMETER' });
  }, []);
  return (
    <div className="container">
      {isMobile ? (
        <div className="container__nav">
          <HomeMenu />
        </div>
      ) : (
        <div className="container__nav__phone">
          <HomeMenuPhone />
        </div>
      )}
      <div className="container__content">
        {isMobile ? (
          <div className="container__content__header">
            <Header />
          </div>
        ) : (
          <div className="container__content__headerPhone">
            <HeaderPhone />
          </div>
        )}
        <div className="container__content__title">
          <h1>
            {settingUser?.settingInfo?.colocInfo?.group_name ??
              'Nom de la colocation non défini'}
          </h1>
        </div>
        <div className="container__content__main">
          <NavLink to="/tasks" className="container__content__main__link">
            Tâches Ménagères
          </NavLink>
          <NavLink
            to="/shopping-list"
            className="container__content__main__link"
          >
            Liste Commune
          </NavLink>
          {/* <NavLink to="/events" className="container__content__main__link">
            Calendrier
          </NavLink>

          <NavLink to="/messaging" className="container__content__main__link">
            Messagerie
          </NavLink>
          <NavLink to="/vote" className="container__content__main__link">
            Sondage
          </NavLink>
          <NavLink to="/expenses" className="container__content__main__link">
            Gestion des Dépenses
          </NavLink> */}
        </div>
        <div className="container__content__footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}
