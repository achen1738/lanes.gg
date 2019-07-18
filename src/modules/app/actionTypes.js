import { defineAction } from "redux-define";
import { NAME } from "./constants";
import { CANCELLED, ERROR, PENDING, SUCCESS } from "../app/stateConstants";

export const INCREMENT_ASYNC = defineAction(
  "INCREMENT_ASYNC",
  [CANCELLED, ERROR, PENDING, SUCCESS],
  NAME
);
