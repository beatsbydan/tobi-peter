import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import WhatsNew from './Components/Pages/WhatsNew/WhatsNew';
import Music from './Components/Pages/Music/Music';
import Animation from './Components/Pages/Animation/Animation';
import Shows from './Components/Pages/Shows/Shows';
import Partner from './Components/Pages/Partner/Partner';
// import VipContextProvider from './Context/VipContextProvider'

function App() {
  return (
    // <VipContextProvider>
      <div className="App">
        <header>
          <Navbar/>
        </header>
        <main>
          <Routes>
            <Route exact path ='/' element={<WhatsNew/>}/>
            <Route exact path ='/music' element={<Music/>}/>
            <Route exact path ='/animation' element={<Animation/>}/>
            <Route exact path ='/shows' element={<Shows/>}/>
            <Route exact path ='/partner' element={<Partner/>}/>
          </Routes>
        </main>
        <Footer/>
      </div>
    // </VipContextProvider>
  );
}

export default App;
