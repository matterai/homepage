import { Route, Routes } from 'react-router-dom';
import Index from "./pages/Index";
import Posts from './pages/Posts';
import Works from "./pages/Works";

function App() {
  return (
    <div>
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/works" element={<Works />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
