import { useQuery } from "react-query";
import MovieCard from "./movieCard";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
import "./movie.css";

const apiKey = import.meta.env.VITE_API_KEY;
const api = import.meta.env.VITE_API;

export default function Movies(info) {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
  const { tag, quantidade } = info.info;

  const titulo = {
    upcoming: "Por Vir",
    top_rated: "Mais Votados",
    popular: "Mais Populares",
  };
  const navigate = useNavigate();
  const { data, error, isLoading } = useQuery(tag, () =>
    fetch(`${api}${tag}?${apiKey}&language=pt-BR`).then((res) => res.json())
  );

  // if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const array = new Array(quantidade).fill("valor");

  return (
    <section>
      <div className="header-tops">
        <h3 style={{ fontWeight: "400" }}>
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
        </h3>
        {quantidade <= 8 && isLoading ? (
          <Skeleton
            sx={{ bgcolor: "grey.900", borderRadius: "10px" }}
            variant="rectangular"
            width={120}
            height={30}
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
                width={166.66}
                height={250}
              />
              <Skeleton
                sx={{
                  bgcolor: "grey.900",
                  borderRadius: "10px",
                  margin: "10px 0 13px 0",
                }}
                variant="rectangular"
                width={120}
                height={25}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="movies">
          {data.results
            .filter((_el, i) => i < quantidade)
            .map((movie, index) => (
              <>
                <MovieCard key={index} movie={movie} />
              </>
            ))}
        </div>
      )}
    </section>
  );
}
