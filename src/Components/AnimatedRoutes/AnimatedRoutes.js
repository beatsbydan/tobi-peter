import React from 'react'
import {Routes, Route, useLocation} from 'react-router-dom'
import {AnimatePresence} from 'framer-motion'
import ProtectedRoutes from '../Admin/Protected/ProtectedRoutes'
import PersistLogin from '../Admin/PersistLogIn/PersistLogIn'
import { 
    Admin,
    AdminHome,
    AdminPastShows,
    AdminUpcomingShows,
    AllPastShows, 
    AllUpcomingShows, 
    Animation, 
    Book, 
    CreateBlogs, 
    CreateImages, 
    CreateShows, 
    CreateSong, 
    Epk,
    ForgotPassword,
    Login,
    Manage,
    Music, 
    NotFound, 
    Partner, 
    Register, 
    Shop, 
    Shows, 
    Unauthorized, 
    Unavailable, 
    UpdateBlog, 
    UpdateBlogs, 
    UpdateImages, 
    UpdateShow, 
    UpdateShows, 
    UpdateSong, 
    UpdateSongs, 
    WhatsNew 
} from './Routes'


const AnimatedRoutes = () => {
    const location = useLocation()
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                {/* USER ROUTES */}
                <Route exact path='/' element={<WhatsNew/>}/>
                <Route path='/music' element={<Music/>}/>
                <Route path='/animation' element={<Animation/>}/>
                <Route path='/shows'>
                    <Route index element={<Shows/>}/>
                    <Route path="all-past-shows" element={<AllPastShows/>}/>
                    <Route path="all-upcoming-shows" element={<AllUpcomingShows/>}/>
                    <Route path="book" element={<Book/>}/>
                </Route>
                <Route path='/partner' element={<Partner/>}/>
                <Route path='/epk' element={<Epk/>}/>
                <Route path='/unavailable' element={<Unavailable/>}/>
                <Route path='/shop' element={<Shop/>}/>
                
                {/* NOT_FOUND */}
                <Route path="*" element={<NotFound/>}/>

                {/* ADMIN ROUTES */}
                <Route path="/admin">
                    <Route index element={<Admin/>}/>
                    <Route path='login' element={<Login/>}/>
                    <Route path='register' element={<Register/>}/>
                    <Route path='reset' element={<ForgotPassword/>}/>

                    {/* PROTECTED ROUTES */}
                    <Route element = {<PersistLogin/>}>
                        <Route element={<ProtectedRoutes/>}>
                            <Route path='home' element={<AdminHome/>}/>
                            <Route path='manage'>
                                <Route index element={<Manage/>}/>
                                <Route path="shows">
                                    <Route path='create-show' element={<CreateShows/>}/>
                                    <Route path='update-shows'>
                                        <Route index element={<UpdateShows/>}/>
                                        <Route path='all-upcoming-shows' element={<AdminUpcomingShows/>}/>
                                        <Route path='all-past-shows' element={<AdminPastShows/>}/>
                                        <Route path='update-show/:id' element ={<UpdateShow/>}/>
                                    </Route>
                                </Route>
                                <Route path='songs'>
                                    <Route path='create-song' element={<CreateSong/>}/>
                                    <Route path='update-songs'>
                                        <Route index element={<UpdateSongs/>}/>
                                        <Route path='update-song/:id' element={<UpdateSong/>}/>
                                    </Route>
                                </Route>
                                <Route path='blogs'>
                                    <Route path='create-blog' element={<CreateBlogs/>}/>
                                    <Route path='update-blogs'>
                                        <Route index element={<UpdateBlogs/>}/>
                                        <Route path='update-blog/:id' element={<UpdateBlog/>}/>        
                                    </Route>
                                </Route>
                                <Route path='images'>
                                    <Route path='add-image' element={<CreateImages/>}/>
                                    <Route path='update-images' element={<UpdateImages/>}/>
                                </Route>
                            </Route>
                        </Route>
                    </Route>
                </Route>
                <Route path='/unauthorized' element = {<Unauthorized/>}/>
                
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes