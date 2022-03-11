import React, { useState, useEffect, useMemo } from "react";

import Table from "./Table";
import "./App.css";
import axios from "axios";

function App() {
  // data state to store customers. Its initial value is an empty array
  const [data, setData] = useState([]);
  const [countryData, setCountryData] = useState("");
  const [stateData, setStateData] = useState("");

  const columns = useMemo(
    () => [
      {
        Header: "Customer's Phone Numbers Validation App",
        columns: [
          {
            Header: "ID",
            accessor: "id"
          },
          {
            Header: "Name",
            accessor: "name"
          },
          {
            Header: "Phone Number",
            accessor: "phone"
          },
          {
            Header: "Country Name",
            accessor: "country.countryName"
          },
          {
            Header: "Country Code",
            accessor: "country.countryCode"
          },
          {
            Header: "Status",
            accessor: "status"
          }
        ]
      }
    ],
    []
  );
  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    requestCustomers();
  }, [countryData | stateData]);

  async function requestCustomers() {
    var result = {};
    if (countryData)
      result = await axios(`http://localhost:8080/findByCounterAndState/${countryData}/${stateData}`);
    else
      result = await axios(`http://localhost:8080/findByCounterAndState`);

    if (result.data.customers)
      setData(result.data.customers);
    else
      setData([]);
  }

  return (
    <div className="App" align="center">
      <form>
        <input
          value={countryData}
          maxLength="3"
          className="input"
          onChange={e => {
            e.preventDefault();
            setCountryData(e.target.value);
            // requestCustomers();
          }}
          placeholder={"Country code"}
        />
        <input
          value={stateData}
          className="input"
          onChange={e => {
            e.preventDefault();
            setStateData(e.target.value);
            requestCustomers();
          }}
          placeholder={"State code"}
        />
      </form>
      <Table columns={columns} data={data} />
    </div>
  );
}

export default App;