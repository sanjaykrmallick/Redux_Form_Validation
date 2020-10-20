import React, { Component, useEffect, Fragment } from "react";
import { Nav, Tab } from "react-bootstrap";
import DoctorDetail from "./DoctorDetail";
import DoctorTiming from "./DoctorTiming";
import { docFormReset } from "../../redux/actions/docFormReset";
import { toggleTab } from "../../redux/actions/toggleTab";
import { connect } from "react-redux";

class AddDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Fragment>
        
      </Fragment>
    );
  }
}

export default AddDoctor;

// const AddDoctor = ({ activeTab, doctorDetail, toggleTab , docFormReset }) => {

//     useEffect(() => {
//         if(Object.keys(doctorDetail).length) {
//             docFormReset();
//         } else {
//             if(activeTab==='2' && !Object.keys(doctorDetail).length) {
//               toggleTab('1')
//             }
//         }
//     })

//      const toggle = (tab) => {
//           console.log(doctorDetail)
//           toggleTab(tab)
//           if(doctorDetail && Object.keys(doctorDetail).length) {
//               if(activeTab !== tab) toggleTab(tab)
//           } else {
//               if(activeTab !== tab) alert('Fill Add Doctor Details form first')
//           }
//     }

//   return (
//     <Fragment>
//       <section>
//         <Nav justify variant='tabs' defaultActiveKey='1'>
//           <Nav.Item>
//             <Nav.Link
//               eventKey='1'
//               onClick={() => {
//                 toggle("1");
//               }}>
//               Doctor Detail
//             </Nav.Link>
//           </Nav.Item>
//           <Nav.Item>
//             <Nav.Link
//               eventKey='2'
//               onClick={() => {
//                 toggle("2");
//               }}>
//               Doctor Timing
//             </Nav.Link>
//           </Nav.Item>
//         </Nav>
//         <Tab.Content activeTab={activeTab}>
//         <Tab.Pane eventKey="1">
//           <DoctorDetail/>
//         </Tab.Pane>
//         <Tab.Pane eventKey="2">
//           <DoctorTiming />
//         </Tab.Pane>
//       </Tab.Content>
//       </section>
//     </Fragment>
//   );
// };

// const mapStateToProps = state => {
//     return {
//       activeTab: state.addDoctor.activeTab,
//       doctorDetail: state.addDoctor.doctorDetail
//     }
//   }

//   const mapDispatchToProps = dispatch => {
//     return {
//       toggleTab: (tabNum) => dispatch(toggleTab(tabNum)),
//       docFormReset: () => dispatch(docFormReset())
//     }
//   }

// export default connect(mapStateToProps,mapDispatchToProps)(AddDoctor);

// class AddDoctor extends Component {
//     componentDidMount() {
//         const { activeTab, doctorDetail, toggleTab, docFormReset } = this.props;
//         console.log("doctorDetail:",doctorDetail,activeTab,toggleTab,docFormReset)

//         if(Object.keys(doctorDetail).length) {
//             docFormReset()
//         } else {
//             if(activeTab==='2' && !Object.keys(doctorDetail).length) {
//               toggleTab('1')
//             }
//         }
//       }

//       toggle = tab => {
//           const { activeTab, doctorDetail, toggleTab } = this.props;
//           // console.log(doctorDetails)
//           // toggleTab(tab)
//           if(doctorDetail && Object.keys(doctorDetail).length) {
//               if(activeTab !== tab) toggleTab(tab)
//           } else {
//               if(activeTab !== tab) alert('Fill Add Doctor Details form first')
//           }
//       }

//     render() {
//         const { activeTab } = this.props;
//         return (
//             <Fragment>
//             <section>
//               <Nav justify variant='tabs' defaultActiveKey='1'>
//                 <Nav.Item>
//                   <Nav.Link
//                     eventKey='1'
//                     onClick={() => {
//                       this.toggle("1");
//                     }}>
//                     Doctor Detai
//                   </Nav.Link>
//                 </Nav.Item>
//                 <Nav.Item>
//                   <Nav.Link
//                     eventKey='2'
//                     onClick={() => {
//                       this.toggle("2");
//                     }}>
//                     Doctor Timing
//                   </Nav.Link>
//                 </Nav.Item>
//               </Nav>
//               <Tab.Content activeTab={activeTab}>
//               <Tab.Pane eventKey="1">
//                 <DoctorDetail/>
//               </Tab.Pane>
//               <Tab.Pane eventKey="2">
//                 <DoctorTiming />
//               </Tab.Pane>
//             </Tab.Content>
//             </section>
//           </Fragment>
//          );
//     }
// }

// export default AddDoctor;
