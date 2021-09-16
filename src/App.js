import { useEffect, useState } from 'react';
import './App.css';
import { 
    Box,
    Circle,
    Container,
    HStack,
    Icon,
    VStack,
    Text,
} from "@chakra-ui/react";
import { 
    FaChevronDown,
    FaChevronRight,
    FaFileAlt,
    FaFolder,
    FaFolderOpen,
} from "react-icons/fa";
import axios from 'axios';

const directoryURL = "https://dev21.becollective.com/api/v2/coding-challenges/dirs";
const TYPE_FILE = 'file';
const TYPE_FOLDER = 'folder';

function App() {
  const [ directoryItems, setDirectoryItems ] = useState([]);
  const [ directoryData, setDirectoryData ] = useState({
      fileCount: 0,
      totalSizeOfFiles: 0,
  });

  useEffect(() => {
      axios.get(directoryURL)
          .then((response) => setDirectoryItems(response.data));
  }, []);

  useEffect(() => {
      console.log(">>> directory items now = ", directoryItems);
      const finalStats = getDirectoryStats(directoryItems);
      console.log('>>> finalStats', finalStats);
      //setDirectoryData(finalStats);
  }, [directoryItems]);

  const getItemData = (directoryStats, item) => {
    console.log('>>> item', item);
    if (item.type === TYPE_FILE) {
      console.log('>>> FILE [' + item.name + ']');
      directoryStats.fileCount += 1;
      directoryStats.totalSizeOfFiles += item.size;
    }
    if (item.type === TYPE_FOLDER) {
      console.log('>>> FOLDER [' + item.name + ']');
      const subDirectoryStats = getDirectoryStats(item.children);
      directoryStats.fileCount += subDirectoryStats.fileCount;
      directoryStats.totalSizeOfFiles += subDirectoryStats.totalSizeOfFiles;
      console.log('>>> closing FOLDER [' + item.name + ']');
    }

    return directoryStats;
  };

  const getDirectoryStats = (directoryItems) => {
    const initialStats = {
      fileCount: 0,
      totalSizeOfFiles: 0,
    };  

    const directoryStats = directoryItems.reduce(getItemData, initialStats);
    console.log('>>> directoryStats', directoryStats);

    return directoryStats;
  };
    
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
                    <VStack paddingBottom="30px" align="left" spacing={6}>
                        <Box>
                            <HStack>
                                <Box width="1em" height="1em">
                                    <Icon as={FaChevronRight}/>
                                </Box>
                                <Box width="1em" height="1em">
                                    <Icon as={FaFolder} boxSize="1.5em"/>
                                </Box>
                                <Box height="1em" paddingLeft={2}>
                                    <Text>Bikes</Text>
                                </Box>
                            </HStack>
                        </Box>
                        <Box>
                            <HStack>
                                <Box width="1em" height="1em">
                                    <Icon as={FaChevronRight}/>
                                </Box>
                                <Box width="1em" height="1em">
                                    <Icon as={FaFolder} boxSize="1.5em"/>
                                </Box>
                                <Box height="1em" paddingLeft={2}>
                                    <Text>Planes</Text>
                                </Box>
                            </HStack>
                        </Box>
                        <Box>
                            <HStack>
                                <Box width="1em" height="1em">
                                    <Icon as={FaChevronDown}/>
                                </Box>
                                <Box width="1em" height="1em">
                                    <Icon as={FaFolderOpen} boxSize="1.5em"/>
                                </Box>
                                <Box height="1em" paddingLeft={2}>
                                    <Text>Cars</Text>
                                </Box>
                            </HStack>
                        </Box>
                        <Box>
                            <VStack align="left">
                                <Box>
                                    <HStack>
                                        <Box width="2em" height="1em">
                                        </Box>
                                        <Box>
                                            <VStack align="left" spacing={6}>
                                                <HStack>
                                                    <Box width="1em" height="1em">
                                                    </Box>
                                                    <Box width="1em" height="1em">
                                                        <Icon as={FaFileAlt} boxSize="1.5em"/>
                                                    </Box>
                                                    <Box height="1em" paddingLeft={2}>
                                                        <Text>Toyota</Text>
                                                    </Box>
                                                    <Box height="1em" paddingLeft={2}>
                                                        <Text>16KB</Text>
                                                    </Box>
                                                </HStack>
                                                <HStack>
                                                    <Box width="1em" height="1em">
                                                        <Icon as={FaChevronRight}/>
                                                    </Box>
                                                    <Box width="1em" height="1em">
                                                        <Icon as={FaFolder} boxSize="1.5em"/>
                                                    </Box>
                                                    <Box height="1em" paddingLeft={2}>
                                                        <Text>Mitsubishi</Text>
                                                    </Box>
                                                </HStack>
                                            </VStack>
                                        </Box>
                                    </HStack>
                                </Box>
                            </VStack>

                        </Box>
                    </VStack>
                    <Box borderTop="1px" borderColor="gray.400" paddingTop="20px">
                        <Text fontSize="xl">Total Files: { directoryData.fileCount }</Text>
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
