import React, { useEffect, useState } from 'react';
import { 
    Box,
    HStack,
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

// TODO: move to a constants file
const TYPE_FILE = 'file';
const TYPE_FOLDER = 'folder';

const DirectoryItem = (props) => {
    const {
        type,
        name,
        size,
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
                ? <Icon as={FaFolderOpen} boxSize="1.5em"/>
                : <Icon as={FaFolder} boxSize="1.5em"/>;
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

    return (
        <Box>
            <HStack>
                {getIcons(type, folderOpened)}
                <Box height="1em" paddingLeft={2}>
                    <Text>{name}</Text>
                </Box>
                <Box height="1em" paddingLeft={2}>
                    {type === TYPE_FILE &&
                        <Text>{ prettyBytes(size, {maximumFractionDigits: 0}) }</Text>
                    }
                </Box>
            </HStack>
        </Box>
    );
};

export default DirectoryItem;
