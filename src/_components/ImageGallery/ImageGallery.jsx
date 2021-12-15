import { useState, useEffect } from "react";
import s from "./ImageGalleryItem.module.scss";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Modal from "../Modal/Modal";

const ImageGallery = ({ images }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [largeImg, setLargeImg] = useState("");
  // state = {
  //   modalOpen: false,
  //   largeImg: "",
  // };

  useEffect(() => {
    window.addEventListener("keydown", closeModalByEscape);
  }, [modalOpen]);

  useEffect(() => {
    return window.addEventListener("keydown", closeModalByEscape);
  }, []);

  const openModal = (e) => {
    if (e.target === e.currentTarget) {
      return;
    }

    if (!modalOpen) {
      const currentId = e.target.closest("li").getAttribute("largimage");
      setLargeImg(currentId);
      setModalOpen(true);
    }

    if (e.target.closest("div").dataset.overlay === "open") {
      setModalOpen(false);
    }
  };

  const closeModalByEscape = (e) => {
    if (e.code === "Escape") setModalOpen(false);
  };

  return (
    <ul
      className={s.gallery}
      onClick={openModal}
      onKeyDown={closeModalByEscape}
    >
      {modalOpen && <Modal largeImg={largeImg} />}
      <ImageGalleryItem images={images} />
    </ul>
  );
};

export default ImageGallery;
