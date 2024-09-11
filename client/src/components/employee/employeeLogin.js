import React, { useState } from "react";
import Axios from "axios";
//css
import "../../assets/css/EmployeeLogin.css";

const EmployeeLogin = () => {
  const [empUserName, setempUsername] = useState("");
  const [empPassword, setempPassword] = useState("");

  //onclick function
const empLoginCheck = async () => {
  try {
    const response = await Axios.post("https://cic6163ew5.execute-api.ap-northeast-2.amazonaws.com/test/login/emp", {
      empUserName: empUserName,
      empPassword: empPassword,
    });
    if (response.data.message) {
      alert(response.data.message);
    } else {
      alert("WELCOME!");
      window.location = "/login/emp/dash";
    }
  } catch (error) {
    console.error("직원 로그인 실패:", error);
    alert("로그인 중 오류가 발생했습니다.");
  }
};

  return (
    <div className="emp-login">
      <h2>EMPLOYEE LOGIN</h2>
      <form>
        <input
          name="username"
          type="text "
          placeholder="username"
          onChange={(e) => {
            setempUsername(e.target.value);
          }}
        />
        <input
          name="password"
          type="text "
          placeholder="password"
          onChange={(e) => {
            setempPassword(e.target.value);
          }}
        />
        <button onClick={empLoginCheck}>
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default EmployeeLogin;
