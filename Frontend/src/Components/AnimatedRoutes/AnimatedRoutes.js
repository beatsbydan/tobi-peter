import React from 'react'
import WhatsNew from '../User/Pages/WhatsNew/WhatsNew';
import Music from '../User/Pages/Music/Music';
import Animation from '../User/Pages/Animation/Animation';
import Shows from '../User/Pages/Shows/Shows';
import Partner from '../User/Pages/Partner/Partner';
import NotFound from '../UI/NotFound/NotFound';
import Admin from '../Admin/Admin'
import LogIn from '../Admin/Auth/LogIn'
import Register from '../Admin/Auth/Register'
import ForgotPassword from '../Admin/Auth/ForgotPassword'
import Home from '../Admin/Pages/Home/Home'
import Manage from '../Admin/Pages/Manage/Manage'
import Create from '../Admin/Pages/Manage/Shows/Create/Create'
import CreateSong from '../Admin/Pages/Manage/Song/CreateSong/CreateSong'
import Update from '../Admin/Pages/Manage/Shows/Update/Update'
import UpdateSongs from '../Admin/Pages/Manage/Song/UpdateSongs/UpdateSongs'
import UpdateSong from '../Admin/Pages/Manage/Song/UpdateSongs/UpdateSong/UpdateSong'
import ProtectedRoutes from '../Admin/Protected/ProtectedRoutes'
import PersistLogin from '../Admin/PersistLogIn/PersistLogIn'
import Unauthorized from '../Admin/Pages/Unauthorized/Unauthorized';
import {Routes, Route, useLocation} from 'react-router-dom'
import {AnimatePresence} from 'framer-motion'
import AllPastShows from '../User/Pages/Shows/AllShows/AllPastShows';
import AdminPastShows  from '../Admin/Pages/Manage/Shows/AllShows/AdminPastShows';
import AdminUpcomingShows from '../Admin/Pages/Manage/Shows/AllShows/AdminUpcomingShows';
import AllUpcomingShows from '../User/Pages/Shows/AllShows/AllUpcomingShows';
import ScrollToTop from '../ScrollToTop';
import CreateBlogs from '../Admin/Pages/Manage/Blogs/CreateBlogs/CreateBlogs';
import CreateImages from '../Admin/Pages/Manage/Images/CreateImages/CreateImages';
import UpdateImages from '../Admin/Pages/Manage/Images/UpdateImages/UpdateImages';
import UpdateBlogs from '../Admin/Pages/Manage/Blogs/UpdateBlogs/UpdateBlogs';
import Unavailable from '../UI/Unavailable/Unavailable';

const AnimatedRoutes = () => {
    const location = useLocation()
    return (
        <AnimatePresence>
            <ScrollToTop/>
            <Routes location={location} key={location.pathname}>
                {/* USER ROUTES */}
                <Route exact path ='/' element={<WhatsNew/>}/>
                <Route path ='/music' element={<Music/>}/>
                <Route path ='/animation' element={<Animation/>}/>
                <Route path ='/shows' element={<Shows/>}/>
                <Route path ='/partner' element={<Partner/>}/>
                <Route path='/shows/allPastShows' element={<AllPastShows/>}/>
                <Route path='/shows/allUpcomingShows' element={<AllUpcomingShows/>}/>
                <Route path='/unavailable' element={<Unavailable/>}/>
                
                {/* NOT_FOUND */}
                <Route path="*" element={<NotFound/>}/>

                {/* ADMIN ROUTES */}
                <Route path='/admin' element={<Admin/>}/>
                <Route path='/admin/login' element={<LogIn/>}/>
                <Route path='/admin/register' element={<Register/>}/>
                <Route path = '/unatuhorized' element = {<Unauthorized/>}/>
                <Route path = '/admin/reset' element={<ForgotPassword/>}/>

                {/* PROTECTED ROUTES */}
                <Route element = {<PersistLogin/>}>
                    <Route element={<ProtectedRoutes/>}>
                        <Route path='/admin/home' element={<Home/>}/>
                        <Route path='/admin/manage' element={<Manage/>}/>
                        <Route path='/admin/manage/shows/createShow' element={<Create/>}/>
                        <Route path='/admin/manage/shows/updateShows' element={<Update/>}/>
                        <Route path='/admin/manage/shows/updateShows/allUpcomingShows' element={<AdminUpcomingShows/>}/>
                        <Route path='/admin/manage/shows/updateShows/allPastShows' element={<AdminPastShows/>}/>
                        <Route path='/admin/manage/songs/createSong' element={<CreateSong/>}/>
                        <Route path='/admin/manage/songs/updateSongs' element={<UpdateSongs/>}/>
                        <Route path='/admin/manage/songs/updateSongs/updateSong/:id' element={<UpdateSong/>}/>
                        <Route path='/admin/manage/blogs/createBlog' element={<CreateBlogs/>}/>
                        <Route path='/admin/manage/blogs/updateBlogs' element={<UpdateBlogs/>}/>
                        <Route path='/admin/manage/images/addImage' element={<CreateImages/>}/>
                        <Route path='/admin/manage/images/updateImages' element={<UpdateImages/>}/>
                    </Route>
                </Route>
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes