import { Button } from '@mui/material';
import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './landing.css';
import 'typeface-montserrat';
import { PuzzleWalletProvider, PuzzleWeb3Modal, useAccount, useConnect } from '@puzzlehq/sdk';

const LandingPage: FC = () => {
  const { connect } = useConnect();
  const { account } = useAccount();
  const [popupOpen, setPopupOpen] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const navigate = useNavigate();

  const handleLearnMoreClick = () => {
    setPopupOpen(true);
  };
  
  const disconnectClick = () => {
    setUserAddress("");
  };

  const handleWalletClick = async () => {
    if (userAddress === '') {
      await connect();
      if (account?.address) {
        setUserAddress(account.address);
        localStorage.setItem('userAddress', account.address);
      }
    } else {
      disconnectClick();
      localStorage.removeItem(userAddress);
    }
    navigate('/voting');
  };

  const closeWindow = () => {
    setPopupOpen(false);
  }

  return (
    <>
      <PuzzleWalletProvider>
        <div className='background'>
          <img src='./package-lock.jpeg' alt='logo' className='logo-image' />
          <img src='./collection-jar.jpg' alt='jar' className='jar-image' />
          <div className='main-container'>
            <div className='sub-container-one'>
              <h1 style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Anonymous, Immutable, & Verifiable Voting.
              </h1>
              <h3 style={{ fontFamily: 'Montserrat, sans-serif' }}>Non-hackable voting system on the blockchain, using ZKPs</h3>
            </div>
            <div className='sub-container-two'>
                <Button
                    onClick={handleWalletClick}
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
                    {userAddress ? 'Connected, click to disconnect' : 'Connect Puzzle Wallet'}
                </Button>
              <button className='learn-more' onClick={handleLearnMoreClick}>
                Learn more
              </button>
            </div>
          </div>
          {popupOpen && (
            <div className='popup-window'>
                <button className='close-window' onClick={closeWindow}>X</button>
                <h2 style={{ 
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: "800",
                    fontSize: "35px",
                }}>Undercover <span style={{
                    color: "rgb(107, 87, 255)",
                }}>Democracy</span></h2>
                <div className='power-container'> 
                    <h3>Powered by<span><img src='./package-lock.jpeg' alt="temp" className="sideImage"/></span></h3>
                </div>
                <div className='paragraph-container'>
                    <p>
                        Introducing our secure and private voting app, powered by zero-knowledge proofs 
                        on the blockchain. With our app, you can conduct internal elections, facilitate 
                        decision-making processes, and gather valuable feedback on company policies and 
                        potential changes within your organization. The use of zero-knowledge proofs guarantees 
                        that votes are verified without any personal information being exposed, ensuring tamper-proof 
                        elections. Your employees can participate with confidence knowing that their votes are both 
                        anonymous and well-protected.
                    </p>
                </div>
            </div>
          )}
        </div>
      </PuzzleWalletProvider>
      <PuzzleWeb3Modal 
      dAppName={'Aleo-Voting'} 
      dAppDescription={'ZK Voting system on the aleo blockchain'} 
      dAppUrl={'http://localhost:5173'} 
      dAppIconURL={''}/>
    </>
  );
};

export default LandingPage;
