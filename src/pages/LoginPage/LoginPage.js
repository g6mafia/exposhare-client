import './LoginPage.scss';
import Input from "../../components/Input/Input";
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from "../../utils";

function LoginPage({ handleChange }) {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const username = e.target.username.value;
        const password = e.target.password.value;

        axios.post(`${ BASE_URL }/users/login`, {
            username,
            password,
        })
        .then((response) => {
            localStorage.setItem('token', response.data.token);
            setSuccess(true);
            setError('');
            handleChange(true);
            setTimeout(() => {
                navigate('/');
              }, 1000);
        })
        .catch((error) => {
            setError(error.response.data);
        });
    }

    return (
        <div className='login-container'>
        <section className="login">
            <form className="login__form" onSubmit={handleSubmit}>
                <h1 className="login__title">Log in</h1>

                <Input type="text" name="username" label="Username" />
                <Input type="password" name="password" label="Password" />

                <button className="login__button">
                    Log in
                </button>
                {success && <div className="login__success-message">Successfully logged in!</div>}
                {error && <div className="login__error-message">{error.message}</div>}
            </form>
            <p className='login__text'>
                Need an account? <Link to="/signup">Sign Up Here</Link>
            </p>
        </section>
        </div>
    );
}

export default LoginPage;
