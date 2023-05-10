import "./HomeCards.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils";
import { Link } from "react-router-dom";
import ArrowRight from "../../assets/icons/arrow-right.svg";

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
        <div className="card-brands__wrapper-1">
          <h2 className="card-brands__title">Shop by Brand</h2>
          <Link to="/shop?brand" className="card-brands__link">
            <p className="card-brands__subtitle">
              SEE ALL{" "}
              <img src={ArrowRight} className="card-brands__icon-right" />
            </p>{" "}
          </Link>
        </div>
        <div className="card-brands__wrapper-2">
          {listings.slice(0, 4).map((listing) => (
            <Link
              to={`/shop?brand=${encodeURIComponent(listing.brand)}`}
              key={listing.id}
            >
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
        </div>
      </section>
    </>
  );
}

export default HomeCards;
