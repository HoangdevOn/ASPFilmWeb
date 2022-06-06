import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../../components/Skeleton/Skeleton";
import { useSearchParams } from "../../hook/useSearchParams";
import { BASE_URL, API_KEY } from "../../utils/constans";
import Title from "../../utils/Title";

function SearchResults() {
  const searchParams = useSearchParams();

  const keyword = searchParams.get("q");

  const [results, setResults] = useState([]);

  const [page, setPage] = useState(1);

  const [totalPage, setTotalPage] = useState();

  const [loading, setLoading] = useState(true);

  const LoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    const searchKeywordforUser = (keyword) => {
      if (keyword.trim() === "") return;
      fetch(
        `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${keyword}&page=${page}`
      )
        .then((res) => res.json())
        .then((data) => {
          setTotalPage(data.total_pages);
          setResults([...results, ...data.results]);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    };

    setLoading(true);

    searchKeywordforUser(keyword);
  }, [page, keyword]);

  if(!loading && results.length === 0) {
    return <div className="non-results">
      <h1>
        No Results!
      </h1>
    </div>
  }

  return (
    <div className="container">
      {/* Change document title */}
      <Title title={`Result for ${keyword}`} />

      <div className="searchResults">
        <h1 className="searchResults-title">Results for {`"${keyword}"`}</h1>
          <div className="grid-layout grid-gap-20px-20px">
            {!loading ? (
              results.map((result) => (
                <Link
                  key={result.id}
                  to={`/details/${result.media_type}/${result.id}`}
                >
                  <div className="movie-item">
                    <img
                      className="image-slider"
                      src={
                        result.poster_path
                          ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                          : "https://images.unsplash.com/photo-1535704882196-765e5fc62a53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YW5pbWUlMjBnaXJsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                      }
                      alt={result.original_title}
                    />

                    <p className="movie-title">{result.title || result.name}</p>
                  </div>
                </Link>
              ))
            ) : (
              <>
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </>
            )}
          </div>
      </div>
      {page < totalPage ? (
        <div onClick={LoadMore} className="load-more">
          <button className="load-more-button">Load More</button>
        </div>
      ) : null}
    </div>
  );
}

export default SearchResults;
