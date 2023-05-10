import HeroBanner from "../../components/HeroBanner/HeroBanner";
import HomeCards from "../../components/HomeCards/HomeCards";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils";
import axios from "axios";

function HomePage() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/listings`)
      .then((response) => {
        setListings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Listings:", error);
      })
  }, []);

  if (!listings.length) {
    return <p className="loading">Loading video...</p>;
  }

    return (
      <section>
        <HeroBanner />
        <HomeCards listings={listings}/>
      </section>
    );
  };
  
  export default HomePage;