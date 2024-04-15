import './FaqPage.scss';
import { useMediaQuery } from 'react-responsive';
import FeatureMenuPhone from '../../Phone/FeatureMenuPhone/FeatureMenuPhone';
import HeaderPhoneProfile from '../../Phone/HeaderPhoneProfile/HeaderPhoneProfile';
import Header from '../../Header/Header';
import FeatureMenu from '../../FeatureMenu/FeatureMenu';
import Footer from '../../Footer/Footer';

export default function FaqPage() {
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
      <div className="container__T">
        {isMobile ? (
          <div className="container__T__header">
            <Header />
          </div>
        ) : (
          <div className="container__T__headerPhone">
            <HeaderPhoneProfile />
          </div>
        )}
        <div className="container__F__title">
          <h2 className="container__F__title__page">FAQ</h2>
          <h3 className="container__F__title__h3">
            La réponse à tes questions se trouve ici 👇
          </h3>
        </div>
        <div className="container__F__main">
          <div className="container__F__main__content">
            <article className="container__F__main__content__article">
              <h4 className="container__F__main__content__article__title">
                1. Comment puis-je ajouter un nouveau colocataire à notre espace
                de gestion ?
              </h4>
              <p className="container__F__main__content__article__paraph">
                Pour ajouter un nouveau colocataire, il suffit de récupérer le
                code colocation qui se trouve dans la page paramètre.
                transmettez ce code a votre futur colocataire et demandez lui de
                s'inscrire en passant par l'inscription et{' '}
                <strong>"Rejoindre une colocation"</strong>, le colocataire à ce
                moment là procède a son inscirption et pourras rejoindre la
                colocation.
              </p>
            </article>
            <article className="container__F__main__content__article">
              <h4 className="container__F__main__content__article__title">
                2. Comment puis-je modifier mes informations de la page
                paramètre ?
              </h4>
              <p className="container__F__main__content__article__paraph">
                Pour modifier mes informations de la page paramètre, il suffit
                de cliquer sur le bouton <strong>"Modifier"</strong> et de
                remplir les champs que vous souhaitez modifier, puis de cliquer
                sur le bouton <strong>"Sauvegarder"</strong>. Vos informations
                seront immédiatement mis à jour.
              </p>
            </article>
            <article className="container__F__main__content__article">
              <h4 className="container__F__main__content__article__title">
                3. Comment puis-je modifier mes informations de la page profile
                ?
              </h4>
              <p className="container__F__main__content__article__paraph">
                Pour modifier mes informations de la page profile, il suffit de
                cliquer sur le bouton "Modifier" et de remplir les champs que
                vous souhaitez modifier, puis de cliquer sur le bouton
                <strong>"Sauvegarder"</strong>. Vos informations seront
                immédiatement mis à jour.
              </p>
            </article>
          </div>
          <div className="container__content__footer">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
