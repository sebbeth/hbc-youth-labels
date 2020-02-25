import React from 'react';
import './Label.css';
import youthLogo from './youth-logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
export interface ILabelProps {
    name: string;
    icons: string[];
}

const Label: React.FC<ILabelProps> = (props) => {
    return (
        <div className="root">
            <img className={"logo"} src={youthLogo} />
            <div className={"body"}>
                <div className={"icons"}>
                    {
                        props.icons.map((icon, index) => {
                            return (<FontAwesomeIcon
                                key={index}
                                icon={icon as IconProp}
                                className="icon"
                            />)
                        })
                    }
                </div>
                <div className={"name"}>{parseName(props.name)}</div>
                <div className={"youCanCallMe"}>But you can call me...</div>
                <hr className={"line"} />
            </div>
        </div>
    );
}

function parseName(name: string) {
    if (name.indexOf("(") !== -1) {
        const regex = /\(([^)]+)\)/;
        const matches = name.match(regex);
        if (matches) return matches[1];
    } else {
        return name;
    }
}

export default Label;
