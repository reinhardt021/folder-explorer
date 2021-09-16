import DirectoryItem from './components/DirectoryItem';

export const getDirectoryList = (directoryItems) => {
    return directoryItems.map((itemToRender) => <DirectoryItem key={itemToRender.name} item={itemToRender} />);
};


