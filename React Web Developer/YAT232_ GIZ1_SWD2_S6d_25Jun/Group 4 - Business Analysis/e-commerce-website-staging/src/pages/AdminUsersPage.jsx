import React from 'react'
import { useSelector } from 'react-redux';
import { IoMdAdd } from "react-icons/io";
import {
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

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
import User from '../components/admin/userPageComponents/User';
import AddUser from '../components/admin/userPageComponents/AddUser';
const TABLE_HEAD = ["User ID", "User Name" , "User Email", "Role", ""];




const AdminUsersPage = () => {
  const {users} = useSelector((store)=> store.users);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const getNumberOfAdmins = ()=>{
    const admins = users.filter((user)=>user.role=="admin");
    return admins.length;
  }
  return (
    <Card className="dark:bg-gray-700 dark:text-gray-200 h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="dark:bg-gray-700 dark:text-gray-200 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Users
            </Typography>
            
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            
            <Button className="flex items-center gap-3" size="sm" onClick={handleOpen}>
                Add User
                <IoMdAdd strokeWidth={2} className="h-4 w-4" />
            </Button>
      <Dialog className="dark:bg-gray-700 dark:text-gray-200" open={open} handler={handleOpen}>
        <DialogHeader>Add new User!</DialogHeader>
        <DialogBody>
        <AddUser />
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
            {users.map(
              (
                user,
                index,
              ) => {
                const isLast = index === users.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <User getNumberOfAdmins={getNumberOfAdmins} classes={classes} key={index} user={user} />
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      
    </Card>
  )

}

export default AdminUsersPage;
