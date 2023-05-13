import "./UserListings.scss";
import ListingDetailsModal from "../ListingDetailsModal/ListingDetailsModal";
import { useState } from "react";

function UserListings({ userListings, setCreateListingForm }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);

  const handleModalOpen = (listing) => {
    setModalOpen(true);
    setSelectedListing(listing);
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
        <ListingDetailsModal
          listing={selectedListing}
          isOpen={modalOpen}
          closeModal={() => setModalOpen(false)}
        />
        {userListings.map((listing) => (
          <article
            key={listing.id}
            className="user-listings__item"
            onClick={() => handleModalOpen(listing)}
          >
            <div className="user-listings__item-container">
              <img
                src={listing.image_url}
                alt={listing.title}
                className="user-listings__item-image"
              ></img>
            </div>
            <div className="user-listings__item-block">
            <div className="user-listings__item-wrapper--left">
              <p className="user-listings__item-type">Title </p>
           
              <p className="user-listings__item-type">Price </p>
          
            </div>
            <div className="user-listings__item-wrapper--right">
              <p className="user-listings__item-value">{listing.title}</p>
              <p className="user-listings__item-value">${listing.price}</p>
            </div>
          </div>
          </article>
        ))}
      </section>
    </>
  );
}

export default UserListings;
