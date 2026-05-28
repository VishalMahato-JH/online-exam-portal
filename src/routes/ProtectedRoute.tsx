import { Navigate } from "react-router-dom"

type Props = {
  children: JSX.Element
  role?: string
}

function ProtectedRoute({
  children,
  role
}: Props) {

  const token =
    localStorage.getItem("token")

  const userRole =
    localStorage.getItem("role")

  // NOT LOGGED IN

  if (!token) {

    return <Navigate to="/" />
  }

  // ROLE CHECK

  if (
    role &&
    userRole !== role
  ) {

    return <Navigate to="/" />
  }

  return children
}

export default ProtectedRoute