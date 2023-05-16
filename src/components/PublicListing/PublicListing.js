import "./PublicListing.scss";
import { useState, useEffect } from "react";
import LikesIcon from "../../assets/icons/likes.svg";
import EmptyLikesIcon from "../../assets/icons/likes-nofill.svg";
import ListingDetailsModal from "../ListingDetailsModal/ListingDetailsModal";

function PublicListing({
  listing,
  addToFavorites,
  isFavorited,
  removeFromFavorites,
  handleChange,
}) {
  const [favorited, setFavorited] = useState(isFavorited);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);

  const handleModalOpen = (listing) => {
    setModalOpen(true);
    setSelectedListing(listing);
  };

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
        <p className="public-listing__title">
          {listing.title}{" "}
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
        </p>
        <p className="public-listing__price">${listing.price.toFixed(2)}</p>
        <button
          onClick={() => handleModalOpen(listing)}
          className="public-listing__button-view"
        >
          View Details
        </button>
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
  );
}

export default PublicListing;
