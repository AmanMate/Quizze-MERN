import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "../../components/Navbar";
import "./Analytics.css";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const email = useState("")
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get(`http://127.0.0.1:4000/analytics/getAllQuiz?user_email=${email}`);
              console.log(response.data)
              setData(response.data);
          } catch (error) {
            setError(error);
          } finally {
            setLoading(false);
        }
      };
      if(email){
            fetchData();
          }
        }, [email]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  const handleDelete = (id) => {
    // code to handle delete action
    console.log(`Delete quiz with id ${id}`);
  }
  
  const handleShare = (id) => {
    // code to handle share action
    console.log(`Share quiz with id ${id}`);
  }

  return (
    <div>
      <Navbar></Navbar>
      <div class="page">
        <h2 class="head">Quiz Analytics</h2>
        <table class="table">
          <thead class="bar">
            <tr>
              <th>S.No</th>
              <th>Quiz Name</th>
              <th>Created On</th>
              <th>Imprresions</th>
              <th>Action</th>
              <th>Question wise Analysis Link</th>
            </tr>
          </thead>
          <tbody class="dataBar">
            {data && data.map((data, index) => (
              <tr key={index} style={{background: index % 2 == 0 ? '#fff' : '#B3C4FF'}}>
                <td>{index + 1}</td>
                <td>{data.quiz_name}</td>
                <td>{data.created_date}</td>
                <td>{data.impression_count}</td>
                <td>
                  <Link to={`/edit-quiz/${data.id}`}>
                    <button class="uil--edit">Edit</button>
                  </Link>
                  <button class="uil--trash-alt" onClick={() => handleDelete(data.id)}>Delete</button>
                  <button class="uil--share-alt" onClick={() => handleShare(data.id)}>Share</button>
                </td>
                <td>
                  <Link to="/questionwiseanalysis">Link</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Analytics() {
  return <Dashboard />;
}