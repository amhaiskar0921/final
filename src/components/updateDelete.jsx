import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client'; 
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching post:', error);
      } else {
        setTitle(data.title);
        setContents(data.contents);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error } = await supabase
      .from('posts')
      .update({ title, contents })
      .eq('id', id);

    if (error) {
      console.error('Error updating post:', error);
    } else {
      navigate(`/posts/${id}`);
    }
  };


  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} required/>
      </Form.Group>

      <Form.Group controlId="contents">
        <Form.Label>Contents</Form.Label>
        <Form.Control as="textarea" rows={3} value={contents} onChange={e => setContents(e.target.value)} required/>
      </Form.Group>

      <Button variant="primary" type="submit">
        Update Post
      </Button>

      
    </Form>
  );
};

export default Edit;