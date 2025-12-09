import './App.css'
import Home from './pages/home'
import NavBar from './components/navbar.tsx';
// @ts-ignore
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {

  return (
    <>
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </Router>
    </>
  )
}

export default App
