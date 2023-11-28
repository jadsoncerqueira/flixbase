import { QueryClient, QueryClientProvider } from "react-query";
import Populars from "../components/pupulars";
import TopRated from "../components/topRated";
import UpComing from "../components/upComing";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  return (
    <>
      <Populars />
      <TopRated />
      <UpComing />
    </>
  );
}
