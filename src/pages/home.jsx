import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import MovieCard from "../components/movieCard";

const queryClient = new QueryClient();
const apiKey = import.meta.env.VITE_API_KEY;
const api = import.meta.env.VITE_API;

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const { data, error, isLoading } = useQuery("movies", () =>
    fetch(`${api}popular?${apiKey}&language=pt-BR`).then((res) => res.json())
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <section>
      <h2 className="subtitulo">Mais Populares</h2>
      <div className="movies">
        {data.results.map((movie, index) => (
          <>
            <MovieCard key={index} movie={movie} />
          </>
        ))}
      </div>
    </section>
  );
}
