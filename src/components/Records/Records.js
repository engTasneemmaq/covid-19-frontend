import "./Records.css";
import axios from "axios";
import {  useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function Records() {
  const [records, setRecords] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [userInfo, setUserInfo] = useState(
    (cookies.get("data")) || []
  );
  const navigate =useNavigate();
console.log(userInfo.user);


  const getdata = () => {
    axios.get(`https://covid-19-production.up.railway.app/record/${userInfo.user.id}`).then((data) => {
     
      setRecords(data.data);
    });
  };

  const handleDelete = async (record) => {
    console.log("userinfo>>>>> ", userInfo.user.length);

    axios.delete(`https://covid-19-production.up.railway.app/${record.id}`).then((data) => {
      setIsDeleted(!isDeleted);
  
    });
  };

  const handleRedirect=()=>{
    navigate("/signin")

  }
  useEffect(() => {
    if (userInfo.user.id) getdata();
  }, []);

  
  useEffect(() => {
    if (userInfo.user.id) getdata();
  }, [isDeleted]);



  return (
    <>
    <section>
      <div className="d-flex flex-column mt-5">
        <title>Records</title>
        <br />
      <h2
        style={{ textAlign: "center" }}>
        COVID-19 Statistics
      </h2>
      <h3 
        style={{ textAlign: "center" }}
        >A website to provide you with all the updates on covid-19 statistics around the world</h3>

      <br />
      <ToastContainer />

        <h2 className="mt-3" style={{ textAlign: "center" }}>Your Records</h2>
        {userInfo.user.id ? (
          <div class="row row-cols-1 row-cols-md-2 row-cols-xl-4 justify-content-between mt-5">
          {records?.map((element) => (
            <div class="col">
              <div
                class="card radius-10 border-start border-0 border-3 border-dangerous"
                key={element.id}
              >
                <div class="card-body">
                  <div class="d-flex align-items-center">
                    <div>
                      <h5 class="mb-1  font-weight-bold ">
                      Country:{" "}
                  {element.country.slice(0, element.country.indexOf(" "))}{" "}
                      </h5>
                      <h7 class="my-1 text-warning">
                        <strong>Date: {element.Date}</strong>
                      </h7>
                    </div>
                  </div>
                  <div class="form-group  d-flex justify-content-center mr-3">
                    <button
                      id="delete-btn"
                      onClick={() => {
                        handleDelete(element);
                      }}
                    >
                      {" "}
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))} <div className="mx-5 my-5">
          <h5 style={{ textAlign: "center" }}>
         No Available Records 😔
          </h5>
        </div>
        </div>
      ) : (
        <div className="mx-5 my-5">
   
          <h5>
            You shoud signin <Link  to="/signin">click here</Link>
          </h5>
        </div>
      )}
    </div>
      </section>
    </>
  );
}