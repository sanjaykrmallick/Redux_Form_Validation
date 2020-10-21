import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import "./AddDoctor.styles.css";
import { doctorTiming } from "../../redux/actions/doctorTiming";

class DoctorTiming extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
      },
      isDirty: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
      appTiming: [
        { label: "08:00 AM", value: 8 },
        { label: "09:00 AM", value: 9 },
        { label: "10:00 AM", value: 10 },
        { label: "11:00 AM", value: 11 },
        { label: "12:00 PM", value: 12 },
        { label: "01:00 PM", value: 13 },
        { label: "02:00 PM", value: 14 },
        { label: "03:00 PM", value: 15 },
        { label: "04:00 PM", value: 16 },
        { label: "05:00 PM", value: 17 },
        { label: "06:00 PM", value: 18 },
        { label: "07:00 PM", value: 19 },
        { label: "08:00 PM", value: 20 },
        { label: "09:00 PM", value: 21 },
        { label: "10:00 PM", value: 22 },
      ],
      errors: {},
      values: [],
    };
    this._validateForm = this._validateForm.bind(this);
    this._handleOnChange = this._handleOnChange.bind(this);
    this._handleAdd = this._handleAdd.bind(this);
    this._handleDelete = this._handleDelete.bind(this);
  }

  _validateForm = () => {
    const { userData, isDirty, errors } = this.state;
    Object.keys(userData).forEach((e) => {
      if (isDirty[e] !== false) {
        const emptErr = userData[e].some((time) => {
          console.log("looping");
          return time.from === "-" || time.to === "-";
        });
        const valErr = userData[e].some((time) => {
          return time.from > time.to;
        });
        let prevVal = 0;
        const overlapErr = userData[e].some((time) => {
          if (prevVal <= time.from) {
            prevVal = time.to;
            return false;
          } else {
            return true;
          }
        });
        if (emptErr) {
          errors[e] = "Fields can't be Blank";
        }
        if (valErr) {
          errors[e] = "FROM must be greater then TO";
        }
        if (overlapErr) {
          errors[e] = "Please check appointment time, OVERLAPPING ...";
        } else {
          delete errors[e];
          isDirty[e] = false;
        }
        console.log(e);
      } else {
        this.setState({ errors });
        return Object.keys(errors).length ? errors : null;
      }
    });
  };

  _handleOnChange = (day, ind, val) => {
    const { userData, isDirty } = this.state;
    if (val.from === "" || val.from) {
      userData[day][ind].from = val.from;
      if (userData[day][ind].from >= userData[day][ind].to) {
        userData[day][ind].to = "";
      }
    } else if (val.to === "" || val.to) {
      userData[day][ind].to = val.to;
    } else {
      console.log("onChange Error ...");
    }

    isDirty[day] = true;

    this.setState({ userData, isDirty }, () => {
      this._validateForm();
      console.log("onChange, ", this.state);
    });
  };

  _handleTimingChange = (day, ind, val) => {
    const { appTiming } = this.state;
    const fromTimeOpt = appTiming.map((time, i) => {
      if (i === appTiming.length - 1) return null;
      return (
        <MenuItem key={time.value} value={time.value}>
          {time.label}
        </MenuItem>
      );
    });
    const toTimeOpt = appTiming.map((time, i) => {
      if (time.value <= val.from || i === 0) {
        return null;
      }
      return (
        <MenuItem key={time.value} value={time.value}>
          {time.label}
        </MenuItem>
      );
    });
    return (
      <Fragment>
        <div className="d-flex justify-content-around" style={{marginTop:"10px"}}>
        <FormControl key={ind} className='' style={{ flex: "3", height: "38px" , marginLeft:"20px"}}>
          <Select
            labelId='demo-simple-select-helper-label'
            id='demo-simple-select-helper'
            onChange={(e) =>
              this._handleOnChange(day, ind, {
                from: parseInt(e.target.value) ? parseInt(e.target.value) : "",
              })
            }>
            <MenuItem value=''>
              <em>Select From HH:MM</em>
            </MenuItem>
            {fromTimeOpt}
          </Select>
        </FormControl>
        <FormControl key={ind+"1"} className='' style={{ flex: "3", height: "38px" ,marginLeft:"20px" }}>
          <Select
            labelId='demo-simple-select-helper-label'
            id='demo-simple-select-helper'
            value={val.to}
            onChange={(e) =>
              this._handleOnChange(day, ind, {
                to: parseInt(e.target.value) ? parseInt(e.target.value) : "",
              })
            }>
            <MenuItem value=''>
              <em>Select From HH:MM</em>
            </MenuItem>
            {toTimeOpt}
          </Select>
        </FormControl>
        <button
          onClick={() => this._handleDelete(day, ind)}
          outline
          color='danger'
          className='btn btn-danger'
          style={{ flex: "1", height: "38px" , marginLeft:"20px" }}>
          Delete
        </button>
        </div>
      </Fragment>
    );
  };

  _handleAdd = (day) => {
    const { userData } = this.state;
    userData[day] = [...userData[day], { from: "", to: "" }];
    this.setState({
      isDirty: {
        day: true,
      },
    });
    this.setState({ userData }, () => {
      this._validateForm();
      console.log("added, ", userData);
    });
  };
  _handleDelete = (day, index) => {
    const { userData } = this.state;
    userData[day].splice(index, 1);
    this.setState({ userData }, () => {
      this._validateForm();
      console.log("deleted, ", userData);
    });
  };

  _handleSubmitData = (e) => {
    e.preventDefault();
    let isDirty = {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true,
    };
    this.setState({ isDirty }, () => {
      let errors = this._validateForm();
      // console.log(errors);
      if (!errors) {
        const { userData } = this.state;
        console.log("Make API call: ", userData);
        this.props.doctorTiming(userData);
        this.props.history.push("/newly-added-doctors");
      }
    });
  };

  render() {
    const { userData, errors } = this.state;

    return (
      <Fragment>
        <section
          className='d-flex justify-content-center'
          style={{ padding: "10px 80px", marginBottom: "15px" }}>
          <div className='formMainDiv'>
            <h5>Edit Work Timings</h5>
            <hr />
            {/* monday */}
            <div
              className='d-flex flex-column'
              style={{ padding: "10px 60px" }}>
              <div style={{ padding: "10px 0px" }}>
                <label htmlFor=''>Monday</label>
                <button
                  style={{ marginLeft: "15px" }}
                  className='btn btn-success'
                  onClick={() => this._handleAdd("monday")}>
                  Add
                </button>
                <hr/>
              </div>

              {React.Children.toArray(
                userData.monday.map((dat, i) => {
                  return this._handleTimingChange("monday", i, dat);
                })
              )}

              {errors && (
                <Fragment>
                  <small style={{ color: "red" }}>
                    {errors.monday}
                    {/* * Please fill above field */}
                  </small>
                </Fragment>
              )}
            </div>
            
            {/* tuesday */}
            <div
              className='d-flex flex-column'
              style={{ padding: "10px 60px" }}>
              <div style={{ padding: "10px 0px" }}>
                <label htmlFor=''>Tuesday</label>
                <button
                  style={{ marginLeft: "15px" }}
                  className='btn btn-success'
                  onClick={() => this._handleAdd("tuesday")}>
                  Add
                </button>
                <hr/>
              </div>

              {React.Children.toArray(
                userData.tuesday.map((dat, i) => {
                  return this._handleTimingChange("tuesday", i, dat);
                })
              )}

              {errors && (
                <Fragment>
                  <small style={{ color: "red" }}>
                    {errors.tuesday}
                    {/* * Please fill above field */}
                  </small>
                </Fragment>
              )}
            </div>
            {/* wednesday */}
            <div
              className='d-flex flex-column'
              style={{ padding: "10px 60px" }}>
              <div style={{ padding: "10px 0px" }}>
                <label htmlFor=''> Wednesday</label>
                <button
                  style={{ marginLeft: "15px" }}
                  className='btn btn-success'
                  onClick={() => this._handleAdd(" wednesday")}>
                  Add
                </button>
                <hr/>
              </div>

              {React.Children.toArray(
                userData.wednesday.map((dat, i) => {
                  return this._handleTimingChange("wednesday", i, dat);
                })
              )}

              {errors && (
                <Fragment>
                  <small style={{ color: "red" }}>
                    {errors.wednesday}
                    {/* * Please fill above field */}
                  </small>
                </Fragment>
              )}
            </div>
            {/* thursday */}
            <div
              className='d-flex flex-column'
              style={{ padding: "10px 60px" }}>
              <div style={{ padding: "10px 0px" }}>
                <label htmlFor=''>Thursday</label>
                <button
                  style={{ marginLeft: "15px" }}
                  className='btn btn-success'
                  onClick={() => this._handleAdd("thursday")}>
                  Add
                </button>
                <hr/>
              </div>

              {React.Children.toArray(
                userData.thursday.map((dat, i) => {
                  return this._handleTimingChange("thursday", i, dat);
                })
              )}

              {errors && (
                <Fragment>
                  <small style={{ color: "red" }}>
                    {errors.monday}
                    {/* * Please fill above field */}
                  </small>
                </Fragment>
              )}
            </div>
            {/* friday */}
            <div
              className='d-flex flex-column'
              style={{ padding: "10px 60px" }}>
              <div style={{ padding: "10px 0px" }}>
                <label htmlFor=''>Friday</label>
                <button
                  className='btn btn-success'
                  style={{ marginLeft: "15px" }}
                  onClick={() => this._handleAdd("monday")}>
                  Add
                </button>
                <hr/>
              </div>

              {React.Children.toArray(
                userData.friday.map((dat, i) => {
                  return this._handleTimingChange("friday", i, dat);
                })
              )}

              {errors && (
                <Fragment>
                  <small style={{ color: "red" }}>
                    {errors.friday}
                    {/* * Please fill above field */}
                  </small>
                </Fragment>
              )}
            </div>
            {/* saturday */}
            <div
              className='d-flex flex-column'
              style={{ padding: "10px 60px" }}>
              <div style={{ padding: "10px 0px" }}>
                <label htmlFor=''>Saturday</label>
                <button
                  className='btn btn-success'
                  style={{ marginLeft: "15px" }}
                  onClick={() => this._handleAdd("saturday")}>
                  Add
                </button>
                <hr/>
              </div>

              {React.Children.toArray(
                userData.saturday.map((dat, i) => {
                  return this._handleTimingChange("saturday", i, dat);
                })
              )}
              {errors && (
                <Fragment>
                  <small style={{ color: "red" }}>
                    {errors.monday}
                    {/* * Please fill above field */}
                  </small>
                </Fragment>
              )}
            </div>
            {/* sunday */}
            <div
              className='d-flex flex-column'
              style={{ padding: "10px 60px" }}>
              <div style={{ padding: "10px 0px" }}>
                <label htmlFor=''>Sunday</label>
                <button
                  className='btn btn-success'
                  style={{ marginLeft: "15px" }}
                  onClick={() => this._handleAdd("sunday")}>
                  Add
                </button>
                <hr/>
              </div>

              {React.Children.toArray(
                userData.sunday.map((dat, i) => {
                  return this._handleTimingChange("sunday", i, dat);
                })
              )}

              {errors && (
                <Fragment>
                  <small style={{ color: "red" }}>
                    {errors.monday}
                    {/* * Please fill above field */}
                  </small>
                </Fragment>
              )}
            </div>
            <hr />
            <div className='d-flex justify-content-end'>
              <button
                onClick={this._handleSubmitData}
                className='btn btn-primary '
                style={{ width: "8%" }}>
                Save
              </button>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    doctorTiming: (doctorTimingData) =>
      dispatch(doctorTiming(doctorTimingData)),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(DoctorTiming));
