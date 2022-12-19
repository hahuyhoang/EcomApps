import types from "../types";

const initial_state = {
  dataOrders: {},
};
export default function (state = initial_state, action) {
  switch (action.type) {
    case types.ORDERS:
      const orders = action.payload;
      return { dataOrders: orders };
    default:
      return { ...state };
  }
}
