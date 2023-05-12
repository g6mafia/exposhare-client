import "./Header.scss";
import SearchIcon from "../../assets/icons/search.svg";
import { useNavigate, Link, NavLink } from "react-router-dom";
import Logo from "../../assets/logo/exposhare-logo.png";
import Favorites from "../../assets/icons/likes.svg";
import Cart from "../../assets/icons/cart.svg";
import { useState } from "react";

function Header({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();
  //for dropdown modal on user avatar
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <header className="header-container">
        <div className="header">
          <Link to="/">
            <img className="header__logo" src={Logo} alt="exposhare logo" />
          </Link>
          <nav className="header__nav-bar">
            <form className="header__label">
              <input
                type="search"
                className="header__search header__search--active"
                placeholder="Search"
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
              {isAuthenticated ? (
                <>
                  <Link to="/users/favorites">
                    <img
                      src={Favorites}
                      alt="favorites"
                      className="header__likes-icon"
                    />
                  </Link>

                  <div onClick={toggleDropdown}>
                    <div className="header__avatar"></div>
                  </div>

                  {isDropdownVisible && (
                    <div className="header__dropdown">
                      <Link to="/users/my-profile">
                        <div className="header__dropdown-account">My Account</div>
                      </Link>
                      <div className="header__dropdown-wrapper">
                        <Link to="/users/favorites">
                          <div className="header__dropdown-item">Favorites</div>
                        </Link>
                        <Link to="/users/messages">
                          <div className="header__dropdown-item">Messages</div>
                        </Link>
                        <Link to="/users/messages">
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
                  )}
                  <Link to="/cart">
                    <img src={Cart} className="header__cart-icon" />
                  </Link>
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
            to="/Forum"
            exact="true"
            className={(navData) =>
              navData.isActive ? "nav__link nav__link--current" : "nav__link"
            }
          >
            FORUM
          </NavLink>
          <NavLink
            to="/News"
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
