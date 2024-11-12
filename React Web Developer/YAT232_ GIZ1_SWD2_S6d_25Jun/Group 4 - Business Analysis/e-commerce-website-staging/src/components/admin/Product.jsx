import React, { useState } from "react";
import {
  Typography,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { MdOutlineViewInAr } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { deleteProduct } from "../../../redux/reducers/productsSlice";
import { useDispatch } from "react-redux";
import { ProductCard } from "../ProductCard";
import EditProduct from "./EditProduct";
const Product = ({
  product: { imgUrl, name, rating, price, id, description },
  classes,
}) => {
  const { count, rate } = rating;
  const dispatch = useDispatch();
  const [view, setView] = useState(false);
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);
  const viewProd = () => setView(!view);
  const editProd = () => setEdit(!edit);
  const delProd = ()=> setDel(!del);
  return (
    <tr>
      <td className={classes}>
        <div className="flex items-center gap-3">
          <Avatar
            src={imgUrl}
            alt={name}
            size="md"
            className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
          />
          <Typography variant="small" color="blue-gray" className="font-bold">
            {name}
          </Typography>
        </div>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {count}
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {price}$
        </Typography>
      </td>
      <td className={classes}>
        <div className="w-max">
          <Chip
            size="sm"
            variant="ghost"
            value={rate}
            color={rate > 4 ? "green" : rate > 2 ? "amber" : "red"}
          />
        </div>
      </td>

      <td className={classes}>
        <Tooltip content="View Product">
          <IconButton onClick={viewProd} variant="text">
            <MdOutlineViewInAr className="h-6 w-6" />
          </IconButton>
        </Tooltip>
        <Dialog className="dark:bg-gray-700 dark:text-gray-200" open={view} handler={viewProd}>
          <DialogHeader>{name}</DialogHeader>
          <DialogBody>
            <ProductCard
              productProps={{ imgUrl, name, rating, price, id, description }}
            />
          </DialogBody>
        </Dialog>

        <Tooltip content="Edit Product">
          <IconButton onClick={editProd} variant="text">
            <PencilIcon className="h-4 w-4" />
          </IconButton>
        </Tooltip>

        <Dialog className="dark:bg-gray-700 dark:text-gray-200" open={edit} handler={editProd}>
          <DialogHeader>
            <Avatar
              src={imgUrl}
              alt={name}
              size="md"
              className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
            />
            {name}
          </DialogHeader>
          <DialogBody>
            <EditProduct
              product={{ imgUrl, name, rating, price, id, description }}
            />
          </DialogBody>
        </Dialog>
        <Tooltip content="Delete Product">
          <IconButton
            variant="text"
            onClick={delProd}
          >
            <Dialog className="dark:bg-gray-700 dark:text-gray-200 text-center" open={del} handler={delProd}>
          <DialogHeader>Delete Product : {name}</DialogHeader>
          <DialogBody>
          <Button
            variant="text"
            color="red"
            onClick={() => delProd(null)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={()=>{
            dispatch(deleteProduct(id));
            delProd();

          }}>
            <span>Confirm</span>
          </Button>
          </DialogBody>
        </Dialog>
            <MdDeleteForever className="h-6 w-6" />
          </IconButton>
        </Tooltip>
      </td>
    </tr>
  );
};

export default Product;
