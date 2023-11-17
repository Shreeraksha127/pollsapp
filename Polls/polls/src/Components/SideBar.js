import React from 'react';
import { useNavigate } from 'react-router-dom';
import CreatePollBtn from './CreatePollBtn';
import Filter from './Filter';

export default function SideBar() {
  const navigate = useNavigate();

  const handleCreatePoll = () => {
    navigate('/CreatePoll');
  };

  let styleSidebar = {
    marginLeft: '30px',
    float: 'left',
    
  };

  return (
    <div style={styleSidebar}>
      <div style={{marginLeft:"11px"}}>
      <CreatePollBtn onClick={handleCreatePoll} />
      </div>
      <Filter />
    </div>
  );
}
