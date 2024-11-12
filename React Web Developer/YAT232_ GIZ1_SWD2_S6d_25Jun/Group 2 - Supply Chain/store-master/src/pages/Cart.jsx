import React from "react";
import CartContent from "../components/CartContent";

const Cart = ({
  cartItems,
  setCartItems,
  deleteProduct,
  loggedFlag,
  addedLocalCart,
}) => {
  return (
    <div>
      <CartContent
        cartItems={cartItems}
        setCartItems={setCartItems}
        deleteProduct={deleteProduct}
        loggedFlag={loggedFlag}
        addedLocalCart={addedLocalCart}
      />
    </div>
  );
};

export default Cart;
