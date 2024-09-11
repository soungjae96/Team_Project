import Axios from "axios";
import React, { useState, useEffect } from "react";

//css
import "../../assets/css/UpdateStock.css";

const UpdateStock = () => {
  //variables
  const [unitUpdate, setunitUpdate] = useState(0);
  //array of blood unit availbility
  const [bloodTable, setbloodTable] = useState([]);

  //useEffect call
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("https://cic6163ew5.execute-api.ap-northeast-2.amazonaws.com/test/login/emp/ub");
        setbloodTable(response.data);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
        // 사용자에게 오류 알림 처리
      }
    };

    fetchData();
  }, []); // useEffect 의존 관계 배열 비우기 (데이터는 처음 로딩 시 한 번만)

  // updateBloodStock function
  const ubStock = async (b_id) => {
    try {
      await Axios.put("https://cic6163ew5.execute-api.ap-northeast-2.amazonaws.com/test/login/emp/ub/update", {
        b_id: b_id,
        unitUpdate: unitUpdate,
      });
      setunitUpdate(0); // 업데이트 후 unitUpdate 초기화
    } catch (error) {
      console.error("재고 업데이트 실패:", error);
      // 사용자에게 오류 알림 처리
    }
  };
  return (
    <div className="dashboard">
      <h1>UPDATE BLOOD STOCK</h1>

      <table className="update-blood-table">
        <thead>
          <tr>
            <th>Blood Group</th>
            <th>Unit </th>
          </tr>
        </thead>
        <tbody>
          {bloodTable.map((val) => {
            return (
              <tr key={val.b_id}>
                <td>{val.blood_group}</td>
                <td>{val.unit}</td>
                <input
                  type="number"
                  onChange={(e) => {
                    setunitUpdate(e.target.value);
                  }}
                />
                <button onClick={() => ubStock(val.b_id)}>UPDATE</button>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default UpdateStock;
