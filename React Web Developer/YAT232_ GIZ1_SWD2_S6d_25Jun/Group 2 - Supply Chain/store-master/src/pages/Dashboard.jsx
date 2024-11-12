import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white dark:bg-[#0F172A] text-black dark:text-white">
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Users Card */}
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">USERS</h2>
            <p className="text-lg">Number of Users: 4</p>
            <p className="text-lg mb-6">
              Last user registered: <span className="font-bold">mario</span>
            </p>
            <button
              className="bg-gray-300 dark:dark:bg-gray-900 px-4 py-2 rounded-lg hover:bg-gray-600"
              onClick={() => navigate("/admin/UsersDashboard")}
            >
              CHECK USERS
            </button>
          </div>

          {/* Products Card */}
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">PRODUCTS</h2>
            <p className="text-lg">Number of Products: 16</p>
            <p className="text-lg mb-6">
              Last product added:{" "}
              <span className="font-bold">
                DANVOUY Women's T Shirt Casual Cotton Short
              </span>
            </p>
            <button
              className="bg-gray-300 dark:dark:bg-gray-900 px-4 py-2 rounded-lg hover:bg-gray-600"
              onClick={() => navigate("/admin/Productsinfo")}
            >
              CHECK PRODUCTS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
