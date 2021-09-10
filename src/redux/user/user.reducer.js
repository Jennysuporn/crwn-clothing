
//type:           //Tell what specific action is.
//payload:        //Can be anything

const INITIAL_STATE = {     //need to set default for the first times that we fire the state
    currentUser: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUser: action.payload
            }
        
        default:
            return state;
    }
}

export default userReducer;