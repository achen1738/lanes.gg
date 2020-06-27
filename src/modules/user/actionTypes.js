import { defineAction } from 'redux-define';
import { NAME } from './constants';
import { CANCELLED, ERROR, PENDING, SUCCESS } from '../app/stateConstants';

export const GET_USER_DETAILS = defineAction(
  'GET_USER_DETAILS',
  [CANCELLED, ERROR, PENDING, SUCCESS],
  NAME
);

export const GET_DDRAGON = defineAction('GET_DDRAGON', [CANCELLED, ERROR, PENDING, SUCCESS], NAME);
