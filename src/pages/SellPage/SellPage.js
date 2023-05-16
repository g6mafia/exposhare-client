import "./SellPage.scss";
import UserListings from "../../components/UserListings/UserListings";
import CreateListingForm from "../../components/CreateListingForm/CreateListingForm";
import axios from "axios";
import { BASE_URL } from "../../utils";
import { useState, useEffect } from "react";

function SellPage({ profileData, handleChange }) {
  const [userListings, setUserListings] = useState([]);
  const [createListingForm, setCreateListingForm] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");


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

  useEffect(() => {
    if (profileData && profileData.id) {
      fetchUserListings();
    }
  }, [profileData]);

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

  if (!profileData) {
    return <div>Loading...</div>
  }


  return (
    <section className="sell-page">
      <div className="sell-page__container">
        <p className="sell-page__title">Sell</p>
        <UserListings
        className="sell-page__user-listings"
          setCreateListingForm={setCreateListingForm}
          userListings={userListings}
          handleChange={handleChange}
          setUserListings={setUserListings}
        />
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

export default SellPage;
