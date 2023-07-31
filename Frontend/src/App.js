import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './Components/User/Navbar/Navbar';
import AdminNavbar from './Components/Admin/AdminNavbar/AdminNavbar';
import Footer from './Components/Footer/Footer';
import WhatsNew from './Components/User/Pages/WhatsNew/WhatsNew';
import Music from './Components/User/Pages/Music/Music';
import Animation from './Components/User/Pages/Animation/Animation';
import Shows from './Components/User/Pages/Shows/Shows';
import Partner from './Components/User/Pages/Partner/Partner';
import NotFound from './Components/UI/NotFound/NotFound';
import ContextProvider from './Components/User/Context/ContextProvider'
import AuthContextProvider from './Components/Admin/Context/AuthContext/AuthContextProvider'
import ManageContextProvider from './Components/Admin/Context/ManageContext/ManageContextProvider'
import ShowsContextProvider from './Components/Admin/Context/ManageContext/ShowsContext/ShowsContextProvider'
import HomeContextProvider from './Components/Admin/Context/HomeContext/HomeContextProvider'
import Admin from './Components/Admin/Admin'
import LogIn from './Components/Admin/Auth/LogIn'
import Register from './Components/Admin/Auth/Register'
import ForgotPassword from './Components/Admin/Auth/ForgotPassword'
import Home from './Components/Admin/Pages/Home/Home'
import Manage from './Components/Admin/Pages/Manage/Manage'
import Create from './Components/Admin/Pages/Manage/Shows/Create/Create'
import CreateSong from './Components/Admin/Pages/Manage/Song/CreateSong/CreateSong'
import Update from './Components/Admin/Pages/Manage/Shows/Update/Update'
import UpdateSongs from './Components/Admin/Pages/Manage/Song/UpdateSongs/UpdateSongs'
import UpdateSong from './Components/Admin/Pages/Manage/Song/UpdateSongs/UpdateSong/UpdateSong'
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
                <HomeContextProvider>
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
                        
                        {/* NOT_FOUND */}
                        <Route path="*" element={<NotFound/>}/>

                        {/* ADMIN ROUTES */}
                        <Route path='/admin' element={<Admin/>}/>
                        <Route path='/admin/login' element={<LogIn/>}/>
                        <Route path='/admin/register' element={<Register/>}/>
                        <Route path = '/unatuhorized' element = {<Unauthorized/>}/>
                        <Route path = '/admin/reset' element={<ForgotPassword/>}/>

                        {/* PROTECTED ROUTES */}
                        <Route element={<ProtectedRoutes/>}>
                          <Route path='/admin/home' element={<Home/>}/>
                          <Route path='/admin/manage' element={<Manage/>}/>
                          <Route path='/admin/manage/createShow' element={<Create/>}/>
                          <Route path='/admin/manage/updateShows' element={<Update/>}/>
                          <Route path='/admin/manage/createSong' element={<CreateSong/>}/>
                          <Route path='/admin/manage/updateSongs' element={<UpdateSongs/>}/>
                          <Route path='/admin/manage/updateSongs/updateSong/:id' element={<UpdateSong/>}/>
                        </Route>
                      </Routes>
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
