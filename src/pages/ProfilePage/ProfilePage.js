import { useEffect, useState } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils";
import "./ProfilePage.scss";

function ProfilePage({handleChange}) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  //fetching current user profiledata
  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}/users/my-profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      handleChange(res.data);
    } catch (err) {
      if (err.response.status === 401) {
        setIsLoggedIn(false);
      } else {
        console.log("Error authenticating", err);
      }
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US");
  };

  //validation
  if (isLoggedIn === null) {
    return <p className="loading">Loading...</p>;
  }

  //handle log out function
  const handleLogout = () => {
    handleChange(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <section className="profile-page">
      <div className="profile-page__wrapper-1">
        <h1 className="profile-page__title">
          My Dashboard{" "}
          <button className="profile-page__button-edit">Edit Profile</button>
        </h1>
      </div>
      {isLoggedIn ? (
        profileData && (
          <>
            <p>
              Hello, {profileData.first_name} {profileData.last_name}
            </p>
            <article className="profile-page__wrapper-2">
              <h2 className="profile-page__subtitle">
                <img
                  className="profile-page__avatar"
                  src={profileData.avatar_url}
                  alt={`${profileData.username} avatar`}
                />{" "}
                {profileData.username}
              </h2>
              <h3 className="profile-page__info">
                {" "}
                Joined in {formatDate(profileData.updated_at)}
              </h3>
            </article>
            <article className="profile-page__wrapper-3">
              <></>
            </article>
            <button
              className="profile-page__button-logout"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </>
        )
      ) : (
        <>
          <p className="profile-page__auth">
            This page requires authentication.
          </p>
        </>
      )}
    </section>
  );
}

export default ProfilePage;
