import React, {useContext, useState } from "react";
import './App.css';
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Footer from "./components/Footer/Footer";
import Signup from "./components/LoginForm/Signup";
import Signin from "./components/LoginForm/Signin";
import Country from './components/Country/Country';
import Records from './components/Records/Records';
import { Route, Routes } from "react-router-dom";

function App() {
  // const [currentForm, setCurrentForm] = useState('login');

  // const toggleForm = (formName) => {
  //   setCurrentForm(formName);
  // }

  return (
    <div className="App">
      <Navbar/>
         {/* {currentForm === "login" ? <Signin onFormSwitch={toggleForm} /> 
       : <Signup onFormSwitch={toggleForm} />} */}
      <Routes>
      <Route  path="/" element={<Home/>} /> 
      <Route path="/allCountry" element={<Country/>}/>
      <Route  path="/signup" element={<Signup />} /> 
      <Route path="/signin" element={<Signin/>} />
      <Route path="/myRecord" element={<Records/>} />
      </Routes>
    <Footer/>
    </div>
  
  );
}

export default App;



