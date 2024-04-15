import './Modal.scss';
import { useState } from 'react';

export default function Modal() {
  const [modal, setModal] = useState(true);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div>
      {modal && (
        <div className="modal">
          <div
            onClick={toggleModal}
            className="modal__overlay"
            // Add role="button" to indicate that this element serves as a button for accessibility
            role="button"
            // Set tabIndex={0} to make the overlay focusable when navigating using the keyboard
            // This is essential for users who rely on keyboard navigation for accessibility.
            tabIndex={0}
            // Add onKeyDown event handler to respond to keyboard events, specifically 'Enter' key press
            // When 'Enter' is pressed, trigger the toggleModal function to close the modal
            onKeyDown={(e) => e.key === 'Enter' && toggleModal()}
          >
            {' '}
          </div>
          <div className="modal__content">
            <h2>Votre inscription est bien validée</h2>
            <p>Vous pouvez désormais vous connecter</p>
            <button
              type="button"
              className="modal__close"
              onClick={toggleModal}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
