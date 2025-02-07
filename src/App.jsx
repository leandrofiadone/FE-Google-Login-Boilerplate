
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from './GoogleLogin';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import Dashboard from './Dashboard';
import { useState } from 'react';
import PropTypes from 'prop-types';
import RefrshHandler from './RefreshHandler';
import NotFound from './NotFound';



function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const GoogleWrapper = () => (
    <GoogleOAuthProvider clientId="677835323710-huch33bpc7g8nt8qnk1ab6jkjnij8l3n.apps.googleusercontent.com">
      <GoogleLogin></GoogleLogin>
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
			<RefrshHandler setIsAuthenticated={setIsAuthenticated} />
			<Routes>
				<Route path="/login" element={<GoogleWrapper />} />
				<Route path="/" element={<Navigate to="/login" />} />
				<Route path='/dashboard' element={<PrivateRoute element={<Dashboard/>}/>}/>
				<Route path="*" element={<NotFound/>} />
			</Routes>
	</BrowserRouter>
	);
}

export default App
