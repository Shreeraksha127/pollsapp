import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style1.css';
import CreatePollBtn from './CreatePollBtn';
import { Button } from '@mui/material';
import Votegen from "./Votegen";

function Form() {
  const navigate = useNavigate();

  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['']);
  const [tags, setTags] = useState('');

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionRemove = (index) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
  };

  const handleTagChange = (e) => {
    setTags(e.target.value);
  };

  const handleCreatePollForm= async () => {
    try {
      if (question.trim() === '') {
        alert('Question cannot be empty');
        return;
      }

      const nonEmptyOptions = options.filter(option => option.trim() !== '');
      if (nonEmptyOptions.length < 2) {
        alert('At least two choices should be present');
        return;
      }

      const nonEmptyTags = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
      if (nonEmptyTags.length === 0) {
        alert('At least one tag should be entered');
        return;
      }

      const payload = {
        Question: question,
        OptionVote: Object.fromEntries(nonEmptyOptions.map(option => [option, '0'])),
        Tags: nonEmptyTags,
      };

      // Perform API call to create the poll
      const response = await fetch('http://192.168.141.35:8000/polls/api1/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Redirect to the specified URL after creating the poll
        navigate('/');
      } else {
        alert('Failed to create the poll');
      }
    } catch (error) {
      console.error(error);
    }
  };

  let formStyle = {
    margin: '30px',
    padding:'10px',
 
    
  };

  let inputStyle = {
    marginTop:'10px',
    display: 'block', // Add this CSS property to display each option in a new line
  };

  return (
    <div style={{backgroundColor:'#EBECF0',width:'800px',margin:'10px' ,marginLeft:'40px'}}>
    <div style={formStyle}>
      <h3>Question</h3>
      <input
        type="text"
        placeholder="Type your poll question here"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={inputStyle}
      /><br></br>
      <h3>Answer Options</h3>
      {options.map((option, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            style={inputStyle}
          />
          
          {index > 1 && (
            <div style={{marginTop:'10px'}} >
            <Votegen buttonName="Remove Option" onClick={() => handleOptionRemove(index)} />
            </div>
            /*<Button variant="contained" color="primary" size="small" style={{marginTop:10}} onClick={() => handleOptionRemove(index)}>Remove Option</Button>*/
          )}
        </div>
      ))}
      <div style={{marginTop:'10px'}} >
       <Votegen buttonName="Add Option" onClick={handleAddOption} style={{marginTop:10}}/>
       </div>
      {/*<Button variant="contained" color="primary" size="small"onClick={handleAddOption} style={{marginTop:10}}>Add Option</Button>*/}<br></br><br></br>
      <h3>Comma Separated Tags</h3>
      <input
        type="text"
        placeholder="Tag1,tag2,tag3"
        value={tags}
        onChange={handleTagChange}
        style={inputStyle}
      />
      <br />
      <div >
      <CreatePollBtn onClick={handleCreatePollForm} />
      </div>
      
    </div>
    
    </div>
  );
}

export default Form;
