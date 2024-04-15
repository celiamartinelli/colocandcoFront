import './NotFoundPage.scss';
import { useMediaQuery } from 'react-responsive';
import Header from '../../Header/Header';
import FeatureMenu from '../../FeatureMenu/FeatureMenu';
import FeatureMenuPhone from '../../Phone/FeatureMenuPhone/FeatureMenuPhone';
import HeaderPhoneProfile from '../../Phone/HeaderPhoneProfile/HeaderPhoneProfile';
import Footer from '../../Footer/Footer';

export default function NotFoundPage() {
  const isMobile = useMediaQuery({ query: '(min-width: 500px)' });
  return (
    <div className="container">
      {isMobile ? (
        <div className="container__nav">
          <FeatureMenu />
        </div>
      ) : (
        <div className="container__nav__phone">
          <FeatureMenuPhone />
        </div>
      )}
      <div className="container__P">
        {isMobile ? (
          <div className="container__P__header">
            <Header />
          </div>
        ) : (
          <div className="container__P__headerPhone">
            <HeaderPhoneProfile />
          </div>
        )}
        <div className="container__F__title">
          <h2 className="container__F__title__page">404</h2>
          <h3 className="container__F__title__h3">
            Tu fais fausse route mon ami
          </h3>
        </div>
        <div className="container__content">
          <img
            src="/404BIS.jpg"
            alt="404"
            className="container__content__404"
          />
          <div className="container__content__footer">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
