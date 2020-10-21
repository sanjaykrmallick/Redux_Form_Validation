import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
  } from "@material-ui/core";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faUser, faEye } from "@fortawesome/free-solid-svg-icons";
  import DoctorSchedule from "../Doctor-List/DoctorSchedule";

const NewAddedDoctor = () => {

    const stateData = useSelector(state => state);
    console.log("stateData",stateData)

    const TableBodyOfDoctorList = stateData.addDoctor.doctorList.map((doc) => {
        // console.log(e)
        const datas = {
          id: doc.id,
          availability: doc.availability,
        };
        return (
          <Fragment key={doc.id}>
            <TableRow key={doc.id} className="shadow-lg p-3 mb-5 bg-white rounded">
              <TableCell component='TableCell'>
                <span>
                  <FontAwesomeIcon icon={faUser} />
                </span>{" "}
                {doc.name ? doc.name : "N/A"}
              </TableCell>
              <TableCell>{doc.email}</TableCell>
              <TableCell>{doc.phone ? doc.phone : "N/A"}</TableCell>
              <TableCell>{doc.practiceAt? doc.practiceAt : "N/A"}</TableCell>
              
              <TableCell>
                {doc.specialty ? doc.specialty : "N/A"}
              </TableCell>
              <TableCell>{doc.consultFees ? doc.consultFees + " INR" : "N/A"}</TableCell>
              <TableCell>{doc.experience?doc.experience: "N/A"}</TableCell>
              <TableCell>
              {!doc.availability || doc.availability.length === 0 ? (
                <Fragment>Not provided yet!</Fragment>
              ) : (
                <Fragment>
                  <button id={"availability_" + doc.id}>
                    <span>
                      <FontAwesomeIcon icon={faEye} />
                    </span>{" "}
                    See
                  </button>
                  <DoctorSchedule key={doc.id} data={datas} />
                </Fragment>
              )}
            </TableCell>
              <TableCell>{doc.isActive ? "Active" : "InActive"}</TableCell>
            </TableRow>
          </Fragment>
        );
      });

    return (
        <Fragment>
             <div className="d-flex flex-column align-items-center">
                 <h3> Newly Added Doctors</h3>
              <hr />
              <TableContainer component={Paper}>
                <Table aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Practising At</TableCell>
                      <TableCell>Specialty</TableCell>
                      <TableCell>Consult Fees</TableCell>
                      <TableCell>Experience</TableCell>
                      <TableCell>Schedule</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{TableBodyOfDoctorList}</TableBody>
                </Table>
              </TableContainer>
            </div>
        </Fragment>
    )
}

export default NewAddedDoctor
