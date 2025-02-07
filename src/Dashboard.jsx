import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


//!IMPORTANTE USO DEL referrerPolicy="no-referrer"

const Dashboard = () => {
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        const data = localStorage.getItem('user-info');
        const userData = JSON.parse(data);
        setUserInfo(userData);
    },[])

    const handleLogout = ()=>{
        localStorage.removeItem('user-info');
        navigate('/login');
    }

    return (
      <>
        <h1>Welcome {userInfo?.name}</h1>
        <h3>{userInfo?.email}</h3>
        <img
          src={userInfo?.image}
          alt={userInfo?.name}
          referrerPolicy="no-referrer"
        />
        
        <button onClick={handleLogout}>Logout</button>
      </>
    )
}



export default Dashboard