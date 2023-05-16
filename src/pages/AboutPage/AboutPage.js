import "./AboutPage.scss";
import { Link } from "react-router-dom";
import CameraHand from "../../assets/images/camera-hand-image.jpg";

function AboutPage() {
  return (
    <>
      <section className="about-page">
        <div className="about-page__wrapper">
          <p className="about-page__title">About Us</p>

          <div className="about-page__container">
            <div className="about-page__container-left">
              <p className="about-page__text">
                Welcome to <span className="about-page__brand-name">exposhare</span>, the premier community-driven marketplace
                designed exclusively for photography enthusiasts. Our mission is
                to facilitate a safe and reliable environment where
                photographers, from budding amateurs to seasoned professionals,
                can confidently buy, sell, and trade photography gear. We
                understand the unique needs and challenges of the photography
                community and are dedicated to providing a tailored platform
                that caters specifically to them.{" "}
              </p>
              <p className="about-page__text">
                At <span className="about-page__brand-name">exposhare</span>, we alleviate the common pain points faced by
                photographers when navigating through unfocused marketplaces. We
                ensure credibility, authenticity, and accurate product
                descriptions, thereby eliminating the uncertainties associated
                with vast, open marketplaces. We also stand against the
                inadequate offers provided by big-brand retailers for used gear.
                Our platform encourages fair pricing, allowing photographers to
                get the most value out of their equipment.{" "}
              </p>
              <p className="about-page__text">
                Moreover, we believe in fostering a sense of community.{" "}
                <span className="about-page__brand-name">exposhare</span> is not just a marketplace but also a hub where
                like-minded individuals can connect, share insights, and stay
                updated with the latest photography news. We aim to make the
                journey of exploring, upgrading, or even just starting the
                photography hobby simpler and enjoyable. Whether you're looking
                to buy your first camera, trade an old lens, or sell
                professional gear, <span className="about-page__brand-name">exposhare</span> {" "}is your one-stop-shop.
              </p>

               <p className="about-page__text">Questions? Feel free to visit our Frequently Asked Questions Page <Link to="/faq" className="about-page__link">here.</Link></p>
            </div>
            <div className="about-page__container-right">
              <img
                src={CameraHand}
                alt="Ben Eaton Image"
                className="about-page__image"
              ></img>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutPage;
