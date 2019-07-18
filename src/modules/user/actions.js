import { GET_USER_DETAILS } from './actionTypes';

export const getUserDetails = username => {
  return {
    type: GET_USER_DETAILS.ACTION,
    username
  };
};
