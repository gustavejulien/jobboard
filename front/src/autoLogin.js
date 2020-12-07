import axios from 'axios';

const autoLogin = (email, password, ) => {
    const url = 'http://localhost:8000/login';
    const body = {email: email, password: password}
    console.log("autologin"+body)
    axios.post(url, body, {withCredentials: true}).then((res) => {window.location.href = "/"}).catch(err => console.log(err))
};

export default autoLogin;