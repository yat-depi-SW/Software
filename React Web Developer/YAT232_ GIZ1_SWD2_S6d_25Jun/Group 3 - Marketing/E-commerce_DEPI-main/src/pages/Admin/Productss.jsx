import React from 'react'
import { Button, Card, Typography,Avatar } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from 'axios';

const Productss = ({products,deleted,SetDeleted}) => {
    const TABLE_HEAD = ["Title", "Price","Rate","Count","Actions"];
    const deleteproduct =({id,title})=>{
      console.log(id,title);
      Swal.fire({
        title: `Do you want to delete ${title} ?`,
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
            url:`https://blush-warp-bathroom.glitch.me/products/${id}`,
          }).then(()=>{
            SetDeleted(!deleted);
          })
        } else if (result.isDenied) {
          Swal.fire("Changes are not deleted", "", "info");
        }
      });
    };
  return (
    <div className='flex justify-center items-center flex-col m-9 gap-3'>
      < Link to ="/admin/add">
      <Button variant="gradient" color="green">Add Products</Button>
      </Link>
      
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
          {products.map(({ title,price,id,image ,rating}, index) => {
            const isLast = index === products.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
            return (
              <tr key={title}>
                <td className={classes}>
                        <div className="flex items-center gap-3">
                        {/* Avatar and Title in the same row */}
                        <Avatar src={image} alt={title} size="sm" />
                        <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        >
                        {title.length > 50 ? `${title.slice(0, 80)}...` : title}
                        </Typography>
                        </div>
                        </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {price}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {rating.rate}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {rating.count}
                  </Typography>
                </td>
                
                <td className={classes}>
                    <div className='flex flex-row gap-4 '>
                  <Button color="blue">
                  <Typography
                    as={Link}
                    to={`/admin/view/${id}`}
                    variant="small"
                    color="white"
                    className="font-medium"
                  >
                    view
                  </Typography>
                  </Button>
                  <Button color="amber">
                  <Typography
                    as={Link}
                    to={`/admin/edit/${id}`}
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
                    onClick={()=>{deleteproduct({id,title})}}
                  >
                    delete
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

export default Productss