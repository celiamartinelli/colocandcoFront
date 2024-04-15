import './FaqPage.scss';
import Header from '../../Header/Header';
import FeatureMenu from '../../FeatureMenu/FeatureMenu';
import Footer from '../../Footer/Footer';

export default function FaqPage() {
  return (
    <div className="container">
      <div className="container__nav">
        <FeatureMenu />
      </div>
      <div className="container__content">
        <div className="container__content__header">
          <Header />
        </div>
        <div className="container__content__title">
          <h1>Faq</h1>
        </div>
        <div className="container__content__main">
          <h2>Tu as une question je t'écoute ... ^^</h2>
        </div>
        <div className="container__content__footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}
