import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import Posts from './pages/Posts';
import Works from "./pages/Works";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/works" element={<Works />} />
          <Route path="/posts" element={<Posts />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
