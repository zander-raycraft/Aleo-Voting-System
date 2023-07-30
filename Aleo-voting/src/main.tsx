import React from 'react'
import { PuzzleWalletProvider, PuzzleWeb3Modal } from '@puzzlehq/sdk';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./pages/Landing/LandingPage.tsx"

function App() {
  return (
    <>
      <PuzzleWalletProvider>
        <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
            </Routes>
        </Router>
        </div>
      </PuzzleWalletProvider>
      <PuzzleWeb3Modal 
        dAppName={'Aleo-Voting'} 
        dAppDescription={'ZK Voting system on the aleo blockchain'} 
        dAppUrl={''} 
        dAppIconURL={''}/>
    </>

  );
}

export default App;
