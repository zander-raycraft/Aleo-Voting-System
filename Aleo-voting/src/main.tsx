import React from 'react'
import ReactDOM from 'react-dom/client';
import { PuzzleWalletProvider } from '@puzzlehq/sdk';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from "./pages/Landing/LandingPage.tsx"
import VotingPage from './pages/Voting/voting.tsx';
import ElectionBoardPage from './pages/electionBoard/electionBoard.tsx';
import VoterRegistration from './pages/voteRegistration/voterRegistration.tsx';

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
          <Route path='/electionBoard' element={<ElectionBoardPage />} />
          <Route path='/voterRegistration' element={<VoterRegistration /> } />
        </Routes>
      </BrowserRouter>
    </PuzzleWalletProvider>
  </>
);
