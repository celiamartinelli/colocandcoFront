import './TaskPage.scss';
import Header from '../../Header/Header';
import FeatureMenu from '../../FeatureMenu/FeatureMenu';
import Footer from '../../Footer/Footer';

export default function TaskPage() {
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
          <h1>Planning des Tâches Ménagères</h1>
        </div>
        <div className="container__content__main">
          <h2>Remonter vous les manches il y a du boulot !</h2>
        </div>
        <div className="container__content__footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}
