
import React from 'react';


export const DocAvail = ({avail}) => {

    const listItem = day => {
        let str = day + " : ";
        avail[day].forEach((key, index) => {
            str += key.fromTime + " to " + key.toTime;
            if (avail[day][index + 1]) {
                str += ", ";
            }
        });
        return str;
    };

    const availList = Object.keys(avail).map(day => {
        if (avail[day].length) {
            return (
                <li>{listItem(day)}</li>
            )
        }
    })

    return (
        <div style={{backgroundColor: 'yellow', color: 'royalblue'}}>
            <ul style={{listStyleType: 'none'}}>
                {availList}
            </ul>
        </div>
    )
}

export default DocAvail