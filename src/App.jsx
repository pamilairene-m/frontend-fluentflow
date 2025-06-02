import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import PublicSpeakingApp from './components/PublicSpeakingApp';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Game from './components/Game';
function App() {
  return (  
    <AuthProvider>
    <div className="min-h-screen bg-gray-50"> {/* Add this wrapper */}
      <Router>
        <Navbar />
        <main className="container mx-auto px-4 py-8"> {/* Add container */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route 
  path="/game" 
  element={
    <ProtectedRoute>
      <Game />
    </ProtectedRoute>
  } 
/>
         <Route 
  path="/tips" 
  element={
    <ProtectedRoute>
      <PublicSpeakingApp />
    </ProtectedRoute>
  } 
/>
          </Routes>
        </main>
      </Router>
    </div>
    </AuthProvider>
  );
}

export default App;
