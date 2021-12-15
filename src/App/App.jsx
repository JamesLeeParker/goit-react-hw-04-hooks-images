// import Loader from "react-loader-spinner";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Searchbar from "../_components/Searchbar/Searchbar";
import ImageGallery from "../_components/ImageGallery/ImageGallery";
import Button from "../_components/Button/Button";

const API_KEY = "24469926-df466a8874aa59a8d5a89b872";

const getFetch = ({ query, page }) => {
  return fetch(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then((res) => res.json());
};

const App = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loadding, setLoadding] = useState(false);
  const [page, setPage] = useState(1);

  const getQuery = (value) => {
    if (query !== value) {
      setQuery(value);
      setPage(1);
    }
  };

  const getLoadMore = () => {
    setPage(page + 1);
  };

  const setNewImages = () => {
    let arr = images;
    setLoadding(true);
    getFetch({ query, page }).then((data) =>
      setImages(page === 1 ? data.hits : [...arr, ...data.hits])
    );
    setLoadding(false);
  };

  useEffect(() => {
    setNewImages();
  }, [page, query]);

  return (
    <>
      <Searchbar getQuery={getQuery} />
      {loadding && (
        <Loader
          type="ThreeDots"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={1000}
        />
      )}

      <ImageGallery images={images} />

      <Button getLoadMore={getLoadMore} />
    </>
  );
};

export default App;
