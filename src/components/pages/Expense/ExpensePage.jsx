import './ExpensePage.scss';
import Header from '../../Header/Header';
import FeatureMenu from '../../FeatureMenu/FeatureMenu';
import Footer from '../../Footer/Footer';

export default function ExpensesPage() {
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
          <h1>C'est l'heure des Comptes</h1>
        </div>
        <div className="container__content__main">
          <h2>Allez aboule la thune !</h2>
        </div>
        <div className="container__content__footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}
