import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client'
import { Navbar, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Comment from './comment';

const PostView = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

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
        setPost(data);
      }
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', id);

      if (error) {
        console.error('Error fetching comments:', error);
      } else {
        setComments(data);
      }
    };

    fetchComments();

    const subscription = supabase
    
  }, [id]);

  const incrementUpvotes = async () => {
    const { error } = await supabase
      .from('posts')
      .update({ num_upvotes: post.num_upvotes + 1 })
      .eq('id', post.id);
  
    if (error) {
      console.error('Error updating upvotes:', error);
    } else {
      setPost({ ...post, num_upvotes: post.num_upvotes + 1 });
    }
  };

  const handleDelete = async () => {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);
  
    if (error) {
      console.error('Error deleting post:', error);
    } else {
      navigate('/');
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <Navbar bg="light" expand="lg" className="justify-content-between">
            <Navbar.Brand href="/">Musical HotTakes</Navbar.Brand>
        </Navbar>
        
        <Card className='post-card'>
        <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.contents}</Card.Text>
        <Card.Text>Upvotes: {post.num_upvotes}</Card.Text>
        <Card.Text>Created at: {new Date(post.created_at).toLocaleString()}</Card.Text>
        <br />
        <Card.Text >Comments: </Card.Text>
        {comments.map((comment) => (
            <div key={comment.id}>
            <p>{comment.content}</p>
            </div>
        ))}
        <Comment postId={id} />
        <br/>
        <Button variant="primary" onClick={incrementUpvotes}>Upvote!</Button>
        <LinkContainer to={`/posts/${post.id}/edit`}>
            <Button variant="secondary" className="ml-2">Edit</Button>
        </LinkContainer>
        <Button variant="danger" type="button" onClick={handleDelete} className="ml-2">
            Delete Post
        </Button>
        </Card.Body>
    </Card>
  </div>
  );
};

export default PostView;