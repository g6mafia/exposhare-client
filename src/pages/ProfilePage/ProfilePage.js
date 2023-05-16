import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "./ProfilePage.scss";
import axios from "axios";
import { BASE_URL } from "../../utils";
import UserDashboard from "../../components/UserDashboard/UserDashboard";
import UserProfile from "../../components/UserProfile/UserProfile";
import UserActions from "../../components/UserActions/UserActions";
import { CLOUDINARY_UPLOAD_URL, CLOUDINARY_UPLOAD_PRESET } from "../../config";
import EditUserForm from "../../components/EditUserForm/EditUserForm";
import CreateListingForm from "../../components/CreateListingForm/CreateListingForm";

function ProfilePage({ handleChange, profileData }) {
  const navigate = useNavigate();
  const [editUserForm, setEditUserForm] = useState(false);
  const [createListingForm, setCreateListingForm] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

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
      const { email, username, password, first_name, last_name, address, bio } =
        e.target.elements;
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

  // handle create listing function
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
      console.log("Request data:", response);
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
      <>
        <div className="profile-page__auth-overlay"></div>
        <div className="profile-page__auth">
          <div className="profile-page__auth-wrapper">
            <p className="profile-page__title">
              Sorry, this page requires authentication.
            </p>
            <p className="profile-page__text">
              Please{" "}
              <Link to="/login" className="profile-page__link">
                Login
              </Link>{" "}
              or{" "}
              <Link to="/signup" className="profile-page__link">
                Sign Up
              </Link>{" "}
              first.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <section className="profile-page">
      <div className="profile-page__container">
      <UserDashboard handleLogout={handleLogout} />
      <UserProfile
        handleChange={handleChange}
        profileData={profileData}
        setCreateListingForm={setCreateListingForm}
        setEditUserForm={setEditUserForm}
      />
      <UserActions handleDeleteUser={handleDeleteUser} />
      {editUserForm && (
        <>
          <EditUserForm
            profileData={profileData}
            setEditUserForm={setEditUserForm}
            handleEditUser={handleEditUser}
            handleImageUpload={handleImageUpload}
          />
        </>
      )}

      {createListingForm && (
        <>
          <CreateListingForm
            setCreateListingForm={setCreateListingForm}
            handleCreateListing={handleCreateListing}
            setUploadedImageUrl={setUploadedImageUrl}
          />
        </>
      )}
      </div>
    </section>
  );
}

export default ProfilePage;
