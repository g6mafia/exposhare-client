import "./ShopContent.scss";
import NavFilter from "../NavFilter/NavFilter";
import PublicListing from "../PublicListing/PublicListing";
import ArrowDown from "../../assets/icons/arrow-down.svg";
import ArrowUp from "../../assets/icons/arrow-up.svg";
import SortIcon from "../../assets/icons/sort.svg";

import { useState } from "react";

function ShopContent({ listings }) {
  const [navFilterVisible, setNavFilterVisible] = useState(null);

  return (
    <article className="shop-content">
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
      <div className="shop-content__listings">
        {listings.map((listing) => (
          <PublicListing key={listing.id} listing={listing} />
        ))}
      </div>
    </article>
  );
}
export default ShopContent;
