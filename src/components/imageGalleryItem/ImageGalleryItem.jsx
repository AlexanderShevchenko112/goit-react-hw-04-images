import PropTypes from 'prop-types';
import css from 'components/imageGalleryItem/ImageGalleryItem.module.css';
const ImageGalleryItem = ({ webformatURL, largeImageURL, tags, onSelect }) => {
  const handleClick = () => {
    onSelect(largeImageURL);
  };

  return (
    <li className={css.imageGalleryItem}>
      <img
        className={css.imageGalleryItemImg}
        src={webformatURL}
        alt={tags}
        onClick={handleClick}
      />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};
