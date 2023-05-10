import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// import queryString from 'query-string'; 
// import FilterSidebar from './FilterSidebar';
// import ListingGrid from './ListingGrid';
// import Pagination from './Pagination';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ShopPage() {
  const [listings, setListings] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const query = useQuery();
  const brandFilter = query.get("brand");

  useEffect(() => {
    // Setting the brand filter from the query parameter
    setSelectedFilters((prevFilters) => ({ ...prevFilters, brand: brandFilter }));
  }, [brandFilter]);

  useEffect(() => {
    // Fetching listings based on selected filters and current page
  }, [selectedFilters, currentPage]);

  // ...


  //axios 
  return (
    <>
    </>
  );
}

export default ShopPage;