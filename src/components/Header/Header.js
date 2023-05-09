import "./Header.scss";
import SearchIcon from "../../assets/icons/search.svg";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo/exposhare-logo.png"
import Favorites from "../../assets/icons/likes.svg"

function Header() {
  return (
    <header className="header-container">
      <div className="header">
        <Link to ="/">
        <img
            className="header__logo"
            src={Logo}
            alt="exposhare logo"
    
          />
        </Link>
        <nav className="header__nav-bar">
            <form className="header__label">
              <img
                className="header__search-icon"
                src={SearchIcon}
                alt="search icon"
              />
              <input
                type="search"
                className="header__search header__search--active"
                placeholder="Search"
              ></input>
            </form>
            <div className="header__wrapper">
            <img src={Favorites} alt="favorites" className="header__likes-icon"></img>
            <div className="header__avatar"></div>
            </div>
        </nav>
      </div>
      <nav className="nav">
        <a href="#" className="nav__link nav__link--current">Shop</a>
        <a href="#" className="nav__link">Sell</a>
        <a href="#" className="nav__link">Trade</a>
        <a href="#" className="nav__link">Repair</a>
        <a href="#" className="nav__link">News</a>
      </nav>
    </header>
  );
}

export default Header;
