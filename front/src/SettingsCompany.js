import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/App.css';

const SettingsCompany = ({userCompany}) => {
    const urlGetCompany = 'http://localhost:8000/getCompany';
    const urlUpdateCompany = 'http://localhost:8000/updateCompany';

    const [company, setCompany] = useState({});
    const [bool, setBool] = useState("loading");

    if (company !== null) {
        if(Object.keys(company).length !== 0 && bool === "loading"){
            setBool(true) 
        }    
    }

    useEffect(() => {
        const fetchCompany = async () => {
            const result = await axios.post(urlGetCompany, {_id : userCompany}, {withCredentials: true});
            setCompany(result.data.company);
        }
        fetchCompany();
        // eslint-disable-next-line
    }, []);
   
    const useRegistrationFormCompany = () => {
        const [inputsCompany, setInputsCompany] = useState({});
        
        if (bool === true){ 
            setInputsCompany(company)
            setBool(false)
        }
        
        const handleSubmitCompany = (event) => {
            if (event) {
                event.preventDefault()
            }
            else {
                console.log(inputsCompany);
                axios.post(urlUpdateCompany, inputsCompany, {withCredentials: true}).then((res) => {window.location.href = "/settings"}).catch(err => alert(err.message))
            }
        }
        
        const handleInputChangeCompany = (event) => {
            event.persist();
            setInputsCompany(inputsCompany => ({...inputsCompany, [event.target.name]:
                event.target.value}))
        }
            
        return {
            handleSubmitCompany,
            handleInputChangeCompany,
            inputsCompany
        }
    }

    let {inputsCompany, handleInputChangeCompany, handleSubmitCompany} = useRegistrationFormCompany()

    return(
        <div className="Setings-User">
                <div>
                <input type="text" name="name" placeholder="Name" onChange={handleInputChangeCompany} value={inputsCompany.name}></input>
                </div>
                <div>
                <input type="text" name="description" placeholder="Description" onChange={handleInputChangeCompany} value={inputsCompany.description}></input>
                </div>
                <div>
                <button type="submit" className="button-default" onClick={() => handleSubmitCompany()}>Update company</button>
                </div>
        </div>
        )
    }
    
    export default SettingsCompany;