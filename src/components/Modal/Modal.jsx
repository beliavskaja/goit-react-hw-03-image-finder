import React, { Component } from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import "./Modal.css";

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.code === "Escape") {
      this.props.onClose();
    }
  };

  handleBackdropDown = (event) => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  static propTypes = {
    onClose: PropTypes.func.isRequired,
  };

  render() {
    return createPortal(
      <Box className="Overlay" onClick={this.handleBackdropDown}>
        <div className="Modal">{this.props.children}</div>
      </Box>,
      modalRoot
    );
  }
}

export default Modal;