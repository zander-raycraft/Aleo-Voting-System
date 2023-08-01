import React, { FC } from "react";
import 'typeface-montserrat';
import "./voting.css"


const VotingPage: FC = () => {
    const userAddress = localStorage.getItem('userAddress');
    return(
        <> 
            <h1 className="address-place"
                    style={{
                        fontFamily: 'Montserrat, sans-serif'
                    }}
            > {userAddress? 'Wallet Address: ' + userAddress : 'Wallet not connected'} </h1>
            <div className="voting-main-container">
                <img src="townVote.png" alt="town vote" className="town-vote-icon"/>
                <h1 className="welcome-message"
                    style={{
                        fontFamily: 'Montserrat, sans-serif'
                    }}
                > <span>Welcome,</span> what would you like to do today?</h1> 
                <img src="townMap.png" alt="town-map" className="town-map-png"/>
                <div className="left-container">
                    <img src="votingArea.png" alt="voting-area"></img>
                    <img src="voterRegistration.png" alt="voting-area"></img>
                </div>
                <div className="right-container">
                    <img src="electionPoll.png" alt="voting-area"></img>
                    <img src="proposalDetails.png" alt="voting-area"></img>
                </div>
            </div>
        </>

    );
}

export default VotingPage;