import "./movieCard.css";

const apiImg = import.meta.env.VITE_IMAGE;

export default function MovieCard(movie) {
  const { poster_path, vote_average } = movie.movie;
  return (
    <>
      <button className="btn-movie">
        <div className="pont">{vote_average.toFixed(1)}</div>
        <img className="img-movie" src={`${apiImg}${poster_path}`} alt="" />
      </button>
    </>
  );
}
