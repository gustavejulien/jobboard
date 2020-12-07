import React, {useState} from 'react';
import axios from 'axios';

const ContentCreateCompany = ({modalDisplay, setRefresh}) => {
  const url = 'http://localhost:8000/createCompany';

    const displayModal = () => {
      modalDisplay();
    }

    const useRegistrationForm = () => {
      const [inputs, setInputs] = useState({});
      
      const handleSubmit = async(event) => {
        if (event) {
          event.preventDefault()
        }
        if (await new Promise ((resolve, reject) => {
          axios.post(url, inputs).then((res) => {
            resolve(res)
            alert(res.data.message)}).catch(err => console.log(err.response.data.error));
        })) {
          setRefresh(true)
        }
        displayModal();
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
      
      const {inputs, handleInputChange, handleSubmit} = useRegistrationForm();
      return(
        <div className="form-create-company">
           <div>
          <input type="text" name="name" placeholder="Name" onChange={handleInputChange} required value={inputs.name}></input>
          </div>      
          <div>
          <input type="textarea" name="description" placeholder="Description" required onChange={handleInputChange} value={inputs.description}></input>
          </div>
          <div>
          <button className="button-default" type="submit" onClick={() => handleSubmit()}>Create company</button>
          </div>
        </div>
        );
}

export default ContentCreateCompany;
        