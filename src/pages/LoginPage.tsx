import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../services/authService"

const LoginPage = () => {

  const navigate = useNavigate()

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    try {

      const data =
        await loginUser(
          email,
          password
        )

      console.log(data)

      localStorage.setItem(
        "token",
        data.token || "loggedin"
      )

      localStorage.setItem(
        "role",
        data.role || "ADMIN"
      )

      alert("Login Successful")

      if (
        data.role === "ADMIN"
      ) {

        navigate("/dashboard")

      } else {

        navigate("/exam/14")

      }

    } catch (error) {

      console.log(error)

      alert("Login Failed")
    }
  }

  return (

    <div className="login-page">

      <form
        onSubmit={handleLogin}
        className="login-card"
      >

        <h1>Exam Portal</h1>

        <p>Login to continue</p>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button type="submit">
          Login
        </button>

      </form>

    </div>
  )
}

export default LoginPage