import logo from './logo.svg';
import './App.css';
import { Box } from "@chakra-ui/react"

function App() {
  return (
    <div className="App">
      <Box bg="#EDF2F7" width="100%" height="100%" padding={5} color="darkgrey">
        <h2>Window</h2>
        <div>
            <p>Total Files: 5</p>
            <p>Total Filesize: 921MB</p>
        </div>
      </Box>
    </div>
  );
}

export default App;
