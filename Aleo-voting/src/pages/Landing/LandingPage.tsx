import React, { FC, useState } from 'react';
import WalletLinkButton from '../../components/connectWalletButton';
import './landing.css';
import 'typeface-montserrat';

const LandingPage: FC = () => {
  const [popupOpen, setPopupOpen] = useState(false);

  const handleLearnMoreClick = () => {
    setPopupOpen(true);
  };

  const closeWindow = () => {
    setPopupOpen(false);
  }

  return (
    <div className='background'>
      <img src='./package-lock.jpeg' alt='logo' className='logo-image' />
      <img src='./collection-jar.jpg' alt='jar' className='jar-image' />
      <div className='main-container'>
        <div className='sub-container-one'>
          <h1 style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Anonymous, Immutable, & Verifiable Voting.
          </h1>
          <h3>Non-hackable voting system on the blockchain, using ZKPs</h3>
        </div>
        <div className='sub-container-two'>
          <div className='wallet-button'>
            <WalletLinkButton />
          </div>
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
  );
};

export default LandingPage;
