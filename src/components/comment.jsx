import { useState, useEffect } from 'react';
import { supabase } from '../client'; // Adjust the path according to your project structure
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Comment = ({ postId }) => {
  const [content, setContent] = useState('');
  const [comments, setComments] = useState([]);

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
      setComments([]);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId);

      if (error) {
        console.error('Error fetching comments:', error);
      } else {
        setComments(data);
      }
    };

    fetchComments();

    const subscription = supabase
    
  }, [comments]);

  return (
    <>
    {comments.map((comment) => (
            <div key={comment.id}>
            <p>{comment.content}</p>
            </div>
    ))}
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="content">
        <Form.Control type="text" value={content} onChange={e => setContent(e.target.value)} required />
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Comment
      </Button>
    </Form>
    </>
  );
};

export default Comment;