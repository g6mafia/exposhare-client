import "./EditListingForm.scss";

function EditListingForm({
    cameraCategory,
  cameraBrands,
  cameraConditions,
  listing,
  handleImageUpload,
  handleEditListing,
  onCancel,
}) {
  return (
    <div className="edit-listing">
      <form className="edit-listing__form" onSubmit={handleEditListing}>
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
              defaultValue={listing.category}
            >
              <option value="" selected>
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
              defaultValue={listing.brand}
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

            <label htmlFor="condition" className="edit-listing__label">
              Condition:
            </label>
            <select
              className="edit-listing__input"
              id="condition"
              name="condition"
              defaultValue={listing.condition}
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
  );
}

export default EditListingForm;
