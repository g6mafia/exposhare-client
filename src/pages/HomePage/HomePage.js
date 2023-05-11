import HeroBanner from "../../components/HeroBanner/HeroBanner";
import HomeCards from "../../components/HomeCards/HomeCards";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils";
import axios from "axios";

function HomePage() {
  const [listings, setListings] = useState([]);

  const specificBrands = [
    "FujiFilm",
    "Sony",
    "Nikon",
    "Canon"
  ]

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

//array of objects with the information for each brand
  const filteredBrands = specificBrands.map((brand) => {
    const brandListings = listings.filter((item) => item.brand === brand);
    if (brandListings.length > 0) {
      return {
        brand,
        id: brandListings[0].id,
        image_url: brandListings[0].image_url,
      };
    }
    return null;
  }).filter(item => item !== null);

  if (!listings.length || filteredBrands.length === 0) {
    return <p className="loading">Loading...</p>;
  }

    return (
      <section>
        <HeroBanner />
        <HomeCards filteredBrands={filteredBrands}/>
      </section>
    );
  };
  
  export default HomePage;