import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from "../../utils";

function ProfilePage () {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    axios
      .get(`${ BASE_URL }/auth/profile`, { withCredentials: true })
      .then((res) => {
        setIsAuthenticating(false);
        setIsLoggedIn(true);
        setProfileData(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setIsAuthenticating(false);
          setIsLoggedIn(false);
        } else {
          console.log('Error authenticating', err);
        }
      });
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US');
  };

  if (isAuthenticating) return null;

  return (
    <section className="profile-page">
      <h1 className="profile-page__title">Profile Page</h1>
      {isLoggedIn ? (
        profileData && (
          <>
            <h2>Hello, {profileData.username}</h2>
            <h3>Registered since: {formatDate(profileData.updated_at)}</h3>
            <img
              className="profile-page__avatar"
              src={profileData.avatar_url}
              alt={`${profileData.username} avatar`}
            />
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
};

export default ProfilePage;