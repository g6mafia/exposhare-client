import "./UserListings.scss";
import ListingDetailsModal from "../ListingDetailsModal/ListingDetailsModal";
import { useState } from "react";
import DeleteIcon from "../../assets/icons/delete.svg";
import { BASE_URL } from "../../utils";
import axios from "axios";
import EditIcon from "../../assets/icons/edit-24px.svg";
import EditListingForm from "../EditListingForm/EditListingForm";

function UserListings({
  userListings,
  setCreateListingForm,
  handleChange,
  setUserListings,
  className,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [editForm, setEditForm] = useState(false);

  const cameraBrands = [
    "Canon",
    "Nikon",
    "Sony",
    "FujiFilm",
    "Panasonic",
    "Olympus",
    "Pentax",
  ];
  const cameraConditions = ["New", "Used", "Refurbished"];

  const cameraCategory = [
    "Film Cameras",
    "Digital Cameras",
    "Lens",
    "Accessories",
  ];


  const handleModalOpen = (listing) => {
    setModalOpen(true);
    setSelectedListing(listing);
  };

  const handleEditFormOpen = (listing) => {
    setEditForm(true);
    setSelectedListing(listing);
  };


  //handle edit listing function
  const handleEditListing = async (e, imageUrl) => {
    e.preventDefault();
    try {
      const { title, category, description, condition, price, brand } =
        e.target.elements;
      const response = await axios.put(
        `${BASE_URL}/api/listings/${selectedListing.id}`,
        {
          title: title.value,
          category: category.value,
          description: description.value,
          condition: condition.value,
          brand: brand.value,
          image_url: imageUrl,
          price: parseFloat(price.value),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setEditForm(false);
      handleChange(response);
    } catch (error) {
      console.error("Error updating listing", error.response);
    }
  };

  //delete listing function
  const deleteListing = async (listingId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BASE_URL}/api/listings/${listingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
          className="user-listings__button-create"
        >
          Create a New Listing
        </button>
      </h2>
      <section className="user-listings__section sell-page__user-listings">
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
            <p className="user-listings__validation-title">
              Want to sell an item? Create a new listing!
            </p>
            <p className="user-listings__art">༼ ◔ ͜ʖ ◔ ༽</p>
          </div>
        ) : (
          userListings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((listing) => (
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
              <div className="user-listings__actions">
                <img
                  src={EditIcon}
                  alt="edit icon"
                  onClick={() => handleEditFormOpen(listing)}
                  className="user-listings__icon-edit"
                ></img>
                <button
                onClick={() => handleModalOpen(listing)}
                className="user-listings__button-view"
              >
                View Details
              </button>
                <img
                  src={DeleteIcon}
                  alt="delete icon"
                  onClick={() => deleteListing(listing.id)}
                  className="user-listings__icon-delete"
                ></img>
              </div>
            </article>
          ))
        )}

        {editForm && (
          <>
          {selectedListing && (
            <EditListingForm
              listing={selectedListing}
              handleEditListing={handleEditListing}
              cameraBrands={cameraBrands}
              cameraConditions={cameraConditions}
              cameraCategory={cameraCategory}
              onCancel={() => setEditForm(false)}
            />
          )}
          </>
        )}
      </section>
    </>
  );
}

export default UserListings;
