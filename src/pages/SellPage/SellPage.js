import "./SellPage.scss";
import UserListings from "../../components/UserListings/UserListings";
import CreateListingForm from "../../components/CreateListingForm/CreateListingForm";
import axios from "axios";
import { BASE_URL } from "../../utils";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavFilter from "../../components/NavFilter/NavFilter";
import ArrowDown from "../../assets/icons/arrow-down.svg";
import ArrowUp from "../../assets/icons/arrow-up.svg";
import SortIcon from "../../assets/icons/sort.svg";

function SellPage({ profileData, handleChange }) {
  const [userListings, setUserListings] = useState([]);
  const [createListingForm, setCreateListingForm] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [navFilterVisible, setNavFilterVisible] = useState(null);

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

  //validation if profile data is not available
  if (!profileData) {
    return (
      <>
        <div className="sell-page__auth-overlay"></div>
        <div className="sell-page__auth">
          <div className="sell-page__auth-wrapper">
            <p className="sell-page__auth-title">Want to sell your gear?</p>
            <p className="sell-page__auth-text">
              Please{" "}
              <Link to="/login" className="sell-page__auth-link">
                Login
              </Link>{" "}
              or{" "}
              <Link to="/signup" className="sell-page__auth-link">
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
    <section className="sell-page">
      <div className="sell-page__container">
        <p className="sell-page__title">Sell</p>
        <div className="shop-content__navbar">
          <p
            className="shop-content__subtitle"
            onClick={() => setNavFilterVisible(!navFilterVisible)}
          >
            Filters{" "}
            {!navFilterVisible ? (
              <img
                src={ArrowDown}
                alt="arrow down"
                className="shop-content__icon-down"
              ></img>
            ) : (
              <img
                src={ArrowUp}
                alt="arrow up"
                className="shop-content__icon-up"
              ></img>
            )}
          </p>
          <p className="shop-content__sort">
            Sort{" "}
            <img
              src={SortIcon}
              alt="sort icon"
              className="shop-content__icon"
            ></img>
          </p>
        </div>
        {navFilterVisible && <NavFilter />}
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
