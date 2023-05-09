import "./Header.scss";
import SearchIcon from "../../assets/icons/search.svg";
import { Link } from "react-router-dom";


function Header() {
  return (
    <header className="header-container">
      <div className="header">
        <Link to ="/" className="header__logo">
          exposhare
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
            <img></img>
            <div className="header__avatar"></div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
