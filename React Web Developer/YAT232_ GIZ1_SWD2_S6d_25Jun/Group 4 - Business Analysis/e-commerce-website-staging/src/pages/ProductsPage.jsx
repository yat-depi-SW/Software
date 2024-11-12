import React, { useEffect } from "react";
import { ProductCard } from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/reducers/productsSlice";
import { ProductSkeleton } from "../components/ProductSkeleton";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { status, products } = useSelector((state) => state.products);
  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [status]);
  return (
    <main className="px-10 py-24 flex gap-7 flex-wrap justify-center">
      {status === "success" &&
        products.map((product) => {
          return <ProductCard key={product.id} productProps={product} />;
        })}
      {status === "pending" && (
        <>
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
        </>
      )}
    </main>
  );
}
