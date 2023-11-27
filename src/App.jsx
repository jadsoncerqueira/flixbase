// import { useState } from "react";
import { useQuery, QueryClientProvider, QueryClient } from "react-query";
import "./App.css";
import MovieCard from "./components/movieCard";

//app

const queryClient = new QueryClient();
const apiKey = import.meta.env.VITE_API_KEY;
const api = import.meta.env.VITE_API;

function App() {
  // const [count, setCount] = useState(0);
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const { data, error, isLoading } = useQuery("movies", () =>
    fetch(`${api}top_rated?${apiKey}&language=pt-BR`).then((res) => res.json())
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <section>
      <div className="movies">
        {data.results.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
    </section>
  );
}

export default App;
