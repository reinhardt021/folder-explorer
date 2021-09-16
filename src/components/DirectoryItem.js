import React, { useEffect, useState } from 'react';
import { 
    Box,
    HStack,
    VStack,
    Icon,
    Text,
} from "@chakra-ui/react";
import { 
    FaChevronDown,
    FaChevronRight,
    FaFileAlt,
    FaFolder,
    FaFolderOpen,
} from "react-icons/fa";
import prettyBytes from 'pretty-bytes';
import { TYPE_FILE, TYPE_FOLDER } from '../constants';
import { getDirectoryList } from '../helpers';

const DirectoryItem = (props) => {
    const {
        type,
        name,
        size,
        children,
    } = props.item;
    const [folderOpened, setFolderOpened] = useState(false);

    const toggleFolder = () => {
        setFolderOpened(!folderOpened);
    };

    const getIcons = (type, folderOpened) => {
        let chevronIcon = null;
        let itemIcon = <Icon as={FaFileAlt} boxSize="1.5em"/>;
        if (type === TYPE_FOLDER) {
            chevronIcon = folderOpened 
                ? <Icon as={FaChevronDown} onClick={toggleFolder}/>
                : <Icon as={FaChevronRight} onClick={toggleFolder}/>;
            itemIcon = folderOpened 
                ? <Icon as={FaFolderOpen} boxSize="1.5em" onClick={toggleFolder}/>
                : <Icon as={FaFolder} boxSize="1.5em" onClick={toggleFolder}/>;
        }

        return (
            <React.Fragment>
                <Box width="1em" height="1em">
                    {chevronIcon}
                </Box>
                <Box width="1em" height="1em">
                    {itemIcon}
                </Box>
            </React.Fragment>
        );
    };

    const getDirectoryChildren = (children) => {
        return (
            <Box>
                <VStack align="left">
                    <Box>
                        <HStack>
                            <Box width="2em" height="1em">
                            </Box>
                            <Box>
                                <VStack align="left" spacing={6}>
                                    {getDirectoryList(children)}
                                </VStack>
                            </Box>
                        </HStack>
                    </Box>
                </VStack>
            </Box>
        );
    };

    return (
        <React.Fragment>
            <Box>
                <HStack>
                    {getIcons(type, folderOpened)}
                    <Box height="1em" paddingLeft={2}>
                        <Text>{name}</Text>
                    </Box>
                    <Box height="1em" paddingLeft={2}>
                        {type === TYPE_FILE
                            && <Text>{ prettyBytes(size, {maximumFractionDigits: 0}) }</Text>}
                    </Box>
                </HStack>
            </Box>
            {type === TYPE_FOLDER 
                && children
                && folderOpened
                && getDirectoryChildren(children)}
        </React.Fragment>
    );
};

export default DirectoryItem;
