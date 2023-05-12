import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./ProfilePage.scss";
import axios from "axios";
import { BASE_URL } from "../../utils";
import UserDashboard from "../../components/UserDashboard/UserDashboard";
import UserProfile from "../../components/UserProfile/UserProfile";
import UserActions from "../../components/UserActions/UserActions";

function ProfilePage({ handleChange, profileData }) {
  const navigate = useNavigate();
  const [editForm, setEditForm] = useState(false);

  //handle log out function
  const handleLogout = () => {
    handleChange(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  //handle update user function
  const handleEditUser = async (e) => {
    e.preventDefault();
    try {
      const {
        email,
        username,
        password,
        first_name,
        last_name,
        address,
        bio,
        avatar_url,
      } = e.target.elements;
      await axios.put(
        `${BASE_URL}/users/update`,
        {
          email: email.value,
          username: username.value,
          password: password.value,
          first_name: first_name.value,
          last_name: last_name.value,
          address: address.value,
          bio: bio.value,
          avatar_url: avatar_url.value,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setEditForm(false);
      handleChange({
        ...profileData,
        email: email.value,
        username: username.value,
        first_name: first_name.value,
        last_name: last_name.value,
        address: address.value,
        bio: bio.value,
        avatar_url: avatar_url.value,
      });
    } catch (error) {
      console.error("Error updating user", error);
    }
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

  //validation if profile data is not available
  if (!profileData) {
    return (
      <p className="profile-page__auth">This page requires authentication.</p>
    );
  }

  return (
    <section className="profile-page">
      <UserDashboard setEditForm={setEditForm} />
      <UserProfile profileData={profileData} />
      <UserActions
        handleLogout={handleLogout}
        handleDeleteUser={handleDeleteUser}
      />
      {editForm && (
        <>
        <div className="edit-user__overlay"></div>
        <div className="edit-user">
          <form className="edit-user__form" onSubmit={handleEditUser}>
            <p className="edit-user__title">Edit Your Information: </p>
            <div className="edit-user__container-input">
              <div className="edit-user__wrapper-1">
                <label htmlFor="username" className="edit-user__label">
                  Username:
                </label>
                <input
                  className="edit-user__input"
                  type="text"
                  id="username"
                  name="username"
                  defaultValue={profileData.username}
                />

                <label htmlFor="password" className="edit-user__label">
                  Password (optional):
                </label>
                <input
                  className="edit-user__input"
                  type="password"
                  id="password"
                  name="password"
                />

                <label htmlFor="first_name" className="edit-user__label">
                  First Name:
                </label>
                <input
                  className="edit-user__input"
                  type="text"
                  id="first_name"
                  name="first_name"
                  defaultValue={profileData.first_name}
                />

                <label htmlFor="last_name" className="edit-user__label">
                  Last Name:
                </label>
                <input
                  className="edit-user__input"
                  type="text"
                  id="last_name"
                  name="last_name"
                  defaultValue={profileData.last_name}
                />
              </div>
              <div className="edit-user__wrapper-2">
                <label htmlFor="email" className="edit-user__label">
                  Email:
                </label>
                <input
                  className="edit-user__input"
                  type="email"
                  id="email"
                  name="email"
                  defaultValue={profileData.email}
                />
                <label htmlFor="address" className="edit-user__label">
                  Address:
                </label>
                <input
                  className="edit-user__input"
                  type="text"
                  id="address"
                  name="address"
                  defaultValue={profileData.address}
                />
                {/* <label htmlFor="bio" className="edit-user__label">
                  Bio:
                </label>
                <input
                  className="edit-user__input"
                  type="textarea"
                  id="bio"
                  name="bio"
                  defaultValue={profileData.bio}
                /> */}
                <label htmlFor="avatar_url" className="edit-user__label">
                  Avatar URL:
                </label>
                <input
                  className="edit-user__input"
                  type="text"
                  id="avatar_url"
                  name="avatar_url"
                  defaultValue={profileData.avatar_url}
                />
              </div>
            </div>
            <div className="edit-user__container-button">
              <button type="submit" className="edit-user__button-submit">
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditForm(false)}
                className="edit-user__button-cancel"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        </>
      )}
    
    </section>
  );
}

export default ProfilePage;
