import React,{useEffect, useState} from "react";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Form from "react-bootstrap/Form";
import Columns from "react-columns";
import NumberFormat from "react-number-format";
import RingLoader from "react-spinners/RingLoader";


function Home() {
  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const [searchCountries, setSearchCountries] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .all([
        axios.get("https://api.covid19api.com/world/total"),
        axios.get("https://api.covid19api.com/country/south-africa/status/confirmed?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z"),

      ])
      .then((responseArr) => {
        setLatest(responseArr[0].data);
        setResults(responseArr[1].data);
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const filterCountries = results.filter((item) => {
    return searchCountries !== ""
      ? item.country.toLowerCase().includes(searchCountries.toLowerCase())
      : item;
  });

  const countries = filterCountries.map((data, i) => {
    return (
      <Card bg="dark" text="white" className="text-center" style={{margin:"10px"}}
        key={i}
      >
      <Card.Body >
          <Card.Title>{data.country}</Card.Title>
          <Card.Text>CountryCode{data.CountryCode}</Card.Text>
          <Card.Text>Lat {data.Lat}</Card.Text>
          <Card.Text>Lon {data.Lon}</Card.Text>
          <Card.Text>Cases {data.Cases}</Card.Text>
          <Card.Text>Status {data.Status}</Card.Text>
          <Card.Text>Date {data.Date}</Card.Text>
        </Card.Body>
      </Card>
    );
  });

  var queries = [
    {
      columns: 2,
      query: "min-width: 500px",
    },
    {
      columns: 3,
      query: "min-width: 1000px",
    },
  ];

  return (
    <div>
     <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <RingLoader size={50} color={"green"} loading={loading} />
      </div>
      <h2
        style={{ textAlign: "center" }}>
        COVID-19 Statistics
      </h2>
      <h3 
        style={{ textAlign: "center" }}
        >A website to provide you with all the updates on covid-19 statistics around the world</h3>

      <br />
      <CardGroup>
      <Card bg="secondary" text="white" className="text-center" style={{margin:"10px"}}>
          <Card.Body>
            <Card.Title>TotalConfirmed</Card.Title>
            {/* <Card.Text>{latest.cases}</Card.Text> */}
            <NumberFormat
              value={latest.TotalConfirmed}
              displayType={"text"}
              thousandSeparator={true}
              style={{ fontSize: "30px" }}
            />
          </Card.Body>
        </Card>
        <Card
          bg="danger"
          text={"white"}
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>TotalDeaths</Card.Title>
            <Card.Text>
              {" "}
              <NumberFormat
                value={latest.TotalDeaths}
                displayType={"text"}
                thousandSeparator={true}
                style={{ fontSize: "30px" }}
              />
            </Card.Text>
          </Card.Body>
        </Card>
        <Card
          bg="success"
          text={"white"}
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>TotalRecovered</Card.Title>
            <Card.Text>
              {" "}
              <NumberFormat
                value={latest.TotalRecovered}
                displayType={"text"}
                thousandSeparator={true}
                style={{ fontSize: "30px" }}
              />
            </Card.Text>
          </Card.Body>
        </Card>
      </CardGroup>
      <br />
      
      <Form>
      <h2 style={{ textAlign: "center" }}>
          Get Statistics for a specific country
      </h2>
        <br/>
        <Form.Group controlId="formGroupSearch" style={{  justifyContent: "center" , width:"800px"}} className="d-flex justify-content-center mr-auto p-2"  >
          <Form.Control
            bg="dark"
            type="text" 
            placeholder="Specific country"  />
            <Form.Control
            bg="dark"
            type="text"
            placeholder="Date Start"  />
            <Form.Control
            bg="dark"
            type="text"
            placeholder="Date End"  />
        </Form.Group>
                <Button 
                variant="primary" type="submit"  onChange={(e) => setSearchCountries(e.target.value)}>
                Search
              </Button>
      </Form>
      <Columns queries={queries}>{countries}</Columns>
    </div>
  );
}

export default Home;


