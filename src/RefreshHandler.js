import {useEffect} from "react"
import PropTypes from 'prop-types';
import {useLocation, useNavigate} from "react-router-dom"

function RefreshHandler({setIsAuthenticated}) {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const data = localStorage.getItem("user-info")
    const token = data ? JSON.parse(data)?.token : null

    if (token) {
      setIsAuthenticated(true)
      if (location.pathname === "/" || location.pathname === "/login") {
        navigate("/dashboard", {replace: false})
      }
    } else {
      setIsAuthenticated(false)
    }
  }, [location, navigate, setIsAuthenticated])

  return null
}
RefreshHandler.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};


export default RefreshHandler
