import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

const LoadMoreButton = ({ onClick }) => {
  return (
    <button className="Button" type="button" onClick={onClick}>
      Load more
    </button>
  );
};

LoadMoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default LoadMoreButton;
