import { useNavigate } from "react-router-dom";
import "./ProfilePage.scss";
import axios from "axios";
import { BASE_URL } from "../../utils";
import UserDashboard from "../../components/UserDashboard/UserDashboard";
import UserProfile from "../../components/UserProfile/UserProfile";
import UserActions from "../../components/UserActions/UserActions";



function ProfilePage({ handleChange, profileData }) {
  const navigate = useNavigate();

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
      <UserDashboard />
      <UserProfile profileData={profileData} />
      <UserActions
        handleLogout={handleLogout}
        handleDeleteUser={handleDeleteUser}
      />
    </section>
  );
}

export default ProfilePage;
