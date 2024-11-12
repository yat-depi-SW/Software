
// import React from 'react'
// import {
//     Card,
//     CardBody,
//     CardFooter,
//     Typography,
//     Button,
//   } from "@material-tailwind/react";
// import { Link } from 'react-router-dom';
// import Swal from 'sweetalert2'
// const Dashboard = () => {
//   // Swal.fire("SweetAlert2 is working!");
//   return (
//     <div className='flex justify-center items-center flex-row gap-3'>
//         <Card className="mt-6 w-96">
//       <CardBody>
//         <Typography variant="h5" color="blue-gray" className="mb-2">
//           UI/UX Review Check
//         </Typography>
//         <Typography>
//           The place is close to Barceloneta Beach and bus stop just 2 min by
//           walk and near to &quot;Naviglio&quot; where you can enjoy the main
//           night life in Barcelona.
//         </Typography>
//       </CardBody>
//       <CardFooter className="pt-0">
//         <Button>
//         <Link to ="/users" className="flex items-center hover:text-blue-500 transition-colors">
//         Users
//             </Link>
//         </Button>
//       </CardFooter>
//     </Card>
//     <Card className="mt-6 w-96">
//       <CardBody>
//         <Typography variant="h5" color="blue-gray" className="mb-2">
//           UI/UX Review Check
//         </Typography>
//         <Typography>
//           The place is close to Barceloneta Beach and bus stop just 2 min by
//           walk and near to &quot;Naviglio&quot; where you can enjoy the main
//           night life in Barcelona.
//         </Typography>
//       </CardBody>
//       <CardFooter className="pt-0">
//         <Button>
//         <Link to ="/productss" className="flex items-center hover:text-blue-500 transition-colors">
//         Products
//             </Link>
//         </Button>
//       </CardFooter>
//     </Card>
//     </div>
//   )
// }

// export default Dashboard
import React, { useState } from 'react';
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import Users from './Users'; // Assuming the Users component is in the same directory
import Productss from './Productss.jsx'; // Assuming the Products component is in the same directory

const Dashboard = ({ users, products, deleted, SetDeleted }) => {
  // Default tab is "users"
  const [activeTab, setActiveTab] = useState("users");

  const data = [
    {
      label: "Users",
      value: "users",
      component: (
        <Users 
          users={users} 
          deleted={deleted} 
          SetDeleted={SetDeleted} 
        />
      ),
    },
    {
      label: "Products",
      value: "products",
      component: (
        <Productss
          products={products} 
          deleted={deleted} 
          SetDeleted={SetDeleted} 
        />
      ),
    }
  ];

  return (
    <Tabs className="mx-1" value={activeTab} onChange={(value) => setActiveTab(value)}>
      <TabsHeader>
        {data.map(({ label, value }) => (
          <Tab key={value} value={value}>
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, component }) => (
          <TabPanel key={value} value={value}>
            {component}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
};

export default Dashboard;



