import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './pages/About';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Legal from './pages/Legal';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Community from './pages/Community';
import Publish from './pages/Publish';
import Map from './pages/Map';
import MyTree from './pages/MyTree';
import Contact from './pages/Contact';
import './index.css';
import Act from './pages/Act';
import UpdateProfil from './pages/UpdateProfil';

function App() {
  return (
    <Router>
        <ScrollToTop />
        <Navbar />
        <ToastContainer />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/community" element={<Community />} />
          <Route path="/act/:id" element={<Act />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/map" element={<Map />} />
          <Route path="/my-tree" element={<MyTree />} />
          <Route path="/update-profil" element={<UpdateProfil />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="*" element={<NotFound />} /> {/* Doit être la dernière route */}
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
