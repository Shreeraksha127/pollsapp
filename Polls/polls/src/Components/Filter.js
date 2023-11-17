import React, { useContext, useEffect, useState } from 'react';
import { PollsContext } from './PollsContext';
import { Button } from '@mui/material';

function Filter() {
  const { handleTagSelection } = useContext(PollsContext);
  const [tags, setTags] = useState([]);
  const [checkedTags, setCheckedTags] = useState([]);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await fetch('http://192.168.141.35:8000/polls/tags/');
      const data = await response.json();
      setTags(data.Tags);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setCheckedTags([...checkedTags, value]);
    } else {
      setCheckedTags(checkedTags.filter(tag => tag !== value));
    }
  };

  const handleFilterByTags = () => {
    handleTagSelection(checkedTags);
  };

  let checkStyle = {
    border: "1px solid black",
    width: "200px",
    paddingBottom: "30px",
    paddingLeft: "10px",
    margin: "10px",
    backgroundColor: "#D3D3D3",
    marginRight: "40px"
  };

  let optionStyle = {
    marginTop: "30px",
  };

  // Helper function to capitalize the first letter of a string
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div style={checkStyle}>
      {tags.map((tag, index) => (
        <React.Fragment key={index}>
          <label>
            <input
              type="checkbox"
              style={optionStyle}
              value={tag}
              checked={checkedTags.includes(tag)}
              onChange={handleCheckboxChange}
            />
            {capitalizeFirstLetter(tag)}
          </label>
          <br />
        </React.Fragment>
      ))}

      <Button variant="contained" color="secondary" size="small" id="b1" style={{ marginTop: "30px" }} onClick={handleFilterByTags}>
        Filter by Tags
      </Button>
    </div>
  );
}

export default Filter;
