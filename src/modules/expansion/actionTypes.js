import { defineAction } from 'redux-define';
import { NAME } from './constants';
import { CANCELLED, ERROR, PENDING, SUCCESS } from '../app/stateConstants';

export const GET_ANALYSIS = defineAction(
  'GET_ANALYSIS',
  [CANCELLED, ERROR, PENDING, SUCCESS],
  NAME
);
