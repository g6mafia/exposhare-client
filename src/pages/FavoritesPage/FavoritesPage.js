import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils";
import UserFavorites from "../../components/UserFavorites/UserFavorites";
import "./FavoritesPage.scss";

function FavoritesPage({ profileData }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/users/favorites`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setFavorites(res.data);
      } catch (err) {
        console.log("Error fetching favorites", err);
      }
    }
    fetchFavorites();
  }, []);

  //validation if profile data is not available
  if (!profileData) {
    return (
      <>
        <div className="favorites-page__auth-overlay"></div>
        <div className="favorites-page__auth">
          <div className="favorites-page__auth-wrapper">
            <p className="favorites-page__auth-title">
              Sorry, this page requires authentication.
            </p>
            <p className="favorites-page__auth-text">
              Please{" "}
              <Link to="/login" className="favorites-page__auth-link">
                Login
              </Link>{" "}
              or{" "}
              <Link to="/signup" className="favorites-page__auth-link">
                Sign Up
              </Link>{" "}
              first.
            </p>
          </div>
        </div>
      </>
    );
  }

  //validation if no favorites yet
  if (favorites.length === 0) {
    return (
      <>
        <div className="favorites-page__validation">
          <p className="favorites-page__validation-title">
            Your favorite listings go here, please check out the{" "}
            <Link to="/shop" className="favorites-page__validation-link">
              Shop!
            </Link>
          </p>
          <p className="favorites-page__validation-art">(˘･ᴗ･˘)</p>
        </div>
      </>
    );
  }

  return (
    <section className="favorites-page">
      <h1 className="favorites-page__title">My Favorites</h1>
      <div className="favorites-page__listings">
        {favorites.map((listing) => {
          if (listing && listing.id) {
            return <UserFavorites key={listing.id} listing={listing} />;
          } else {
            return null;
          }
        })}
      </div>
    </section>
  );
}

export default FavoritesPage;
