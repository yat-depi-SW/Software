import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartProduct from "../components/CartProduct";

const Cart = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.users);
  const { products } = useSelector((state) => state.products);

  const [cartMap, setCartMap] = useState(new Map());
  const [subtotal, setSubtotal] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [shipping, setShipping] = useState(10);
  const [total, setTotal] = useState(0);
  const [changeValues, setChangeValues] = useState(true);

  const TAX_RATE = 0.1;

  useEffect(() => {
    if (currentUser?.cart.length > 0) {
      const itemCountMap = currentUser.cart.reduce((acc, id) => {
        acc[id] = (acc[id] || 0) + 1;
        return acc;
      }, {});

      const newCartMap = new Map();
      let tempSubtotal = 0;

      Object.keys(itemCountMap).map((id) => {
        const existingProduct = products.find(
          (product) => product.id === parseInt(id)
        );
        if (existingProduct) {
          const quantity = itemCountMap[id];
          tempSubtotal += existingProduct.price * quantity;
          newCartMap.set(id, {
            product: existingProduct,
            quantity: quantity,
          });
        }
      });

      setCartMap(newCartMap);
      setSubtotal(tempSubtotal);

      const tempTaxes = tempSubtotal * TAX_RATE;
      setTaxes(tempTaxes);

      const tempTotal = tempSubtotal + tempTaxes + shipping;
      setTotal(tempTotal);
    } else {
      setCartMap(new Map());
      setShipping(0);
      setSubtotal(0);
      setTaxes(0);
      setTotal(0);
    }
  }, [changeValues, currentUser?.cart, products]);

  return (
    <div>
      <div className="flex w-full p-8 justify-center items-center gap-8">
        <FaShoppingCart className="text-2xl" color="red" />
        <div>
          <h1 className="text-2xl dark:text-white">Shopping Cart</h1>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:h-[100vh] justify-evenly">
        {currentUser?.cart.length > 0 ? (
          <div className=" p-8 flex flex-col items-center ">
            {Array.from(cartMap.values()).map((cartItem) => (
              <CartProduct
                key={cartItem.product.id}
                product={cartItem.product}
                quantity={cartItem.quantity}
                currentUser={currentUser}
                setChangeValues={setChangeValues}
                changeValues={changeValues}
              />
            ))}
          </div>
        ) : (
          <div className="w-full md:w-1/2 lg:w-1/2 flex flex-col justify-center items-center md:justify-start mb-8">
            <div className="w-[50%]">
              <img src="../src/img/cart/undraw_empty_cart_co35.svg" />
            </div>
            <div className="flex justify-center items-center text-2xl font-bold pt-8 p-4 text-center dark:text-white">
              <h1>Cart's Feeling Light</h1>
            </div>
            <div className="text-center p-4 text-gray-600">
              <p>
                Your cart is longing for some company. begin your shopping
                adventure now!
              </p>
            </div>
            <div className="flex justify-center items-center">
              <Button
                color="red"
                onClick={() => {
                  navigate("/shop");
                }}
              >
                Explore Our Products
              </Button>
            </div>
          </div>
        )}

        {/* Summary Section */}
        <div className="flex flex-col shadow p-4 rounded-lg m-8 md:h-[270px] md:w-1/3 dark:text-white dark:bg-blue-gray-900">
          <div className="w-full flex justify-center items-center">Summary</div>
          <div className="flex justify-between items-center m-2">
            <h1>Subtotal</h1>
            <h1>${subtotal.toFixed(2)}</h1>
          </div>
          <div className="flex justify-between items-center m-2">
            <h1>Taxes</h1>
            <h1>${taxes.toFixed(2)}</h1>
          </div>
          <div className="flex justify-between items-center m-2">
            <h1>Shipping</h1>
            <h1>${shipping.toFixed(2)}</h1>
          </div>
          <hr />
          <div className="flex justify-between items-center m-2">
            <h1>Total</h1>
            <h1>${total.toFixed(2)}</h1>
          </div>
          <div className="flex justify-center items-center my-4">
            <Button
              className="w-full"
              color="red"
              disabled={currentUser?.cart.length == 0}
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
