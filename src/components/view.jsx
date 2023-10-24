import React, { useState, useEffect } from 'react'
import { BASE_URL } from '../urls/baseUrl';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

const SeeOne = () => {

  const [user, setUser] = useState({
    id: " ",
    title: "",
    description: "",
    tags: "",
  });
  const { id } = useParams();
  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = async () => {
    const result = await axios.get(BASE_URL + `/get/${id}`);
    setUser(result.data);
    console.log("something wrong")
    setUser(result.data);
  };



  return (

    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%" }}>
        <div
          style={{
            border: "3px solid #ccc",
            borderRadius: "8px",
            padding: "16px",
            marginTop: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "10px" }}>POST DETAILS</h2>
          <div className="card">
            <div className="card-header">
              <div style={{ maxWidth: "100%", backgroundColor: "black" }}>
                <video poster="https://play-lh.googleusercontent.com/oB12-6RptJzx0x4fwhQr7CvhlTUSTdU2T9nczVHA9tIqzoOqayWz8mYM74ywoUYjIEo=w240-h480-rw" controls width="600" height="300">
                  <source
                    src={BASE_URL + "/play/" + id}
                    type="video/mp4"
                    alt=""
                  />
                </video>
              </div>
              <p className='mt-3'>Details of Video ID : {user.id}</p>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Title: </b>
                  {user.title}
                </li>
                <li className="list-group-item">
                  <b>Description: </b>
                  {user.description}
                </li>
                <li className="list-group-item">
                  <b>Tags: </b>
                  {user.tags}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}

export default SeeOne;