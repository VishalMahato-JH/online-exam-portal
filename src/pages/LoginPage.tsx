import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import {
  loginUser,
  registerUser,
} from "../services/authService";

export default function LoginPage() {

  const navigate = useNavigate();
  const location = useLocation();

  const isAdmin =
    location.pathname === "/admin-login";

  const [isRegister, setIsRegister] =
    useState(false);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const handleLogin = async (
    e: any
  ) => {

    e.preventDefault();

    try {

      await loginUser(
        email,
        password
      );

      toast.success(
        "Login Successful"
      );

      setTimeout(() => {

        const role =
          localStorage.getItem(
            "role"
          );

        if (role === "ADMIN") {

          navigate("/dashboard");

        } else {

          navigate("/students");
        }

      }, 1000);

    } catch (error) {

      console.log(error);

      toast.error(
        "Invalid Email or Password"
      );
    }
  };

  const handleRegister =
    async (e: any) => {

      e.preventDefault();

      if (
        password !==
        confirmPassword
      ) {

        toast.error(
          "Passwords do not match"
        );

        return;
      }

      try {

        await registerUser(
          name,
          email,
          password
        );

        toast.success(
          "Registration Successful"
        );

        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        setIsRegister(false);

      } catch (error) {

        console.log(error);

        toast.error(
          "Registration Failed"
        );
      }
    };

  return (

    <>

      <Toaster
        position="top-right"
      />

      <div className="login-container">

        <div className="login-box">

          <div
            className={`left-panel ${
              isAdmin
                ? "admin-panel"
                : "student-panel"
            }`}
          >

            <div className="brand-logo">

              🎓

            </div>

            <h1> 

              {isAdmin

                ? "Online Exam Admin"

                : "Online Exam Student"}

            </h1>

            <p>

              {isAdmin

                ? "Securely manage exams, questions, students and analytics from one dashboard."

                : "Attend online exams, download certificates and track your performance in real time."}

            </p>

            <button
              className="back-btn"
              onClick={() =>
                navigate("/")
              }
            >

              ← Back

            </button>

          </div>

          <div className="right-panel">

            <div className="login-header">

              <span className="welcome-badge">
                Welcome Back 👋
              </span>

              <h2>

                {isAdmin
                  ? "Admin Login"
                  : isRegister
                  ? "Create Account"
                  : "Student Login"}

              </h2>

              <p>

                {isRegister
                  ? "Create a new account to continue."
                  : "Enter your credentials to access your dashboard."}

              </p>

            </div>

            <form
              onSubmit={

                isRegister

                  ? handleRegister

                  : handleLogin
              }
            >

              {!isAdmin &&
               isRegister && (

                <input
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                />

              )}

              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
              />

              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
              />

              {!isAdmin &&
               isRegister && (

                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={
                    confirmPassword
                  }
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                />

              )}
              {!isRegister && (
              <div className="login-options">

                <label className="remember-me">

                  <input type="checkbox" />

                  <span>Remember Me</span>

                </label>

                {!isRegister && (

                  <span className="forgot-password">
                    Forgot Password?
                  </span>

                )}

              </div>
              )}

              <button
                type="submit"
                className={
                  isAdmin

                    ? "admin-btn"

                    : "student-btn"
                }
              >

                {isAdmin

                  ? "Login as Admin"

                  : isRegister

                  ? "Register"

                  : "Login as Student"}

              </button>

            </form>

            {!isAdmin && (

              <p
                style={{
                  marginTop: "20px",
                  cursor: "pointer",
                }}
                onClick={() =>
                  setIsRegister(
                    !isRegister
                  )
                }
              >

                {isRegister

                  ? "Already have an account? Login"

                  : "New Student? Register"}

              </p>

            )}

          </div>

        </div>

      </div>

    </>
  );
}