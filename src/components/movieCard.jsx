import StarIcon from "@mui/icons-material/Star";
import placeholderImage from "../assets/placeholder.png";
import "./movieCard.css";
import { useNavigate } from "react-router-dom";

import { querySearchContext } from "../Context";
import { useContext } from "react";

const apiImg = import.meta.env.VITE_IMAGE;

export default function MovieCard(movie) {
  const navigate = useNavigate();

  const { setQuery } = useContext(querySearchContext);

  const { poster_path, vote_average, id } = movie.movie;
  return (
    <>
      <div className="card-div">
        <button
          onClick={() => {
            setQuery("");
            navigate(`/movie/detalhes/${id}`);
          }}
          className="btn-movie"
        >
          <div className="pont">
            {" "}
            <StarIcon sx={{ color: "#ffb700", width: "17px" }} />{" "}
            {vote_average.toFixed(1)}
          </div>
          <img
            className="img-movie"
            data-src={`${apiImg}w185${poster_path}`}
            src={placeholderImage}
            onLoad={({ target }) => {
              const dataImage = target.getAttribute("data-src");
              target.setAttribute("src", dataImage);
            }}
            alt=""
          />
        </button>
        {/* <p>{title}</p> */}
      </div>
    </>
  );
}
