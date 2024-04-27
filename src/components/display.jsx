import { useEffect, useState } from 'react';
import { supabase } from '../client';
import { Navbar, Nav, Form, FormControl, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './display.css';

function Display() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortType, setSortType] = useState(null);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    console.log(event.target.value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      let query = supabase.from('posts').select('*');

      if (sortType === 'date') {
        query = query.order('created_at', { ascending: false });
      } else if (sortType === 'upvotes') {
        query = query.order('num_upvotes', { ascending: false });
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setPosts(data);
      }
    };

    fetchPosts();
  }, [sortType]);

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

      <Button variant="outline-primary" onClick={() => setSortType('date')}>Sort by Date</Button>
      <Button variant="outline-primary" onClick={() => setSortType('upvotes')} className="ml-2">Sort by Upvotes</Button>

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