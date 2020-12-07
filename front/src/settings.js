import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/App.css';
import SettingsCompany from './SettingsCompany';

const Settings = () => {
    const urlGetUser = 'http://localhost:8000/getSelfUser';
    const urlUpdateUser = 'http://localhost:8000/updateSelfUser';
    const urlDeleteUser = 'http://localhost:8000/deleteSelfUser';
    
    const [user, setUser] = useState([]);
    const [bool, setBool] = useState("loading");
    const [isRecruiter, setIsRecruiter] = useState(false);

    
    if(Object.keys(user).length !== 0 && bool === "loading"){
        setBool(true)
        if (user.status === 'recruiter') {
            setIsRecruiter(true);
        }
    }
    
    
    useEffect(() => {  
        const fetchData = async () => {
            const result = await axios.get(urlGetUser, {withCredentials: true});
            setUser(result.data);
        };
        fetchData();
    }, []);
    
    const useRegistrationForm = () => {
        const [inputs, setInputs] = useState({});
        
        if (bool === true){
            setInputs(user)
            setBool(false)
        }
        
        const handleSubmit = (event) => {
            if (event) {
                event.preventDefault()
            }
            if(inputs.newPassword !== inputs.confirmNewPassword){
                alert("passwords do not match");
            }
            else {
                axios.post(urlUpdateUser, inputs, {withCredentials: true}).then((res) => {window.location.href = "/settings"}).catch(err => alert(err.message))
            }
        }
        
        const handleInputChange = (event) => {
            event.persist();
            setInputs(inputs => ({...inputs, [event.target.name]:
                event.target.value}))
            }

        const handleDelete = (event) => {
            if (event) {
                event.preventDefault()
            }
            axios.post(urlDeleteUser, inputs, {withCredentials: true}).then((res) => {window.location.href = "/logout"}).catch(err => alert("wrong password"))
        }
            
            return {
                handleSubmit,
                handleInputChange,
                handleDelete,
                inputs
            }
            
        }

        let {inputs, handleInputChange, handleSubmit, handleDelete} = useRegistrationForm()

        return (
            <div className="setings">
                <div className="Settings-User">
                    <form onSubmit={handleSubmit}>
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
                    <input type="password" name="newPassword" placeholder="New password" onChange={handleInputChange} value={inputs.password}></input>
                    </div>
                    <div>
                    <input type="password" name="confirmNewPassword" placeholder="Confirm password" onChange={handleInputChange} value={inputs.confirmPassword}></input>
                    </div>
                    <br></br>
                    <input type="password" name="oldPassword" placeholder="Current password" required onChange={handleInputChange} value={inputs.oldPassword}></input>
                    <div>
                    <button type="submit" className="button-default" onSubmit={handleSubmit}>Update profile</button>
                    </div>
                    <div>
                    <button type="submit" className="button-default" onClick={handleDelete}>Delete profile</button>
                    </div>
                    </form>
                </div>

                {isRecruiter && (
                    <SettingsCompany 
                        userCompany={user.company}
                    />
                )}
            </div>
            );
        }
        
        export default Settings;