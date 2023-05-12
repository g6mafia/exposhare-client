import "./SignUpPage.scss";
import {  useNavigate, Link } from "react-router-dom";
import Input from "../../components/Input/Input";
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../../utils";

function SignUpPage({ handleChange }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const username = e.target.username.value;
    const password = e.target.password.value;
    const first_name = e.target.first_name.value;
    const last_name = e.target.last_name.value;
    const address = e.target.address.value;
    const avatar_url = `https://i.pravatar.cc/150?u=${Math.random()}`;
    const bio = "";

    //validation to confirm all fields are filled
    if (
      !email ||
      !username ||
      !password ||
      !first_name ||
      !last_name ||
      !address
    ) {
      return;
    }

    axios
      .post(`${BASE_URL}/users/signup`, {
        email,
        username,
        password,
        first_name,
        last_name,
        address,
        avatar_url,
        bio,
      })
      .then((response) => {
        setSuccess(true);
        setError("");
        e.target.reset();
        localStorage.setItem("token", response.data.token);
        handleChange(true, response.data);
        navigate('/');
      })
      .catch((error) => {
        setSuccess(false);
        setError(error.response.data);
      });
  };

  return (
    <div className='signup-container'>
    <section className="signup">
      <form className="signup__form" onSubmit={handleSubmit}>
        <h1 className="signup__title">Create an Account</h1>
        <p className="signup__subtitle">By creating an account with us, you'll be able to buy, sell, comment, and more.</p>

        <Input type="text" name="first_name" label="First Name" />
        <Input type="text" name="last_name" label="Last Name" />
        <Input type="text" name="username" label="Username" />
        <Input type="text" name="address" label="Address" />
        <Input type="text" name="email" label="Email" />
        <Input type="password" name="password" label="Password" />

        <button className="signup__button">Sign Up</button>

        {success && (
          <div className="signup__success-message">Successfully Signed Up!</div>
        )}
        {error && <div className="signup__error-message">{error.message}</div>}
      </form>
      <p className="signup__login-link">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </section>
    </div>
  );
}

export default SignUpPage;
