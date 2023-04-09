import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from 'components/modal/Modal.module.css';
const ModalComponent = ({ onClose, selectedImage }) => {
  useEffect(() => {
    const handlePressESC = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handlePressESC);
    return () => {
      document.removeEventListener('keydown', handlePressESC);
    };
  }, [onClose]);

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <img src={selectedImage} alt="" />
      </div>
    </div>
  );
};

export default ModalComponent;

ModalComponent.propTypes = {
  onClose: PropTypes.func.isRequired,
  selectedImage: PropTypes.string.isRequired,
};
