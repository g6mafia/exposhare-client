import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./ProfilePage.scss";
import axios from "axios";
import { BASE_URL } from "../../utils";
import UserDashboard from "../../components/UserDashboard/UserDashboard";
import UserProfile from "../../components/UserProfile/UserProfile";
import UserActions from "../../components/UserActions/UserActions";
import { CLOUDINARY_UPLOAD_URL, CLOUDINARY_UPLOAD_PRESET } from "../../config";

function ProfilePage({ handleChange, profileData }) {
  const navigate = useNavigate();
  const [editUserForm, setEditUserForm] = useState(false);
  const [createListingForm, setCreateListingForm] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const cameraBrands = [
    "Canon",
    "Nikon",
    "Sony",
    "FujiFilm",
    "Panasonic",
    "Olympus",
    "Pentax",
  ];
  const cameraConditions = ["New", "Used", "Refurbished"];

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
          avatar_url: uploadedImageUrl || profileData.avatar_url,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setEditUserForm(false);
      handleChange({
        ...profileData,
        email: email.value,
        username: username.value,
        first_name: first_name.value,
        last_name: last_name.value,
        address: address.value,
        bio: bio.value,
        avatar_url: uploadedImageUrl || profileData.avatar_url,
      });
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  //handle create listing function
  const handleCreateListing = async (e) => {
    e.preventDefault();
    try {
      const { title, description, category, brand, condition, price } =
        e.target.elements;
      const response = await axios.post(
        `${BASE_URL}/api/listings`,
        {
          title: title.value,
          description: description.value,
          category: category.value,
          brand: brand.value,
          condition: condition.value,
          price: parseFloat(price.value),
          image_url: uploadedImageUrl,
          user_id: profileData.id,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log('Request data:', response);
      handleChange(response);
      setCreateListingForm(false);
    } catch (error) {
      console.error("Error creating listing", error);
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

  //handle image upload
  const handleImageUpload = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData);
      setUploadedImageUrl(response.data.secure_url);
    } catch (error) {
      console.error("Error uploading image", error);
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
      <UserDashboard handleLogout={handleLogout}/>
      <UserProfile
      handleChange={handleChange}
        profileData={profileData}
        setCreateListingForm={setCreateListingForm}
        setEditUserForm={setEditUserForm}
      />
      <UserActions
        handleDeleteUser={handleDeleteUser}
      />
      {editUserForm && (
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
                  <label htmlFor="bio" className="edit-user__label">
                    Bio:
                  </label>
                  <input
                    className="edit-user__input"
                    type="textarea"
                    id="bio"
                    name="bio"
                    defaultValue={profileData.bio}
                  />
                  <label htmlFor="avatar_url" className="edit-user__label">
                    Avatar URL:
                  </label>
                  <input
                    className="edit-user__input"
                    type="file"
                    id="avatar_url"
                    name="avatar_url"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>
              <div className="edit-user__container-button">
                <button type="submit" className="edit-user__button-submit">
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditUserForm(false)}
                  className="edit-user__button-cancel"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {createListingForm && (
        <>
          <div className="create-listing__overlay"></div>
          <div className="create-listing">
            <form
              className="create-listing__form"
              onSubmit={handleCreateListing}
            >
              <p className="create-listing__title">Create New Listing: </p>
              <div className="create-listing__container">
                <div className="create-listing__container-input">
                  <label htmlFor="title" className="create-listing__label">
                    Title:
                  </label>
                  <input
                    className="create-listing__input"
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Title"
                    required
                  />

                  <label
                    htmlFor="description"
                    className="create-listing__label"
                  >
                    Description:
                  </label>
                  <input
                    className="create-listing__input"
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Description"
                    required
                  />

                  <label htmlFor="category" className="create-listing__label">
                    Category:
                  </label>
                  <select
                    className="create-listing__input"
                    id="category"
                    name="category"
                    required
                  >
                    <option value="" disabled selected>
                      Select a category
                    </option>
                    <option value="Cameras">Cameras</option>
                  </select>

                  <label htmlFor="price" className="create-listing__label">
                    Price:
                  </label>
                  <input
                    className="create-listing__input"
                    type="number"
                    step="0.01"
                    id="price"
                    name="price"
                    placeholder="$"
                  />
                </div>
                <div className="create-listing__container-image">
                  <label htmlFor="brand" className="create-listing__label">
                    Brand:
                  </label>
                  <select
                    className="create-listing__input"
                    id="brand"
                    name="brand"
                    required
                  >
                    <option value="" disabled selected>
                      Select a brand
                    </option>
                    {cameraBrands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>

                  <label htmlFor="condition" className="create-listing__label">
                    Condition:
                  </label>
                  <select
                    className="create-listing__input"
                    id="condition"
                    name="condition"
                    required
                  >
                    <option value="" disabled selected>
                      Select a condition
                    </option>
                    {cameraConditions.map((condition) => (
                      <option key={condition} value={condition}>
                        {condition}
                      </option>
                    ))}
                  </select>

                  <label htmlFor="image" className="create-listing__label">
                    Image URL:
                  </label>
                  <input
                    className="create-listing__input"
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>
              <div className="create-listing__container-button">
                <button type="submit" className="create-listing__button-submit">
                  Create Listing
                </button>
                <button
                  type="button"
                  onClick={() => setCreateListingForm(false)}
                  className="create-listing__button-cancel"
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
