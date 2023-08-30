import React, { FC, useState, useEffect } from "react";
import "./electionBoard.css";

import { useRecords, useDecrypt, RecordsFilter } from '@puzzlehq/sdk';

const ElectionBoardPage: FC = () => {
    const [page, setPage] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    const [filter, setFilter] = useState<RecordsFilter>({
        program_id: 'puzzlers_voting_aleo_63.aleo',
        type: 'unspent'
    });

    const { request, records, totalRecordCount } = useRecords({
        page,
        filter,
        formatted: true
    });

    useEffect(() => {
        request();
    }, [page, filter, searchQuery]);

    if (!records) {
        return <div>Loading your records...</div>
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = () => {
        setPage(0);
        setFilter({
            ...filter,
            program_id: searchQuery,
        });
    };

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
        record: any;
    }
    
    const Record: FC<RecordProps> = ({ record }) => {
        const { decrypt, transitions } = useDecrypt(record.id);
        const newText = parsePlaintext(record.plaintext);
    
        useEffect(() => {
            decrypt();
        }, [decrypt]);

    
        return (
            <div style={recordStyle}>
                <p><strong>Id:</strong> {record.id}</p>
                <p><strong>Owner:</strong> {newText.owner}</p>
                <p><strong>Microcredits:</strong> {newText.microcredits}</p>
                <p><strong>_Nonce:</strong> {newText._nonce}</p>
            </div>
        );
    };

    const recordList = records.map(record => <Record key={record.id} record={record} />);

    

    return (
        <div className="address-place">
            <p>You have {totalRecordCount} records - </p>
            <input className="search-bar" type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Program ID" />
            <button onClick={handleSearchSubmit}>Search</button>
            <p>Your records:</p>
            {recordList}
        </div>
    );
}

export default ElectionBoardPage;
