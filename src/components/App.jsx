import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchPicture, needValues } from 'Servies/Api';




import Searchbar from 'components/Searchbar/Searchbar.jsx'
import ImageGallery from 'components/ImageGallery/ImageGallery.jsx'
import Loader from 'components/Loader/Loader.jsx'
import Button from 'components/Button/Button.jsx'
import Modal from 'components/Modal/Modal.jsx'




export class App extends React.Component {
  state = {
    pictures: [],
    query: '',
    page: 1,
    error: null,
    isLoading: false,
    showModal: false,
    largeImageURL: '',
    tags: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;
    const prevPage = prevState.page;
    const page = this.state.page;

    if (prevQuery !== nextQuery || prevPage !== page) {
      this.renderGallery();
    }
  }

  renderGallery = async () => {
    const { query, page } = this.state;
    this.setState({ isLoading: true });

    try {
      const { hits, totalHits } = await fetchPicture(query, page);

      if (totalHits === 0) {
        toast.warn(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      const newPictures = needValues(hits);

      this.setState(({ pictures }) => ({
        pictures: [...pictures, ...newPictures],
        totalHits,
      }));
    } catch (error) {
      this.setState({ error });
      toast.error('Oops... Something went wrong');
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onFormSubmit = query => {
    this.setState({ query, pictures: [], page: 1 });
    
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = (largeImageURL, tags) => {
    this.toggleModal();
    this.setState({
      largeImageURL,
      tags,
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { pictures, largeImageURL, isLoading, showModal, totalHits, tags } =
    this.state;

    const allPictures = pictures.length === totalHits;

    return (
      <>
        <Searchbar onSubmit={this.onFormSubmit} />
        <ToastContainer autoClose={3000} />
       {pictures && <ImageGallery pictures={pictures} onOpenModal={this.openModal} />}  
        {isLoading && <Loader />}

        {pictures.length !== 0 && !isLoading && !allPictures && (
          <Button onClick={this.onLoadMore} />
        )}
        {showModal && (
          <Modal 
          onModalClick={this.toggleModal}
          largeImage={largeImageURL}
          alt={tags} 
          />
        )}
      </>
    );
  }
}
