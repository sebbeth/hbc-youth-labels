import React from 'react';
import './Label.css';
import youthLogo from './youth-logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
export interface ILabelProps {
    name: string;
    icons: string[];
    height: number;
    message: string;
}

const Label: React.FC<ILabelProps> = (props) => {
    return (
        <div className="container" style={{ height: `${props.height - 0.1}mm` }}>
            <div className="label">
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
                <div className={"logoAndText"}>
                    <img alt={"Youth Logo"} className={"logo"} src={youthLogo} />
                    <div className={"body"}>
                        <div className={"name"}>{props.name}</div>
                        <div className={"message"}>{props.message}</div>
                        <hr className={"line"} />
                    </div>
                </div>
            </div>
        </div>
    );
}



export default Label;
