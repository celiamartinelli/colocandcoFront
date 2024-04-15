import './Allergies.scss';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const getRandomColor = () => {
  let color;
  do {
    // Generate a random hexadecimal color darker than white
    color = `#${Math.floor(Math.random() * 10526880) // 0xA00000 en décimal
      .toString(16)
      .padStart(6, '0')}`;
  } while (color === '#ffffff');

  return color;
};

export default function Allergies() {
  const [newAllergy, setNewAllergy] = useState('');
  const [allergies, setAllergies] = useState([
    {
      id: 1,
      label: 'Gluten',
      color: getRandomColor(),
    },
    {
      id: 13,
      label: 'Lactose',
      color: getRandomColor(),
    },
    {
      id: 4,
      label: 'Oeufs',
      color: getRandomColor(),
    },
    {
      id: 8,
      label: "Poils d'animaux",
      color: getRandomColor(),
    },
  ]);
  function handleSubmit(e) {
    e.preventDefault();
    const newAllergyToAdd = {
      id: uuidv4(),
      label: newAllergy,
      color: getRandomColor(),
    };
    const newAllergyList = [...allergies];
    newAllergyList.push(newAllergyToAdd);
    setAllergies(newAllergyList);
  }

  const handleDeleteAllergy = (allergyId) => {
    const updatedAllergies = allergies.filter(
      (allergy) => allergy.id !== allergyId
    );
    setAllergies(updatedAllergies);
  };

  return (
    <div className="listContainer">
      <form className="listContainer__form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={newAllergy}
          className="listContainer__form__NewAllergy"
          placeholder="Ajouter une Allergie"
          onChange={(e) => setNewAllergy(e.target.value)}
        />
      </form>
      <div className="listContainer__list">
        <ul>
          {allergies.map((allergy) => (
            <li
              className="listContainer__list__allergies"
              key={allergy.id}
              style={{
                backgroundColor: allergy.color,
              }}
            >
              {allergy.label}
              <button
                type="button"
                className="listContainer__list__allergies__delete"
                onClick={() => handleDeleteAllergy(allergy.id)}
                aria-label="Fermer"
              >
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
