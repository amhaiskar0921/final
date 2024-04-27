import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client'; 
import { Navbar, Form, Button } from 'react-bootstrap';


const Create = () => {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { data, error } = await supabase
      .from('posts')
      .insert([
        { title: title, contents: contents },
      ]);

    if (error) {
      console.error('Error: ', error);
    } else {
      console.log('Post added: ', data);
      navigate('/'); // navigate to home page after successful creation
    }
  };

  return (
    <div>
      <Navbar bg="light" expand="lg" className="justify-content-between">
          <Navbar.Brand href="/">Musical HotTakes</Navbar.Brand>
      </Navbar>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="contents">
          <Form.Label>Contents</Form.Label>
          <Form.Control as="textarea" rows={3} value={contents} onChange={e => setContents(e.target.value)} required />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Post
        </Button>
      </Form>
    </div>
  );
};

export default Create;