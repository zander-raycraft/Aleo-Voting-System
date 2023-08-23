import { Button } from '@mui/material';
import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './landing.css';
import 'typeface-montserrat';
import { PuzzleWalletProvider, PuzzleWeb3Modal, useAccount, useConnect } from '@puzzlehq/sdk';

const LandingPage: FC = () => {
  const { connect, loading } = useConnect();
  const { account } = useAccount();
  const [description, setDescription] = useState("Non-hackable voting system on the blockchain, using ZKPs");
  const [learnMore, setLearnMore] = useState("Learn more");
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handleLearnMoreClick = () => {
    if (expanded) {
      setDescription("Non-hackable voting system on the blockchain, using ZKPs");
      setLearnMore("Learn more");
    } else {
      setDescription("Introducing our secure and private voting app, powered by zero-knowledge proofs on the blockchain. With our app, you can conduct internal elections, facilitate decision-making processes, and gather valuable feedback on company policies and potential changes within your organization. The use of zero-knowledge proofs guarantees that votes are verified without any personal information being exposed, ensuring tamper-proof elections. Your employees can participate with confidence knowing that their votes are both anonymous and well-protected.");
      setLearnMore("Close");
    }
    setExpanded(!expanded);
  };

  const handleWalletClick = async () => {
    await connect();
    navigate('/voting');
  };

  return (
    <>
      <PuzzleWalletProvider>
        <div className='background'>
          <img src='./package-lock.jpeg' alt='logo' className='logo-image' />
          <img src='./collection-jar.jpg' alt='jar' className='jar-image' />
          <div className='main-container'>
            <div className={`sub-container-one ${expanded ? 'expanded' : ''}`}>
              <h1 style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Anonymous, Immutable, & Verifiable Voting.
              </h1>
              <h3 className={`description ${expanded ? 'expanded' : ''}`}
              style={{ fontFamily: 'Montserrat, sans-serif' }}> {description}</h3>
            </div>
            <div className={`sub-container-two ${expanded ? 'expanded' : ''}`}>
              <Button
                onClick={handleWalletClick}
                disabled={loading}
                style={{
                  position: "relative",
                  width: "45%",
                  height: "60%",
                  marginRight: "8%",
                  fontSize: "15px",
                  fontWeight: "600",
                  backgroundColor: "rgb(107, 87, 255)",
                  color: "white",
                  borderRadius: "5px",
                  fontFamily: 'Montserrat, sans-serif'

                }}>
                {'Connect Puzzle Wallet'}
              </Button>
              <button className='learn-more' onClick={handleLearnMoreClick}>
                {learnMore}
              </button>
            </div>
          </div>
        </div>
      </PuzzleWalletProvider>
      <PuzzleWeb3Modal
        dAppName={'Aleo-Voting'}
        dAppDescription={'ZK Voting system on the aleo blockchain'}
        dAppUrl={'http://localhost:5173'}
        dAppIconURL={''} />
    </>
  );
};

export default LandingPage;
