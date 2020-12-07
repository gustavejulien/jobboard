import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Navbar from './navbar'
import BehindNavbar from './behindNavbar'
import ListAds from './Ads/listAds';
import RegisterUser from './registerUser'
import Login from './login'
import Logout from './logout'
import Settings from './settings'
import Admin from './Admin/admin'
import History from './history'
import ListCompanyAds from './ListCompanyAds'
import Applications from './applications'
import Error404 from './error404'
import Footer from './footer'
import BehindFooter from './behindFooter'
import Privacy from './privacy'
import './css/App.css'
 
function App() {

  return (
    <BrowserRouter>
    <Navbar />
    <BehindNavbar />
    <Switch>
      <Route path="/registerUser" component={RegisterUser}/>
      <Route path="/login" component={Login}/>
      <Route path="/logout" component={Logout}/>
      <Route path="/settings" component={Settings}/>
      <Route path="/history" component={History}/>
      <Route path="/admin" component={Admin}/>
      <Route path="/ads" component={ListCompanyAds}/>
      <Route path="/applications" component={Applications}/>
      <Route path="/" exact component={ListAds}/>
      <Route path="/privacy" component={Privacy} />
      <Route path="/404" component={Error404} />
      <Redirect to="/404" />

    </Switch>
    <Footer/>
    <BehindFooter/>
    </BrowserRouter>
  )
}
 
export default App;
