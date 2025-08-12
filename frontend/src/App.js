import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import TabNavigation from './components/TabNavigation';
import SinglePrediction from './components/SinglePrediction';
import BatchPrediction from './components/BatchPrediction';
import About from './components/About';

function App() {
  const [activeTab, setActiveTab] = useState('single');

  const renderContent = () => {
    switch (activeTab) {
      case 'single':
        return <SinglePrediction />;
      case 'batch':
        return <BatchPrediction />;
      case 'about':
        return <About />;
      default:
        return <SinglePrediction />;
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
          {renderContent()}
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              theme: {
                primary: 'green',
                secondary: 'black',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
