import "./Footer.scss";
import { Link } from "react-router-dom";
import AltLogo from "../../assets/logo/exposhare-alt.png";
import FacebookIcon from "../../assets/icons/facebook.svg";
import TwitterIcon from "../../assets/icons/twitter.svg";
import InstaIcon from "../../assets/icons/instagram.svg";
import ArrowRight from "../../assets/icons/arrow-right.svg";
import UnsplashLogo from "../../assets/images/unsplash-image.png";
import CloudinaryLogo from "../../assets/images/cloudinary-image.png";

function Footer() {
  return (
    <div className="footer-container">
      <footer className="footer">
        <div className="footer__wrapper">
          <Link to="/">
            <img className="footer__logo" src={AltLogo} alt="exposhare logo" />
          </Link>
          {/* visible on in mobile */}
          <section className="footer__block-1">
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
              <img src={FacebookIcon} className="footer__icon-social" alt="facebook icon"></img>
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noreferrer">
              <img src={TwitterIcon} className="footer__icon-social" alt="twitter icon"></img>
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              <img src={InstaIcon} className="footer__icon-social" alt="instagram icon"></img>
            </a>
          </section>
        </div>
        <section className="footer__block-2">
          <div className="footer__divider">
            <p className="footer__subtitle">
              ABOUT
            </p>
            <div className="footer__wrapper">
              <Link to="/about" className="footer__link">
                Our Story
              </Link>
              <Link to="/faq" className="footer__link">
                FAQ
              </Link>
              <a href="" className="footer__link">
                Team
              </a>
              <a href="" className="footer__link">
                Careers
              </a>
            </div>
          </div>
          <div className="footer__divider">
            <p className="footer__subtitle">
              SERVICES
            </p>
            <div className="footer__wrapper">
              <Link to="/shop" className="footer__link">
                Shop
              </Link>
              <a href="" className="footer__link">
                Sell
              </a>
              <a href="" className="footer__link">
                Trade
              </a>
              <a href="" className="footer__link">
                Repair
              </a>
            </div>
          </div>
          <div className="footer__divider">
            <p className="footer__subtitle">
              LEGAL
            </p>
            <div className="footer__wrapper">
              <a href="" className="footer__link">
                Terms & Conditions
              </a>
              <a href="" className="footer__link">
                Privacy Policy
              </a>
              <a href="" className="footer__link">
                Terms of Use
              </a>
            </div>
          </div>

          <div className="footer__divider">
            <p className="footer__subtitle">
              STAY CONNECTED
            </p>
            <form className="footer__form">
              <label htmlFor="name" className="footer__label">
                <input
                  type="email"
                  name="email"
                  className="footer__input"
                  placeholder="Enter your email address"
                ></input>
              </label>
              <button type="submit" className="footer__button">
                <img src={ArrowRight} className="footer__icon-right" />
              </button>
            </form>
          </div>
        </section>

        <section className="footer__block-3">
          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" >
            <img src={FacebookIcon} className="footer__icon-social"></img>
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noreferrer" >
            <img src={TwitterIcon} className="footer__icon-social"></img>
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" >
            <img src={InstaIcon} className="footer__icon-social"></img>
          </a>
        </section>

        <section className="footer__libraries footer__libraries--relative">
          <p className="footer__subtitle">POWERED BY </p>
          <a href="https://unsplash.com/" target="_blank" rel="noreferrer" >
            <img src={UnsplashLogo} className="footer__image"></img>
          </a>
          <a href="https://cloudinary.com/"target="_blank" rel="noreferrer" ><img src={CloudinaryLogo} className="footer__image"></img></a>
          <p className="footer__author">Made by Gerik Castillo</p>
          <p className="footer__copyright">Copyright © 2023</p>
        </section>
      </footer>
    </div>
  );
}

export default Footer;
