import StarIcon from "@mui/icons-material/Star";
import "./movieCard.css";

const apiImg = import.meta.env.VITE_IMAGE;

export default function MovieCard(movie) {
  const { poster_path, vote_average, title } = movie.movie;
  return (
    <>
      <div className="card-div">
        <button className="btn-movie">
          <div className="pont">
            {" "}
            <StarIcon sx={{ color: "#ffb700", width: "17px" }} />{" "}
            {vote_average.toFixed(1)}
          </div>
          <img className="img-movie" src={`${apiImg}${poster_path}`} alt="" />
        </button>
        {/* <p>{title}</p> */}
      </div>
    </>
  );
}
