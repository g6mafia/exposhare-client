import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils";
import UserFavorites from "../../components/UserFavorites/UserFavorites";
import "./FavoritesPage.scss";
import NavFilter from "../../components/NavFilter/NavFilter";
import ArrowDown from "../../assets/icons/arrow-down.svg";
import ArrowUp from "../../assets/icons/arrow-up.svg";
import SortIcon from "../../assets/icons/sort.svg";

function FavoritesPage({ profileData, handleChange}) {
  const [favorites, setFavorites] = useState([]);
  const [navFilterVisible, setNavFilterVisible] = useState(null);
//fetching favorite listings data
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

  //handlefavoriteclick function to delete listing
  async function handleFavoriteClick(listingId) {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BASE_URL}/users/favorites/${listingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
  
      // Remove the listing from the local favorites state
      setFavorites(favorites.filter((favorite) => favorite.id !== listingId));
    } catch (err) {
      console.log("Error removing favorite listing", err);
    }
  }
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

  return (
    <section className="favorites-page">
      <div className="favorites-page__container">
      <h1 className="favorites-page__title">My Favorites</h1>
      <div className="shop-content__navbar">
        <p
          className="shop-content__subtitle"
          onClick={() => setNavFilterVisible(!navFilterVisible)}
        >
          Filters{" "}
          {!navFilterVisible ? (
            <img
              src={ArrowDown}
              alt="arrow down"
              className="shop-content__icon-down"
            ></img>
          ) : (
            <img
              src={ArrowUp}
              alt="arrow up"
              className="shop-content__icon-up"
            ></img>
          )}
        </p>
        <p className="shop-content__sort">
          Sort{" "}
          <img
            src={SortIcon}
            alt="sort icon"
            className="shop-content__icon"
          ></img>
        </p>
      </div>
      {navFilterVisible && <NavFilter />}
      <div className="favorites-page__listings">
      {favorites.length === 0? (
          <div className="favorites-page__validation">
          <p className="favorites-page__validation-title">
            Your favorite listings go here, please check out the{" "}
            <Link to="/shop" className="favorites-page__validation-link">
              Shop!
            </Link>
          </p>
          <p className="favorites-page__validation-art">(˘･ᴗ･˘)</p>
        </div>
        ) : (
        favorites.map((listing) => {
          if (listing && listing.id) {
            return <UserFavorites handleChange={handleChange} key={listing.id} listing={listing} onFavoriteClick={() => handleFavoriteClick(listing.id)}/>;
          } else {
            return null;
          }
        })
      )}
      </div>
      </div>
    </section>
  );
}

export default FavoritesPage;
