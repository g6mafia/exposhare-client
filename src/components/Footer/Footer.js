import "./Footer.scss";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo/exposhare-logo.png";
import FacebookIcon from "../../assets/icons/facebook.svg";
import TwitterIcon from "../../assets/icons/twitter.svg";
import InstaIcon from "../../assets/icons/instagram.svg";
import ArrowRight from "../../assets/icons/arrow-right.svg"

function Footer() {
  return (
    <div className="footer-container">
      <footer className="footer">
        <Link to="/">
          <img className="footer__logo" src={Logo} alt="exposhare logo" />
        </Link>

        <section className="footer__block-1">
          <div className="footer__divider">
            <p href="#" className="footer__subtitle">
              ABOUT
            </p>
            <div className="footer__wrapper">
              <a href="" className="footer__link">
                Our Story
              </a>
              <a href="" className="footer__link">
                FAQ
              </a>
              <a href="" className="footer__link">
                TEAM
              </a>
              <a href="" className="footer__link">
                Careers
              </a>
            </div>
          </div>
          <div className="footer__divider">
            <p href="#" className="footer__subtitle">
              SERVICES
            </p>
            <div className="footer__wrapper">
              <a href="" className="footer__link">
                Shop
              </a>
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
            <p href="#" className="footer__subtitle">
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
            <p href="#" className="footer__subtitle">
              STAY CONNECTED
            </p>
            <form className="footer__form">
              <label htmlFor="name" className="footer__label">
                <input type="email" name="email" className="footer__input" placeholder="Enter your email address"></input>
              </label>
              <button type="submit" className="footer__button"><img src={ArrowRight} className="footer__icon footer__icon--size"/></button>
            </form>
          </div>
        </section>

        <section className="footer__block-2">
          <a href="#" target="_blank">
            <img src={FacebookIcon} className="footer__icon"></img>
          </a>
          <a href="#" target="_blank">
            <img src={TwitterIcon} className="footer__icon"></img>
          </a>
          <a href="#" target="_blank">
            <img src={InstaIcon} className="footer__icon"></img>
          </a>
        </section>
      </footer>
    </div>
  );
}

export default Footer;
