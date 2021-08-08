import React, { useState, useEffect } from "react";
import axios from "axios";
import { Td, Table } from "./adminTable.style";

export const AdminTable: React.FC = (props) => {
  const [dumps, setDumps] = useState([]);
  const [titles, setTitles] = useState([]);
  useEffect(() => {
    axios.get("/api/dumpsAdmin.php").then((res) => {
      setDumps(res.data);
      setTitles(Object.keys(res.data[0]).map((item) => item));
    });
  }, []);
  console.log(dumps)
  return (
    <Table>
      <tr>
        {titles.map((item, index) => (
          <Td key={index}>{item}</Td>
        ))}
      </tr>
      {dumps.map((item, index) => {
        return (
          <tr key={index}>
            {Object.entries(item).map(([key, value], i) => {
              switch (key) {
                case "phone":
                  let phone: any = value;
                  return (
                    <Td key={i}>
                      <a href={`tel:${phone}`}>
                        {phone.slice(1, phone.length)}
                      </a>
                    </Td>
                  );
                case "images":
                  let images: any = value;
                  return (
                    <Td key={i}>
                      {images.split(";").map((image: string, i: number) => (
                        <React.Fragment key={i}>
                          <a target="_blank" href={`${image}`}>
                            {image}
                          </a>
                          <br />
                        </React.Fragment>
                      ))}
                    </Td>
                  );
                case "email":
                  let email: any = value;
                  return (
                    <Td key={i}>
                      <a href={`mailto:${email}`}>{email}</a>
                    </Td>
                  );
                default:
                  return <Td>{value}</Td>;
              }
            })}
          </tr>
        );
      })}
    </Table>
  );
};
