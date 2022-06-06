import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import ErrorPage from "./page/404/404Page";
import Footer from "./components/Footer/Footer";
import { route } from "./route";
import "./App.css";
import "./styles/Responsive.css";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { useStore } from "./stored/store";
import { fetchMovieFavorite } from "./actions/fireStoreActions";
import PrivateRoute from "./utils/PrivateRoute";
import FavoriteList from "./page/FavoriteList/FavoriteList";

function App() {
  const { setUser, setFavoriteList } = useStore((state) => state);

  const location = useLocation();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const newFavoriteList = await fetchMovieFavorite(user.uid);
        setFavoriteList(newFavoriteList);
        return;
      }

      setUser(undefined);
      setFavoriteList([]);

      return () => {
        unsub();
      };
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.search, location.pathname]);

  return (
    <>
      <div className="App">
        <Header />

        <Routes>
          {route.map((item) => (
            <Route
              key={item.path}
              path={item.path}
              element={<item.element />}
            />
          ))}
          <Route
            path="/favorite-movie"
            element={
              <PrivateRoute>
                <FavoriteList />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>

        <Footer />
      </div>
    </>
  );
}

export default App;
