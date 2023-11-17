import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import TableGen from './TableGen';
import { PollsContext } from './PollsContext';

function PollsTable() {
  const { selectedTags } = useContext(PollsContext);
  const [initialRows, setInitialRows] = useState([]);

  useEffect(() => {
    console.log('data');
    if (selectedTags.length > 0) {
      fetchInitialData(`http://192.168.141.35:8000/polls/api3/?tags=${selectedTags.join(',')}`);
    } else {
      fetchInitialData('http://192.168.141.35:8000/polls/api2/');
    }
  }, [selectedTags]);

  
  const fetchInitialData = async (apiUrl) => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (Array.isArray(data)) {
        const rowsWithIds = data.map((row, index) => {
          const totalVotes = Object.values(row.OptionVote).reduce((sum, votes) => sum + votes, 0);
          const capitalizedTags = row.Tags.map(tag => tag.charAt(0).toUpperCase() + tag.slice(1));
          
          
          return { ...row, id:row.Id,questionNumber: index + 1, totalVotes, Tags: capitalizedTags };
        });

        setInitialRows(rowsWithIds);
      } else {
        console.error('Invalid data format:', data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  

  const columns = [
    { field: 'questionNumber', headerName: 'Number', width: 100 },
    { field: 'Question', headerName: 'Poll Question', width: 300, renderCell: (params) => <Link to={`/polldetail/${params.row.Id}`}>{params.row.Question}</Link> },
    { field: 'totalVotes', headerName: 'Total Votes', width: 150 },
    { field: 'Tags', headerName: 'Tags', width: 200 },
  ];

  return (
    <div style={{ marginTop: 65, marginLeft: 37 }}>
      {/* Display the DataGrid with the initial data */}
      <TableGen rows={initialRows} columns={columns} height={350} width={1100} />
    </div>
  );
}

export default PollsTable;
