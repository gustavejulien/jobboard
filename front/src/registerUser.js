import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/App.css';
import autoLogin from './autoLogin';
import Dropdown from './Dropdown';
import ModalApply from "./ModalApply";
import useModal from './useModal';
import useCookie from './useCookie';

const RegisterUser = () => {
    const urlCreateUser = 'http://localhost:8000/createUser';
    const urlGetCompany = 'http://localhost:8000/getAllCompanies';
    
    const [listCompany, setListCompany] = useState({companies : []});
    const [isUser, setIsUser] = useState(true);
    const [value, setValue] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const {isShowing, toggle} = useModal();
    const text = 'Select a company...';
    
    const statusRegistered = (event) => {
        if (event.target.value === "user"){
            setIsUser(true); 
        } else {
            setIsUser(false);   
        }
        
    }
    
    useEffect(() => {  
        const fetchData = async () => {
            const result = await axios(urlGetCompany);
            setListCompany(result.data);
        };
        fetchData();
    }, []);
    
    useEffect(() => {  
        const fetchData = async () => {
            const result = await axios(urlGetCompany);
            setListCompany(result.data);
        };
        fetchData();
        setRefresh(false);
    }, [refresh]);
    
    const useRegistrationForm = () => {
        const [inputs, setInputs] = useState({});
        const [cookie] = useState(useCookie("status"))
        
        const handleSubmit = (event) => {
            if (event) {
                event.preventDefault();
            }
            if(inputs.password !== inputs.confirmPassword){
                alert("passwords do not match");
            }
            else {
                if(isUser) {
                    inputs.status="user";
                } else {
                    inputs.status="recruiter";
                    inputs.company=value._id;
                }
                axios.post(urlCreateUser, inputs, {withCredentials: true})
                .then((res) => {
                    if(cookie[0]!=="admin"){
                        autoLogin(inputs.email, inputs.password);
                    } else {
                        alert("New user registered")
                    }
                    console.log(cookie)
                })
                .catch(err => {alert("email already used.")})
            }
        }
        
        const handleInputChange = (event) => {
            event.persist();
            setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}))
        }
        return {
            handleSubmit,
            handleInputChange,
            inputs
        }
    }
    
    const {inputs, handleInputChange, handleSubmit} = useRegistrationForm()
    return (
        <div className="Register-User">
        <form onSubmit={handleSubmit}>
        <div>
        <input type="radio" id="user" name="status" value="user" onChange={statusRegistered}></input>
        <label for ="user">User</label>
        <input type="radio" id="recruiter" name="status" value="recruiter" onChange={statusRegistered}></input>
        <label for ="recruiter">recruiter</label>
        </div>
        <div>
        <input type="text" name="firstName" placeholder="First Name" onChange={handleInputChange} value={inputs.firstName}></input>
        </div>
        <div>
        <input type="text" name="lastName" placeholder="Last Name" onChange={handleInputChange} value={inputs.lastName}></input>
        </div>
        <div>
        <input type="email" name="email" placeholder="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required  onChange={handleInputChange} value={inputs.email}></input>
        </div>
        <div>
        <input type="password" name="password" placeholder="Password" required onChange={handleInputChange} value={inputs.password}></input>
        </div>
        <div>
        <input type="password" name="confirmPassword" placeholder="Confirm password" required onChange={handleInputChange} value={inputs.confirmPassword}></input>
        </div>
        <div>
        {!isUser && (
            <div>
            <Dropdown 
            options = {listCompany}
            name = 'companies'
            id = '_id'
            label = 'name'
            prompt = {text}
            value = {value}
            onChange = {val => setValue(val)}
            />
            <div className="button-default" onClick={toggle}>Create company</div>
            <ModalApply
            label='Company'
            isShowing={isShowing}
            hide={toggle}
            setRefresh={setRefresh}
            />
            </div>
            )}
            <button type="submit" className="button-default" onSubmit={handleSubmit}>Sign up</button>
            </div>
            </form>
            </div>
            );
        }
        
        export default RegisterUser;