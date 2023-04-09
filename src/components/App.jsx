import { useState, useEffect } from 'react';
import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';
import Loader from 'components/loader/Loader';
import Button from 'components/button/Button';
import ModalComponent from 'components/modal/Modal';
import { getImages } from 'Helpers/fetch';
import css from 'components/app.module.css';
const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowLoadmore, setIsShowLoadmore] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = () => {
      getImages(searchQuery, currentPage)
        .then(images => {
          setImages(prevImages => [...prevImages, ...images.hits]);
          setIsShowLoadmore(currentPage < Math.ceil(images.totalHits / 12));
          setStatus('resolved');
        })
        .catch(error => {
          setError(error);
          setStatus('rejected');
        });
    };
    if (searchQuery === '') {
      return;
    }
    fetchImages();
  }, [searchQuery, currentPage]);

  const createSearchQuerry = searchQuery => {
    setSearchQuery(searchQuery);
    setImages([]);
    setCurrentPage(1);
    setStatus('pending');
  };

  const toggleModal = () => {
    setIsShowModal(prevIsShowModal => !prevIsShowModal);
  };

  const onSelectImage = largeImageURL => {
    setSelectedImage(largeImageURL);
    setIsShowModal(true);
  };

  const handleLoadmore = () => {
    setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
  };

  return (
    <div>
      <Searchbar onSubmit={createSearchQuerry}></Searchbar>
      {status === 'idle' && (
        <h2 className={css.appHeaders}>Please enter your search query</h2>
      )}
      {status === 'pending' && <Loader />}
      {status === 'rejected' && (
        <h2 className={css.appHeaders}>
          Oops, something went wrong. Please try again later.
        </h2>
      )}
      {status === 'resolved' && (
        <>
          {images.length > 0 ? (
            <>
              <ImageGallery images={images} onSelect={onSelectImage} />
              {isShowLoadmore && (
                <Button onClick={handleLoadmore}>Load more</Button>
              )}
            </>
          ) : (
            <h2 className={css.appHeaders}>
              Nothing was found. Please try another search.
            </h2>
          )}
        </>
      )}
      {isShowModal && (
        <ModalComponent
          onClose={toggleModal}
          selectedImage={selectedImage}
        ></ModalComponent>
      )}
    </div>
  );
};

export default App;
