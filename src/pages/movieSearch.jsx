import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { useContext, useEffect, useState } from "react";
import { Pagination, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/movieCard";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../components/movies";
import { querySearchContext } from "../Context";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./movieSearch.css";

const apiSearch = import.meta.env.VITE_API_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

export default function MovieSearch() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Body />
    </QueryClientProvider>
  );
}

function Body() {
  const { query, setQuery } = useContext(querySearchContext);
  const [page, setPage] = useState(1);

  const CustomPagination = (props) => {
    // eslint-disable-next-line react/prop-types
    const aux = props.props.total_pages > 500 ? 500 : props.props.total_pages;
    return (
      <ThemeProvider theme={theme}>
        <Pagination
          count={aux}
          defaultPage={page}
          page={page}
          onChange={({ target }) => setPage(Number(target.innerText))}
          color="secondary"
          shape="rounded"
        />
      </ThemeProvider>
    );
  };

  useEffect(() => {
    setPage(1);
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [query]);

  const fetchMovies = async (query, page) => {
    const aux = query === "" ? "a" : query;
    const res = await fetch(
      `${apiSearch}?query=${aux}&${apiKey}&language=pt-BR&page=${page}`
    );
    return res.json();
  };

  const { data, error, isLoading } = useQuery(
    [`${query}-${page}`, query, page],
    () => fetchMovies(query, page)
  );

  const quantidade = 20;
  const navigate = useNavigate();

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro</div>;

  const array = new Array(quantidade).fill("valor");

  return (
    <section className="section-search">
      <div className="header-tops">
        <h3 style={{ fontWeight: "400", marginBottom: 15, marginTop: 15 }}>
          {isLoading ? (
            <Skeleton
              sx={{ bgcolor: "grey.900", borderRadius: "10px" }}
              variant="rectangular"
              width={140}
              height={30}
            />
          ) : (
            <div className="div-arrow">
              <button
                onClick={() => {
                  setQuery("");
                  history.back();
                }}
              >
                <ArrowBackIcon />
                voltar
              </button>
              <p>
                Resultados de busca:{" "}
                <span style={{ color: "#2896fc" }}>{query}</span>
              </p>
            </div>
          )}
        </h3>
        {quantidade <= 8 && isLoading ? (
          <Skeleton
            sx={{ bgcolor: "grey.900", borderRadius: "10px" }}
            variant="rectangular"
            width={100}
            height={20}
          />
        ) : (
          quantidade <= 8 && (
            <button
              className="btn-mais"
              onClick={() => navigate("/categoria/popular")}
            >
              Ver mais
            </button>
          )
        )}
      </div>
      {isLoading ? (
        <div className="movies">
          {array.map((_j, i) => (
            <div key={i}>
              <Skeleton
                sx={{ bgcolor: "grey.900", borderRadius: "10px" }}
                variant="rectangular"
                width={140}
                height={210}
              />
              <Skeleton
                sx={{
                  bgcolor: "grey.900",
                  borderRadius: "10px",
                  margin: "10px 0 13px 0",
                }}
                variant="rectangular"
                width={120}
                height={30}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="movies">
          {data.results
            .filter((el, i) => i < quantidade && el.poster_path !== null)
            .map((movie, index) => (
              <MovieCard key={index} movie={movie} />
            ))}
        </div>
      )}
      {!isLoading && quantidade > 8 ? (
        <div className="paginacao">
          <CustomPagination props={data} />
        </div>
      ) : (
        ""
      )}
    </section>
  );
}
