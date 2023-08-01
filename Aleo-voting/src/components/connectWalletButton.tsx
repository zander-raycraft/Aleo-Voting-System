import React, { useState } from 'react';
import "./connectWallet.css";
import { useConnect} from '@puzzlehq/sdk';

const WalletLinkButton: React.FC = () => {

  const [isHovered, setIsHovered] = useState(false);
  const { connect, data, error, loading } = useConnect();

    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };
    return (
      <div>
          <button className='wallet-button-connect'
          onClick={() => connect}
          disabled={loading}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          >
            Connect Wallet
          </button>
          {data && <p>Connected!</p>}
          {error && <p>Error connecting to wallet: {error}</p>}
      </div>
      );
}

export default WalletLinkButton;