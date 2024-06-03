import "./Dashboard.css";
import Navbar from "../../components/Navbar";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const email = useState("")
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/dashboard/getDetails?user_email=${email}`);
        console.log(response.data);
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

  return (
    <div>
      <Navbar />
      <div className="page inline">
        <div className="highligths">
          <div className="inline quiz">
            <h2>
              <span id="spanId">{data.quizCreated}</span>Quiz Created
            </h2>
          </div>
          <div className="inline ques">
            <h2>
              <span>{data.questionsCreated}</span>Questions Created
            </h2>
          </div>
          <div className="inline imp">
            <h2>
              <span>{data.totalImpression}</span>Total Imprresions
            </h2>
          </div>
        </div>
        <div>
          <h2 className="trending">Trending Quizs</h2>
          <div className="grid-container container">
            {data && data.trendingQuiz && data.trendingQuiz.map((quiz, index) => (
              <div className="grid-item" key={index}>
                <p>
                  <span className="heading">{quiz.quiz_name}</span>
                  <span className="views">{quiz.impression_count}</span>
                </p>
                <p className="created-on">{quiz.created_date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;