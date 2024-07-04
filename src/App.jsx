import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Component/Login';
import Register from './Component/Register';
import Home from './Component/Home';
function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={<Home />} />
                    {/* Add other routes here */}
                    <Route path="/" element={<Login />} /> {/* Default route to login */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
