
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideMenuNavbar from './Components/CompSideMenuNavbar';
import Dashboard from './Pages/PageDashboard';
import ExcelFilePassRemover from './Pages/PageExcelFilePassRemover';
import SystemHealth from './Pages/PageSystemHealth';
import About from './Pages/PageAbout';
import Help from './Pages/PageHelp';
import Footer from './Components/CompFooterBar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <SideMenuNavbar />
        <div className="AppContent max-width-100 container my-3">
          <Routes>
            <Route path="/*" exact component={Dashboard} element={<Dashboard />}/>
            <Route path="/pass_remover" exact component={ExcelFilePassRemover} element={<ExcelFilePassRemover />}/>
            <Route path="/system_health" component={SystemHealth} element={<SystemHealth />}/>
            <Route path="/about" component={About} element={<About />}/>
            <Route path="/help" component={Help} element={<Help />}/>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;