import "./HeroBanner.scss";
import { useEffect, useRef } from "react";
import banner1 from "../../assets/images/banner-img-1.jpg";
import banner2 from "../../assets/images/banner-img-2.jpg";
import banner3 from "../../assets/images/banner-img-3.jpg";

function HeroBanner() {
  const carouselRef = useRef(null);

  useEffect(() => {
    //making hero banner a carousel of images
    const carouselElement = carouselRef.current;
    let currentIndex = 0;
    const images = carouselElement.querySelectorAll(".hero-banner__item");

    const updateImages = () => {
      images.forEach((img, index) => {
        img.style.opacity = index === currentIndex ? 1 : 0;
      });
    };

    const advanceCarousel = () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateImages();
    };

    const intervalId = setInterval(advanceCarousel, 10000);
    updateImages();

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <section className="hero-banner" ref={carouselRef}>
      <div className="hero-banner__container">
        <h1 className="hero-banner__title">exposhare</h1>
        <p className="hero-banner__slogan">
       Discover the Perfect Gear for Every Shot.
        </p>
      </div>
      
      <div className="hero-banner__item">
      <div className="hero-banner__overlay"></div>
        <img src={banner1} alt="banner image 1" className="hero-banner__image" />
      </div>
     
      <div className="hero-banner__item">
      <div className="hero-banner__overlay"></div>
        <img src={banner2} alt="banner image 2" className="hero-banner__image" />
      </div>
  
      <div className="hero-banner__item">
      <div className="hero-banner__overlay"></div>
        <img src={banner3} alt="banner image 3" className="hero-banner__image" />
      </div>
    </section>
  );
}

export default HeroBanner;
