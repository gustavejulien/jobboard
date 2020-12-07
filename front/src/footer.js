import React from 'react';
import './css/footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div>SC Projects 24 Rue Pasteur Krêmlin-Bicêtre contact: scprojects42@gmail.com ©{new Date().getFullYear()}</div>
            <a href="/Privacy">Privacy Policy</a>
        </footer>
        )
    }

    export default Footer