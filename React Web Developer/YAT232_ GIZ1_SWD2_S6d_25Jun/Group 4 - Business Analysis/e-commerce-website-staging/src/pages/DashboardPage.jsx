import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import StatsCard from "../components/Admin/StatsCard";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.users);
  const numUsers = users?.length;
  const lastUser = numUsers ? users[numUsers - 1].name : "none";

  const { products } = useSelector((state) => state.products);
  const numProducts = products?.length;
  const lastProduct = numProducts ? products[numProducts - 1].name : "none";

  const cards = [
    {
      title: "users",
      data: [
        {
          key: "Number of Users",
          value: numUsers,
        },
        {
          key: "Last user registered",
          value: lastUser,
        },
      ],
      buttonText: "check users",
      onclick: () => {
        navigate("users");
      },
    },
    {
      title: "products",
      data: [
        {
          key: "Numbers of Products",
          value: numProducts,
        },
        {
          key: "Last product added",
          value: lastProduct,
        },
      ],
      buttonText: "check products",
      onclick: () => {
        navigate("products");
      },
    },
  ];

  return (
    <main className="flex flex-col items-center justify-between md:flex-row md:max-w-3xl mx-auto px-5 py-24 sm: gap-8">
      {cards.map((card) => (
        <StatsCard key={card.title} cardProps={card} />
      ))}
    </main>
  );
}