import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TopBar from './components/TopBar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [error, setError] = useState(null);

  // Load dark mode preference from localStorage
  useEffect(() => {
    try {
      const savedDarkMode = localStorage.getItem('darkMode');
      if (savedDarkMode !== null) {
        setIsDarkMode(JSON.parse(savedDarkMode));
      }
    } catch (err) {
      console.error('Error loading dark mode preference:', err);
    }
  }, []);

  // Save dark mode preference to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    } catch (err) {
      console.error('Error saving dark mode preference:', err);
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Add error boundary
  if (error) {
    return (
      <div className="error-container">
        <h1>Something went wrong!</h1>
        <p>{error.message}</p>
        <button onClick={() => window.location.reload()}>Reload Page</button>
      </div>
    );
  }

  console.log('App component rendering, isDarkMode:', isDarkMode);

  return (
    <Router basename="/chatisthisreal">
      <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
        <TopBar isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />} />
            <Route path="/about" element={<About isDarkMode={isDarkMode} />} />
            <Route path="/contact" element={<Contact isDarkMode={isDarkMode} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;