import { useParams } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import StarIcon from "@mui/icons-material/Star";
import "./movieDetail.css";
import { useEffect, useState } from "react";

const apiKey = import.meta.env.VITE_API_KEY;
const api = import.meta.env.VITE_API;
const apiImg = import.meta.env.VITE_IMAGE;

function converterParaHorasMinutos(minutos) {
  var horas = Math.floor(minutos / 60);
  var minutosRestantes = minutos % 60;
  return horas + " h " + minutosRestantes + " min";
}

function formatarMoeda(valor) {
  // Arredonda o valor para duas casas decimais
  valor = Math.round(valor * 100) / 100;

  // Converte o valor para uma string no formato de moeda
  var formatoMoeda = valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return formatoMoeda;
}

export default function MovieDetail() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Aux />
    </QueryClientProvider>
  );
}

function Aux() {
  const { id } = useParams();
  const [videoKey, setVideoKey] = useState();

  const fetchMoviesId = async (id) => {
    const res = await fetch(`${api}${id}?${apiKey}&language=pt-BR`);
    return res.json();
  };

  const { data, error, isLoading } = useQuery([id], () => fetchMoviesId(id));

  useEffect(() => {
    if (!isLoading) {
      fetch(`${api}${id}/videos?${apiKey}&language=pt-BR`)
        .then((res) => res.json())
        .then((r) => setVideoKey(r.results[0].key));
    }
  }, [data, id, isLoading]);

  if (isLoading) return <h1>Caregando...</h1>;
  if (error) return <h1>Erro...</h1>;

  const {
    backdrop_path,
    poster_path,
    title,
    overview,
    budget,
    revenue,
    runtime,
    vote_average,
    release_date,
    original_title,
    genres,
  } = data;

  const generos = genres.map(({ name }) => name);

  return (
    <section className="section-detail">
      <div
        style={{
          backgroundImage: `linear-gradient(
          rgba(82, 82, 82, 0.52),
          rgba(18, 0, 14, 0.73)
        ), url(${`${apiImg}w1280${backdrop_path}`})`,
        }}
        className="backg"
      >
        <div className="voto">
          <h2>
            {title}{" "}
            <span>
              (<StarIcon sx={{ color: "#ffb700", fontSize: 25 }} />
              <strong>{vote_average.toFixed(1)}</strong>)
            </span>
          </h2>{" "}
          <div className="header-info">
            <p>Titulo original: {original_title}</p>
            <p>
              {release_date.split("-")[0]} |{" "}
              {converterParaHorasMinutos(runtime)}
            </p>
          </div>
        </div>
        <img src={`${apiImg}w342${poster_path}`} alt="" />
        <iframe
          className="youtube-src"
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoKey}?controls=1`}
          allowFullScreen
        ></iframe>
      </div>
      <div className="movie-infos">
        <div className="generos">
          {generos.map((g, i) => (
            <span className="genero" key={i}>
              {g}
            </span>
          ))}
        </div>
        <p style={{ fontSize: 17 }} className="descricao">
          {overview}
        </p>
        <hr />
        <p>
          <strong>Orçamento: </strong> {formatarMoeda(budget)}
        </p>
        <hr />
        <p>
          <strong>Receita: </strong>
          {formatarMoeda(revenue)}
        </p>
      </div>
    </section>
  );
}
