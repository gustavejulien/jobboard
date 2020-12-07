import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { createPortal } from 'react-dom';

const ContentCreateAd = ({modalDisplay, id_comp}) => {
    const urlCreateAd = 'http://localhost:8000/createAd';
    const urlGetCompany = 'http://localhost:8000/getCompany';

    const[companyName, setCompanyName] = useState("");

    const displayModal = () => {
      modalDisplay();
    }

    useEffect(() => {
        const fetchCompanyName = async() => {
            const result = await axios.post(urlGetCompany, {_id : id_comp}, {withCredentials: true});
            setCompanyName(result.data.company.name);
        }
        fetchCompanyName();
    }, [])

    const useRegistrationForm = () => {
      const [inputs, setInputs] = useState({});

      const handleSubmit = async(event) => {
        if (event) {
          event.preventDefault()
        }
        else {await new Promise (() => {
          axios.post(urlCreateAd, inputs)
               .then((res) => {alert(res.data.message)
                               window.location.href = "/ads"})
               .catch(err => console.log(err.response.data.error));
        console.log(inputs);
        })}
        displayModal();
      }
      
      const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs =>({...inputs, "id_company": id_comp, "company": companyName}));
        setInputs(inputs => ({...inputs, [event.target.name]:
          event.target.value}))
        }
        return {
          handleSubmit,
          handleInputChange,
          inputs
        } 
      }

     
      const {inputs, handleInputChange, handleSubmit} = useRegistrationForm();
      return(
        <div className="form-create-ad">
           <div>
          <input type="text" name="title" placeholder="Title" onChange={handleInputChange} required value={inputs.title}></input>
          </div>      
          <div>
          <input type="textarea" name="description" placeholder="Description" required onChange={handleInputChange} value={inputs.description}></input>
          </div>
          <div>
          <button type="submit" className="button-default" onClick={() => handleSubmit()}>Create ad</button>
          </div>
        </div>
        );
}

export default ContentCreateAd;