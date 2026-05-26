import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function LoginPage() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState("")

  const handleLogin = async () => {

    try {

      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email,
          password
        }
      )

      // SAVE JWT TOKEN
      localStorage.setItem(
        "token",
        response.data.token
      )

      // REDIRECT DASHBOARD
      navigate("/dashboard")

    } catch (err) {

      setError("Invalid Email or Password")
    }
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">

      <div className="bg-[#1e293b] p-10 rounded-2xl w-[400px] border border-gray-800">

        <h1 className="text-4xl font-bold text-white mb-2">
          Admin Login
        </h1>

        <p className="text-gray-400 mb-8">
          Welcome back
        </p>

        {/* ERROR */}
        {
          error && (

            <div className="bg-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-5">
              {error}
            </div>
          )
        }

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 text-white outline-none mb-5"
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 text-white outline-none mb-6"
        />

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          className="w-full bg-cyan-500 hover:bg-cyan-600 transition py-3 rounded-xl font-bold text-black"
        >
          Login
        </button>

      </div>

    </div>
  )
}

export default LoginPage