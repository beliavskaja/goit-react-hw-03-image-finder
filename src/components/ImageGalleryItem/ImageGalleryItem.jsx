import React from "react";
import "./ImageGalleryItem.css";

const ImageGalleryItem = ({ image, setModal }) => {
  const { webformatURL, largeImageURL, tags, id } = image;
  return (
    <li className="ImageGalleryItem" key={id}>
      <img
        className="ImageGalleryItem-image"
        onClick={() => setModal(largeImageURL)}
        src={webformatURL}
        alt={tags}
      />
    </li>
  );
};

export default ImageGalleryItem;
