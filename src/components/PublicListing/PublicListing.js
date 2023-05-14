import "./PublicListing.scss";

function PublicListing({ listing }) {
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
        <h3 className="public-listing__price">${listing.price.toFixed(2)}</h3>
        <p className="public-listing__title">{listing.title}</p>
        {/* <p className="public-listing__details">{listing.description}</p>
        <p className="public-listing__details">Brand: {listing.brand}</p>
        <p className="public-listing__details">
          Condition: {listing.condition}
        </p> */}
      </div>
    </article>
  );
}

export default PublicListing;
