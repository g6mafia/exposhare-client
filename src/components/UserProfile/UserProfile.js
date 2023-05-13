import "./UserProfile.scss";
import Star from "../../assets/icons/star.svg";
import UserListings from "../UserListings/UserListings";
import axios from "axios";
import { BASE_URL } from "../../utils";
import { useState, useEffect } from "react";

function UserProfile({ profileData, setCreateListingForm }) {
  const [userListings, setUserListings] = useState([]);

  useEffect(() => {
    fetchUserListings();
  }, []);

  const fetchUserListings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/listings/user/${profileData.id}/listings`, 
      { headers: {
        Authorization: `Bearer ${token}`,
      }},
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
      <div className="user-profile__wrapper-left">
        <h2 className="user-profile__title">Account Info</h2>
        <div className="user-profile__wrapper-info">
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
        <div className="user-profile__wrapper-bio">
          <h3 className="user-profile__bio-title">Bio: </h3>
          <p className="user-profile__bio">
            Amateur photographer based in Brooklyn NY. Love to take portrait and
            street photography. Interested in film and digital products.
          </p>
        </div>
        <h3 className="user-profile__bio-title">Info: </h3>
        <p className="user-profile__info">
          {" "}
          Joined in {formatDate(profileData.updated_at)}
        </p>
      </div>
      <div className="user-profile__wrapper-right">
        <UserListings
          profileData={profileData}
          setCreateListingForm={setCreateListingForm}
          userListings={userListings}
        />
      </div>
    </section>
  );
}

export default UserProfile;
