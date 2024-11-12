import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/reducers/usersSlice";

const CartProduct = ({
  product,
  quantity,
  currentUser,
  setChangeValues,
  changeValues,
}) => {
  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    const newQuantity = currentQuantity + 1;
    setCurrentQuantity(newQuantity);
    const updatedUser = {
      ...currentUser,
      cart: [...currentUser.cart, product.id],
    };
    dispatch(updateUser(updatedUser));

    setChangeValues(!changeValues);
  };

  const handleDecrement = () => {
    const newQuantity = currentQuantity > 1 ? currentQuantity - 1 : 1;
    setCurrentQuantity(newQuantity);
    const updatedCart = [...currentUser.cart];
    const index = updatedCart.indexOf(product.id);
    if (index !== -1) {
      updatedCart.splice(index, 1);
    }

    const updatedUser = {
      ...currentUser,
      cart: updatedCart,
    };
    dispatch(updateUser(updatedUser));

    setChangeValues(!changeValues);
  };

  const handleDelete = () => {
    console.log(currentUser);

    const updatedCart = currentUser?.cart.filter((id) => id !== product.id);

    const updatedUser = { ...currentUser, cart: updatedCart };
    console.log(updatedUser);

    dispatch(updateUser(updatedUser));
    setChangeValues(!changeValues);
  };

  return (
    <div className="dark:bg-mainGreyDark w-full flex flex-col lg:flex-row items-center gap-3 transition duration-700">
      <div className="dark:bg-gray-700 rounded-lg shadow-md p-6 mb-4 w-full">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left font-semibold">Product</th>
              <th className="text-left font-semibold">Price</th>
              <th className="text-center font-semibold">Quantity</th>
              <th className="text-left font-semibold">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-4 w-1/2">
                <div className="flex items-center ">
                  <img
                    className="h-16 w-16 mr-4"
                    src={product.imgUrl}
                    alt="Product image"
                  />
                  <span className="font-semibold flex-grow text-left">
                    {product.name}
                  </span>
                </div>
              </td>
              <td className="p-4 text-center">${product.price}</td>
              <td className="p-4 ">
                <div className="flex items-center ">
                  <Button
                    className="border rounded-md py-2 px-4 mr-2"
                    onClick={handleDecrement}
                    disabled={currentQuantity === 1}
                  >
                    -
                  </Button>
                  <span className="text-center w-8">{currentQuantity}</span>
                  <Button
                    className="border rounded-md py-2 px-4 ml-2"
                    onClick={handleIncrement}
                  >
                    +
                  </Button>
                </div>
              </td>
              <td className="py-4 text-center">
                ${product.price * currentQuantity}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Button className="dark:bg-white dark:text-black" onClick={handleDelete}>
        <FaTrashAlt />
      </Button>
    </div>
  );
};

export default CartProduct;
