import { useState } from 'react';
import { supabase } from '../client'; // Adjust the path according to your project structure
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Comment = ({ postId }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error } = await supabase
      .from('comments')
      .insert([
        { content: content, post_id: postId },
      ]);

    if (error) {
      console.error('Error: ', error);
    } else {
      setContent('');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="content">
        <Form.Control type="text" value={content} onChange={e => setContent(e.target.value)} required />
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Comment
      </Button>
    </Form>
  );
};

export default Comment;