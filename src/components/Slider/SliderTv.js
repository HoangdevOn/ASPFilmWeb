// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { useEffect, useState } from "react";
import Skeleton from "../Skeleton/Skeleton";
import "./Slider.css";
import useInnerWidth from "../../hook/useInnerWidth";
import { API_KEY, BASE_URL } from "../../utils/constans";
import { Link } from "react-router-dom";
import Button from "../Button/Button";

const SliderTv = ({ type }) => {
  SwiperCore.use([Navigation]);

  const [movie, setMovie] = useState([]);

  const [loading, setLoading] = useState(true);

  const width = useInnerWidth();

  let item;

  if (width >= 1024) {
    item = 5;
  } else if (width < 1024 && width >= 740) {
    item = 4;
  } else if (width < 740 && width >= 500) {
    item = 3;
  } else {
    item = 2;
  }

  useEffect(() => {
    const getMovie = () => {
      try {
        fetch(
          type === "trending"
            ? `${BASE_URL}/trending/tv/week?api_key=${API_KEY}`
            : `${BASE_URL}/tv/${type}?api_key=${API_KEY}`
        )
          .then((res) => res.json())
          .then(async (data) => {
            await setMovie(data.results);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      } catch (error) {
        console.log(error);
      }
    };

    setLoading(true);
    getMovie();
  }, [type]);

  return (
    <div className="slider">
      <div className="title">
        <h1>TV {type}</h1>
        <Link to={`/tv/${type}`}>
          <Button content={"View more"} />
        </Link>
      </div>
      <Swiper
        navigation
        grabCursor={true}
        spaceBetween={20}
        slidesPerView={item}
      >
        {!loading ? (
          movie.map((item) => (
            <SwiperSlide key={item.id}>
              <Link to={`/details/tv/${item.id}`}>
                <div className="movie-item">
                  <img
                    className="image-slider"
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.original_title}
                  />

                  <p className="movie-title">{item.name}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))
        ) : (
          <div className="grid-layout grid-gap-20px-20px">
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        )}
      </Swiper>
    </div>
  );
};

export default SliderTv;
