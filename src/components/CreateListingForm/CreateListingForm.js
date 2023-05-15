import { useState } from "react";
import "./CreateListingForm.scss";
import { CLOUDINARY_UPLOAD_URL, CLOUDINARY_UPLOAD_PRESET } from "../../config";
import error from "../../assets/icons/error.svg"
import axios from "axios";

function CreateListingForm({
  setCreateListingForm,
  handleCreateListing,
  setUploadedImageUrl,
}) {
  // form submission state variable
  const [formSubmit, setFormSubmit] = useState(false);

  // form field state variables
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");
  const [image, setImage] = useState("");

  // form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !title ||
      !description ||
      !category ||
      !price ||
      !brand ||
      !condition ||
      !image
    ) {
      setFormSubmit(true);
      return;
    }

    handleCreateListing(e);
  };

  const handleImageUpload = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData);
      setImage(response.data.secure_url);
      setUploadedImageUrl(response.data.secure_url);
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

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
  return (
    <>
      <div className="create-listing__overlay"></div>
      <div className="create-listing">
        <form className="create-listing__form" onSubmit={handleSubmit}>
          <p className="create-listing__title">Create New Listing: </p>
          <div className="create-listing__container">


            {/* left container */}
            <div className="create-listing__container-left">
              <label htmlFor="title" className="create-listing__label">
                Title:
              </label>
              <input
                className={`create-listing__input ${
                  !title && formSubmit ? "create-listing__input--invalid" : ""
                }`}
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
              />
              {!title && formSubmit && (
                <>
                  <div className="create-listing__error-message">
                  <img
                    src={error}
                    alt="error icon"
                    className="create-listing__error-icon"
                  />
                    This field is required
                  </div>
                </>
              )}

              <label htmlFor="description" className="create-listing__label">
                Description:
              </label>
              <input
                className={`create-listing__input ${
                  !description && formSubmit
                    ? "create-listing__input--invalid"
                    : ""
                }`}
                type="text"
                id="description"
                name="description"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
              {!description && formSubmit && (
                <>
                <div className="create-listing__error-message">
                <img
                  src={error}
                  alt="error icon"
                  className="create-listing__error-icon"
                />
                  This field is required
                </div>
              </>
              
              )}

              <label htmlFor="category" className="create-listing__label">
                Category:
              </label>
              <select
                className={`create-listing__input ${
                  !category && formSubmit
                    ? "create-listing__input--invalid"
                    : ""
                }`}
                id="category"
                name="category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled selected>
                  Select a category
                </option>
                {cameraCategory.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {!category && formSubmit && (
                <>
                <div className="create-listing__error-message">
                <img
                  src={error}
                  alt="error icon"
                  className="create-listing__error-icon"
                />
                  This field is required
                </div>
              </>
              )}

              <label htmlFor="price" className="create-listing__label">
                Price:
              </label>
              <input
                className={`create-listing__input ${
                  !price && formSubmit ? "create-listing__input--invalid" : ""
                }`}
                type="number"
                step="0.01"
                id="price"
                name="price"
                placeholder="$"
                onChange={(e) => setPrice(e.target.value)}
              />
              {!price && formSubmit && (
              <>
              <div className="create-listing__error-message">
              <img
                src={error}
                alt="error icon"
                className="create-listing__error-icon"
              />
                This field is required
              </div>
            </>
            )}

            </div>
            


            {/* right container */}
            <div className="create-listing__container-right">
              <label htmlFor="brand" className="create-listing__label">
                Brand:
              </label>
              <select
                className={`create-listing__input ${
                  !brand && formSubmit ? "create-listing__input--invalid" : ""
                }`}
                id="brand"
                name="brand"
                onChange={(e) => setBrand(e.target.value)}
              >
                <option value="" disabled selected>
                  Select a brand
                </option>
                {cameraBrands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
              {!brand && formSubmit && (
                <>
                <div className="create-listing__error-message">
                <img
                  src={error}
                  alt="error icon"
                  className="create-listing__error-icon"
                />
                  This field is required
                </div>
              </>
              )}

              <label htmlFor="condition" className="create-listing__label">
                Condition:
              </label>
              <select
                className={`create-listing__input ${
                  !condition && formSubmit
                    ? "create-listing__input--invalid"
                    : ""
                }`}
                id="condition"
                name="condition"
                onChange={(e) => setCondition(e.target.value)}
              >
                <option value="" disabled selected>
                  Select a condition
                </option>
                {cameraConditions.map((condition) => (
                  <option key={condition} value={condition}>
                    {condition}
                  </option>
                ))}
              </select>
              {!condition && formSubmit && (
                <>
                <div className="create-listing__error-message">
                <img
                  src={error}
                  alt="error icon"
                  className="create-listing__error-icon"
                />
                  This field is required
                </div>
              </>
              )}

              <label htmlFor="image" className="create-listing__label">
                Image URL:
              </label>
              <input
                className={`create-listing__input ${
                  !image && formSubmit ? "create-listing__input--invalid" : ""
                }`}
                type="file"
                id="image"
                name="image"
                onChange={handleImageUpload}
              />
              {!image && formSubmit && (
                <>
                <div className="create-listing__error-message">
                <img
                  src={error}
                  alt="error icon"
                  className="create-listing__error-icon"
                />
                  This field is required
                </div>
              </>
              )}
            </div>
          </div>
          <div className="create-listing__container-button">
            <button type="submit" className="create-listing__button-submit">
              Create Listing
            </button>
            <button
              type="button"
              onClick={() => setCreateListingForm(false)}
              className="create-listing__button-cancel"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateListingForm;
