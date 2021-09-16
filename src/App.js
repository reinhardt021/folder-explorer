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
import prettyBytes from 'pretty-bytes';
import DirectoryItem from './components/DirectoryItem';

const directoryURL = "https://dev21.becollective.com/api/v2/coding-challenges/dirs";
const TYPE_FILE = 'file';
const TYPE_FOLDER = 'folder';

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
      axios.get(directoryURL)
          .then((response) => setDirectoryItems(response.data));
  }, []);

  useEffect(() => {
      console.log('>>> directoryItems', directoryItems);
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
    const directoryStats = directoryItems.reduce(getItemStats, initialStats);

    return directoryStats;
  };

  const getDirectoryList = (directoryItems) => {
      return directoryItems.map((directoryItem) => {
          const itemToRender = {
              ...directoryItem,
          };

          return <DirectoryItem item={itemToRender} />;
      });
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
                            <DirectoryItem item={{
                                type: "file",
                                name: "Bikedfafsf.pdf",
                                size: 91234,
                            }} />
                            <DirectoryItem item={{
                                type: "folder",
                                name: "Cars",
                                size: 23654,
                            }} />
                            <Box>
                                <VStack align="left">
                                    <Box>
                                        <HStack>
                                            <Box width="2em" height="1em">
                                            </Box>
                                            <Box>
                                                <VStack align="left" spacing={6}>
                                                    <DirectoryItem item={{
                                                        type: "file",
                                                        name: "Toyota",
                                                        size: 15654,
                                                        isOpen: true,
                                                    }} />
                                                    <DirectoryItem item={{
                                                        type: "folder",
                                                        name: "Mitsubishi",
                                                        size: 15654,
                                                        isOpen: false,
                                                    }} />
                                                </VStack>
                                            </Box>
                                        </HStack>
                                    </Box>
                                </VStack>

                            </Box>
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
