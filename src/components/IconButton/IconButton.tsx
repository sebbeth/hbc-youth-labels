import React from 'react';
import './IconButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface IIconButtonProps {
    icon: string;
    disabled: boolean;
    selected: boolean;
    onButtonClicked(selected: boolean): void;
}

const IconButton: React.FC<IIconButtonProps> = (props) => {
    return (
        <button
            onClick={() => props.onButtonClicked(!props.selected)}
            disabled={props.disabled}
            className={(props.selected) ? "iconButtonRoot iconButtonSelected" : "iconButtonRoot"}
        >
            <FontAwesomeIcon icon={props.icon as IconProp} />
        </button>
    );
}

export default IconButton;
