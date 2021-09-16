import './App.css';
import { 
    Box,
    Container,
    Text
} from "@chakra-ui/react"

function App() {
  return (
    <div className="App">
      <Box 
        bgColor="gray.200" 
        width="100%" 
        height="100%" 
        padding={5} 
        color="gray.500"
      >
        <Text align="left">
            Window
        </Text>
        <Box 
          boxShadow="base"
          rounded="lg"
        >
            <Box bgColor="gray.400">
                <p>Add circles here</p>
            </Box>
            <Box bgColor="gray.50">
                <Container align="left">
                    <p>Total Files: 5</p>
                    <p>Total Filesize: 921MB</p>
                </Container>
            </Box>
        </Box>
      </Box>
    </div>
  );
}

export default App;
