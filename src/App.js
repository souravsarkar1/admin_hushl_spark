import './App.css';
import { Box } from '@chakra-ui/react';
import AllRouter from './router/AllRouter';
import Navbar1 from './components/Navbar1';

function App() {
  return (
    <Box>
      <Navbar1/>
      <AllRouter/>
    </Box>
  );
}

export default App;
