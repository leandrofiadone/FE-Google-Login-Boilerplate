import {GoogleOAuthProvider} from "@react-oauth/google"
import GoogleLogin from "./GoogleLogin"
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom"
import Dashboard from "./Dashboard"
import {useState} from "react"
import PropTypes from "prop-types"
import RefreshHandler from "./RefreshHandler"
import NotFound from "./NotFound"

// Componente de carga
const LoadingScreen = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh"
    }}>
    <h2>Cargando perfil...</h2>
  </div>
)

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoadingUser, setIsLoadingUser] = useState(true) // Estado de carga del usuario

  const handleUserLoaded = (authStatus) => {
    setIsAuthenticated(authStatus)
    setIsLoadingUser(false) // Se desactiva el loading en cualquier caso
  }

  const GoogleWrapper = () => (
    <GoogleOAuthProvider clientId="677835323710-huch33bpc7g8nt8qnk1ab6jkjnij8l3n.apps.googleusercontent.com">
      <GoogleLogin />
    </GoogleOAuthProvider>
  )

  const PrivateRoute = ({element}) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  PrivateRoute.propTypes = {
    element: PropTypes.node.isRequired
  }

  return (
    <BrowserRouter>
      <RefreshHandler setIsAuthenticated={handleUserLoaded} />
      {isLoadingUser ? (
        <LoadingScreen /> // Solo muestra la pantalla de carga si el usuario aún no se ha verificado
      ) : (
        <Routes>
          <Route path="/login" element={<GoogleWrapper />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </BrowserRouter>
  )
}

export default App
