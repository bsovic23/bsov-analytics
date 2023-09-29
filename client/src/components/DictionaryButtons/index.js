import React from 'react';

export const DictionaryButtons = ({ onKeepClick, onDeleteClick, onMergeClick }) => {
    return(
        <div>
            <button onClick={onKeepClick}>Keep</button>
            <button onClick={onDeleteClick}>Delete</button>
            <button onClick={onMergeClick}>Merge</button>
        </div>
    )
};

export default DictionaryButtons;