import "./NavFilter.scss";
import FilterIcon from "../../assets/icons/filter.svg";

function NavFilter() {
  return (
    <nav className="nav-filter">
      <button className="nav-filter__button">
        Brand{" "}
        <img
          src={FilterIcon}
          alt="filter icon"
          className="nav-filter__icon"
        ></img>
      </button>
      <button className="nav-filter__button">
        Condition{" "}
        <img
          src={FilterIcon}
          alt="filter icon"
          className="nav-filter__icon"
        ></img>
      </button>
      <button className="nav-filter__button">
        Category{" "}
        <img
          src={FilterIcon}
          alt="filter icon"
          className="nav-filter__icon"
        ></img>
      </button>
    </nav>
  );
}

export default NavFilter;
