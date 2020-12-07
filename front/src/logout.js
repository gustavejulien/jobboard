import axios from 'axios';

const Logout = () => {
    const url = 'http://localhost:8000/logout';
    
    axios.get(url, {withCredentials: true}).then((res) => {window.location.href = "/"}).catch(err => console.log(err))

}

export default Logout