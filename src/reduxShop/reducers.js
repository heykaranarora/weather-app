// cityReducer.js
const initialState = {
    currentCity: null,
};

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_CITY':
            return {
                ...state,
                currentCity: action.cityName
            };

        case 'GET_CURRENT_CITY':
            return {
                ...state,
                currentCity: state.currentCity
            }

        default:
            return state;
    }

};

export default reducers;
