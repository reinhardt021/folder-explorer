import React, { useEffect } from 'react';
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
        isOpen = false,
    } = props.item;

    const getIcons = (type, isOpen) => {
        let chevronIcon = null;
        let itemIcon = <Icon as={FaFileAlt} boxSize="1.5em"/>;
        if (type === TYPE_FOLDER) {
            chevronIcon = isOpen 
                ? <Icon as={FaChevronDown}/>
                : <Icon as={FaChevronRight}/>;
            itemIcon = isOpen 
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
                {getIcons(type, isOpen)}
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
