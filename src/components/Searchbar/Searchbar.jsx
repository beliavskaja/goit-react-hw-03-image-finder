import React, { Component } from "react";
import Box from "@mui/material/Box";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import PropTypes from "prop-types";
import "./Searchbar.css";

class Searchbar extends Component {
  state = {
    searchImages: "",
  };

  handleSearch = (event) => {
    this.setState({ searchImages: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (event) => {
    const { searchImages } = this.state;
    const { onSubmit } = this.props;

    event.preventDefault();
    if (searchImages.trim() === "") {
      alert("Enter request");
      return;
    }
    onSubmit(searchImages);
    this.setState({ searchImages: "" });
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Box className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button
            className="SearchForm-button"
            type="submit"
            aria-label="search-button"
            onClick={this.handleSubmit}
          >
            <ManageSearchIcon />
          </button>
          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            placeholder="Search images and photos"
            value={this.state.searchImages}
            onChange={this.handleSearch}
          />
        </form>
      </Box>
    );
  }
}

export default Searchbar;
