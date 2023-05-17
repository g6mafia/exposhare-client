import "./AboutArticle.scss";
import Photographer from "../../assets/images/about-image.jpg";
import { Link } from "react-router-dom";

function AboutArticle() {
  return (
    <>
      <section className="about">
        <div className="about__wrapper">
          <div className="about__container-left">
            <h1 className="about__title">
              What is <span className="about__brand-name">exposhare</span>?
            </h1>
            <p className="about__bio">
              Welcome to <span className="about__brand-name">exposhare</span>,
              your dedicated, community-driven marketplace for photography
              enthusiasts. We offer a safe, reliable platform where
              photographers, from beginners to professionals, can confidently
              buy, sell, and trade their gear.
            </p>
            <p className="about__bio">
              At <span className="about__brand-name">exposhare</span>, we
              understand and address the unique needs of the photography
              community, eliminating the uncertainties of unfocused marketplaces
              and providing fair value for used equipment. Beyond a marketplace,
              we are a hub for like-minded individuals to connect, share
              insights, and stay updated with the latest photography news.
            </p>
            <p className="about__bio">
              Whether you're looking to buy your first camera, trade an old
              lens, or sell professional gear,{" "}
              <span className="about__brand-name">exposhare</span> is your
              one-stop-shop for all things photography.
            </p>
            <Link to="/about">
              <button className="about__button">Learn More</button>
            </Link>
          </div>
          <div className="about__container-right">
            <img
              src={Photographer}
              alt="Ben Eaton Image"
              className="about__image"
            ></img>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutArticle;
