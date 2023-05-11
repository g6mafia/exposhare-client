import "./SignUpPage.scss";
import { Link } from "react-router-dom";
import Input from "../../components/Input/Input";
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../../utils";

function SignUpPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${BASE_URL}/auth/signup`, {
        email: e.target.email.value,
        username: e.target.username.value,
        password: e.target.password.value,
        first_name: e.target.first_name.value,
        last_name: e.target.last_name.value,
        address: e.target.address.value,
      })
      .then(() => {
        setSuccess(true);
        setError("");
        e.target.reset();
      })
      .catch((error) => {
        setSuccess(false);
        setError(error.response.data);
      });
  };

  return (
    <section className="signup">
      <form className="signup__form" onSubmit={handleSubmit}>
        <h1 className="signup__title">Sign up</h1>

        <Input type="text" name="first_name" label="First name" />
        <Input type="text" name="last_name" label="Last name" />
        <Input type="text" name="username" label="Username" />
        <Input type="text" name="address" label="Address" />
        <Input type="text" name="email" label="Email" />
        <Input type="password" name="password" label="Password" />

        <button className="signup__button">Sign up</button>

        {success && <div className="signup__message">Signed up!</div>}
        {error && <div className="signup__message">{error.message}</div>}
      </form>
      <p>
        Have an account? <Link to="/login">Log in</Link>
      </p>
    </section>
  );
}

export default SignUpPage;
