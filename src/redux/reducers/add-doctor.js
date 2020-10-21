import {
    DOCTOR_DETAIL,
    DOCTOR_TIMING, 
    TOGGLE_TAB,
    DOCTOR_FORM_RESET
} from '../actions';

const initialState = {
    active_Tab: '1',
    doctorDetail : {},
    doctorList: []
}

export const addDoctorReducer = (state = initialState, action) => {

    switch(action.type) {
        
        case DOCTOR_DETAIL: {
            state = {
                ...state,
                doctorDetail: {...action.payload.doctorDetail},
            }
            break;
        }
        case DOCTOR_TIMING: {
            let obj = {
                ...state.doctorDetail
            }
            if(action.payload.doctorTiming && Object.keys(action.payload.doctorTiming).length) {
                Object.assign(obj, {availability: action.payload.doctorTiming})
            }
            state = {
                ...state,
                doctorDetail: {},
                doctorList: [...state.doctorList, obj],
            }
            break;
        }
        case DOCTOR_FORM_RESET: {
            state = {
                ...state,
                doctorDetail: {},
            }
            break;
        }
        default: {
            console.log('error: action type not match in addDoctorReducer')
        }
    }

    return state;

}