import "./UserListings.scss";
import ListingDetailsModal from "../ListingDetailsModal/ListingDetailsModal";
import { useState } from "react";
import DeleteIcon from "../../assets/icons/delete.svg";
import { BASE_URL } from "../../utils";
import axios from "axios";

function UserListings({
  userListings,
  setCreateListingForm,
  handleChange,
  setUserListings,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);

  const handleModalOpen = (listing) => {
    setModalOpen(true);
    setSelectedListing(listing);
  };

  //delete listing function
  const deleteListing = async (listingId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${BASE_URL}/api/listings/${listingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserListings(
        userListings.filter((listing) => listing.id !== listingId)
      );
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  return (
    <>
      <h2 className="user-listings__title">
        My Listings{" "}
        <button
          type="submit"
          onClick={() => setCreateListingForm(true)}
          className="user-listings__button"
        >
          Create a New Listing
        </button>
      </h2>
      <section className="user-listings__section">
        {selectedListing && (
          <ListingDetailsModal
            listing={selectedListing}
            isOpen={modalOpen}
            handleChange={handleChange}
            closeModal={() => setModalOpen(false)}
          />
        )}
        {userListings.length === 0 ? (
          <div className="user-listings__wrapper">
            <p className="user-listings__subtitle">
              Want to sell an item? Create a new listing!
            </p>
            <p className="user-listings__art">༼ ◔ ͜ʖ ◔ ༽</p>
          </div>
        ) : (
          userListings.map((listing) => (
            <article key={listing.id} className="user-listings__item">
              <div className="user-listings__container">
                <img
                  src={listing.image_url}
                  alt={listing.title}
                  className="user-listings__image"
                ></img>
              </div>
              <div className="user-listings__block">
                <p className="user-listings__info-title">
                  Title:{" "}
                  <span className="user-listings__details">
                    {listing.title}
                  </span>
                </p>

                <p className="user-listings__info-title">
                  Price:{" "}
                  <span className="user-listings__details user-listings__details--spacing">
                    ${listing.price.toFixed(2)}
                  </span>
                </p>
              </div>
              <button
                onClick={() => handleModalOpen(listing)}
                className="user-listings__button"
              >
                View Details
              </button>
              <img
                src={DeleteIcon}
                alt="delete icon"
                onClick={() => deleteListing(listing.id)}
                className="user-listings__button-icon"
              ></img>
            </article>
          ))
        )}
      </section>
    </>
  );
}

export default UserListings;
