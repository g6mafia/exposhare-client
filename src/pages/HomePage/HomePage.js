import HeroBanner from "../../components/HeroBanner/HeroBanner";
import HomeCards from "../../components/HomeCards/HomeCards";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils";
import axios from "axios";
import FujiFilmLogo from "../../assets/images/fujifilm-logo.png"
import SonyLogo from "../../assets/images/sony-logo.png"
import NikonLogo from "../../assets/images/nikon-logo.png"
import CanonLogo from "../../assets/images/canon-logo.png"


function HomePage() {
  const [listings, setListings] = useState([]);

  const specificBrands = [
    "FujiFilm",
    "Sony",
    "Nikon",
    "Canon"
  ]
  const brandLogos = {
    FujiFilm: FujiFilmLogo,
    Sony: SonyLogo,
    Nikon: NikonLogo,
    Canon: CanonLogo,
  }

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
        image_url: brandLogos[brand],
      };
    }
    return null;
  }).filter(item => item !== null);

  if (!listings.length || filteredBrands.length === 0) {
    return <p className="loading">Loading...</p>;
  }

    return (
      <>
        <HeroBanner />
        {/* <News /> */}
        {/* <About /> */}
        <HomeCards filteredBrands={filteredBrands}/>
      </>
    );
  };
  
  export default HomePage;