import { useState } from "react";
import "./ListingDetailsModal.scss";
import EditIcon from "../../assets/icons/edit-24px.svg";
import axios from "axios";
import { BASE_URL } from "../../utils";
import { CLOUDINARY_UPLOAD_URL, CLOUDINARY_UPLOAD_PRESET } from "../../config";
import EditListingForm from "../EditListingForm/EditListingForm";

function ListingDetailsModal({ listing, isOpen, closeModal, handleChange }) {
  const [editForm, setEditForm] = useState(false);
  const [imageUrl, setImageUrl] = useState(listing.image_url);

  const cameraBrands = [
    "Canon",
    "Nikon",
    "Sony",
    "FujiFilm",
    "Panasonic",
    "Olympus",
    "Pentax",
  ];

  const filmCameraBrands = [
    "Canon",
    "Nikon",
    "Olympus",
    "Pentax",
    "Leica",
    "Minolta",
    "Contax",
  ];

  const lensBrands = [
    "Canon",
    "Nikon",
    "Sony",
    "FujiFilm",
    "Panasonic",
    "Olympus",
    "Sigma",
  ];
  const cameraConditions = ["New", "Used", "Refurbished"];

  const cameraCategory = [
    "Film Cameras",
    "Digital Cameras",
    "Lens",
    "Accessories",
  ];

  if (!isOpen) {
    return null;
  }
  //handle image edit upload function
  const handleImageUpload = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData);
      setImageUrl(response.data.secure_url);
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  //handle edit listing unction
  const handleEditListing = async (e) => {
    e.preventDefault();
    try {
      const { title, category, description, condition, price, brand } =
        e.target.elements;
      const response = await axios.put(
        `${BASE_URL}/api/listings/${listing.id}`,
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

  return (
    <>
      <div className="listings-details__overlay"></div>
      <div className="listings-details">
        <article key={listing.id} className="listings-details__item">
          <h1 className="listings-details__item-heading">
            Listing Details:{" "}
            <div
              className="listings-details__item-edit"
              onClick={() => setEditForm(!editForm)}
            >
              {" "}
              <p>Edit Listing</p>
              <img src={EditIcon} className="listings-details__item-icon"></img>
            </div>
          </h1>
          <div className="listings-details__item-container">
            <img
              src={listing.image_url}
              alt={listing.title}
              className="listings-details__item-image"
            ></img>
          </div>
          <div className="listings-details__item-block">
            <div className="listings-details__item-wrapper--left">
              <p className="listings-details__item-type">Title </p>
              <p className="listings-details__item-type">Category </p>
              <p className="listings-details__item-type">Brand </p>
              <p className="listings-details__item-type">Description </p>
              <p className="listings-details__item-type">Price </p>
              <p className="listings-details__item-type">Condition </p>
            </div>
            <div className="listings-details__item-wrapper--right">
              <p className="listings-details__item-value">{listing.title}</p>
              <p className="listings-details__item-value">{listing.category}</p>
              <p className="listings-details__item-value">{listing.brand}</p>
              <p className="listings-details__item-value">
                {listing.description}
              </p>
              <p className="listings-details__item-value">
                {listing.condition}
              </p>
              <p className="listings-details__item-value">
                ${listing.price.toFixed(2)}
              </p>
            </div>
          </div>
          <button
            className="listings-details__button-close"
            onClick={closeModal}
          >
            Close
          </button>
        </article>
        {editForm && (
          <>
            <EditListingForm
              listing={listing}
              handleImageUpload={handleImageUpload}
              handleEditListing={handleEditListing}
              cameraBrands={cameraBrands}
              cameraConditions={cameraConditions}
              cameraCategory={cameraCategory}
              onCancel={() => setEditForm(false)}
            />
          </>
        )}
      </div>
    </>
  );
}

export default ListingDetailsModal;
