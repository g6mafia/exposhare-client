import './LoginPage.scss';
import Input from "../../components/Input/Input";
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from "../../utils";

function LoginPage() {
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post(`${ BASE_URL }/auth/login`, {
            email: e.target.email.value,
            password: e.target.password.value
        })
        .then((response) => {
            localStorage.setItem('token', response.data.token);
            setError('');
            navigate('/');
        })
        .catch((error) => {
            setError(error.response.data);
        });
    }

    return (
        <section className="login">
            <form className="login__form" onSubmit={handleSubmit}>
                <h1 className="login__title">Log in</h1>

                <Input type="text" name="email" label="Email" />
                <Input type="password" name="password" label="Password" />

                <button className="login__button">
                    Log in
                </button>

                {error && <div className="login__message">{error}</div>}
            </form>
            <p>
                Need an account? <Link to="/signup">Sign up</Link>
            </p>
        </section>
    );
}

export default LoginPage;
