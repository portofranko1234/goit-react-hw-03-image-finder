import React, { Component } from "react";
import { createPortal } from "react-dom";
import propTypes from "prop-types";

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  static propTypes = { closeFn: propTypes.func, loader: propTypes.func };

  componentDidMount() {
    console.log("Modal componentdidMount");
    window.addEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.code === "Escape") {
      this.props.closeFn();
    }
  };
  handleBackdrop = (event) => {
    if (event.currentTarget === event.target) {
      this.props.closeFn();
    }
  };

  componentWillUnmount() {
    console.log(" Modal componentWillUnmount");
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.handleBackdrop}>
        <div className="Modal">{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
export default Modal;
