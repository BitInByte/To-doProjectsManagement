import * as actionTypes from '../actions/actionTypes';

const initialState = {
    error: null,
    loading: false,
};

const toDoStart = (state, action) => {
    console.log('authStarted');
    console.log(action);
    return {
        ...state,
        error: null,
        loading: true,
    };
};

const toDoSuccess = (state, action) => {
    return {
        ...state,
        error: null,
        loading: false,
    };
};

const toDoError = (state, action) => {
    return {
        ...state,
        error: action.err,
        loading: false,
    };
};

// const loginSucess = (state, action) => {
//     console.log('login success');
//     console.log(action);
//     return {
//         ...state,
//         authError: null,
//         loading: false,
//     };
// };

// const loginError = (state, action) => {
//     console.log('login failed');
//     console.log(action);
//     return {
//         ...state,
//         // authError: 'Login failed',
//         authError: action.err.message,
//         loading: false,
//     };
// };

// const signUpSuccess = (state, action) => {
//     console.log('signup success');
//     console.log(action);
//     return {
//         ...state,
//         authError: null,
//         loading: false,
//     }
// };

// const signUpError = (state, action) => {
//     console.log('signup error');
//     return {
//         ...state,
//         authError: action.err.message,
//         loading: false,
//     }
// };

// const signOut = (state, action) => {
//     console.log('signout success');
//     return {
//         ...state,
//         loading: false,
//     }
// };

// const resendEmailSuccess = (state, action) => {
//     console.log('Email successfuly sent');
//     return {
//         ...state,
//         loading: false,
//     }
// };

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TODO_START: return toDoStart(state, action);
        case actionTypes.NEWTODO_SUCCESS: return toDoSuccess(state, action);
        case actionTypes.NEWTODO_ERROR: return toDoError(state, action);

        default:
            return state;

    }
};

export default authReducer;