import { useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './Components/User/Navbar/Navbar';
import AdminNavbar from './Components/Admin/AdminNavbar/AdminNavbar';
import Footer from './Components/Footer/Footer';
import ContextProvider from './Components/User/Context/ContextProvider'
import AuthContextProvider from './Components/Admin/Context/AuthContext/AuthContextProvider'
import ManageContextProvider from './Components/Admin/Context/ManageContext/ManageContextProvider'
import ShowsContextProvider from './Components/Admin/Context/ManageContext/ShowsContext/ShowsContextProvider'
import HomeContextProvider from './Components/Admin/Context/HomeContext/HomeContextProvider'
import AlertContextProvider from './Components/UI/AlertContext/AlertContextProvider'
import AlertPopUp from './Components/UI/AlertPopUp/AlertPopUp'
import AnimatedRoutes from './Components/AnimatedRoutes/AnimatedRoutes';

function App() {
  const location = useLocation()
  return (
    <AlertContextProvider>
      <ContextProvider>
        <AuthContextProvider>
            <ManageContextProvider>
              <ShowsContextProvider>
                <HomeContextProvider>
                  <div className="App">
                    <AlertPopUp/>
                    <header>
                      {location.pathname.includes("/admin") ? <AdminNavbar/> : <Navbar/>}
                    </header>
                    <main>
                      <AnimatedRoutes/>
                    </main>
                    <Footer/>
                  </div>
                </HomeContextProvider>
              </ShowsContextProvider>
            </ManageContextProvider>
        </AuthContextProvider>
      </ContextProvider>
    </AlertContextProvider>
  );
}

export default App;