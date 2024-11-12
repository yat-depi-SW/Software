import ChartBarInteractive from "@/components/admin/Chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import React from "react";

const DashBoard = ({ users }) => {
  return (
    <div className="pl-52">
      <div className="px-5 py-4">
        <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[
          { title: "Total Users", icon: Icons.members, value: `${users.length}`, change: "+12%" },
          { title: "All Products", icon: Icons.cart, value: "$45,231", change: "+8%" },
          { title: "Categories", icon: Icons.categories, value: "3,127", change: "+3%" },
        ].map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <item.icon className=" size-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs text-muted-foreground">
                {item.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
          <ChartBarInteractive users={users} />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
