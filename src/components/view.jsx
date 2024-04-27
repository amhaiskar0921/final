import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { LinkContainer } from 'react-router-bootstrap';

const PostView = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

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

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <Card className='post-card'>
    <Card.Body>
      <Card.Title>{post.title}</Card.Title>
      <Card.Text>{post.contents}</Card.Text>
      <Card.Text>Upvotes: {post.num_upvotes}</Card.Text>
      <Card.Text>Created at: {new Date(post.created_at).toLocaleString()}</Card.Text>
      <Button variant="primary" onClick={incrementUpvotes}>Upvote!</Button>
      <LinkContainer to={`/posts/${post.id}/edit`}>
        <Button variant="secondary" className="ml-2">Edit</Button>
      </LinkContainer>
    </Card.Body>
  </Card>
  );
};

export default PostView;