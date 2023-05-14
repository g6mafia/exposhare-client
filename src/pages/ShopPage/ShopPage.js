import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./ShopPage.scss";
import axios from "axios";
import { BASE_URL } from "../../utils";
import SortIcon from "../../assets/icons/sort.svg";
import FilterIcon from "../../assets/icons/filter.svg";

import PublicListing from "../../components/PublicListing/PublicListing";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ShopPage() {
  const [listings, setListings] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    search: "",
    brand: "",
  });

  const query = useQuery();
  const brandFilter = query.get("brand");
  const searchFilter = query.get("search");

  useEffect(() => {
    // Setting the brand filter from the query parameter
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      brand: brandFilter,
      search: searchFilter,
    }));
  }, [brandFilter, searchFilter]);

  useEffect(() => {
    getAllListings();
  }, [selectedFilters]);

  //function get listings
  const getAllListings = async () => {
    try {
      let requestUrl = `${BASE_URL}/api/listings`;

      const queryParams = [];
      const filterKeys = ["search", "brand"];

      filterKeys.forEach((key) => {
        selectedFilters[key] &&
          queryParams.push(
            `${key}=${encodeURIComponent(selectedFilters[key].toLowerCase())}`
          );
      });

      if (queryParams.length > 0) {
        requestUrl += `?${queryParams.join("&")}`;
      }
      const response = await axios.get(requestUrl);
      setListings(response.data);
    } catch (error) {
      console.error("Error fetching Listings:", error);
    }
  };

  return (
    <div className="shop-page">
      <section className="shop-page__container">
        <h1 className="shop-page__title">
          Shop{" "}
          <span className="shop-page__results">
            {" "}
            ({listings.length} {listings.length === 1 ? "result" : "results"})
          </span>
        </h1>
        <article className="shop-page__content">
          <div className="shop-page__nav-section">
            <p className="shop-page__subtitle">Filters</p>
            <nav className="shop-page__nav">
              <button className="shop-page__button-filter">
                Brand{" "}
                <img
                  src={FilterIcon}
                  alt="filter icon"
                  className="shop-page__icon"
                ></img>
              </button>
              <button className="shop-page__button-filter">
                Condition{" "}
                <img
                  src={FilterIcon}
                  alt="filter icon"
                  className="shop-page__icon"
                ></img>
              </button>
              <button className="shop-page__button-filter">
                Category{" "}
                <img
                  src={FilterIcon}
                  alt="filter icon"
                  className="shop-page__icon"
                ></img>
              </button>
              <button className="shop-page__button-filter">
                Price{" "}
                <img
                  src={FilterIcon}
                  alt="filter icon"
                  className="shop-page__icon"
                ></img>
              </button>
              <button className="shop-page__button-filter">
                Sort{" "}
                <img
                  src={SortIcon}
                  alt="sort icon"
                  className="shop-page__icon"
                ></img>
              </button>
            </nav>
          </div>
          <div className="shop-page__listings">
            {listings.map((listing) => (
              <PublicListing key={listing.id} listing={listing} />
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}

export default ShopPage;
