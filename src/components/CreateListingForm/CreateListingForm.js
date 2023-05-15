import "./CreateListingForm.scss";

function CreateListingForm({
  cameraCategory,
  cameraBrands,
  cameraConditions,
  setCreateListingForm,
  handleCreateListing,
  handleImageUpload,
}) {
  return (
    <>
      <div className="create-listing__overlay"></div>
      <div className="create-listing">
        <form className="create-listing__form" onSubmit={handleCreateListing}>
          <p className="create-listing__title">Create New Listing: </p>
          <div className="create-listing__container">
            <div className="create-listing__container-left">
              <label htmlFor="title" className="create-listing__label">
                Title:
              </label>
              <input
                className="create-listing__input"
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                required
              />

              <label htmlFor="description" className="create-listing__label">
                Description:
              </label>
              <input
                className="create-listing__input"
                type="text"
                id="description"
                name="description"
                placeholder="Description"
                required
              />

              <label htmlFor="category" className="create-listing__label">
                Category:
              </label>
              <select
                className="create-listing__input"
                id="category"
                name="category"
                required
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

              <label htmlFor="price" className="create-listing__label">
                Price:
              </label>
              <input
                className="create-listing__input"
                type="number"
                step="0.01"
                id="price"
                name="price"
                placeholder="$"
              />
            </div>
            <div className="create-listing__container-right">
              <label htmlFor="brand" className="create-listing__label">
                Brand:
              </label>
              <select
                className="create-listing__input"
                id="brand"
                name="brand"
                required
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

              <label htmlFor="condition" className="create-listing__label">
                Condition:
              </label>
              <select
                className="create-listing__input"
                id="condition"
                name="condition"
                required
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

              <label htmlFor="image" className="create-listing__label">
                Image URL:
              </label>
              <input
                className="create-listing__input"
                type="file"
                id="image"
                name="image"
                onChange={handleImageUpload}
              />
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
