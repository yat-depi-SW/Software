import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Typography, Button } from "@material-tailwind/react";

const Productinfo = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API}/products`)
      .then((res) => {
        setRecords(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`${import.meta.env.VITE_API}/products/${id}`)
      .then(() => {
        setRecords(records.filter((record) => record.id !== id));
      })
      .catch((err) => console.error(err)); // Handle errors
  };

  const displayColumns = ["id", "title", "image", "price", "category", "count"];

  return (
    <div className=" mx-auto px-4 bg-white dark:bg-[#0F172A] text-black dark:text-white ">
      <h1 className="text-center font-extrabold text-3xl text-blue-600">
        Products
      </h1>

      <div className="mt-5 flex justify-end">
        <Link to="/admin/Productsinfo/addProduct">
          <Button color="blue" size="md" className="rounded-full shadow-lg">
            Add Product
          </Button>
        </Link>
      </div>

      <Card className="mt-6 overflow-auto dark:bg-blue-gray-400">
        <table className="w-full table-auto text-left border-separate border-spacing-0">
          <thead className="bg-blue-gray-300 dark:bg-blue-gray-100">
            <tr>
              {displayColumns.map((column, index) => (
                <th key={index} className="p-4 text-blue-gray-600 border-b-2">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold text-sm uppercase"
                  >
                    {column}
                  </Typography>
                </th>
              ))}
              <th className="p-4 text-blue-gray-600 border-b-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold text-sm uppercase"
                >
                  Actions
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => {
              const isLast = index === records.length - 1;
              const rowClass = isLast ? "p-4" : "p-4 border-b";

              return (
                <tr
                  key={record.id}
                  className="hover:bg-blue-gray-50 transition duration-150 ease-in-out"
                >
                  {displayColumns.map((col) => (
                    <td key={col} className={rowClass}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-sm"
                      >
                        {col === "image" ? (
                          <img
                            src={record[col]}
                            alt={record.title}
                            className="w-24 rounded-md"
                          />
                        ) : col === "count" ? (
                          record.rating?.count || "N/A"
                        ) : (
                          record[col]
                        )}
                      </Typography>
                    </td>
                  ))}
                  <td className={rowClass}>
                    <div className="flex gap-2">
      
                      <Link to={`/admin/Productsinfo/editProduct/${record.id}`}>
                        <Button
                          color="green"
                          size="sm"
                          className="rounded-full shadow-md"
                        >
                          Edit
                        </Button>
                      </Link>
                      <Button
                        color="red"
                        size="sm"
                        className="rounded-full shadow-md"
                        onClick={() => handleDelete(record.id)}
                      >
                        Delete
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
  );
};

export default Productinfo;
