import React from 'react';
import './Template.css';

export interface ITemplateProps {
}

const Template: React.FC<ITemplateProps> = (props) => {
    return (
        <div className="root">
            Template
        </div>
    );
}

export default Template;
