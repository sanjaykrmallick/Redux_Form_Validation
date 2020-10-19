import React from "react";
import { UncontrolledPopover, PopoverHeader, PopoverBody } from "reactstrap";

export default function DoctorSchedule(props) {
  const { id, availability } = props.data;
  const timingData = {
    t8: "8 AM",
    t9: "9 AM",
    t10: "10 AM",
    t11: "11 AM",
    t12: "12 PM",
    t13: "1 PM",
    t14: "2 PM",
    t15: "3 PM",
    t16: "4 PM",
    t17: "5 PM",
    t18: "6 PM",
    t19: "7 PM",
    t20: "8 PM",
    t21: "9 PM",
    t22: "10 PM",
    t23: "11 PM",
  };

  const monday = availability.monday.map((time, i) => {
    return (
      <span key={i}>
        {timingData["t" + time.from]} - {timingData["t" + time.to]}
        {availability.monday[i + 1] ? " & " : " "}
      </span>
    );
  });

  const tuesday = availability.tuesday.map((time, i) => {
    return (
      <span key={i}>
        {timingData["t" + time.from]} - {timingData["t" + time.to]}
        {availability.tuesday[i + 1] ? " & " : " "}
      </span>
    );
  });
  const wednesday = availability.wednesday.map((time, i) => {
    return (
      <span key={i}>
        {timingData["t" + time.from]} - {timingData["t" + time.to]}
        {availability.wednesday[i + 1] ? " & " : " "}
      </span>
    );
  });
  const thursday = availability.thursday.map((time, i) => {
    return (
      <span key={i}>
        {timingData["t" + time.from]} - {timingData["t" + time.to]}
        {availability.thursday[i + 1] ? " & " : " "}
      </span>
    );
  });
  const friday = availability.friday.map((time, i) => {
    return (
      <span key={i}>
        {timingData["t" + time.from]} - {timingData["t" + time.to]}
        {availability.friday[i + 1] ? " & " : " "}
      </span>
    );
  });
  const saturday = availability.saturday.map((time, i) => {
    return (
      <span key={i}>
        {timingData["t" + time.from]} - {timingData["t" + time.to]}
        {availability.saturday[i + 1] ? " & " : " "}
      </span>
    );
  });
  const sunday = availability.sunday.map((time, i) => {
    return (
      <span key={i}>
        {timingData["t" + time.from]} - {timingData["t" + time.to]}
        {availability.sunday[i + 1] ? " & " : " "}
      </span>
    );
  });

  return (
    <>
      <UncontrolledPopover
        trigger='legacy'
        placement='top'
        target={"availability_" + id}>
        <PopoverHeader>Schedule</PopoverHeader>
        <PopoverBody>
          {monday.length ? (
            <>
              <p>Mon: {monday}</p>
              <hr />
            </>
          ) : null}

          {tuesday.length ? (
            <>
              <p>Tue: {tuesday}</p>
              <hr />
            </>
          ) : null}

          {wednesday.length ? (
            <>
              <p>Wed: {wednesday}</p>
              <hr />
            </>
          ) : null}

          {thursday.length ? (
            <>
              <p>Thur: {thursday}</p>
              <hr />
            </>
          ) : null}

          {friday.length ? (
            <>
              <p>Fri: {friday}</p>
              <hr />
            </>
          ) : null}

          {saturday.length ? (
            <>
              <p>Sat: {saturday}</p>
              <hr />
            </>
          ) : null}

          {sunday.length ? (
            <>
              <p>Sun: {sunday}</p>
              <hr />
            </>
          ) : null}
        </PopoverBody>
      </UncontrolledPopover>
    </>
  );
}
