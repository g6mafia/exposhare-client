import "./UserListings.scss";

function UserListings({profileData, userListings, setCreateListingForm}) {
  return (
    <>
    <h2 className="user-listings__title">
      My Listings{" "}
      <button type="submit" onClick={() => setCreateListingForm(true)} className="user-listings__button">
        Create a New Listing
      </button>
    </h2>
    {userListings.map((listing) => (
        <div key={listing.id} className="user-listings__listing">
          <p>{listing.title}</p>
          <p>{listing.description}</p>
        </div>
      ))}
    </>

  );
}

export default UserListings;
