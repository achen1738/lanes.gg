import { defineAction } from "redux-define";
import { NAME } from "./constants";
import { CANCELLED, ERROR, PENDING, SUCCESS } from "../app/stateConstants";

export const DECREMENT_ASYNC = defineAction(
  "DECREMENT_ASYNC",
  [CANCELLED, ERROR, PENDING, SUCCESS],
  NAME
);
