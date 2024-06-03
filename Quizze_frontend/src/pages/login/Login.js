import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [activeForm, setActiveForm] = useState("signUp");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const navigate = useNavigate();

  async function signUpClick(e) {
    e.preventDefault();
    setActiveForm("signUp");

    try {
      await axios("http://localhost:4000/user/save", {
        action: " ",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          name: name,
          email: email,
          password: password,
          confirmpassword: password,
        }),
      });
      setActiveForm("logIn");
    } catch (e) {
      console.log(e);
    }
  }

  async function logInClick(e) {
    e.preventDefault();

    try {
      const res = await axios("http://localhost:4000/user/find", {
        action: " ",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (res.status === 200) {
        navigate("/dashboard");
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <div class="container">
        <div id="quizzieBox">
          <h1>Quizzie</h1>

          <div className="slides">
            <div class="slidesHead">
              <div className="inline">
                <button
                  id="signUpButton"
                  onClick={signUpClick}
                  class={activeForm === "signUp" ? "activeButton" : ""}
                >
                  Sign Up
                </button>
              </div>
              <div className="inline">
                <button
                  id="logInButton"
                  onClick={() => setActiveForm("logIn")}
                  class={activeForm === "logIn" ? "activeButton" : ""}
                >
                  Log In
                </button>
              </div>
            </div>

            <div class="slidesBody">
              {activeForm === "logIn" && (
                <div class="logIn inline">
                  <div>
                    <p class="inline emailin">Email</p>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    ></input>
                  </div>
                  <div>
                    <p class="inline passin">Password</p>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    ></input>
                  </div>
                  <div>
                    <Link to="/dashboard">
                      <button
                        type="submit"
                        className="blueButton"
                        onClick={(e) => logInClick(e)}
                      >
                        log In
                      </button>
                    </Link>
                  </div>
                </div>
              )}
              {activeForm === "signUp" && (
                <div class="inline signUp">
                  <div>
                    <p class="inline name">Name</p>
                    <input
                      type="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    ></input>
                  </div>
                  <div>
                    <p class="inline email">Email</p>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    ></input>
                  </div>
                  <div>
                    <p class="inline pass">Password</p>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    ></input>
                  </div>
                  <div>
                    <p class="inline confpass">Confirm Password</p>
                    <input
                      type="password"
                      value={confirmpassword}
                      onChange={(e) => {
                        setconfirmPassword(e.target.value);
                      }}
                    ></input>
                  </div>
                  <div>
                    <Link to="">
                      <button
                        type="submit"
                        className="blueButton"
                        onClick={(e) => signUpClick(e)}
                      >
                        Sign Up
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
