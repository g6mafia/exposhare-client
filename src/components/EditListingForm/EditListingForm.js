import "./EditListingForm.scss";
import axios from "axios";
import { CLOUDINARY_UPLOAD_URL, CLOUDINARY_UPLOAD_PRESET } from "../../config";
import { useState } from "react";

function EditListingForm({
  cameraCategory,
  cameraBrands,
  cameraConditions,
  listing,
  handleEditListing,
  onCancel,
}) {
  const [imageUrl, setImageUrl] = useState(listing ? listing.image_url : '');

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
  return (
    <>
    <div className="edit-listing__overlay"></div>
    <div className="edit-listing">
      <form
        className="edit-listing__form"
        onSubmit={(e) => handleEditListing(e, imageUrl)}
      >
        <p className="edit-listing__title">Edit Listing: </p>
        <div className="edit-listing__container">
          <div className="edit-listing__container-left">
            <label htmlFor="title" className="create-listing__label">
              Title:
            </label>
            <input
              className="edit-listing__input"
              type="text"
              id="title"
              name="title"
              defaultValue={listing.title}
            />
            <label htmlFor="category" className="edit-listing__label">
              Category:
            </label>
            <select
              className="edit-listing__input"
              id="category"
              name="category"
              defaultValue={listing.category || ""}
            >
              <option value="" disabled>
                Select a category
              </option>
              {cameraCategory.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <label htmlFor="description" className="edit-listing__label">
              Description:
            </label>
            <input
              className="edit-listing__input"
              type="text"
              id="description"
              name="description"
              defaultValue={listing.description}
            />

            <label htmlFor="price" className="edit-listing__label">
              Price:
            </label>

            <input
              className="edit-listing__input"
              type="number"
              step="0.01"
              id="price"
              name="price"
              defaultValue={listing.price}
              placeholder="$"
            />
          </div>
          <div className="edit-listing__container-right">
            <label htmlFor="brand" className="edit-listing__label">
              Brand:
            </label>
            <select
              className="edit-listing__input"
              id="brand"
              name="brand"
              defaultValue={listing.brand || ""}
            >
              <option value="" disabled>
                Select a brand
              </option>
              {cameraBrands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>

            <label htmlFor="condition" className="edit-listing__label">
              Condition:
            </label>
            <select
              className="edit-listing__input"
              id="condition"
              name="condition"
              defaultValue={listing.condition || ""}
            >
              <option value="" disabled>
                Select a condition
              </option>
              {cameraConditions.map((condition) => (
                <option key={condition} value={condition}>
                  {condition}
                </option>
              ))}
            </select>

            <label htmlFor="image" className="edit-listing__label">
              Image URL:
            </label>
            <input
              className="edit-listing__input"
              type="file"
              id="image"
              name="image"
              onChange={handleImageUpload}
            />
          </div>
        </div>
        <div className="edit-listing__container-button">
          <button type="submit" className="edit-listing__button-submit">
            Save Changes
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="edit-listing__button-cancel"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
    </>
  );
}

export default EditListingForm;
