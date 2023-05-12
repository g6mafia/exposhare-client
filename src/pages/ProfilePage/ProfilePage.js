import { useNavigate } from "react-router-dom";
import "./ProfilePage.scss";
import axios from "axios";
import { BASE_URL } from "../../utils";


function ProfilePage({ handleChange, profileData }) {
  const navigate = useNavigate();

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US");
  };

  //handle log out function
  const handleLogout = () => {
    handleChange(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  // Handle delete user function
  const handleDeleteUser = async () => {
    try {
      await axios.delete(`${BASE_URL}/users/delete`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      handleChange(null);
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  if (!profileData) {
    return (
      <p className="profile-page__auth">This page requires authentication.</p>
    );
  }

  return (
    <section className="profile-page">
      <div className="profile-page__wrapper-1">
        <h1 className="profile-page__title">
          My Dashboard{" "}
          <button className="profile-page__button-edit">Edit Profile</button>
        </h1>
      </div>

      <div>
        <p className="profile-page__welcome-text">
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
        <button className="profile-page__button-logout" onClick={handleLogout}>
          Log Out
        </button>
        
        <button
        className="profile-page__button-delete"
        onClick={handleDeleteUser}
      >
        Delete My Account
      </button>
      </div>
    </section>
  );
}

export default ProfilePage;
