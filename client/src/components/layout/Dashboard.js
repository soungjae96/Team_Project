import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./Footer";

//css
import "../../assets/css/Dashboard.css";

//background image
//import bfImg from '../../assets/img/bg.png'

const Dashboard = () => {
  //array of blood unit availbility
  const [bloodTable, setbloodTable] = useState([]);

  //useEffect call
  useEffect(() => {
    axios.get('https://cic6163ew5.execute-api.ap-northeast-2.amazonaws.com/test/home')
      .then(response => {
        setbloodTable(response.data);
      })
      .catch(error => {
        console.error('데이터 가져오기 실패:', error);
      });
  }, []);

  return (
    <div className="dashboard">
      <h1>BLOOD STOCK</h1>

      <table className="blood-table">
        <thead>
          <tr>
            <th>BLOOD GROUP</th>
            <th>UNIT</th>
          </tr>
        </thead>
        <tbody>
          {bloodTable.length > 0 && bloodTable.map((val) => {
            return (
              <tr key={val.b_id}>
                <td>{val.blood_group}</td>
                <td>{val.unit}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <img src={bfImg} alt="bg"/>*/}
      <Footer />
    </div>
  );
};

export default Dashboard;
