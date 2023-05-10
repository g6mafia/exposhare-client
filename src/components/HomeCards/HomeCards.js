import "./HomeCards.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils";
import { Link } from "react-router-dom";

function HomeCards() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/listings`)
      .then((response) => {
        setListings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Listings:", error);
      });
  }, []);

  return (
    <>
      <section className="card-brands">
        <h2 className="card-brands__title">Shop by Brand</h2>
        {listings.slice(0, 5).map((listing) => (
          <Link to={`/shop?brand=${encodeURIComponent(listing.brand)}`}>
            <article key={listing.id} className="card-brands__article">
              <div className="card-brands__body">
                <img
                  src={listing.image_url}
                  alt={listing.brand}
                  className="card-brands__image"
                ></img>
                <h3 className="card-brands__subtitle">{listing.brand}</h3>
              </div>
            </article>
          </Link>
        ))}
      </section>
    </>
  );
}

export default HomeCards;
