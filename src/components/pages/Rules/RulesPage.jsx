import './RulesPage.scss';
import Header from '../../Header/Header';
import FeatureMenu from '../../FeatureMenu/FeatureMenu';
import Footer from '../../Footer/Footer';

export default function RulesPage() {
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
          <h2>Réglement Intérieur</h2>
          <h3>Etablissez vos règle de vie commune</h3>
        </div>
        <div className="container__content__main">
          <h3> Règlement Intérieur de la Colocation</h3>

          <p>
            {' '}
            1: Objet Le présent règlement intérieur a pour objet de définir les
            règles de vie commune au sein de la colocation située à [adresse
            complète]. Article 2: Respect Mutuel Chaque colocataire s'engage à
            respecter les autres membres de la colocation. Le respect mutuel est
            essentiel pour maintenir un environnement harmonieux. Article 3:
            Utilisation des Espaces Communs Les espaces communs tels que la
            cuisine, le salon, et les salles de bains doivent être maintenus
            propres et rangés après utilisation. Chaque colocataire est
            responsable du nettoyage de ses propres espaces. Article 4: Partage
            des Charges Les charges liées au logement, telles que l'électricité,
            l'eau, le chauffage, et l'accès à Internet, seront réparties
            équitablement entre tous les colocataires. Un système équitable de
            contribution doit être mis en place. Article 5: Respect des Heures
            de Repos Chaque colocataire s'engage à respecter les heures de repos
            des autres membres de la colocation. Les bruits excessifs, les fêtes
            tardives, ou toute autre activité perturbatrice sont interdits
            pendant les heures de repos. Article 6: Invités Les invités sont les
            bienvenus, mais chaque colocataire doit informer les autres membres
            de la colocation de la présence d'invités à l'avance. Les invités ne
            sont pas autorisés à rester pendant une période prolongée sans le
            consentement unanime des colocataires. Article 7: Interdiction de
            Fumer Il est strictement interdit de fumer à l'intérieur de la
            colocation. Des zones désignées à l'extérieur peuvent être utilisées
            pour fumer, en veillant à maintenir la propreté de ces zones.
            Article 8: Gestion des Courses La gestion des courses communes,
            telle que l'achat de produits ménagers ou d'épicerie partagée, doit
            être discutée et organisée de manière à garantir une répartition
            équitable des responsabilités et des coûts. Article 9: Maintenance
            et Réparations Tout problème de maintenance ou de réparation doit
            être signalé immédiatement au propriétaire ou au gestionnaire du
            logement. Les frais de réparation nécessaires en raison d'une
            négligence ou d'une utilisation inappropriée seront partagés entre
            les colocataires responsables. Article 10: Résolution des Conflits
            En cas de conflit, les colocataires s'engagent à résoudre la
            situation de manière constructive. La communication ouverte et le
            respect des opinions de chacun sont encouragés. En cas de désaccord
            persistant, une médiation peut être envisagée. Article 11:
            Modification du Règlement Toute modification du présent règlement
            intérieur doit être discutée et acceptée à l'unanimité par tous les
            membres de la colocation. En signant ce règlement intérieur, chaque
            colocataire reconnaît avoir pris connaissance des règles énoncées et
            s'engage à les respecter.
          </p>
        </div>
        <div className="container__content__footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}
