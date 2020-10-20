import { TOGGLE_TAB } from './actionTypes'; 

export const toggleTab = tabNum => {
    return {
        type: TOGGLE_TAB,
        payload: 
            tabNum
        
    }
}