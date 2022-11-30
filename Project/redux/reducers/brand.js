import types from "../types";

const brand_state = {
  brand: {},
};
export default function (state = brand_state, action) {
  switch (action.type) {
    case types.BRAND:
      const data = action.payload;
      return { brand: data };
    default:
      return { ...state };
  }
}
