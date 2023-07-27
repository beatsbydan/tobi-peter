import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import AdminNavbar from './Components/Admin/AdminNavbar/AdminNavbar';
import Footer from './Components/Footer/Footer';
import WhatsNew from './Components/Pages/WhatsNew/WhatsNew';
import Music from './Components/Pages/Music/Music';
import Animation from './Components/Pages/Animation/Animation';
import Shows from './Components/Pages/Shows/Shows';
import Partner from './Components/Pages/Partner/Partner';
import NotFound from './Components/Pages/NotFound/NotFound';
import ContextProvider from './Context/ContextProvider'
import AuthContextProvider from './Components/Admin/Context/AuthContext/AuthContextProvider'
import ManageContextProvider from './Components/Admin/Context/ManageContext/ManageContextProvider'
import ShowsContextProvider from './Components/Admin/Context/ManageContext/ShowsContext/ShowsContextProvider'
import Admin from './Components/Admin/Admin'
import LogIn from './Components/Admin/Auth/LogIn'
import Register from './Components/Admin/Auth/Register'
import Home from './Components/Admin/Pages/Home/Home'
import Manage from './Components/Admin/Pages/Manage/Manage'
import Create from './Components/Admin/Pages/Manage/Shows/Create/Create'
import Update from './Components/Admin/Pages/Manage/Shows/Update/Update'
import UpdateLinks from './Components/Admin/Pages/Manage/Links/UpdateLinks'
import CoverArt from './Components/Admin/Pages/Manage/CoverArt/CoverArt'
import ProtectedRoutes from './Components/Admin/Protected/ProtectedRoutes'
import AlertContextProvider from './Components/UI/AlertContext/AlertContextProvider'
import AlertPopUp from './Components/UI/AlertPopUp/AlertPopUp'
import Unauthorized from './Components/Admin/Pages/Unauthorized/Unauthorized';

function App() {
  const location = useLocation()
  return (
    <AlertContextProvider>
      <ContextProvider>
        <AuthContextProvider>
            <ManageContextProvider>
              <ShowsContextProvider>
                <div className="App">
                  <AlertPopUp/>
                  <header>
                    {location.pathname.includes("/admin") ? <AdminNavbar/> : <Navbar/>}
                  </header>
                  <main>
                    <Routes>
                      {/* USER ROUTES */}
                      <Route exact path ='/' element={<WhatsNew/>}/>
                      <Route path ='/music' element={<Music/>}/>
                      <Route path ='/animation' element={<Animation/>}/>
                      <Route path ='/shows' element={<Shows/>}/>
                      <Route path ='/partner' element={<Partner/>}/>
                      <Route path = '/unatuhorized' element = {<Unauthorized/>}/>
                      
                      {/* NOT_FOUND */}
                      <Route path="*" element={<NotFound/>}/>

                      {/* ADMIN ROUTES */}
                      <Route path='/admin' element={<Admin/>}/>
                      <Route path='/admin/login' element={<LogIn/>}/>
                      <Route path='/admin/register' element={<Register/>}/>
                      <Route element={<ProtectedRoutes/>}>
                        <Route path='/admin/home' element={<Home/>}/>
                        <Route path='/admin/manage' element={<Manage/>}/>
                        <Route path='/admin/manage/createShows' element={<Create/>}/>
                        <Route path='/admin/manage/updateShows' element={<Update/>}/>
                        <Route path='/admin/manage/updateLinks' element={<UpdateLinks/>}/>
                        <Route path='/admin/manage/updateCoverArt' element={<CoverArt/>}/>
                      </Route>
                    </Routes>
                  </main>
                  <Footer/>
                </div>
              </ShowsContextProvider>
            </ManageContextProvider>
        </AuthContextProvider>
      </ContextProvider>
    </AlertContextProvider>
  );
}

export default App;
