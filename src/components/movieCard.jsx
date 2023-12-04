import StarIcon from "@mui/icons-material/Star";
import placeholderImage from "../assets/placeholder.png";
import "./movieCard.css";

const apiImg = import.meta.env.VITE_IMAGE;

export default function MovieCard(movie) {
  const { poster_path, vote_average } = movie.movie;
  return (
    <>
      <div className="card-div">
        <button className="btn-movie">
          <div className="pont">
            {" "}
            <StarIcon sx={{ color: "#ffb700", width: "17px" }} />{" "}
            {vote_average.toFixed(1)}
          </div>
          <img
            className="img-movie"
            data-src={`${apiImg}${poster_path}`}
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
