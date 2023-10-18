import React from 'react';

export const DictionaryButtons = ({ onKeepClick, onDeleteClick, onMergeClick, onReviewClick }) => {
    return(
        <div class='dictionary-buttons'>
            <button onClick={onKeepClick}>Keep</button>
            <button onClick={onDeleteClick}>Delete</button>
            <button onClick={onMergeClick}>Merge</button>
            <button onClick={onReviewClick}>Re-Review</button>
        </div>
    )
};

export default DictionaryButtons;