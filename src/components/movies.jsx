import { useQuery } from "react-query";
import MovieCard from "./movieCard";
import { useNavigate } from "react-router-dom";

const apiKey = import.meta.env.VITE_API_KEY;
const api = import.meta.env.VITE_API;

export default function Movies(info) {
  const { tag, quantidade } = info.info;

  const titulo = {
    upcoming: "Por Vir",
    top_rated: "Mais Votados",
    popular: "Mais Populares",
  };

  console.log(tag, quantidade, titulo);
  const navigate = useNavigate();
  const { data, error, isLoading } = useQuery(tag, () =>
    fetch(`${api}${tag}?${apiKey}&language=pt-BR`).then((res) => res.json())
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <section>
      <div className="header-tops">
        <h2>{titulo[tag]}</h2>
        {quantidade <= 7 && (
          <button onClick={() => navigate("/categoria/popular")}>
            Ver mais
          </button>
        )}
      </div>
      <div className="movies">
        {data.results
          .filter((_el, i) => i < quantidade)
          .map((movie, index) => (
            <>
              <MovieCard key={index} movie={movie} />
            </>
          ))}
      </div>
    </section>
  );
}
