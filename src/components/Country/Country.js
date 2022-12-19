import React,{useEffect ,useState} from 'react'
import axios from 'axios'
import RingLoader from "react-spinners/RingLoader";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./Country.css";
import Cookies from 'universal-cookie';
const cookies = new Cookies();


function Country() {
  const [allCountries, setAllCountries] = useState([]);
  const [userInfo, setUserInfo] = useState(
    (cookies.get("data")) || []
  );
const navigate =useNavigate();
  const handleAddRecord = async (record) => {
    console.log(userInfo);
    if(userInfo.id)
    axios
      .post("https://covid-19-production.up.railway.app/record", {
        country: record.Country,
        totalConfirmedCases: record.TotalConfirmed,
        totalDeathsCases: record.TotalDeaths,
        totalRecoveredCases: record.TotalRecovered,
        Date: record.Date,
        userId: userInfo.id,
      })
      .then((data) => {
        console.log(data.data);
       

      });
      else
      navigate("/signin",{redirect:"/country"})
  };

  useEffect(() => {
    axios
      .get("https://api.covid19api.com/summary")
      .then((data) => {
        setAllCountries(data.data.Countries);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

return (
  <div>
<br />
      <h1 style={{ textAlign: "center" }}> COVID-19 Statistics For All Countries</h1>
   
     {allCountries?.map((record, index) => (
         <CardGroup key={index} className="card">
         <Card  key={index} bg="success" text="white"  style={{margin:"10px"}}>
             <Card.Body>
               <Card.Title>Country: {record.Country}</Card.Title>
             </Card.Body>
             <Card.Body>
               <Card.Title>TotalConfirmed: {record.TotalConfirmed}</Card.Title>
             </Card.Body>
             <Card.Body>
               <Card.Title>TotalDeaths: {record.TotalDeaths}</Card.Title>
             </Card.Body>
             <Card.Body>
               <Card.Title>TotalRecovered: {record.TotalConfirmed}</Card.Title>
             </Card.Body>
             <Card.Body>
               <Card.Title>Date: {record.Date}</Card.Title>
             </Card.Body>
             <Link 
             to='/myRecord'
             className='text-indigo-500  hover:indigo-600  py-3 font-semibold'>
             <Button variant="primary" onClick={()=>handleAddRecord(record)}>Add To My Records
             </Button>
             </Link>
                        </Card>
         </CardGroup> 
     ))}

 
   
  </div>
)

}

export default Country;