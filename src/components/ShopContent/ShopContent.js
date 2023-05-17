import "./ShopContent.scss";
import NavFilter from "../NavFilter/NavFilter";
import PublicListing from "../PublicListing/PublicListing";
import ArrowDown from "../../assets/icons/arrow-down.svg";
import ArrowUp from "../../assets/icons/arrow-up.svg";
import SortIcon from "../../assets/icons/sort.svg";

import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { BASE_URL } from "../../utils";

function ShopContent({ listings, handleChange }) {
  const [navFilterVisible, setNavFilterVisible] = useState(null);
  const [favorites, setFavorites] = useState([]);

  //for displaying results by query
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search");

  //add to favorites function
  const addToFavorites = async (listingId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/users/favorites`,
        { listing_id: listingId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error adding to favorites:", error.response.data.message);
    }
  };
  //fetching user favorites in shop page
  useEffect(() => {
    async function fetchFavorites() {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("User not logged in");
        return;
      }
      try {
        const res = await axios.get(`${BASE_URL}/users/favorites`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setFavorites(res.data);
      } catch (error) {
        console.log("Error fetching favorites", error);
      }
    }
    fetchFavorites();
  }, []);

  //remove from favorites function
  const removeFromFavorites = async (listingId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${BASE_URL}/users/favorites/${listingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(
        "Error removing from favorites:",
        error.response.data.message
      );
    }
  };

  const isFavorited = (listingId) => {
    return favorites.some((favorite) => favorite.id === listingId);
  };

  return (
    <article className="shop-content">
      {searchQuery && (
        <p className="shop-content__title">
          Showing {listings.length}{" "}
          {listings.length === 1 ? "search result" : "search results"} for:{" "}
          <span className="shop-content__results">{searchQuery}</span>
        </p>
      )}
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
      <div className="shop-content__listings">
        {listings.map((listing) => (
          <PublicListing
            key={listing.id}
            listing={listing}
            isFavorited={isFavorited(listing.id)}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
            handleChange={handleChange}
          />
        ))}
      </div>
    </article>
  );
}
export default ShopContent;
