import React from 'react';

export default ({ commaSeparatedTechString }) => {
    const techTiles = commaSeparatedTechString.split(/\s*,\s*/).map((techName) => {
        return <div key={techName} className="projectTechName">{techName}</div>;
    });

    return (
        <div className="projectTech">
            {techTiles}
        </div>
    );
}
