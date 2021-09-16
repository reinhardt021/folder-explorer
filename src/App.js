import './App.css';
import { 
    Box,
    Circle,
    Container,
    HStack,
    Text
} from "@chakra-ui/react"

function App() {
  return (
    <div className="App">
      <Box 
        bgColor="gray.200" 
        width="100%" 
        height="100%" 
        padding="20px" 
        color="gray.500"
      >
        <Text align="left">
            Window
        </Text>
        <Box 
          boxShadow="base"
          rounded="lg"
        >
            <Box bgColor="gray.400" align="left" padding="5px" paddingLeft="10px">
                <HStack>
                    <Circle size="15px" bgColor="gray.500"></Circle>
                    <Circle size="15px" bgColor="gray.500"></Circle>
                    <Circle size="15px" bgColor="gray.500"></Circle>
                </HStack>
            </Box>
            <Box bgColor="gray.50" padding="40px">
                <Container align="left">
                    <Box paddingBottom="30px">
                        <Container>
                            Bikes
                        </Container>
                        <Container>
                            Planes
                        </Container>
                        <Container>
                            Cars
                        </Container>
                    </Box>
                    <Box borderTop="1px" borderColor="gray.400" paddingTop="20px">
                        <p>Total Files: 5</p>
                        <p>Total Filesize: 921MB</p>
                    </Box>
                </Container>
            </Box>
        </Box>
      </Box>
    </div>
  );
}

export default App;
