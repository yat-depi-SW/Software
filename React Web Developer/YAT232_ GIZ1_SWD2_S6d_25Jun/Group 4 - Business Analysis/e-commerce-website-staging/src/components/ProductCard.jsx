import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { IoIosStar } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../../redux/reducers/usersSlice";

export function ProductCard({ productProps }) {
  const { name, description, imgUrl, rating, price, id } = productProps;
  const { rate } = rating;
  const [favoriteProduct, setFavoriteProduct] = useState("white");
  const { logged, currentUser } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "",
    gender: "",
    password: "",
    id: "",
    role: "",
    cart: [],
  });

  useEffect(() => {
    if (currentUser) {
      setUpdatedUser({
        name: currentUser.name || "",
        email: currentUser.email || "",
        gender: currentUser.gender || "",
        password: currentUser.password || "",
        id: currentUser.id || "",
        role: currentUser.role || "",
        cart: currentUser.cart || "",
      });
    }
  }, [currentUser]);

  const handleAddToCart = () => {
    if (!logged) {
      navigate("/login");
    } else {
      // for the histpry
      const newEntry = {
        action: "Added to Cart",
        productName: name,
        date: new Date().toLocaleString(),
      };

      const userHistory = JSON.parse(localStorage.getItem("userHistory")) || [];
      userHistory.push(newEntry);
      localStorage.setItem("userHistory", JSON.stringify(userHistory));

      let cartCopy = [...updatedUser.cart];
      cartCopy.push(id);

      setUpdatedUser((prevState) => {
        const newUser = {
          ...prevState,
          cart: cartCopy,
        };

        dispatch(updateUser(newUser));

        return newUser;
      });
    }
  };

  return (
    <Card className="w-96 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <CardHeader shadow={false} floated={false} className="h-72">
        <img
          src={imgUrl}
          alt="card-image"
          className="h-full w-full object-cover"
        />
        <div className="!absolute top-4 right-4 flex flex-row-reverse items-end gap-3">
          <IconButton
            size="sm"
            color={favoriteProduct}
            variant="text"
            className="rounded-full w-5 h-5"
            onClick={() =>
              setFavoriteProduct(() =>
                favoriteProduct === "white" ? "red" : "white"
              )
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </IconButton>
          <div className="flex gap-2">
            <Typography color="white" className="w-5 h-5">
              {rate}
            </Typography>
            <IoIosStar className="text-[#fac12e] w-6 h-6" />
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <div className="mb-2 flex items-center justify-between">
          <Typography
            color="blue-gray"
            className="font-medium dark:text-gray-200"
          >
            {name}
          </Typography>
          <Typography
            color="blue-gray"
            className="font-medium dark:text-gray-200"
          >
            $ {price}
          </Typography>
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75 dark:text-gray-400"
        >
          {description}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          ripple={false}
          fullWidth={true}
          className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 dark:bg-blue-gray-700 dark:text-gray-200 dark:hover:bg-blue-gray-600"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
