import Param from "./Param";

export const param = (state = {}, action) => {
    if (action.type) {
        if (action.type.toString().startsWith(Param.PARAM)) {
            return {...state, [action.type]: action.value}
        }
        if (action.type.toString().startsWith(Param.PAGE)) {
            return {...state, pages: {...state.pages, [action.type]: action.value}}
        }  
    }
    return {pages: [], ...state,}
}