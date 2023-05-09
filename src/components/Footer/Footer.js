import "./Footer.scss";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo/exposhare-logo.png";
import FacebookIcon from "../../assets/icons/facebook.svg";
import TwitterIcon from "../../assets/icons/twitter.svg";
import InstaIcon from "../../assets/icons/instagram.svg";

function Footer() {
  return (
    <>
      <footer className="footer-container">
        <section className="footer">
          <Link to="/">
            <img className="footer__logo" src={Logo} alt="exposhare logo" />
          </Link>
          <div className="footer-wrapper"></div>
        </section>

        <section className="footer__block-1">
          <div className="footer__divider footer__divider-1">
            <a href="#" className="footer__subtitle">
              ABOUT
            </a>
          </div>
          <div className="footer__divider footer__divider-2">
            <a href="#" className="footer__subtitle">
              FAQ
            </a>
          </div>
          <div className="footer__divider footer__divider-3">
            <a href="#" className="footer__subtitle">
              PRIVACY POLICY
            </a>
          </div>
          <div className="footer__divider footer__divider-3">
            <a href="#" className="footer__subtitle">
              TERMS OF SERVICE
            </a>
          </div>
          <div className="footer__divider footer__divider-3">
            <a href="#" className="footer__subtitle">
              PRIVACY
            </a>
          </div>
        </section>

        <section className="footer__block-2">
          <a href="#" target="_blank">
            <img src={FacebookIcon}></img>
          </a>
          <a href="#" target="_blank">
            <img src={TwitterIcon}></img>
          </a>
          <a href="#" target="_blank">
            <img src={InstaIcon}></img>
          </a>
        </section>
      </footer>
    </>
  );
}

export default Footer;
