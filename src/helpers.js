import DirectoryItem from './components/DirectoryItem';

export const getDirectoryList = (directoryItems) => {
    return directoryItems.map((itemToRender, index) => 
        <DirectoryItem key={index+itemToRender.name} item={itemToRender} />);
};


