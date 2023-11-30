import { QueryClientProvider, QueryClient } from "react-query";
import { useParams } from "react-router-dom";
import Movies from "../components/movies";

export default function MovieCategoria() {
  const { tag } = useParams();
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Movies info={{ tag, quantidade: 20 }} />
    </QueryClientProvider>
  );
}
