import "./UserListings.scss";

function UserListings({profileData, setCreateListingForm}) {
  return (
    <>
    <h2 className="user-listings__title">
      My Listings{" "}
      <button type="submit" onClick={() => setCreateListingForm(true)} className="user-listings__button">
        Create a New Listing
      </button>
    </h2>
    {/* map through user data to display users listing */}
    </>

  );
}

export default UserListings;
