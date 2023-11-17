import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Votegen from "./Votegen";

function VoteComp() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://192.168.141.35:8000/polls/api5/polls/${id}/`);
      const data = await response.json();
      setQuestion(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleVote = async () => {
    if (selectedOption) {
      try {
        const payload = {
          incrementOption: selectedOption,
        };

        const response = await fetch(`http://192.168.141.35:8000/polls/api4/polls/${id}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const updatedResponse = await fetch(`http://192.168.141.35:8000/polls/api5/polls/${id}/`);
          const updatedPollData = await updatedResponse.json();

          const previousVoteCount = question?.OptionVote?.[selectedOption];
          const currentVoteCount = updatedPollData.OptionVote?.[selectedOption];

          console.log(previousVoteCount);
          console.log(currentVoteCount);

          if (currentVoteCount !== undefined && currentVoteCount === previousVoteCount + 1) {
            alert('Voted Successfully!');
            navigate(`/polldetail/${id}`);
          } else {
            alert('Voting Failed');
          }

          // Update the question state with the updated poll data
          setQuestion(updatedPollData);
        } else {
          alert('Voting Failed');
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('Select an option');
    }
  };

  if (!question) {
    return <p>Loading...</p>;
  }

  const { Question, OptionVote } = question;

  let radioStyle = {
    margin: '20px',
    paddingLeft:'20px'
  };

  return (
    <div style={radioStyle} >
      <h2>{Question}</h2>
      <div id="new">
        {Object.entries(OptionVote).map(([option, votes]) => (
          <React.Fragment key={option}>
            <label>
              <input
                type="radio"
                name="voteOption"
                value={option}
                checked={selectedOption === option}
                onChange={handleOptionChange}
              />
              {option}
            </label>
            <br />
          </React.Fragment>
        ))}
        <div style={{marginTop:'10px'}}>
        <Votegen buttonName="Vote" onClick={handleVote}  />
        </div>
      </div>
    </div>
  );
}

export default VoteComp;
