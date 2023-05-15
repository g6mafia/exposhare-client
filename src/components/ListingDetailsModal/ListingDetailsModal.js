import "./ListingDetailsModal.scss";

function ListingDetailsModal({ listing, isOpen, closeModal }) {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="listings-details__overlay"></div>
      <div className="listings-details">
        <article key={listing.id} className="listings-details__item">
          <h1 className="listings-details__item-heading">Listing Details: </h1>
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
      </div>
    </>
  );
}

export default ListingDetailsModal;
