import {
    DOCTOR_DETAIL,
    DOCTOR_TIMING, 
} from '../actions';

const initialState = {
    doctorDetail : {},
    doctorList: []
}

export const addDoctorReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch(action.type) {
        
        case DOCTOR_DETAIL: {
            // console.log(action.payload)
            newState = {
                ...newState,
                doctorDetail: {...action.payload.data},
            }
            break;
        }
        case DOCTOR_TIMING: {
            console.log("DoctorTiming: ",action.payload)
            let obj = {
                ...newState.doctorDetail
            }
            if(action.payload && Object.keys(action.payload).length) {
                Object.assign(obj, {availability: action.payload})
            }
            newState = {
                ...newState,
                doctorDetail: {},
                doctorList: [...state.doctorList, obj],
            }
            console.log("DoctorTimingsucess")
            break;
        }
        default: {
            console.log('error: action type not match in addDoctorReducer')
        }
    }

    return newState;

}