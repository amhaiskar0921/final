import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Create from './components/create';
import Display from './components/display';
import Edit from './components/updateDelete';
import PostView from './components/view';

function App() {

  

  return (
    <Router>
      <div className="app-container">
        
        <Routes>
          <Route path="/" element={<Display />} />
          <Route path="/create" element={<Create />} />
          <Route path="/posts/:id" element={<PostView />} />
          <Route path="/posts/:id/edit" element={<Edit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;