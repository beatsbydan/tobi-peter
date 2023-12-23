import { useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './Components/User/Navbar/Navbar';
import AdminNavbar from './Components/Admin/AdminNavbar/AdminNavbar';
import Footer from './Components/Footer/Footer';
import ContextProvider from './Components/User/Context/ContextProvider'
import AuthContextProvider from './Components/Admin/Context/AuthContext/AuthContextProvider'
import ManageContextProvider from './Components/Admin/Context/ManageContext/ManageContextProvider'
import ShowsContextProvider from './Components/Admin/Context/ManageContext/ShowsContext/ShowsContextProvider'
import AlertContextProvider from './Components/UI/AlertContext/AlertContextProvider'
import AlertPopUp from './Components/UI/AlertPopUp/AlertPopUp'
import AnimatedRoutes from './Components/AnimatedRoutes/AnimatedRoutes';
import Processing from './Components/UI/IsProcessing/Processing';
import ProcessingContextProvider from './Components/UI/IsProcessing/ProcessingContext/ProcessingContextProvider';
// import UnderMaintenance from './Components/UI/UnderMaintenance/UnderMaintenance';

function App() {
  const location = useLocation()
  return (
    <AlertContextProvider>
      <ProcessingContextProvider>
        <ContextProvider>
          <AuthContextProvider>
              <ManageContextProvider>
                <ShowsContextProvider>
                    <div className="App">
                      <AlertPopUp/>
                      <header>
                        { location.pathname.includes("/admin") ? <AdminNavbar/> : <Navbar/>}
                      </header>
                      <main>
                        <Processing/>
                        <AnimatedRoutes/>
                        {/* <UnderMaintenance/> */}
                      </main>
                      <Footer/>
                    </div>
                </ShowsContextProvider>
              </ManageContextProvider>
          </AuthContextProvider>
        </ContextProvider>
      </ProcessingContextProvider>
    </AlertContextProvider>
  );
}

export default App;
