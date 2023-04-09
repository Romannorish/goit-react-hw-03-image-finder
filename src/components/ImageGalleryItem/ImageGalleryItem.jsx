import PropTypes from 'prop-types';
import { ImageGalleryItemCard, ImageGalleryItemImage} from './imageGalleryItem.styled';

export default function ImageGalleryItem({ url, openModal, largeImageURL, tag }) {
  return (
    <ImageGalleryItemCard>
      <ImageGalleryItemImage
        src={url}
        alt={tag}
        onClick={() => openModal(largeImageURL, tag)}
      />
    </ImageGalleryItemCard>
  );
}

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};