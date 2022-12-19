import types from "../types";

const initialState = {
  bestselling: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    case types.BEST_SELLING:
      const data = action.payload;
      return { bestselling: data };
    default:
      return { ...state };
  }
}
