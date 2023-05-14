import "./HomeCards.scss";
import { Link } from "react-router-dom";
import ArrowRight from "../../assets/icons/arrow-right.svg";

function HomeCards({ filteredBrands }) {
  return (
    <>
      <section className="card-brands__container">
        <div className="card-brands__wrapper-1">
          <h2 className="card-brands__title">Shop by Brand</h2>
          <Link to="/shop?brand" className="card-brands__link">
            SEE ALL <img src={ArrowRight} className="card-brands__icon-right" />
          </Link>
          <Link to="/shop?brand" className="card-brands__link--mobile"><img src={ArrowRight} className="card-brands__icon-right--mobile" />
          </Link>
        </div>
        <div className="card-brands__wrapper-2">
          {filteredBrands.map((item) => (
            <Link
              to={`/shop?search=${encodeURIComponent(item.brand)}`}
              key={item.id}
            >
              <article key={item.id} className="card-brands__article">
                <div className="card-brands__body">
                  <img
                    src={item.image_url}
                    alt={item.brand}
                    className="card-brands__image"
                  ></img>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export default HomeCards;
