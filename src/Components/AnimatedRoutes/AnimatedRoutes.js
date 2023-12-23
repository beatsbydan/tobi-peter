import React from 'react'
import loadable from '@loadable/component'
import {Routes, Route, useLocation} from 'react-router-dom'
import {AnimatePresence} from 'framer-motion'

import ProtectedRoutes from '../Admin/Protected/ProtectedRoutes'
import PersistLogin from '../Admin/PersistLogIn/PersistLogIn'
import ScrollToTop from '../ScrollToTop';
import Loading from '../UI/Loading/Loading'

// LAZY ROUTES
const WhatsNew = loadable(()=> import('../User/Pages/WhatsNew/WhatsNew'),{
    fallback: <Loading/>
})
const Music = loadable(()=> import('../User/Pages/Music/Music'),{
    fallback: <Loading/>
})
const Shows = loadable(()=> import('../User/Pages/Shows/Shows'),{
    fallback: <Loading/>
})
const Animation = loadable(()=> import('../User/Pages/Animation/Animation'),{
    fallback: <Loading/>
})
const Partner = loadable(()=> import('../User/Pages/Partner/Partner'),{
    fallback: <Loading/>
})
const Admin = loadable(()=> import('../Admin/Admin'),{
    fallback: <Loading/>
})
const Login = loadable(()=> import('../Admin/Auth/LogIn'),{
    fallback: <Loading/>
})
const Register = loadable(()=> import('../Admin/Auth/Register'),{
    fallback: <Loading/>
})
const ForgotPassword = loadable(()=> import('../Admin/Auth/ForgotPassword'),{
    fallback: <Loading/>
})
const Home = loadable(()=> import('../Admin/Pages/Home/Home'),{
    fallback: <Loading/>
})
const Manage = loadable(()=> import('../Admin/Pages/Manage/Manage'),{
    fallback: <Loading/>
})
const CreateShows = loadable(()=> import('../Admin/Pages/Manage/Shows/CreateShows/CreateShows'),{
    fallback: <Loading/>
})
const UpdateShows = loadable(()=> import('../Admin/Pages/Manage/Shows/UpdateShows/UpdateShows'),{
    fallback: <Loading/>
})
const UpdateShow = loadable(()=> import('../Admin/Pages/Manage/Shows/UpdateShows/UpdateShow/UpdateShow'),{
    fallback: <Loading/>
})
const CreateSong = loadable(()=> import('../Admin/Pages/Manage/Song/CreateSong/CreateSong'),{
    fallback: <Loading/>
})
const UpdateSongs = loadable(()=> import('../Admin/Pages/Manage/Song/UpdateSongs/UpdateSongs'),{
    fallback: <Loading/>
})
const UpdateSong = loadable(()=> import('../Admin/Pages/Manage/Song/UpdateSongs/UpdateSong/UpdateSong'),{
    fallback: <Loading/>
})
const AllPastShows = loadable(()=> import('../User/Pages/Shows/AllShows/AllPastShows'),{
    fallback: <Loading/>
})
const AllUpcomingShows = loadable(()=> import('../User/Pages/Shows/AllShows/AllUpcomingShows'),{
    fallback: <Loading/>
})
const AdminPastShows = loadable(()=> import('../Admin/Pages/Manage/Shows/AllShows/AdminPastShows'),{
    fallback: <Loading/>
})
const AdminUpcomingShows = loadable(()=> import('../Admin/Pages/Manage/Shows/AllShows/AdminUpcomingShows'),{
    fallback: <Loading/>
})
const CreateBlogs = loadable(()=> import('../Admin/Pages/Manage/Blogs/CreateBlogs/CreateBlogs'),{
    fallback: <Loading/>
})
const UpdateBlogs = loadable(()=> import('../Admin/Pages/Manage/Blogs/UpdateBlogs/UpdateBlogs'),{
    fallback: <Loading/>
})
const UpdateBlog = loadable(()=> import('../Admin/Pages/Manage/Blogs/UpdateBlogs/UpdateBlog/UpdateBlog'),{
    fallback: <Loading/>
})
const CreateImages = loadable(()=> import('../Admin/Pages/Manage/Images/CreateImages/CreateImages'),{
    fallback: <Loading/>
})
const UpdateImages = loadable(()=> import('../Admin/Pages/Manage/Images/UpdateImages/UpdateImages'),{
    fallback: <Loading/>
})
const Book = loadable(()=> import('../User/Pages/Shows/Book/Book'),{
    fallback: <Loading/>
})
const Unavailable = loadable(()=> import('../UI/Unavailable/Unavailable'),{
    fallback: <Loading/>
})
const Unauthorized = loadable(()=> import('../Admin/Pages/Unauthorized/Unauthorized'),{
    fallback: <Loading/>
})
const NotFound = loadable(()=> import('../UI/NotFound/NotFound'),{
    fallback: <Loading/>
})

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
                <Route path='/shows/book' element={<Book/>}/>
                <Route path='/unavailable' element={<Unavailable/>}/>
                
                {/* NOT_FOUND */}
                <Route path="*" element={<NotFound/>}/>

                {/* ADMIN ROUTES */}
                <Route path='/admin' element={<Admin/>}/>
                <Route path='/admin/login' element={<Login/>}/>
                <Route path='/admin/register' element={<Register/>}/>
                <Route path = '/unatuhorized' element = {<Unauthorized/>}/>
                <Route path = '/admin/reset' element={<ForgotPassword/>}/>

                {/* PROTECTED ROUTES */}
                <Route element = {<PersistLogin/>}>
                    <Route element={<ProtectedRoutes/>}>
                        <Route path='/admin/home' element={<Home/>}/>
                        <Route path='/admin/manage' element={<Manage/>}/>
                        <Route path='/admin/manage/shows/createShow' element={<CreateShows/>}/>
                        <Route path='/admin/manage/shows/updateShows' element={<UpdateShows/>}/>
                        <Route path='/admin/manage/shows/updateShows/allUpcomingShows' element={<AdminUpcomingShows/>}/>
                        <Route path='/admin/manage/shows/updateShows/allPastShows' element={<AdminPastShows/>}/>
                        <Route path='/admin/manage/shows/updateShows/updateShow/:id' element ={<UpdateShow/>}/>
                        <Route path='/admin/manage/songs/createSong' element={<CreateSong/>}/>
                        <Route path='/admin/manage/songs/updateSongs' element={<UpdateSongs/>}/>
                        <Route path='/admin/manage/songs/updateSongs/updateSong/:id' element={<UpdateSong/>}/>
                        <Route path='/admin/manage/blogs/createBlog' element={<CreateBlogs/>}/>
                        <Route path='/admin/manage/blogs/updateBlogs' element={<UpdateBlogs/>}/>
                        <Route path='/admin/manage/blogs/updateBlogs/updateBlog/:id' element={<UpdateBlog/>}/>
                        <Route path='/admin/manage/images/addImage' element={<CreateImages/>}/>
                        <Route path='/admin/manage/images/updateImages' element={<UpdateImages/>}/>
                    </Route>
                </Route>
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes