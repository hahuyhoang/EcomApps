import types from "../types";

const categories_state = {
  categories: {},
};
export default function (state = categories_state, action) {
  switch (action.type) {
    case types.CATEGORIES:
      const data = action.payload;
      return { categories: data };
    default:
      return { ...state };
  }
}
