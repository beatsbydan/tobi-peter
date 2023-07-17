import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import WhatsNew from './Components/Pages/WhatsNew/WhatsNew';
import Music from './Components/Pages/Music/Music';
import Animation from './Components/Pages/Animation/Animation';
import Shows from './Components/Pages/Shows/Shows';
import Partner from './Components/Pages/Partner/Partner';
import ContextProvider from './Context/ContextProvider'

function App() {
  return (
    <ContextProvider>
      <div className="App">
        <header>
          <Navbar/>
        </header>
        <main>
          <Routes>
            {/* USER ROUTES */}
            <Route exact path ='/' element={<WhatsNew/>}/>
            <Route path ='/music' element={<Music/>}/>
            <Route path ='/animation' element={<Animation/>}/>
            <Route path ='/shows' element={<Shows/>}/>
            <Route path ='/partner' element={<Partner/>}/>

            {/* ADMIN ROUTES */}
            {/* <Route path='/admin' element={}/>
            <Route path='/admin/login' element={}/>
            <Route path='/admin/home' element={}/>
            <Route path='/admin/manage' element={}/> */}
          </Routes>
        </main>
        <Footer/>
      </div>
    </ContextProvider>
  );
}

export default App;
