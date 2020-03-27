
export function setParam(key, value) {
    if(key===undefined){
        return(dispatch) => {
            dispatch({type: 'TEMP', value: value})
        }
    }
    return (dispatch) => {
        dispatch({type: key, value: value})
    }
}
