import "./PublicListing.scss";
import { useState, useEffect } from "react";
import LikesIcon from "../../assets/icons/likes.svg";
import EmptyLikesIcon from "../../assets/icons/likes-nofill.svg";

function PublicListing({
  listing,
  addToFavorites,
  isFavorited,
  removeFromFavorites,
}) {
  const [favorited, setFavorited] = useState(isFavorited);

    //use effect to maintain the filled icon state
    useEffect(() => {
      setFavorited(isFavorited);
    }, [isFavorited]);
  

  const handleFavoriteClick = () => {
    if (favorited) {
      removeFromFavorites(listing.id);
    } else {
      addToFavorites(listing.id);
    }
    setFavorited(!favorited);
  };

  return (
    <article className="public-listing">
      <div className="public-listing__container-image">
        {" "}
        <img
          src={listing.image_url}
          alt={listing.title}
          className="public-listing__image"
        />
      </div>
      <div className="public-listing__container-details">
        <h3 className="public-listing__price">
          ${listing.price.toFixed(2)}{" "}
          {!favorited ? (
            <img
              src={EmptyLikesIcon}
              alt="Add to favorites"
              className="public-listing__icon-likes--nofill"
              onClick={handleFavoriteClick}
            />
          ) : (
            <img
              src={LikesIcon}
              alt="Added to favorites"
              className="public-listing__icon-likes--fill"
              onClick={handleFavoriteClick}
            />
          )}
        </h3>
        <p className="public-listing__title">{listing.title}</p>
        {/* <p className="public-listing__details">{listing.description}</p>
        <p className="public-listing__details">Brand: {listing.brand}</p>
        <p className="public-listing__details">
          Condition: {listing.condition}
        </p> */}
      </div>
    </article>
  );
}

export default PublicListing;
