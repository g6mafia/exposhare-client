import "./UserProfile.scss";
import Star from "../../assets/icons/star.svg";
import UserListings from "../UserListings/UserListings";
import axios from "axios";
import { BASE_URL } from "../../utils";
import { useState, useEffect } from "react";

function UserProfile({ profileData, setCreateListingForm, handleChange, setEditUserForm }) {
  const [userListings, setUserListings] = useState([]);

  useEffect(() => {
    fetchUserListings();
  }, []);

  const fetchUserListings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/listings/user/${profileData.id}/listings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserListings(response.data);
    } catch (error) {
      console.error("Error fetching user listings:", error);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US");
  };

  

  return (
    <section className="user-profile">
      <div className="user-profile__left-container">
        <h2 className="user-profile__title">Account Info <button className="user-profile__button-edit" onClick={() => setEditUserForm(true)}>
            Edit Profile
          </button></h2>
        <div className="user-profile__stats-wrapper">
          <div className="user-profile__block-data">
            <img
              className="user-profile__avatar"
              src={profileData.avatar_url}
              alt={`${profileData.username} avatar`}
            />{" "}
            <p className="user-profile__subtitle">{profileData.username}</p>
          </div>
          <div className="user-profile__block-data">
            <div className="user-profile__block-text">
              <p className="user-profile__text">Transactions</p>
              <span className="user-profile__data">30</span>
            </div>
            <div className="user-profile__block-text">
              <p className="user-profile__text">Followers</p>
              <span className="user-profile__data">100</span>
            </div>
            <div className="user-profile__block-text">
              <p className="user-profile__text user-profile__text--spacing">
                Reviews (3)
              </p>
              <div className="user-profile__block-stars">
                <img src={Star} className="user-profile__icon-star"></img>
                <img src={Star} className="user-profile__icon-star"></img>
                <img src={Star} className="user-profile__icon-star"></img>
                <img src={Star} className="user-profile__icon-star"></img>
                <img src={Star} className="user-profile__icon-star"></img>
              </div>
            </div>
          </div>
        </div>
        <div className="user-profile__bio-wrapper">
          <h3 className="user-profile__bio-title">Bio: </h3>
          <p className="user-profile__bio">
          {profileData || profileData.bio === '' ? "Tell us about yourself!" : profileData.bio}
          </p>
        </div>
        <div className="user-profile__info-wrapper">
          <h3 className="user-profile__info-title">Info: </h3>
          <div className="user-profile__info-block">
            <div className="user-profile__info-wrapper--left">
              <p className="user-profile__info-type">Full Name </p>
              <p className="user-profile__info-type">Email</p>
              <p className="user-profile__info-type">Address</p>
              <p className="user-profile__info-type">Date Joined</p>
            </div>
            <div className="user-profile__info-wrapper--right">
              <p className="user-profile__info-value">
                {profileData.first_name} {profileData.last_name}
              </p>
              <p className="user-profile__info-value"> {profileData.email}</p>
              <p className="user-profile__info-value"> {profileData.address}</p>
              <p className="user-profile__info-value">
                {" "}
                {formatDate(profileData.updated_at)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="user-profile__right-container">
        <UserListings
          setCreateListingForm={setCreateListingForm}
          userListings={userListings}
          handleChange={handleChange}
        />
      </div>
    </section>
  );
}

export default UserProfile;
