import { apiLink } from "../api-inks";
import { useEffect, useState } from "react";
import "./Information.css";
import styled from "styled-components";

interface apiProps {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
function Information() {
  const [apiData, setApiData] = useState<apiProps[]>();
  const [highlightCol, sethighlightCol] = useState<string>("");

  useEffect(() => {
    fetchDataApi();
  }, []);

  // fetching the API data using async-await
  const fetchDataApi = async () => {
    try {
      const response = await fetch(apiLink);
      const data = await response.json();
      setApiData(data);
      console.log("Data are:", data);
    } catch (error) {
      console.error("Something went wrong, pleas try again", error);
    }
  };

  const columns = ["ID", "Name", "E-mail", "Description"];

  return (
    <InformationWrapper id="information">
      {apiData && apiData.length > 0 && <h2>Information</h2>}
      <section>
        <div id="filters">
          <label htmlFor="filters">Filters</label>
          <select
            name="filters"
            value={highlightCol}
            onChange={(e) => sethighlightCol(e.target.value)}
            style={{ marginBottom: "10px" }}
          >
            <option value="">Colums</option>
            {columns.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>E-mail</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {apiData &&
              apiData.map((info, index) => (
                <tr key={index}>
                  <td
                    className="table-cell"
                    style={{
                      backgroundColor:
                        highlightCol === "ID" ? "#ffe3be" : "#faebd7",
                    }}
                  >
                    {info.id}
                  </td>
                  <td
                    className="table-cell"
                    style={{
                      backgroundColor:
                        highlightCol === "Name" ? "#ffe3be" : "#faebd7",
                    }}
                  >
                    {info.name}
                  </td>
                  <td
                    className="table-cell"
                    style={{
                      backgroundColor:
                        highlightCol === "E-mail" ? "#ffe3be" : "#faebd7",
                    }}
                  >
                    {info.email}
                  </td>
                  <td
                    className="table-cell"
                    style={{
                      backgroundColor:
                        highlightCol === "Description" ? "#ffe3be" : "#faebd7",
                    }}
                  >
                    {info.body}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>{" "}
    </InformationWrapper>
  );
}

const InformationWrapper = styled.div``;

export default Information;
