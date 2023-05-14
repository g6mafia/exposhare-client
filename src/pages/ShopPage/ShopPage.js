import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./ShopPage.scss";
import axios from "axios";
import { BASE_URL } from "../../utils";
import SortIcon from "../../assets/icons/sort.svg";
import FilterIcon from "../../assets/icons/filter.svg";

import PublicListing from "../../components/PublicListing/PublicListing";
// import queryString from 'query-string';
// import FilterSidebar from './FilterSidebar';
// import ListingGrid from './ListingGrid';
// import Pagination from './Pagination';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ShopPage({ handleChange }) {
  const [listings, setListings] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const query = useQuery();
  const brandFilter = query.get("brand");

  useEffect(() => {
    // Setting the brand filter from the query parameter
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      brand: brandFilter,
    }));
  }, [brandFilter]);

  useEffect(() => {
    // Fetching listings based on selected filters and current page
  }, [selectedFilters, currentPage]);

  useEffect(() => {
    getAllListings();
  }, [handleChange]);

  //function get listings
  const getAllListings = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/listings`);
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
