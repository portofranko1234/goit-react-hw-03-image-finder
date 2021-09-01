import React, { Component } from "react";
import Loader from "react-loader-spinner";
import * as API from "../src/Gofetch/FetchService";
import Searchbar from "./Components/Searchbar";
import ImageGallery from "./Components//ImageGallery/ImageGallery";
import Button from "./Components/Button";
import Modal from "./Components/Modal";

class App extends Component {
  state = {
    searchWords: "",
    images: [],
    showModal: false,
    modalImage: "",
    showLoader: false,
    currentPage: 1,
    error: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  pushImagesToState = (response) => {
    const imagesFromResponse = response.data.hits;
    let newSearchArray = [];
    newSearchArray = [...this.state.images, ...imagesFromResponse];
    this.setState(({ images }) => ({ images: newSearchArray }));
  };
  setModalImage = (linkImg) => {
    return this.setState(({ modalImage }) => ({ modalImage: linkImg }));
  };
  openLargeImage = (linkImg) => {
    this.setModalImage(linkImg);
    this.toggleModal();
  };

  loaderToggle = (bool) => {
    return this.setState(({ showLoader }) => ({ showLoader: bool }));
  };
  getImages(words, page) {
    let scrollHeight = 0;
    if (page === 1) {
      scrollHeight = 0;
    } else {
      scrollHeight = document.documentElement.scrollHeight + 144;
    }
    this.loaderToggle(true);
    API.get(words, page).then((response) => {
      this.pushImagesToState(response);
      this.loaderToggle(false);
      this.setState((prevState) => ({
        currentPage: prevState.currentPage + 1,
      }));

      window.scrollTo({
        top: scrollHeight,
        behavior: "smooth",
      });
    });
  }

  searchFormSubmit = (event) => {
    event.preventDefault();
    this.setState({
      searchWords: "",
      images: [],
      showModal: false,
      modalImage: "",
      currentPage: 1,
    });
    const searchWordsValue = event.target[1].value;

    this.setState({ searchWords: searchWordsValue });
    const page = 1;
    this.getImages(searchWordsValue, page);
    event.target.reset();
  };

  loadMoreFn = () => {
    this.loaderToggle(true);
    this.getImages(this.state.searchWords, this.state.currentPage);
  };

  render() {
    return (
      <div className="App">
        {this.state.showModal && (
          <Modal closeFn={this.toggleModal} loader={this.loaderToggle}>
            <img src={this.state.modalImage} alt="modal" />
          </Modal>
        )}
        <Searchbar onSubmit={this.searchFormSubmit} />

        {this.state.searchWords !== "" && (
          <ImageGallery
            loader={this.loaderToggle}
            imagesArray={this.state.images}
            modalFn={this.openLargeImage}
          ></ImageGallery>
        )}
        {this.state.showLoader && <Loader />}
        {this.state.searchWords !== "" && <Button fn={this.loadMoreFn} />}
      </div>
    );
  }
}

export default App;
