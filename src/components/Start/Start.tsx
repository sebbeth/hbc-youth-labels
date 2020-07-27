import React from 'react';
import './Start.css';
import youthLogo from './youth-logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
export interface IStartProps {
    onSubmit(file: File): void;
}

const Start: React.FC<IStartProps> = (props) => {

    const fileInputRef = React.createRef<HTMLInputElement>();

    function submit() {
        if (fileInputRef.current?.files?.length === 1) {
            const file = fileInputRef.current?.files[0];
            props.onSubmit(file);
        }
    }

    return (
        <div className="start">
            <h2>HBC Youth Labels</h2>
                <span>Export <a href="https://hbc.elvanto.com.au/report/?id=d518fd62-9ee2-40d0-ac6f-c3bb35cc2803&authkey=AnyB6Hvz">this report</a> as a .csv and upload it here: </span>
                <label className="custom-file-upload">
    Upload CSV
                <input type="file" ref={fileInputRef} onChange={() => submit()} />
</label>
        </div>
    );
}

export default Start;
