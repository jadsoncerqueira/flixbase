import { useQuery } from "react-query";
import MovieCard from "./movieCard";

const apiKey = import.meta.env.VITE_API_KEY;
const api = import.meta.env.VITE_API;

export default function Populars() {
  const { data, error, isLoading } = useQuery("movies", () =>
    fetch(`${api}popular?${apiKey}&language=pt-BR`).then((res) => res.json())
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <section>
      <div className="header-tops">
        <h2>Mais Populares</h2>
        <button>Ver mais</button>
      </div>
      <div className="movies">
        {data.results
          .filter((_el, i) => i < 7)
          .map((movie, index) => (
            <>
              <MovieCard key={index} movie={movie} />
            </>
          ))}
      </div>
    </section>
  );
}
