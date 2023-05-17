import "./UserFavorites.scss";
import LikesIcon from "../../assets/icons/likes.svg";
import EmptyLikesIcon from "../../assets/icons/likes-nofill.svg";
import { useState } from "react";
import ListingDetailsModal from "../ListingDetailsModal/ListingDetailsModal";

function UserFavorites({ listing, onFavoriteClick, handleChange }) {
  const [favorited, setFavorited] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);

  const handleModalOpen = (listing) => {
    setModalOpen(true);
    setSelectedListing(listing);
  };

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
        <div className="user-favorites__wrapper">
          <h3 className="user-favorites__info-title">
            {listing.title}{" "}
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
              <span className="user-favorites__price">
                ${listing.price.toFixed(2)}{" "}
              </span>
            </p>
            <button
              onClick={() => handleModalOpen(listing)}
              className="user-favorites__button-view"
            >
              View Details
            </button>
          </div>
        </div>
        {selectedListing && (
          <ListingDetailsModal
            listing={selectedListing}
            isOpen={modalOpen}
            handleChange={handleChange}
            closeModal={() => setModalOpen(false)}
          />
        )}
      </article>
    </>
  );
}

export default UserFavorites;
