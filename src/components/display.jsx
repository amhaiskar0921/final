import { useEffect, useState } from 'react';
import { supabase } from '../client';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './display.css';

function Display() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    console.log(event.target.value);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select('*');

    if (error) {
      console.error('Error: ', error);
    } else {
      setPosts(data);
    }
  }

  return (
    <div className='post-gallery'>
      <Navbar bg="light" expand="lg" className="justify-content-between">
        <Navbar.Brand href="/">Musical HotTakes</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/create">Add HotTake</Nav.Link>
        </Nav>
        <Form inline="true">
          <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={handleSearch} />
        </Form>
      </Navbar>
      {posts.filter(post => post.title.includes(searchQuery)).map((post) => (
        <LinkContainer key={post.id} to={`/posts/${post.id}`}>
          <Card className='post-card'>
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>Upvotes: {post.num_upvotes}</Card.Text>
              <Card.Text>Created at: {new Date(post.created_at).toLocaleString()}</Card.Text>
            </Card.Body>
          </Card>
        </LinkContainer>
      ))}
    </div>
  );
}

export default Display;