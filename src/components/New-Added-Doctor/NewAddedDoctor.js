import React from 'react'
import { Table } from "@material-ui/core";
import { useSelector } from 'react-redux';
import { NewLists } from './NewLists';

const NewAddedDoctor = () => {

    const stateDate = useSelector(state => state);
    console.log("stateData",stateDate)

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Practising At</th>
                        <th>Speciality</th>
                        <th>Consult Fees</th>
                        <th>Experience</th>
                        <th>Shedule</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {stateDate.DocList.map(doc =>
                        <NewLists doctor={doc} key={doc.phone} />
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default NewAddedDoctor
