import { useQuery } from "react-query";
import MovieCard from "./movieCard";
import { useNavigate } from "react-router-dom";
import { Pagination, Skeleton, createTheme } from "@mui/material";
import "./movie.css";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";

const apiKey = import.meta.env.VITE_API_KEY;
const api = import.meta.env.VITE_API;

const theme = createTheme({
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        text: {
          color: "white", // Substitua 'your_desired_color' pela cor desejada
        },
      },
    },
  },
});
export default function Movies(info) {
  const [page, setPage] = useState(1);
  window.scroll({
    top: 0,
    behavior: "smooth",
  });

  const { tag, quantidade } = info.info;
  const navigate = useNavigate();

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
  }, [tag]);

  const titulo = {
    upcoming: "Por Vir",
    top_rated: "+Votados",
    popular: "Novidades",
  };
  const fetchMovies = async (page) => {
    const res = await fetch(
      `${api}${tag}?${apiKey}&language=pt-BR&page=${page}&include_video=true`
    );
    return res.json();
  };

  const { data, error, isLoading } = useQuery([tag, page], () =>
    fetchMovies(page, { keepPreviousData: true })
  );

  // if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const array = new Array(quantidade).fill("valor");

  // console.log(data);

  return (
    <section>
      <div className="header-tops">
        <h4 style={{ fontWeight: "400", marginBottom: 15, marginTop: 15 }}>
          {isLoading ? (
            <Skeleton
              sx={{ bgcolor: "grey.900", borderRadius: "10px" }}
              variant="rectangular"
              width={140}
              height={30}
            />
          ) : (
            titulo[tag]
          )}
        </h4>
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
