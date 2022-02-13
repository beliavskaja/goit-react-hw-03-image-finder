import React, { Component } from "react";
import Box from "@mui/material/Box";
import Loader from "./components/Loader/Loader";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreButton from "./components/Button/Button";
import Modal from "./components/Modal/Modal";
import fetchImages from "./api/axios";

class App extends Component {
  state = {
    searchImages: "",
    images: [],
    page: 1,

    showModal: false,
    loading: false,

    modalImage: "",
    modalAlt: "",
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchImages !== this.state.searchImages) {
      this.setState({ images: [] });
      this.fetchPictures();
    }

    if (prevState.page !== this.state.page && this.state.page !== 1) {
      this.fetchPictures();
    }
  }

  fetchPictures = () => {
    const { searchImages, page } = this.state;

    this.setState({ loading: true });

    fetchImages(searchImages, page).then((res) => {
      const images = res.data.hits.map(
        ({ id, tags, webformatURL, largeImageURL }) => {
          return { id, tags, webformatURL, largeImageURL };
        }
      );

      if (images.length === 0) {
        this.setState({ loading: false });
        alert(`Sorry, nothing found`);
        return;
      }

      this.setState((prevState) => ({
        images: [...prevState.images, ...images],
      }));
      this.setState({ loading: false });
    });
  };

  handleFormSubmit = (searchImages) => {
    this.setState({ searchImages, page: 1 });
  };

  onLoadMore = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  setModal = (largeImageURL, tags) => {
    this.setState({ modalImage: largeImageURL });
    this.setState({ modalAlt: tags });
    this.toggleModal();
  };

  render() {
    const { images, loading, showModal, modalImage, modalAlt } = this.state;
    const { handleFormSubmit, onLoadMore, toggleModal, setModal } = this;

    return (
      <Box>
        <Searchbar onSubmit={handleFormSubmit} />
        {images.length > 0 && (
          <ImageGallery setModal={setModal} images={images} />
        )}
        {loading ? (
          <Loader />
        ) : (
          this.state.images.length > 0 &&
          this.state.images.length % 12 === 0 && (
            <LoadMoreButton onClick={onLoadMore} />
          )
        )}
        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={modalImage} alt={modalAlt} />
          </Modal>
        )}
      </Box>
    );
  }
}

export default App;
