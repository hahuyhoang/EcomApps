import types from "../types";

const initial_state = {
  userData: {},
};

export default function (state = initial_state, action) {
  switch (action.type) {
    case types.LOGIN:
      const data = action.payload;
      return { userData: data };

    case types.SIGNUP:
      const datas = action.payload;
      return { userData: datas };

    case types.UPDATE_USER:
      const dataUser = action.payload;
      return { userData: dataUser };
    default:
      return { ...state };
  }
}
