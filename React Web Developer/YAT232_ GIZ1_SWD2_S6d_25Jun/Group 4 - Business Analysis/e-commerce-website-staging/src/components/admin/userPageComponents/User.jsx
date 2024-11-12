import React, {useState} from 'react'
import {
    Typography,
    IconButton,
    Tooltip,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,    
  } from "@material-tailwind/react";
  import { PencilIcon } from "@heroicons/react/24/solid";
  import { MdDeleteForever } from "react-icons/md";

  import { useDispatch} from 'react-redux';
  import {updateUser, deleteUser} from "../../../../redux/reducers/usersSlice"
  import { FaFemale, FaMale } from "react-icons/fa";
  import EditUser from './EditUser';
const User = ({user:{name, email, gender, id, role, password}, classes, getNumberOfAdmins}) => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [confirmAdmin, setConfirmAdmin] = useState(false);
  const [del, setDel] = useState(false);
  const delUser= ()=> setDel(!del);
  const makeAdmin = ()=> setConfirmAdmin(!confirmAdmin);
  const editUser = ()=> setEdit(!edit);
  return (
    <tr>
        <td className={classes}>
            <Typography
            variant="small"
            color="blue-gray"
            className="font-normal"
            >
            {id}
            </Typography>
        </td>
        <td className={classes}>
            <div className="flex items-center gap-3">
            {gender == "male"? <FaMale />: <FaFemale />}
            <Typography
                variant="small"
                color="blue-gray"
                className="font-bold"
            >
                {name}
            </Typography>
            </div>
        </td>
        
        <td className={classes}>
            <Typography
            variant="small"
            color="blue-gray"
            className="font-normal"
            >
            {email}
            </Typography>
        </td>
        <td className={classes}>
            <div className="w-max">
              <Button
              color={
                role == "admin"?
                   "green":
                   "amber"
                  
              }
              onClick={
                ()=>{
                  if(role == "admin" && getNumberOfAdmins() > 1)
                  {
                    dispatch(updateUser({name, email, gender, id, password, role:"user"}))
                  }
                  else if(role == "user")
                  {
                    makeAdmin();
                  }
                  
                }
              }
              >{role}</Button>
              <Dialog className='dark:bg-gray-700 dark:text-gray-200 text-center p-7' open={confirmAdmin} handler={makeAdmin}>
                 <DialogHeader>Are you sure you want to make {name} Admin?</DialogHeader>
                 <Button
            variant="text"
            color="red"
            onClick={() => makeAdmin(null)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
                  <Button variant="gradient" color="green" onClick={()=>{
                    dispatch(updateUser({name, email, gender, id, password, role:"admin"}));
                    makeAdmin();

                  }

                    }>
            <span>Confirm</span>
          </Button>
              </Dialog>
            
            </div>
        </td>
        
        <td className={classes}>
        
      <Tooltip content="Edit User">
                        <IconButton onClick={editUser} variant="text">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>

                      <Dialog className="dark:bg-gray-700 dark:text-gray-200" open={edit} handler={editUser}>
        <DialogHeader>
            <div>
            {name}
            </div>
            </DialogHeader>
        <DialogBody>
        <EditUser user={{name, email, gender, id, role, password}}/>
        </DialogBody>
      </Dialog>
      <Tooltip content="Delete User">
          <IconButton
            variant="text"
            onClick={delUser}
          >
            <Dialog className="dark:bg-gray-700 dark:text-gray-200 text-center" open={del} handler={delUser}>
          <DialogHeader>Delete User : {name}</DialogHeader>
          <DialogBody>
          <Button
            variant="text"
            color="red"
            onClick={() => delUser(null)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={()=>{
            dispatch(deleteUser(id));
            delUser();

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
  )
}

export default User
