import React from "react";
import { useSelector } from "react-redux";
import { IoMdAdd } from "react-icons/io";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
} from "@material-tailwind/react";
import Product from "../components/admin/Product";
import AddProduct from "../components/admin/AddProduct";
const TABLE_HEAD = ["Product", "Stock", "Price", "Rating", ""];

const AdminProductsPage = () => {
  const { products } = useSelector((store) => store.products);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <Card className="dark:bg-gray-700 dark:text-gray-200 h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="dark:bg-gray-700 dark:text-gray-200 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Products
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            
            <Button
              className="flex items-center gap-3"
              size="sm"
              onClick={handleOpen}
            >
              Add Product
              <IoMdAdd strokeWidth={2} className="h-4 w-4" />
            </Button>
            <Dialog className="dark:bg-gray-700 dark:text-gray-200" open={open} handler={handleOpen}>
              <DialogHeader>Add new Product!</DialogHeader>
              <DialogBody>
                <AddProduct />
              </DialogBody>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              const isLast = index === products.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <Product classes={classes} key={index} product={product} />
              );
            })}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
};

export default AdminProductsPage;
