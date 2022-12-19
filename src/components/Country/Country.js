import React,{useEffect ,useState} from 'react'
import axios from 'axios'
import RingLoader from "react-spinners/RingLoader";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Country() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate= useNavigate();
  const [userInfo, setUserInfo] = useState(
    JSON.parse(sessionStorage.getItem("userInfo")) || []
  );
  

  const recordsFetch = () => {
    axios
          .get('https://api.covid19api.com/summary')
          .then((res) => {
            console.log(res.data.Countries);
            setData(res.data.Countries);
       
          }).catch((err) => {
            console.log(err);
          });
        };
        
        useEffect(() => {
          recordsFetch();
        }, []);


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

return (
  <div>
<br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <RingLoader size={50} color={"green"} loading={loading} />
      </div>
      <h1 style={{ textAlign: "center" }}> COVID-19 Statistics For All Countries</h1>
   
     {data.map((record, index) => (
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