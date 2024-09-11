import React, { useState, useEffect } from "react";
import Axios from "axios";
//css
import '../../assets/css/UpdateHealth.css'

const UpdateHealth = () => {
  var [userId, setuserId] = useState("");
  const [searchList, setsearchList] = useState([]);
  const [userVitals, setuserVitals] = useState("");
  const [userHeight, setuserHeight] = useState("");
  const [userWeight, setuserWeight] = useState("");
  const [userStatus, setuserStatus] = useState("");

  //search for blood
const fetchUserData = async (userId) => {
    try {
      const response = await Axios.post("https://cic6163ew5.execute-api.ap-northeast-2.amazonaws.com/test/login/emp/uh", {
        userId: userId,
      });
      setsearchList(response.data);
    } catch (error) {
      console.error("사용자 정보 조회 실패:", error);
      // 사용자에게 오류 알림 처리
    }
  };

  useEffect(() => {
    // userId가 변경되면 데이터 fetch
    if (userId) {
      fetchUserData(userId);
    }
  }, [userId]); // useEffect 의존 관계: userId

  // update user data
  const updateUserData = async (userId) => {
    try {
      await Axios.put("https://cic6163ew5.execute-api.ap-northeast-2.amazonaws.com/test/login/emp/uh", {
        user_id: userId,
        userVitals: userVitals,
        userHeight: userHeight,
        userWeight: userWeight,
        userStatus: userStatus,
      });
      // 업데이트 성공 알림 처리 (선택적)
    } catch (error) {
      console.error("사용자 정보 업데이트 실패:", error);
      // 사용자에게 오류 알림 처리
    }
  };

  //returning
  return (
    <div className="search">
      {" "}
      <form>
        <input
          type="text"
          placeholder="USER ID"
          name="userId"
          onChange={(e) => {
            setuserId(e.target.value);
          }}
          required
        />
      </form>
      <table className="blood-table">
        <thead>
          <tr>
            <th>NAME</th>
            <th>PHONE </th>
            <th>PLACE</th>
            <th>BLOODGROUP</th>
          </tr>
        </thead>
        <tbody>
          {searchList.map((val) => {
            return (
              <tr key={val.user_id}>
                <td>{val.userFName}</td>
                <td>{val.userPhone}</td>
                <td>{val.userPlace}</td>
                <td>{val.userBloodGroup}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <form className="updatehealth">
        <input
          type="text"
          placeholder="VITALS"
          onChange={(e) => {
            setuserVitals(e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="HEIGHT"
          onChange={(e) => {
            setuserHeight(e.target.value);
          }}
        />{" "}
        <input
          type="number"
          placeholder="WEIGHT"
          onChange={(e) => {
            setuserWeight(e.target.value);
          }}
        />{" "}
        <input
          type="text"
          placeholder="DONAR STATUS"
          onChange={(e) => {
            setuserStatus(e.target.value);
          }}
        />
        <button onClick={() => updateUserData(userId)}>UPDATE</button>
      </form>
    </div>
  );
};
export default UpdateHealth;
