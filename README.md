# FlixBase

FlixBase é uma plataforma em construção dedicada à exploração do mundo cinematográfico. Este projeto visa fornecer uma experiência envolvente para entusiastas de filmes, permitindo a busca, descoberta e interação em um vasto catálogo cinematográfico.

**Demosntreção do projeto:** https://flixbase.onrender.com/

## Tecnologias Utilizadas:

- **React:** Uma biblioteca JavaScript para construir interfaces de usuário.
- **Vite:** Um construtor de aplicativos web extremamente rápido e simples para o ecossistema JavaScript.
- **API do The Movie Database (TMDb):** Utilizamos a [API do TMDb](https://www.themoviedb.org/documentation/api) para obter informações detalhadas sobre filmes.
- **React Query:** Uma biblioteca para React que simplifica e otimiza a gestão de estado e a busca de dados, facilitando a integração de dados assíncronos em aplicações React de forma eficiente.
- **Material Ui:** Uma biblioteca de componentes de interface de usuário (UI) para React baseada no design system "Material Design" do Google, facilitando o desenvolvimento de interfaces atraentes e consistentes.s.
- **React-router-dom:** Uma biblioteca no ecossistema do React que facilita a navegação e o roteamento em aplicações web single-page (SPA).
- **React Context:** Uma feature que permite compartilhar dados entre componentes sem a necessidade de passá-los manualmente através das propriedades..


## Recursos Principais:

### 1. Exploração de Filmes
   - **Catálogo Extensivo:** Navegue por uma ampla variedade de filmes, desde clássicos até os lançamentos mais recentes.
   - **Filtragem:** Encontre filmes por nome.

### 2. Detalhes Abrangentes
   - **Informações Detalhadas:** Descubra detalhes cruciais sobre cada filme.
   - **Classificações:** Visualize classificações.



## Contribuição
Contribuições são bem-vindas! Se você deseja melhorar a plataforma, corrigir bugs ou adicionar novos recursos, sinta-se à vontade para enviar um pull request.

## Como Começar
1. Clone o repositório: `git clone https://github.com/jadsoncerqueira/flixbase.git`
2. Instale as dependências: `npm install`
3. Crie uma conta no [TMDb](https://www.themoviedb.org/documentation/api) e gere sua chave da api.
4. Renomeie o arquivo `.env.example` para `.env`
5. O conteudo do aquivo vai está assim:
```
VITE_API_KEY=api_key=SUA_CHAVE
VITE_API=https://api.themoviedb.org/3/movie/
VITE_SEARCH=https://api.themoviedb.org/3/searc/movie/
VITE_IMAGE=https://image.tmdb.org/t/p/
VITE_API_SEARCH=https://api.themoviedb.org/3/search/movie
```
7. Apague o texto `SUA_CHAVE`e adicione sua chave da api, e pronto.
8. Execute o aplicativo: `npm run dev`



Junte-se à comunidade FlixBase e embarque em uma jornada cinematográfica emocionante!

