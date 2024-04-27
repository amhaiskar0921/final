import { useState, useEffect } from 'react';
import { supabase } from '../client';
import { useParams } from 'react-router-dom';

import './updateDelete.css';

function Edit() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [speed, setSpeed] = useState('');
  const [color, setColor] = useState('');

  useEffect(() => {
    fetchCrewmate();
  }, []);

  async function fetchCrewmate() {
    const { data, error } = await supabase
      .from('crewmateData')
      .select('*')
      .eq('id', id);

    if (error) {
      console.error('Error: ', error);
    } else {
      setName(data[0].name);
      setSpeed(data[0].speed);
    }
  }

    async function handleSubmit(event) {
    event.preventDefault();

    await supabase
        .from('crewmateData')
        .update({ name: name, speed: speed, color: color })
        .eq('id', id);

    window.location = "/gallery";
    }
  
  async function handleDelete() {
    await supabase
      .from('crewmateData')
      .delete()
      .eq('id', id);
  
    window.location = "/gallery";
  }

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  return (
    <div className='update-delete-card'>
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
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default Edit;