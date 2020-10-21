import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { makeGetRequest } from "../../API/http-service";
import { doctorDetail } from "../../redux/actions/doctorDetail";
import { MenuItem, Select } from "@material-ui/core";

import "./AddDoctor.styles.css";
const ramId = () => {
  //generate random Id
  return Math.floor(1000 + Math.random() * 9000);
};

class DoctorDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDirty: {
        name: "",
        specialty: "",
        experience: "",
        consultFees: "",
        qualification: "",
        practiceAt: "",
        languages: [],
        email: "",
        phone: "",
        gender: "",
        regNo: "",
        graduation: "",
        specialize: "",
        superSpecialize: "",
      },
      userData: {
        name: "",
        specialty: "",
        experience: "",
        consultFees: "",
        qualification: "",
        practiceAt: "",
        languages: [],
        email: "",
        phone: "",
        gender: "",
        regNo: "",
        graduation: "",
        specialize: "",
        superSpecialize: "",
      },
      errors: {},
      hasCharError: false,
      attachToken: true,
      specialties: [],
      languages: [
        "Hindi",
        "English",
        "Punjabi",
        "Bengali",
        "Marathi",
        "Telugu",
        "Tamil",
        "Gujrati",
        "Assamese",
        "Kannada",
        "Oriya",
        "Malayalam",
      ],
      isLoading: false,
    };
    this._handleOnChange = this._handleOnChange.bind(this);
    this._handleOnSubmit = this._handleOnSubmit.bind(this);
  }

  componentDidMount() {
    this._makeGetRequestDocSpeciality();
    console.log("IsSubmit :", this.props);
  }

  _makeGetRequestDocSpeciality = () => {
    return new Promise((resolve, reject) => {
      makeGetRequest(`https://api-dev.askvaidya.in/admin/v1/specialties`, true)
        .then((res) => {
          resolve(res);
          console.log("specialty resp :", res);
          this.setState({ specialties: res.specialties });
        })
        .catch((err) => {
          console.log("api error: ", err);
          reject(err);
        });
    });
  };

  _handleOnChange = (field, value) => {
    // debugger
    const { userData, isDirty } = this.state;
    if (!value && typeof value === "number") {
      userData[field] = "";
      isDirty[field] = true;
      this.setState({ userData, isDirty }, () => {
        this._validateForm();
        console.log(this.state);
      });
      return;
    } else if (field === "languages") {
      if (value.checked) {
        userData[field].push(value.value);
      } else {
        userData[field].splice(userData[field].indexOf(value.value), 1);
      }
    } else {
      userData[field] = value;
    }
    isDirty[field] = true;
    this.setState({ userData, isDirty }, () => {
      this._validateForm();
      console.log(this.state);
    });
  };

  _handleOnSubmit = (e) => {
    e.preventDefault();
    let isDirty = {
      name: true,
      specialty: true,
      experience: true,
      consultFees: true,
      qualification: true,
      practiceAt: true,
      languages: true,
      email: true,
      phone: true,
      gender: true,
      regNo: true,
      graduation: true,
      specialize: true,
      superSpecialize: true,
    };
    this.setState({ isDirty }, () => {
      let errors = this._validateForm();
      console.log(errors);
      if (!errors) {
        const { userData } = this.state;
        const data = {
          id: ramId(),
          ...userData,
        };
        this.props.doctorDetail({ data });
        console.log("Final API call: ", userData);
      }
    });
  };

  _validateForm() {
    // debugger;
    const { userData, isDirty, errors } = this.state;
    Object.keys(userData).forEach((each) => {
      switch (each) {
        case "name": {
          if (isDirty.name) {
            if (!userData.name.trim().length) {
              errors[each] = "*Required";
            } else if (userData.name.trim().length < 3) {
              errors[each] = "*Should be minimum of 3 characters";
            } else {
              delete errors[each];
              isDirty.name = false;
            }
          }
          break;
        }
        case "specialty": {
          if (isDirty.specialty) {
            if (!userData.specialty.trim().length) {
              errors[each] = "* Please select the above field";
            } else {
              delete errors[each];
              isDirty.specialty = false;
            }
          }
          break;
        }
        case "experience": {
          if (isDirty.experience) {
            if (userData.experience < 0) {
              errors[each] = "* Invalid Input";
            }
            if (!userData.experience) {
              errors[each] = "* Please fill above field";
            } else {
              delete errors[each];
              isDirty.experience = false;
            }
          }
          break;
        }
        case "consultFees": {
          if (isDirty.consultFees) {
            if (userData.consultFees < 0) {
              errors[each] = "* Invalid Input";
            }
            if (!userData.consultFees) {
              errors[each] = "* Please fill above field";
            } else {
              delete errors[each];
              isDirty.consultFees = false;
            }
          }
          break;
        }
        case "qualification": {
          if (isDirty.qualification) {
            if (!userData.qualification.trim().length) {
              errors[each] = "* Please fill above field";
            } else {
              delete errors[each];
              isDirty.qualification = false;
            }
          }
          break;
        }
        case "practiceAt": {
          if (isDirty.practiceAt) {
            if (!userData.practiceAt.trim().length) {
              errors[each] = "* Please fill above field";
            } else {
              delete errors[each];
              isDirty.practiceAt = false;
            }
          }
          break;
        }
        case "languages": {
          if (isDirty.languages) {
            if (!userData.languages.length) {
              errors[each] = "*At Least one language is required";
            } else {
              delete errors[each];
              isDirty.languages = false;
            }
          }
          break;
        }
        case "phone": {
          if (isDirty.phone) {
            if (
              userData.phone.toString().length < 10 ||
              userData.phone.toString().length > 10
            ) {
              errors[each] = "* Invalid Input:- 10 digits only";
            } else {
              if (!userData.phone) {
                errors[each] = "* Please fill above field";
              }
              delete errors[each];
              isDirty.phone = false;
            }
          }
          break;
        }
        case "email": {
          if (isDirty.email) {
            if (!userData.email.trim().length) {
              errors.email = "*Required";
            } else if (
              userData.email.trim().length &&
              !new RegExp(
                "^[a-zA-Z0-9]{1}[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,3}$"
              ).test(userData.email)
            ) {
              errors.email = "*Invalid Email";
            } else {
              delete errors[each];
              isDirty.email = false;
            }
          }
          break;
        }
        case "gender": {
          if (isDirty.gender) {
            if (!userData.gender.trim().length) {
              errors[each] = "* Please tick above field";
            } else {
              delete errors[each];
              isDirty.gender = false;
            }
          }
          break;
        }
        case "regNo": {
          if (isDirty.regNo) {
            if (!userData.regNo.trim().length) {
              errors[each] = "* Please fill above field";
            } else {
              delete errors[each];
              isDirty.regNo = false;
            }
          }
          break;
        }
        case "graduation": {
          if (isDirty.graduation) {
            if (!userData.graduation.trim().length) {
              errors[each] = "* Please fill above field";
            } else {
              delete errors[each];
              isDirty.graduation = false;
            }
          }
          break;
        }
        case "specialize": {
          if (isDirty.specialize) {
            if (!userData.specialize.trim().length) {
              errors[each] = "* Please fill above field";
            } else {
              delete errors[each];
              isDirty.specialize = false;
            }
          }
          break;
        }
        case "superSpecialize": {
          if (isDirty.superSpecialize) {
            if (!userData.superSpecialize.trim().length) {
              errors[each] = "* Please fill above field";
            } else {
              delete errors[each];
              isDirty.superSpecialize = false;
            }
          }
          break;
        }
        default: {
          console.log("Error in validation_switch_case ");
          break;
        }
      }
    });
    this.setState({ errors });
    return Object.keys(errors).length ? errors : null;
  }

  render() {
    const { userData, specialties, errors, languages } = this.state;
    const specialtyOptions = specialties.map((s) => {
      return (
        <MenuItem key={s.id} value={s.name}>
          {s.name}
        </MenuItem>
      );
    });

    const langCheckbox = languages.map((lang) => {
      return (
        <div key={lang} className='form-check-inline'>
          <label>
            <input
              type='checkbox'
              value={lang}
              onChange={(e) => this._handleOnChange("languages", e.target)}
              checked={userData.languages.includes(lang) ? true : false}
            />{" "}
            {lang}
          </label>
        </div>
      );
    });

    return (
      <Fragment>
        <section className='d-flex justify-content-center'>
          <form className='className="shadow-lg p-3 mb-5 bg-light rounded formMainDiv' onSubmit={this._handleOnSubmit} >
            <h5>Edit Basic Info</h5>
            <hr />
            <div className='formDiv'>
              <div className='form-group'>
                <label htmlFor='Doctor Name'>Name</label>
                <input
                  id='nameInput'
                  type='text'
                  name='name'
                  // onBlur={this._handleOnBlur}
                  // onFocus={this._handleOnFocus}
                  value={userData.name}
                  placeholder='Enter Your Name ...'
                  onChange={(e) => this._handleOnChange("name", e.target.value)}
                />
                {errors && (
                  <Fragment>
                    <small style={{ color: "red" }}>
                      {errors.name}
                      {/* * Please fill above field */}
                    </small>
                  </Fragment>
                )}
              </div>
              <div className='form-group'>
                <label htmlFor='Specialty'>Specialty</label>
                <Select
                  className='form-control'
                  id='specialtyInput'
                  name='specialty'
                  onChange={(e) =>
                    this._handleOnChange("specialty", e.target.value)
                  }>
                  <MenuItem value=''>
                    <em>Select Specialty</em>
                  </MenuItem>
                  {specialtyOptions}
                </Select>
                {errors && (
                  <Fragment>
                    <small style={{ color: "red" }}>
                      {errors.specialty}
                      {/* * Please fill above field */}
                    </small>
                  </Fragment>
                )}
              </div>
            </div>
            <div className='formDiv'>
              <div className='form-group'>
                <label htmlFor='experience'>Experience</label>
                <input
                  type='number'
                  id='experienceInput'
                  name='experience'
                  value={userData.experience}
                  min={0}
                  onChange={(e) =>
                    this._handleOnChange("experience", parseInt(e.target.value))
                  }
                />
                {errors && (
                  <Fragment>
                    <small style={{ color: "red" }}>
                      {errors.experience}
                      {/* * Please fill above field */}
                    </small>
                  </Fragment>
                )}
              </div>

              <div className='form-group'>
                <label htmlFor='COnsultant_fee'>Consult Fees</label>
                <input
                  type='number'
                  id='consultFeesInput'
                  name='consultFees'
                  value={userData.consultFees}
                  min={0}
                  onChange={(e) =>
                    this._handleOnChange(
                      "consultFees",
                      parseInt(e.target.value)
                    )
                  }
                />
                {errors && (
                  <Fragment>
                    <small style={{ color: "red" }}>
                      {errors.consultFees}
                      {/* * Please fill above field */}
                    </small>
                  </Fragment>
                )}
              </div>
            </div>
            <div className='formDiv'>
              <div className='form-group'>
                <label htmlFor='qualification'>Qualification</label>
                <input
                  type='text'
                  id='qualificationInput'
                  name='qualification'
                  value={userData.qualification}
                  onChange={(e) =>
                    this._handleOnChange("qualification", e.target.value.trim())
                  }
                />
                {errors && (
                  <Fragment>
                    <small style={{ color: "red" }}>
                      {errors.qualification}
                      {/* * Please fill above field */}
                    </small>
                  </Fragment>
                )}
              </div>
              <div className='form-group'>
                <label htmlFor=''>Practising At</label>
                <input
                  type='text'
                  name='practiceAt'
                  value={userData.practiceAt}
                  onChange={(e) =>
                    this._handleOnChange("practiceAt", e.target.value)
                  }
                />
                {errors && (
                  <Fragment>
                    <small style={{ color: "red" }}>
                      {errors.practiceAt}
                      {/* * Please fill above field */}
                    </small>
                  </Fragment>
                )}
              </div>
            </div>
            <div className='formDiv' id='langDiv'>
              <div>
                <label htmlFor=''>Languages</label>
              </div>
              <div>{langCheckbox}</div>
              {errors && (
                <Fragment>
                  <small style={{ color: "red" }}>
                    {errors.languages}
                    {/* * Please fill above field */}
                  </small>
                </Fragment>
              )}
            </div>
            <div className='formDiv'>
              <div className='form-group'>
                <label htmlFor='EmailId'>Email</label>
                <input
                  type='email'
                  name='email'
                  value={userData.email}
                  onChange={(e) =>
                    this._handleOnChange("email", e.target.value.trim())
                  }
                />
                {errors && (
                  <Fragment>
                    <small style={{ color: "red" }}>
                      {errors.email}
                      {/* * Please fill above field */}
                    </small>
                  </Fragment>
                )}
              </div>
              <div className='form-group'>
                <label htmlFor=''>Phone</label>
                <input
                  type='number'
                  name='phone'
                  value={userData.phone}
                  onChange={(e) =>
                    this._handleOnChange("phone", parseInt(e.target.value))
                  }
                />
                {errors && (
                  <Fragment>
                    <small style={{ color: "red" }}>
                      {errors.phone}
                      {/* * Please fill above field */}
                    </small>
                  </Fragment>
                )}
              </div>
            </div>
            <div className='formDiv'>
              <div>
                <label htmlFor=''>Gender</label>
                <div className='form-check-inline'>
                  <label className='form-check-label'>
                    <input
                      type='radio'
                      className='form-check-input'
                      name='gender'
                      value='Male'
                      checked={userData.gender === "Male" ? true : false}
                      onChange={(e) =>
                        this._handleOnChange("gender", e.target.value)
                      }
                    />
                    Male
                  </label>
                </div>
                <div className='form-check-inline'>
                  <label className='form-check-label'>
                    <input
                      type='radio'
                      className='form-check-input'
                      name='gender'
                      value='Female'
                      checked={userData.gender === "Female" ? true : false}
                      onChange={(e) =>
                        this._handleOnChange("gender", e.target.value)
                      }
                    />
                    Female
                  </label>
                </div>
              </div>
              <div>
                <label htmlFor=''>Medical Registration Number</label>
                <input
                  type='text'
                  name='regNo'
                  value={userData.regNo}
                  min={0}
                  onChange={(e) =>
                    this._handleOnChange("regNo", e.target.value.trim())
                  }
                />
                {errors && (
                  <Fragment>
                    <small style={{ color: "red" }}>
                      {errors.regNo}
                      {/* * Please fill above field */}
                    </small>
                  </Fragment>
                )}
              </div>
            </div>
            <div className='formDiv'>
              <div className='form-group'>
                <label htmlFor='comment'>Graduation</label>
                <textarea
                  type='textarea'
                  name='text'
                  className='form-control'
                  rows='4'
                  id='comment'
                  value={userData.graduation}
                  onChange={(e) =>
                    this._handleOnChange("graduation", e.target.value.trim())
                  }
                />
                {errors && (
                  <Fragment>
                    <small style={{ color: "red" }}>
                      {errors.qualification}
                      {/* * Please fill above field */}
                    </small>
                  </Fragment>
                )}
              </div>
              <div className='form-group'>
                <label htmlFor='comment'>Specialization</label>
                <textarea
                  name='text'
                  className='form-control'
                  rows='4'
                  id='comment'
                  value={userData.specialize}
                  onChange={(e) =>
                    this._handleOnChange("specialize", e.target.value.trim())
                  }></textarea>
                {errors && (
                  <Fragment>
                    <small style={{ color: "red" }}>
                      {errors.specialize}
                      {/* * Please fill above field */}
                    </small>
                  </Fragment>
                )}
              </div>
            </div>
            <div className='formDiv'>
              <div className='form-group'>
                <label htmlFor='comment'>Super Specialization</label>
                <textarea
                  name='text'
                  className='form-control'
                  rows=''
                  id='comment'
                  value={this.state.userData.superSpecialize}
                  onChange={(e) =>
                    this._handleOnChange(
                      "superSpecialize",
                      e.target.value.trim()
                    )
                  }></textarea>
                {errors && (
                  <Fragment>
                    <small style={{ color: "red" }}>
                      {errors.superSpecilize}
                      {/* * Please fill above field */}
                    </small>
                  </Fragment>
                )}
              </div>
            </div>
            <hr />
            <div className='d-flex justify-content-end'>
              <button
                onClick={this._handleOnSubmit}
                className='btn btn-primary '
                style={{ width: "8%" }}>
                Save
              </button>
            </div>
          </form>
        </section>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    doctorDetail: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  // console.log("DoctorDetil",this.props)
  return {
    doctorDetail: (doctorDetailData) =>
      dispatch(doctorDetail(doctorDetailData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDetail);
