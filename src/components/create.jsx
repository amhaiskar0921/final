import { useState } from 'react';
import { supabase } from '../client';
import './create.css';

function Create() {
  const [name, setName] = useState('');
  const [speed, setSpeed] = useState('');
  const [color, setColor] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { data, error } = await supabase
      .from('crewmateData')
      .insert([
        { name: name, speed: speed, color: color},
      ]);

    if (error) {
      console.error('Error: ', error);
    } else {
      console.log('Crewmate added: ', data);
    }
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  return (
    <div className='create-container'>
      <h1>Create a New Crewmate</h1>
      <img src="./src/assets/group.png" alt="Group" />
      <br />
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </label>
        <label>
          Speed (mph):
          <input type="number" value={speed} onChange={e => setSpeed(e.target.value)} required />
        </label>
        
        <fieldset>
          <legend>Color:</legend>
          <input type="radio" value="red" checked={color === 'red'} onChange={handleColorChange} />
          <label>Red</label>
          <input type="radio" value="yellow" checked={color === 'yellow'} onChange={handleColorChange} />
          <label>Yellow</label>
          <input type="radio" value="orange" checked={color === 'orange'} onChange={handleColorChange} />
          <label>Orange</label>
          <input type="radio" value="green" checked={color === 'green'} onChange={handleColorChange} />
          <label>Green</label>
          <input type="radio" value="blue" checked={color === 'blue'} onChange={handleColorChange} />
          <label>Blue</label>
          <input type="radio" value="purple" checked={color === 'purple'} onChange={handleColorChange} />
          <label>Purple</label>
      </fieldset>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Create;