import "./HomeCategoryCards.scss";
import { Link } from "react-router-dom";
import ArrowRight from "../../assets/icons/arrow-right.svg";

function HomeCategoryCards({ filteredCategories }) {
  return (
    <>
    <section className="card-category">
      <div className="card-category__container">
        <div className="card-category__wrapper-1">
          <h2 className="card-category__title">Shop by Category</h2>
          <Link to="/shop?category" className="card-category__link">
            SEE ALL <img src={ArrowRight} className="card-brands__icon-right" />
          </Link>
          <Link to="/shop?category" className="card-category__link--mobile">
            <img
              src={ArrowRight}
              className="card-category__icon-right--mobile"
            />
          </Link>
        </div>
        <div className="card-category__wrapper-2">
          {filteredCategories.map((item) => (
            <Link
              to={`/shop?search=${encodeURIComponent(item.category)}`}
              key={item.id}
            >
              <article key={item.id} className="card-category__article">
                <div className="card-category__body">
                  <img
                    src={item.image_url}
                    alt={item.category}
                    className="card-category__image"
                  ></img>
                  <p className="card-category__text">{item.category}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
      </section>
    </>
  );
}

export default HomeCategoryCards;
