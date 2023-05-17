import HeroBanner from "../../components/HeroBanner/HeroBanner";
import HomeCards from "../../components/HomeCards/HomeCards";
import AboutArticle from "../../components/AboutArticle/AboutArticle";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils";
import axios from "axios";
import FujiFilmLogo from "../../assets/images/fujifilm-logo.png";
import SonyLogo from "../../assets/images/sony-logo.png";
import NikonLogo from "../../assets/images/nikon-logo.png";
import CanonLogo from "../../assets/images/canon-logo.png";
import HomeCategoryCards from "../../components/HomeCategoryCards/HomeCategoryCards";

import LensImage from "../../assets/images/lens-image.png";
import AccImage from "../../assets/images/tripod-image.png";
import DigitalImage from "../../assets/images/digital-image.png";
import FilmImage from "../../assets/images/film-image.png";

function HomePage({ profileData }) {
  const [listings, setListings] = useState([]);

  const specificBrands = ["FujiFilm", "Sony", "Nikon", "Canon"];
  const brandLogos = {
    FujiFilm: FujiFilmLogo,
    Sony: SonyLogo,
    Nikon: NikonLogo,
    Canon: CanonLogo,
  };

  const specificCategories = [
    "Digital Cameras",
    "Film Cameras",
    "Lens",
    "Accessories",
  ];
  const categoryImg = {
    "Digital Cameras": DigitalImage,
    "Film Cameras": FilmImage,
    Lens: LensImage,
    Accessories: AccImage,
  };
  //fetch listings when component mounts
  useEffect(() => {
    getAllListings();
  }, []);

  //function get listings
  const getAllListings = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/listings`);
      setListings(response.data);
    } catch (error) {
      console.error("Error fetching Listings:", error);
    }
  };

  //array of objects with the information for each brand
  const filteredBrands = specificBrands
    .map((brand) => {
      const brandListings = listings.filter((item) => item.brand === brand);
      if (brandListings.length > 0) {
        return {
          brand,
          id: brandListings[0].id,
          image_url: brandLogos[brand],
        };
      }
      return null;
    })
    .filter((item) => item !== null);

  if (!listings.length || filteredBrands.length === 0) {
    return <p className="loading">Loading...</p>;
  }

  //array of objects with the information for each category
  const filteredCategories = specificCategories
    .map((category) => {
      const categoryListings = listings.filter(
        (item) => item.category === category
      );
      if (categoryListings.length > 0) {
        return {
          category,
          id: categoryListings[0].id,
          image_url: categoryImg[category],
        };
      }
      return null;
    })
    .filter((item) => item !== null);

  if (!listings.length || filteredBrands.length === 0) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <>
      <HeroBanner />
      <AboutArticle />
      {/* passed profiledata down to conditionally render the user's favorites */}
      {/* if no favorites, then show ternary text */}
      <HomeCards filteredBrands={filteredBrands} />
      <HomeCategoryCards filteredCategories={filteredCategories} />
    </>
  );
}

export default HomePage;
