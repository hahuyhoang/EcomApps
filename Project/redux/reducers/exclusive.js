import types from "../types";

const initialState = {
  exclusive: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    case types.EXCLUSIVE:
      const data = action.payload;
      return { exclusive: data };
    default:
      return { ...state };
  }
}
