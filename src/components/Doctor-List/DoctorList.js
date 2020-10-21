import React, { Component, Fragment } from "react";
import {
  TablePagination,
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
import { makePostRequest } from "../../API/http-service";
import DoctorSchedule from "./DoctorSchedule";

export default class DoctorList extends Component {
  state = {
    doctors: [],
    page: 0,
    rowsPerPage: 10,
    totalCount: 0,
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    makePostRequest("https://api-dev.askvaidya.in/admin/v1/doctors", true, {
      pageNumber: 1,
      pageSize: 10,
      filters: {},
    })
      .then((res) => {
        console.log("Fetch_Data: ", res);

        res.doctors.forEach((e) => {
          if (e.availability) {
            let doctorTiming = {
              monday: [],
              tuesday: [],
              wednesday: [],
              thursday: [],
              friday: [],
              saturday: [],
              sunday: [],
            };
            e.availability.forEach((time) => {
              doctorTiming[time.day.toLowerCase()].push({
                from: time.from,
                to: time.to,
              });
            });
            e.availability = doctorTiming;
          }
        });
        this.setState({
          doctors: res.doctors,
          totalCount: res.totalCount,
          isLoading: false,
        });
      })
      .catch((err) => {
        console.log("Fetch_Data error: ", err);
        this.setState({ isLoading: false });
      });
  }

  _handleOnChangePage = (ev, newPage) => {
    this.setState({ page: newPage, isLoading: true }, () => {
      const { page, rowsPerPage } = this.state;

      makePostRequest("https://api-dev.askvaidya.in/admin/v1/doctors", true, {
        pageNumber: page + 1,
        pageSize: rowsPerPage,
        filters: {},
      })
        .then((res) => {
          console.log("Fetch_Data: ", res);

          res.doctors.forEach((e) => {
            if (e.availability) {
              let doctorTiming = {
                monday: [],
                tuesday: [],
                wednesday: [],
                thursday: [],
                friday: [],
                saturday: [],
                sunday: [],
              };
              e.availability.forEach((time) => {
                doctorTiming[time.day.toLowerCase()].push({
                  from: time.from,
                  to: time.to,
                });
              });
              e.availability = doctorTiming;
            }
          });
          this.setState({
            ...this.state,
            doctors: res.doctors,
            totalCount: res.totalCount,
            isLoading: false,
          });
        })
        .catch((err) => {
          console.log("Fetch_Data error: ", err);
          this.setState({ isLoading: false });
        });
    });
  };

  _handleOnChangeRowsPerPage = (e) => {
    this.setState(
      {
        page: 0,
        rowsPerPage: parseInt(e.target.value),
        isLoading: true,
      },
      () => {
        const { rowsPerPage } = this.state;

        makePostRequest("https://api-dev.askvaidya.in/admin/v1/doctors", true, {
          pageNumber: 1,
          pageSize: rowsPerPage,
          filters: {},
        })
          .then((res) => {
            console.log("Fetch_Data: ", res);

            res.doctors.forEach((e) => {
              if (e.availability) {
                let doctorTiming = {
                  monday: [],
                  tuesday: [],
                  wednesday: [],
                  thursday: [],
                  friday: [],
                  saturday: [],
                  sunday: [],
                };
                e.availability.forEach((time) => {
                  doctorTiming[time.day.toLowerCase()].push({
                    from: time.from,
                    to: time.to,
                  });
                });
                e.availability = doctorTiming;
              }
            });
            this.setState({
              doctors: res.doctors,
              totalCount: res.totalCount,
              isLoading: false,
            });
          })
          .catch((err) => {
            console.log("Fetch_Data error: ", err);
            this.setState({ isLoading: false });
          });
      }
    );
  };

  render() {
    const { page, rowsPerPage, totalCount, doctors } = this.state;
    const TableBodyOfDoctorList = doctors.map((doc) => {
      // console.log(e)
      const datas = {
        id: doc.id,
        availability: doc.availability,
      };
      return (
        <Fragment key={doc.id}>
          <TableRow key={doc.id} >
            <TableCell component='TableCell'>
              <span>
                <FontAwesomeIcon icon={faUser} />
              </span>{" "}
              {doc.name.full.trim() ? doc.name.full : "N/A"}
            </TableCell>
            <TableCell>{doc.email}</TableCell>
            <TableCell>{doc.phone ? doc.phone : "N/A"}</TableCell>
            <TableCell>
              {!doc.location ||
              (!doc.location?.streetAddress &&
                !doc.location?.city &&
                !doc.location?.state) ? (
                "N/A"
              ) : (
                <Fragment>
                  {doc.location.streetAddress
                    ? doc.location.streetAddress + ", "
                    : ""}
                  {doc.location.city ? doc.location.city + ", " : ""}
                  {doc.location.state ? doc.location.state : ""}
                </Fragment>
              )}
            </TableCell>
            <TableCell>
              {doc._specialty ? doc._specialty.name : "N/A"}
            </TableCell>
            <TableCell>{doc.fee ? doc.fee + " INR" : "N/A"}</TableCell>
            <TableCell>{doc.totalAppointment}</TableCell>
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
      <div className="d-flex flex-column align-items-center">
        <div>
          <h4>Doctors List</h4>
        </div>

        {TableBodyOfDoctorList.length ? (
          <Fragment>
            <div style={{width: "80%"}} className='className="shadow-lg p-3 mb-5 bg-white rounded'>
              <hr />
              <TableContainer component={Paper}>
                <Table aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Speciality</TableCell>
                      <TableCell>Consult Fees</TableCell>
                      <TableCell>Consults</TableCell>
                      <TableCell>Schedule</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{TableBodyOfDoctorList}</TableBody>
                </Table>
              </TableContainer>
            </div>

            <div>
              <TablePagination
                component='div'
                count={totalCount}
                page={page}
                onChangePage={this._handleOnChangePage}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={this._handleOnChangeRowsPerPage}
              />
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <hr className='container'/>
            <h5 className='text-center mt-4'>List is empty ...</h5>
          </Fragment>
        )}
      </div>
    );
  }
}
