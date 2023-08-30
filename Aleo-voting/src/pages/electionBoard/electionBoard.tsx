import React, { FC, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./electionBoard.css";
import { useRecords } from '@puzzlehq/sdk';

const ElectionBoardPage: FC = () => {
    //br info
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState({
        program_id: 'puzzler_voting_aleo_63.aleo',
        type: 'spent'
    });

    const { request, records, error, loading, totalRecordCount } = useRecords({
        page,
        formatted: true
    });
    
    useEffect(() => {
        request()
    }, [page, filter])
    
        //error handling
        if (!records) {
            return <div>Error with your records</div>
    
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
            <p>You have {totalRecordCount} records - </p>
            <p>Your records:</p>
                { recordList }
            </div>
        </>
    );
}

export default ElectionBoardPage;