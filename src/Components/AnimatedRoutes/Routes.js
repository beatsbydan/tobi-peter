import Loading from '../UI/Loading/Loading'
import loadable from '@loadable/component'

export const WhatsNew = loadable(()=> import('../User/Pages/WhatsNew/WhatsNew'),{
    fallback: <Loading/>
})
export const Music = loadable(()=> import('../User/Pages/Music/Music'),{
    fallback: <Loading/>
})
export const Shows = loadable(()=> import('../User/Pages/Shows/Shows'),{
    fallback: <Loading/>
})
export const AllUpcomingShows = loadable(()=> import('../User/Pages/Shows/AllShows/AllUpcomingShows'),{
    fallback: <Loading/>
})
export const AllPastShows = loadable(()=> import('../User/Pages/Shows/AllShows/AllPastShows'),{
    fallback: <Loading/>
})
export const Animation = loadable(()=> import('../User/Pages/Animation/Animation'),{
    fallback: <Loading/>
})
export const Partner = loadable(()=> import('../User/Pages/Partner/Partner'),{
    fallback: <Loading/>
})
export const Epk = loadable(()=> import('../User/Pages/Epk/Epk'),{
    fallback: <Loading/>
})
export const Shop = loadable(()=> import('../User/Pages/Shop/Shop'),{
    fallback: <Loading/>
})
export const Book = loadable(()=> import('../User/Pages/Shows/Book/Book'),{
    fallback: <Loading/>
})
export const Unavailable = loadable(()=> import('../UI/Unavailable/Unavailable'),{
    fallback: <Loading/>
})
export const NotFound = loadable(()=> import('../UI/NotFound/NotFound'),{
    fallback: <Loading/>
})
export const Admin = loadable(()=> import('../Admin/Admin'),{
    fallback: <Loading/>
})
export const Login = loadable(()=> import('../Admin/Auth/LogIn'),{
    fallback: <Loading/>
})
export const Register = loadable(()=> import('../Admin/Auth/Register'),{
    fallback: <Loading/>
})
export const ForgotPassword = loadable(()=> import('../Admin/Auth/ForgotPassword'),{
    fallback: <Loading/>
})
export const AdminHome = loadable(()=> import('../Admin/Pages/Home/Home'),{
    fallback: <Loading/>
})
export const Manage = loadable(()=> import('../Admin/Pages/Manage/Manage'),{
    fallback: <Loading/>
})
export const CreateShows = loadable(()=> import('../Admin/Pages/Manage/Shows/CreateShows/CreateShows'),{
    fallback: <Loading/>
})
export const UpdateShows = loadable(()=> import('../Admin/Pages/Manage/Shows/UpdateShows/UpdateShows'),{
    fallback: <Loading/>
})
export const UpdateShow = loadable(()=> import('../Admin/Pages/Manage/Shows/UpdateShows/UpdateShow/UpdateShow'),{
    fallback: <Loading/>
})
export const CreateSong = loadable(()=> import('../Admin/Pages/Manage/Song/CreateSong/CreateSong'),{
    fallback: <Loading/>
})
export const UpdateSongs = loadable(()=> import('../Admin/Pages/Manage/Song/UpdateSongs/UpdateSongs'),{
    fallback: <Loading/>
})
export const UpdateSong = loadable(()=> import('../Admin/Pages/Manage/Song/UpdateSongs/UpdateSong/UpdateSong'),{
    fallback: <Loading/>
})
export const AdminPastShows = loadable(()=> import('../Admin/Pages/Manage/Shows/AllShows/AdminPastShows'),{
    fallback: <Loading/>
})
export const AdminUpcomingShows = loadable(()=> import('../Admin/Pages/Manage/Shows/AllShows/AdminUpcomingShows'),{
    fallback: <Loading/>
})
export const CreateBlogs = loadable(()=> import('../Admin/Pages/Manage/Blogs/CreateBlogs/CreateBlogs'),{
    fallback: <Loading/>
})
export const UpdateBlogs = loadable(()=> import('../Admin/Pages/Manage/Blogs/UpdateBlogs/UpdateBlogs'),{
    fallback: <Loading/>
})
export const UpdateBlog = loadable(()=> import('../Admin/Pages/Manage/Blogs/UpdateBlogs/UpdateBlog/UpdateBlog'),{
    fallback: <Loading/>
})
export const CreateImages = loadable(()=> import('../Admin/Pages/Manage/Images/CreateImages/CreateImages'),{
    fallback: <Loading/>
})
export const UpdateImages = loadable(()=> import('../Admin/Pages/Manage/Images/UpdateImages/UpdateImages'),{
    fallback: <Loading/>
})
export const Unauthorized = loadable(()=> import('../Admin/Pages/Unauthorized/Unauthorized'),{
    fallback: <Loading/>
})