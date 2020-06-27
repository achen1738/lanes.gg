import { GET_USER_DETAILS, GET_DDRAGON } from './actionTypes';

export const getUserDetails = username => {
  return {
    type: GET_USER_DETAILS.ACTION,
    username
  };
};

export const getDDragon = username => {
  return {
    type: GET_DDRAGON.ACTION,
    username
  };
};
