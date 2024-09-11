import React, { useState } from "react";
import Axios from "axios";

//css
import "../../assets/css/UserLogin.css";

const UserLogin = () => {
  const [userUserName, setuserUserName] = useState("");
  const [userPassword, setuserPassword] = useState("");

const userLoginCheck = () => {
  Axios.post("https://cic6163ew5.execute-api.ap-northeast-2.amazonaws.com/test/login/usr", {
    userUserName: userUserName,
    userPassword: userPassword,
  })
  .then((response) => {
    if (response.data.message) {
      alert("WELCOME!");
      window.location = "/login/usr/dash";
    } else {
      alert(response.data.message || "로그인 실패");
    }
  })
  .catch((error) => {
    console.error("로그인 실패:", error);
    alert("로그인 중 오류가 발생했습니다.");
  });
};

  return (
    <div className="user-login">
      <h2>USER LOGIN</h2>
      <form>
        <input
          name="username"
          type="text "
          placeholder="username"
          onChange={(e) => {
            setuserUserName(e.target.value);
          }}
          required
        />
        <input
          name="password"
          type="text "
          placeholder="password"
          onChange={(e) => {
            setuserPassword(e.target.value);
          }}
          required
        />
        <button onClick={userLoginCheck}>Submit</button>
      </form>
    </div>
  );
};

export default UserLogin;
