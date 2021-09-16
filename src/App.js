import './App.css';
import { 
    Box,
    Circle,
    Container,
    HStack,
    Text
} from "@chakra-ui/react";
import { 
    FaChevronDown,
    FaChevronRight,
    FaFolder,
    FaFolderOpen,
} from "react-icons/fa";

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
            <Box 
                bgColor="gray.400" 
                align="left" 
                padding="7px" 
            >
                <HStack spacing="3px">
                    <Circle size="10px" bgColor="gray.500"></Circle>
                    <Circle size="10px" bgColor="gray.500"></Circle>
                    <Circle size="10px" bgColor="gray.500"></Circle>
                </HStack>
            </Box>
            <Box bgColor="gray.50" padding="40px">
                <Container align="left">
                    <Box paddingBottom="30px">
                        <Box>
                            <HStack>
                                <FaChevronRight/>
                                <FaFolder/>
                                <Text>Bikes</Text>
                            </HStack>
                        </Box>
                        <Box>
                            <HStack>
                                <FaChevronRight/>
                                <FaFolder/>
                                <Text>Planes</Text>
                            </HStack>
                        </Box>
                        <Box>
                            <HStack>
                                <FaChevronDown/>
                                <FaFolderOpen/>
                                <Text>Cars</Text>
                            </HStack>
                        </Box>
                    </Box>
                    <Box borderTop="1px" borderColor="gray.400" paddingTop="20px">
                        <Text fontSize="xl">Total Files: 5</Text>
                        <Text fontSize="xl">Total Filesize: 921MB</Text>
                    </Box>
                </Container>
            </Box>
        </Box>
      </Box>
    </div>
  );
}

export default App;
