import types from "../types";

const initial_State = {
  list_orders: [],
};
export default function (state = initial_State, action) {
  switch (action.type) {
    case types.GETORDERS:
      const data = action.payload;
      return { list_orders: data };
    default:
      return { ...state };
  }
}
