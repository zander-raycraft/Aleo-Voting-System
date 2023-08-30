import React, { FC, useState, useEffect } from "react";
import 'typeface-montserrat';
import "./voting.css"
import { useNavigate } from 'react-router-dom'
import { useRecords } from '@puzzlehq/sdk';


const VotingPage: FC = () => {

    type Record = {
        plaintext: string;
        id: string;
        height: number;
        timestamp: string;
        record_ciphertext: string;
        program_id: string;
        function_name: string;
        transition_id: string;
        transaction_id: string;
        output_index: number;
        ownerId: string | null;
        spent: boolean;
        serialNumber: string | null;
    };
    //Voting records
    const { request, records, error, loading, totalRecordCount } = useRecords({
        filter: {
          program_id: 'credits.aleo',
          type: 'unspent',
        },
        page: 2,
        formatted: true
    });
    const navigate = useNavigate();
    const navigateToPage = (page: string) => {
        navigate(`/${page}`)
    }

    useEffect(() => {
        request()
      }, []);

    //error handling
    if (!records) {
        return <div>Your records are fucked dawg</div>

    }


    const recordList = records.map(record => {
        return (
              <div key={record.id}>
                <p><strong>Plaintext:</strong> {record.plaintext}</p>
                <p><strong>ID:</strong> {record.id}</p>
                <p><strong>Height:</strong> {record.height}</p>
                <p><strong>Timestamp:</strong> {record.timestamp}</p>
                <p><strong>Record Ciphertext:</strong> {record.record_ciphertext}</p>
                <p><strong>Program ID:</strong> {record.program_id}</p>
                <p><strong>Function Name:</strong> {record.function_name}</p>
                <p><strong>Transition ID:</strong> {record.transition_id}</p>
                <p><strong>Transaction ID:</strong> {record.transaction_id}</p>
                <p><strong>Output Index:</strong> {record.output_index}</p>
                <p><strong>Owner ID:</strong> {record.ownerId ? record.ownerId : 'N/A'}</p>
                <p><strong>Spent:</strong> {record.spent ? 'Yes' : 'No'}</p>
                <p><strong>Serial Number:</strong> {record.serialNumber ? record.serialNumber : 'N/A'}</p>
              </div>
          );
       });

       console.log(recordList);

    return(
        <> 
            <div className="address-place"
                    style={{
                        fontFamily: 'Montserrat, sans-serif'
                    }}
            > 
            <p>Your records:</p>
                { recordList }
            </div>
            <div className="voting-main-container">
                <img src="townVote.png" alt="town vote" 
                    className="town-vote-icon"/>
                <h1 className="selcome-message"
                    style={{
                        fontFamily: 'Montserrat, sans-serif'
                    }}
                > <span>Welcome,</span> what would you like to do today?</h1> 
                <img src="townMap.png" alt="town-map" className="town-map-png"/>
                <div className="left-container">
                    <img src="votingArea.png" alt="voting-area"
                        onClick={() => navigateToPage('votingArea')}
                    ></img>
                    <img src="voterRegistration.png" alt="voting-area"
                        onClick={() => navigateToPage('voterRegistration')}
                    ></img>
                </div>
                <div className="right-container">
                    <img src="electionPoll.png" alt="voting-area"
                        onClick={() => navigateToPage('electionBoard')}
                    ></img>
                    <img src="proposalDetails.png" alt="voting-area"></img>
                </div>``
            </div>
        </>

    );
}

export default VotingPage;