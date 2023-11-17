import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './style.css';
import Votegen from "./Votegen";
import { DataGrid } from '@mui/x-data-grid';
import TableGen from "./TableGen";

function LeftComp() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);



  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://192.168.141.35:8000/polls/api5/polls/${id }/`);
      const data = await response.json();
      setQuestion(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!question) {
    return <p>Loading...</p>;
  }

  const { Question, OptionVote, Tags } = question;

  const handleVoteClick = () => {
    navigate(`/vote/${id }`); // Redirect to "/vote/1" or specific question number
  };

  const totalVotes = Object.values(OptionVote).reduce((sum, votes) => sum + parseInt(votes), 0);

  const rows = Object.entries(OptionVote).map(([option, votes], index) => ({
    id: index + 1,
    option,
    votes,
  }));
  const handleVoteDelete = async () => {
    const confirmation = window.confirm('Are you sure you want to delete the poll?');
    
    if (confirmation) {
      try {
        await fetch(`http://192.168.141.35:8000s/polls/api/question/${id}/`, {
          method: 'DELETE',
         
        });
        navigate('/');
        
      } catch (error) {
        console.error(error);
      }
    }
  };

  
  const columns = [
    { field: 'id', headerName: 'Number', width: 100 },
    { field: 'option', headerName: 'Option', width: 150 },
    { field: 'votes', headerName: 'Votes', width: 150 },
  ];

  // Helper function to capitalize the first letter of a string
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div style={{ padding: '27px', width: '1000px', height: '80px' }}>
      <div style={{ paddingLeft: '17px'}}>
        <h1>{Question}</h1>
        
        <Votegen buttonName="Vote on this poll" onClick={handleVoteClick} />
        
      </div>
      
      <div style={{ marginTop: 15, marginLeft: 17 }}>
        <TableGen rows={rows} columns={columns} height={250} width={400} />
      </div>
      <div>
      <p style={{ paddingLeft: '19px',float:'Left' }}>Tags: {Tags.map(tag => capitalizeFirstLetter(tag)).join(', ')}</p>
      <p style={{ marginLeft: '650px', marginTop: '0px' }}>Total votes: {totalVotes}</p>
      </div>
     
      <div style={{marginTop:'5px' ,clear:'Left',marginLeft: 17}}>
      <Votegen buttonName="Delete this poll" onClick={handleVoteDelete} style={{ backgroundColor: '#FF6865', color: 'white' }}/>
      </div>
      
    </div>
  );
}

export default LeftComp;
