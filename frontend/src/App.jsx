import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Visualize from './pages/Visualize';
import About from './pages/About';
import DatasetUpload from './pages/DatasetUpload';
import DatasetAnalysis from './pages/DatasetAnalysis';
import Recommendation from './pages/Recommendation';
import Results from './pages/Results';
import Navbar from './components/Common/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-surface-950 text-white selection:bg-primary-500/30">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<DatasetUpload />} />
          <Route path="/analyze" element={<DatasetAnalysis />} />
          <Route path="/recommend" element={<Recommendation />} />
          <Route path="/results" element={<Results />} />
          <Route path="/visualize" element={<Visualize />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
