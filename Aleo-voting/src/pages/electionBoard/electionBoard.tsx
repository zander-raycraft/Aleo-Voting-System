import React, { FC, useState, useEffect } from "react";
import "./electionBoard.css";
import { useRecords, useDecrypt } from '@puzzlehq/sdk';

const ElectionBoardPage: FC = () => {
    const [page, setPage] = useState(0);
    const [filter, setFilter] = useState({
        program_id: 'puzzlers_voting_aleo_63.aleo',
        type: 'unspent'
    });

    const { request, records, totalRecordCount } = useRecords({
        page,
        formatted: true
    });

    useEffect(() => {
        request();
    }, [page, filter]);

    if (!records) {
        return <div>Loading your records...</div>
    }

    const parsePlaintext = (plaintext: string): { [key: string]: string } => {
        const cleanedText = plaintext.replace(/[{}]/g, '');
        const properties = cleanedText.match(/[^,]+:[^,]+/g);
        const parsed: { [key: string]: string } = {};
        if (properties) {
            properties.forEach(property => {
                const [key, value] = property.split(': ');
                parsed[key.trim()] = value.trim();
            });
        }
        return parsed;
    };

    const recordStyle = {
        border: '1px solid black',
        padding: '10px',
        margin: '10px',
        fontFamily: 'Montserrat, sans-serif',
        backgroundColor: 'darkgrey',
        color: 'rgb(107, 87, 255)',
        fontWeight: '200',
        fontSize: '18px',
    };

    interface RecordProps {
        record: any; // Replace 'any' with the actual type of your record
    }
    
    const Record: FC<RecordProps> = ({ record }) => {
        const { decrypt, transitions } = useDecrypt(record.id);
        const newText = parsePlaintext(record.plaintext);
    
        useEffect(() => {
            decrypt();
        }, [decrypt]);

    
        return (
            <div style={recordStyle}>
                <p><strong>Decrypt:</strong></p>
                {transitions && transitions.map((transition, index) => (
                    <div key={index}>
                        <p>Transition ID: {transition.transitionId}</p>
                        <p>Program: {transition.program}</p>
                        <p><strong>Function:</strong> {transition.function}</p>
                    </div>
                ))}
                <p><strong>Id:</strong> {record.id}</p>
                <p><strong>Owner:</strong> {newText.owner}</p>
                <p><strong>Microcredits:</strong> {newText.microcredits}</p>
                <p><strong>_Nonce:</strong> {newText._nonce}</p>
                <p><strong>count_y:</strong> {newText.count_y}</p>
            </div>
        );
    };

    const recordList = records.map(record => <Record key={record.id} record={record} />);

    

    return (
        <div className="address-place">
            <p>You have {totalRecordCount} records - </p>
            <p>Your records:</p>
            {recordList}
        </div>
    );
}

export default ElectionBoardPage;
