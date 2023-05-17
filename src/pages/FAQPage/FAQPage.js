import "./FAQPage.scss";

function FAQPage() {
  return (
    <>
      <section className="faq">
        <div className="faq__container">
          <p className="faq__title">FAQs</p>
          <ul className="faq__list">
            <li className="faq__question">
              What types of photography equipment can I buy/sell on{" "}
              <span className="faq__brand-name">exposhare</span>?{" "}
              <p className="faq__answer">
                You can buy, sell, or trade cameras, lenses, and other
                photography gear on{" "}
                <span className="faq__brand-name">exposhare</span>.
              </p>
            </li>
            <li className="faq__question">
              How does <span className="faq__brand-name">exposhare</span> ensure
              the authenticity of listed equipment?
              <p className="faq__answer">
                We have a robust verification process in place to ensure the
                authenticity and accuracy of the products listed on our
                platform.
              </p>
            </li>
            <li className="faq__question">
              Can I trust the sellers on{" "}
              <span className="faq__brand-name">exposhare</span>?{" "}
              <p className="faq__answer">
                Yes, we focus on fostering a reliable and trustworthy
                environment. Each seller's credibility is established through a
                stringent verification process.
              </p>
            </li>
            <li className="faq__question">
              How does the buying process work?{" "}
              <p className="faq__answer">
                Once you've found a product you're interested in, you can
                communicate directly with the seller to finalize the
                transaction.
              </p>
            </li>
            <li className="faq__question">
              What if I receive a product that is not as described? We have
              policies in place to protect buyers against such situations.{" "}
              <p className="faq__answer">
                Please refer to our "Buyer Protection" section for more
                information.
              </p>
            </li>
            <li className="faq__question">
              How do I list my equipment for sale?{" "}
              <p className="faq__answer">
                You can list your equipment for sale by creating an account,
                clicking on the "Sell" button, and following the prompts to
                describe and price your gear.
              </p>
            </li>
            <li className="faq__question">
              What if my listed item doesn't sell?{" "}
              <p className="faq__answer">
                You can adjust your listing at any time, including the price,
                description, or photos, to make it more appealing to potential
                buyers.
              </p>
            </li>
            <li className="faq__question">
              Are there any fees associated with selling on{" "}
              <span className="faq__brand-name">exposhare</span>?{" "}
              <p className="faq__answer">
                Please refer to our "Seller Fees" section for detailed
                information about any associated fees.
              </p>
            </li>
            <li className="faq__question">
              Can I trade my equipment instead of selling?{" "}
              <p className="faq__answer">
                Yes, <span className="faq__brand-name">exposhare</span> supports
                the trading of photography gear between users.
              </p>
            </li>
            <li className="faq__question">
              What steps does <span className="faq__brand-name">exposhare</span>
              take to maintain a safe and secure platform?
              <p className="faq__answer">
                We implement stringent security measures, including secure
                payment methods and a robust verification process, to ensure the
                safety and security of our users.
              </p>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

export default FAQPage;
