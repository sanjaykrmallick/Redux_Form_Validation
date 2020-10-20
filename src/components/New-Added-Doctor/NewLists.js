import React, { useState } from "react";
import { DocAvail } from "./DocAvail";
import { Modal } from "@material-ui/core";

export const NewLists = ({ doctor }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <tr>
      <td>{doctor.name}</td>
      <td>{doctor.email}</td>
      <td>{doctor.phone}</td>
      <td>{doctor.practising}</td>
      <td>{doctor.speciality}</td>
      <td>{doctor.fees}</td>
      <td>{doctor.experience}</td>
      <td>
        <button onClick={() => setModalIsOpen(true)}>See</button>
        <Modal
          className='modalView'
          open={modalIsOpen}
          onClose={() => setModalIsOpen(false)}>
          <h4>Timing</h4>
          <DocAvail key={doctor._id} avail={doctor.availability} />
        </Modal>
      </td>
      <td>Active</td>
    </tr>
  );
};

export default NewLists;
