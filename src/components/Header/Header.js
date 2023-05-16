import "./Header.scss";
import SearchIcon from "../../assets/icons/search.svg";
import { useNavigate, Link, NavLink, useLocation } from "react-router-dom";
import Logo from "../../assets/logo/exposhare-logo.png";
import Favorites from "../../assets/icons/likes.svg";
import Cart from "../../assets/icons/cart.svg";
import Messages from "../../assets/icons/mail.svg";
import { useState, useRef, useEffect } from "react";

function Header({ profileData, isAuthenticated, handleChange }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  //for dropdown modal on user avatar
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  //state storing search query
  const [searchQuery, setSearchQuery] = useState("");

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleLogout = () => {
    handleChange(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsDropdownVisible(false);
  }, [location]); 

  return (
    <>
      <header className="header-container">
        <div className="header">
          <Link to="/">
            <img className="header__logo" src={Logo} alt="exposhare logo" />
          </Link>
          <nav className="header__nav-bar">
            <form
              className="header__label"
              onSubmit={(e) => {
                e.preventDefault();
                navigate(`/shop?search=${searchQuery}`);
              }}
            >
              <input
                type="text"
                className="header__search header__search--active"
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
              ></input>
              <button type="submit" className="header__button">
                <img
                  className="header__search-icon"
                  src={SearchIcon}
                  alt="search icon"
                />
              </button>
            </form>
            <div className="header__wrapper">
              {isAuthenticated && profileData ? (
                <>
                  <Link to="#">
                    <img
                      src={Messages}
                      className="header__icon-messages"
                      alt="mail icon"
                    />
                  </Link>
                  <Link to="/users/favorites">
                    <img
                      src={Favorites}
                      alt="favorites"
                      className="header__icon-favorites"
                    />
                  </Link>

                  <Link to="#">
                    <img
                      src={Cart}
                      className="header__icon-cart"
                      alt="cart icon"
                    />
                  </Link>

                  <div onClick={toggleDropdown}>
                    <img
                      className="header__avatar"
                      src={profileData.avatar_url}
                      alt={profileData.avatar_url}
                    ></img>
                  </div>

                  {isDropdownVisible && (
                    <>
                    <div className="header__dropdown-overlay"></div>
                    <div ref={dropdownRef} className="header__dropdown">
                      <Link to="/users/my-profile">
                        <div className="header__dropdown-account">
                          My Account
                        </div>
                      </Link>
                      <div className="header__dropdown-wrapper">
                        <Link to="/users/favorites">
                          <div className="header__dropdown-item">Favorites</div>
                        </Link>
                        <Link to="/users/messages">
                          <div className="header__dropdown-item">Messages</div>
                        </Link>
                        <Link to="/users/purchases">
                          <div className="header__dropdown-item">Purchases</div>
                        </Link>
                      </div>
                      <div
                        className="header__dropdown-logout"
                        onClick={handleLogout}
                      >
                        Log Out
                      </div>
                    </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <Link to="/login">
                    <button className="header__button-login">Log In</button>
                  </Link>
                  <Link to="/signup">
                    <button className="header__button-signup">Sign Up</button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* second nav bar */}
      <section className="nav-container">
        <nav className="nav">
          <NavLink
            to="/shop"
            exact="true"
            className={(navData) =>
              navData.isActive ? "nav__link nav__link--current" : "nav__link"
            }
          >
            SHOP
          </NavLink>
          <NavLink
            to="/sell"
            exact="true"
            className={(navData) =>
              navData.isActive ? "nav__link nav__link--current" : "nav__link"
            }
          >
            SELL
          </NavLink>
          <NavLink
            to="/trade"
            exact="true"
            className={(navData) =>
              navData.isActive ? "nav__link nav__link--current" : "nav__link"
            }
          >
            TRADE
          </NavLink>
          <NavLink
            to="/about"
            exact="true"
            className={(navData) =>
              navData.isActive ? "nav__link nav__link--current" : "nav__link"
            }
          >
            ABOUT
          </NavLink>
          <NavLink
            to="/news"
            exact="true"
            className={(navData) =>
              navData.isActive ? "nav__link nav__link--current" : "nav__link"
            }
          >
            NEWS
          </NavLink>
        </nav>
      </section>
    </>
  );
}

export default Header;
