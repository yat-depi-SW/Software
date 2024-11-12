import React from 'react'
import { Button, Card, Typography,Avatar } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from 'axios';

const Users = ({users,deleted,SetDeleted}) => {
    const TABLE_HEAD = ["Username", "role","email","Actions"];
    const deleteproduct =({id,name})=>{
      console.log(id,name);
      Swal.fire({
        title: `Do you want to delete ${name} ?`,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Delete",
        denyButtonText: `Don't Delete`
      
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        
        if (result.isConfirmed) {
          Swal.fire("deleted!", "", "success");
          axios({
            method:"delete",
            url:`https://blush-warp-bathroom.glitch.me/mazenz/${id}`,
          }).then(()=>{
            SetDeleted(!deleted);
          })
        } else if (result.isDenied) {
          Swal.fire("Changes are not deleted", "", "info");
        }
      });
    };
    const toggleRole = (user) => {
        const newRole = user.role === "admin" ? "user" : "admin";
        axios({
          method: "put",
          url: `https://blush-warp-bathroom.glitch.me/mazenz/${user.id}`,
          data: { ...user, role: newRole },
        }).then(() => {
          SetDeleted(!deleted);
        });
      };
      const isOnlyAdmin = users.filter(user => user.role === 'admin').length === 1;
    
  return (
    <div className='flex justify-center items-center flex-col m-9 gap-3'>
      {/* < Link to ="/add">
      <Button variant="gradient" color="green">Add Products</Button>
      </Link> */}
      
        <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
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
          {users.map(({name,role,email,id}, index) => {
            const isLast = index === users.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
            return (
              <tr key={name}>
                <td className={classes}>
                        
                        <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        >
                        {name}
                        </Typography>
                        
                        </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {role}
                  </Typography>
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
                    <div className='flex flex-row gap-4 '>
                  {/* <Button color="blue">
                  <Typography
                    as={Link}
                    // to={`/view/${id}`}
                    variant="small"
                    color="white"
                    className="font-medium"
                  >
                    view
                  </Typography>
                  </Button> */}
                  <Button color="amber">
                  <Typography
                    as={Link}
                    to={`/admin/edituser/${id}`}
                    variant="small"
                    color="white"
                    className="font-medium"
                  >
                    Edit
                  </Typography>
                  </Button>

                  <Button color="red">
                  <Typography
                    variant="small"
                    color="white"
                    className="font-medium"
                    onClick={()=>{deleteproduct({id,name})}}
                  >
                    delete
                  </Typography>
                  </Button>
                
                  <Button
                        color="green"
                        disabled={role === 'admin' && isOnlyAdmin}
                        onClick={() => toggleRole({ id, name, email, role })}
                      >
                        <Typography
                          variant="small"
                          color="white"
                          className="font-medium"
                        >
                          {role === 'user' ? 'Make Admin' : 'Make User'}
                        </Typography>
                      </Button>


                  </div>
                  
                </td>
                
              </tr>
            );
          })}
        </tbody>
        </table>
        </Card>
    </div>
  )
}

export default Users