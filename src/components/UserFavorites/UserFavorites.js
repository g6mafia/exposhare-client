import "./UserFavorites.scss";
import LikesIcon from "../../assets/icons/likes.svg";
import EmptyLikesIcon from "../../assets/icons/likes-nofill.svg";
import { useState, useEffect } from "react";

function UserFavorites({ listing, onFavoriteClick }) {
  const [favorited, setFavorited] = useState(true);

  const handleFavoriteClick = () => {
    onFavoriteClick();
    setFavorited(!favorited);
  };
  return (
    <>
      <article className="user-favorites">
        <div className="user-favorites__container-image">
          {" "}
          <img
            src={listing.image_url}
            alt={listing.title}
            className="user-favorites__image"
          />
        </div>

        {/* make this a modal */}
        <div className="user-favorites__wrapper">
          <h3 className="user-favorites__info-title">
            Listing Details:{" "}
            {favorited ? (
              <img
                src={LikesIcon}
                alt="Added to favorites"
                className="public-listing__icon-likes--fill"
                onClick={handleFavoriteClick}
              />
            ) : (
              <img
                src={EmptyLikesIcon}
                alt="Add to favorites"
                className="public-listing__icon-likes--nofill"
                onClick={handleFavoriteClick}
              />
            )}
          </h3>
          <div className="user-favorites__block">
            <p className="user-favorites__title">
              Price:{" "}
              <span className="user-favorites__price">
                ${listing.price.toFixed(2)}{" "}
              </span>
            </p>
            <p className="user-favorites__title user-favorites__title--align">
              Title:{" "}
              <span className="user-favorites__details">{listing.title}</span>
            </p>
            <p className="user-favorites__title user-favorites__title--align">
              Description:{" "}
              <span className="user-favorites__details">
                {listing.description}
              </span>
            </p>
            <p className="user-favorites__title">
              Category:{" "}
              <span className="user-favorites__details">
                {listing.category}
              </span>
            </p>
            <p className="user-favorites__title">
              Brand:{" "}
              <span className="user-favorites__details">{listing.brand}</span>
            </p>
            <p className="user-favorites__title">
              Condition:{" "}
              <span className="user-favorites__details">
                {listing.condition}
              </span>
            </p>
          </div>
        </div>
      </article>
    </>
  );
}

export default UserFavorites;
