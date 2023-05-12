import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils";
import "./ProfilePage.scss";

function ProfilePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [profileData, setProfileData] = useState(null);

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}/users/my-profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setIsAuthenticated(false);
      setIsLoggedIn(true);
      setProfileData(res.data);
    } catch (err) {
      if (err.response.status === 401) {
        setIsAuthenticated(false);
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

  if (isAuthenticated) return null;

  if (isLoggedIn === null) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <section className="profile-page">
      <div className="profile-page__wrapper-1">
        <h1 className="profile-page__title">My Dashboard <button type="submit" className="profile-page__button-edit">
          Edit Profile
        </button></h1>
      </div>
      {isLoggedIn ? (
        profileData && (
          <>
            <p>
              Hello, {profileData.first_name} {profileData.last_name}
            </p>
            <article className="profile-page__wrapper-2">
              <img
                className="profile-page__avatar"
                src={profileData.avatar_url}
                alt={`${profileData.username} avatar`}
              />

              <h2 className="profile-page__subtitle">{profileData.username}</h2>
              <h3 className="profile-page__info">
                {" "}
                Joined in {formatDate(profileData.updated_at)}
              </h3>
            </article>
            <article className="profile-page__wrapper-3">
              <></>
            </article>
            <button type="submit" className="profile-page__button-logout">
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
