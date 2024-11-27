// cityActions.js
export const setCurrentCity = (city) => {
    return {
      type: 'SET_CURRENT_CITY',
      cityName : city,
    };
  };

export const getCurrentCity = (city) => {
    return (dispatch) => dispatch({
      type: 'GET_CURRENT_CITY',
      cityName : city,
    });
  };
  