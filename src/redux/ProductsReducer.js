export const productsActions = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
};

const initialState = {
  products: [
    {
      name: "TLOU 2",
      id: "tlou_2_ps4",
      price: 199,
      platforms: ["ps4"],
    },
    {
      name: "Cyberpunk",
      id: "cyberpunk_2077_multiplatform",
      price: 200,
      platforms: ["ps4", "pc", "xbox"],
    },
    {
      name: "Days Gone",
      id: "days_gone",
      price: 127,
      platforms: ["ps4"],
    },
    {
      name: "God of War",
      id: "god_of_war",
      price: 60,
      platforms: ["ps4"],
    },
  ],
  cart: [],
  cartMessage: null,
};

export const addToCart = (id) => {
  return (dispatch) => {
    dispatch({ type: productsActions.ADD_TO_CART, payload: id });
  };
};
export const removeFromCart = (id) => {
  return (dispatch) => {
    dispatch({ type: productsActions.REMOVE_FROM_CART, payload: id });
  };
};

function ProductsReducer(state = initialState, action) {
  switch (action.type) {
    case productsActions.ADD_TO_CART:
      return { ...state, cart: [...state.cart, action.payload] };
    case productsActions.REMOVE_FROM_CART:
      const i = state.cart.indexOf(action.payload);
      let cart = [...state.cart];
      if (i > -1) cart.splice(i, 1);
      return {
        ...state,
        cart,
      };
    default:
      return state;
  }
}

export default ProductsReducer;
