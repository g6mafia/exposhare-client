import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./ShopPage.scss";
import axios from "axios";
import { BASE_URL } from "../../utils";

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
    <>
      <section className="shop-page">
        <h1 className="shop-page__title">
          Shop{" "}
          <span className="shop-page__results">
            {" "}
            ({listings.length} {listings.length === 1 ? "result" : "results"})
          </span>
        </h1>
        <article className="shop-page__content">
          <div className="shop-page__sidebar">
            <nav className="shop-page__nav">
              <p>Brand</p>
              <p>Condition</p>
              <p>Category</p>
              <p>Price</p>
              <p>Sort</p>
            </nav>
          </div>
          <div className="shop-page__listings">
            {listings.map((listing) => (
              <PublicListing key={listing.id} listing={listing} />
            ))}
          </div>
        </article>
      </section>
    </>
  );
}

export default ShopPage;
