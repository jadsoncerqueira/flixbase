import { QueryClient, QueryClientProvider } from "react-query";
import Movies from "../components/movies";
// import TopRated from "../components/topRated";
// import UpComing from "../components/upComing";

// const queryClient = new QueryClient();

export default function Home() {
  return <Example />;
}

function Example() {
  return (
    <>
      <QueryClientProvider client={new QueryClient()}>
        <Movies info={{ tag: "popular", quantidade: 7 }} />
        <Movies info={{ tag: "top_rated", quantidade: 7 }} />
        <Movies info={{ tag: "upcoming", quantidade: 7 }} />
      </QueryClientProvider>
    </>
  );
}
