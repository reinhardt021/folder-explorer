import { useEffect, useState } from 'react';
import './App.css';
import { 
    Box,
    Circle,
    Container,
    HStack,
    VStack,
    Text,
} from "@chakra-ui/react";
import axios from 'axios';
import prettyBytes from 'pretty-bytes';
import { DIRECTORY_API, TYPE_FILE, TYPE_FOLDER } from './constants';
import { getDirectoryList } from './helpers';

const windowActions = ['close', 'minimize', 'maximize'];
const windowActionItems = windowActions.map((windowAction, index) => {
  return <Circle key={index} size="10px" bgColor="gray.500"></Circle>;
});

function App() {
  const [ directoryItems, setDirectoryItems ] = useState([]);
  const [ directoryData, setDirectoryData ] = useState({
      fileCount: 0,
      totalSizeOfFiles: 0,
  });

  useEffect(() => {
      axios.get(DIRECTORY_API)
          .then((response) => setDirectoryItems(response.data));
  }, []);

  useEffect(() => {
      const finalStats = getDirectoryStats(directoryItems);
      setDirectoryData(finalStats);
  }, [directoryItems]);

  const getItemStats = (directoryStats, item) => {
    if (item.type === TYPE_FILE) {
      directoryStats.fileCount += 1;
      directoryStats.totalSizeOfFiles += item.size;
    }
    if (item.type === TYPE_FOLDER) {
      const subDirectoryStats = getDirectoryStats(item.children);
      directoryStats.fileCount += subDirectoryStats.fileCount;
      directoryStats.totalSizeOfFiles += subDirectoryStats.totalSizeOfFiles;
    }

    return directoryStats;
  };

  const getDirectoryStats = (directoryItems) => {
    const initialStats = {
      fileCount: 0,
      totalSizeOfFiles: 0,
    };  

    return directoryItems.reduce(getItemStats, initialStats);
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
                    {windowActionItems}
                </HStack>
            </Box>
            <Box bgColor="gray.50" padding="40px">
                <Container align="left">
                    <Box paddingBottom="30px">
                        <VStack align="left" spacing={6}>
                            {getDirectoryList(directoryItems)}
                        </VStack>
                    </Box>
                    <Box borderTop="1px" borderColor="gray.400" paddingTop="20px">
                        <Text fontSize="xl">Total Files: { directoryData.fileCount }</Text>
                        <Text fontSize="xl">
                            Total Filesize: { prettyBytes(directoryData.totalSizeOfFiles, {maximumFractionDigits: 0}) }
                        </Text>
                    </Box>
                </Container>
            </Box>
        </Box>
      </Box>
    </div>
  );
}

export default App;
