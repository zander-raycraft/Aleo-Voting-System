import React from 'react'
import ReactDOM from 'react-dom/client';
import { PuzzleWalletProvider, PuzzleWeb3Modal } from '@puzzlehq/sdk';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from "./pages/Landing/LandingPage.tsx"
import VotingPage from './pages/Voting/voting.tsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <>
    <PuzzleWalletProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<LandingPage />} />
          <Route path='/voting' element={<VotingPage />} />
        </Routes>
      </BrowserRouter>
    </PuzzleWalletProvider>
  </>
);
