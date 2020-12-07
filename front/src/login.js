import React, { useState } from 'react';
import axios from 'axios';
import './css/App.css';

const Login = () => {
    const url = 'http://localhost:8000/login';

    const useLoginForm = () => {
        const [inputs, setInputs] = useState({});
        
        const handleSubmit = (event) => {
            if (event) {
                event.preventDefault()
            }
            axios.post(url, inputs, {withCredentials: true})
            .then((res) => {window.location.href = "/"})
            .catch(err => alert("email or password incorrect"))
        }
        
        const handleInputChange = (event) => {
            event.persist();
            setInputs(inputs => ({...inputs, [event.target.name]:
                event.target.value}))
            }
            return {
                handleSubmit,
                handleInputChange,
                inputs
            }
        }

        const {inputs, handleInputChange, handleSubmit} = useLoginForm()
        
        return (
            <div className="Login">
            <form onSubmit={handleSubmit}>
            <div>
            <input type="email" name="email" placeholder="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required  onChange={handleInputChange} value={inputs.email}></input>
            </div>
            <div>
            <input type="password" name="password" placeholder="Password" required onChange={handleInputChange} value={inputs.password}></input>
            </div>
            <div>
            <button className="button-default" type="submit" onSubmit={handleSubmit}>Sign up</button>
            </div>
            </form>
            </div>
            );
}

export default Login