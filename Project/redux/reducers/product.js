import types from "../types";

const initial_state = {
  proDuct: {},
};
export default function (state = initial_state, action) {
  switch (action.type) {
    case types.PRODUCT:
      const data = action.payload;
      return { proDuct: data };
    default:
      return { ...state };
  }
}
