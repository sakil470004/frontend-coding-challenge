"use client";

import React, { useState, useCallback ,useEffect} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Product } from "@/types";
import { ProductModal } from "@/views/products/productModal/productModal";
import { BackToHome } from "@/components/backToHome/backToHome";
import { ProductList } from "@/views/products/productList/productList";
import { PaginationControls } from "@/views/products/paginationControls/paginationControls";
import { usePagination } from "@/hooks/usePagination";
import { PRODUCTS_DATA } from "@/data/productsData";

export const Products: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    handlePageChange,
  } = usePagination({ items: PRODUCTS_DATA, itemsPerPage: 5 });
  const handleOpenModal = useCallback((product: Product) => {
    setSelectedProduct(product);
    router.push(`/products?productId=${product.id}`, { scroll: false });
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
    router.push("/products", { scroll: false });
  }, []);

  useEffect(() => {
    const productId = searchParams.get("productId");
    if (productId) {
      const product = paginatedProducts.find((p) => p.id === productId);
      if (product) {
        handleOpenModal(product);
      }
    }
  }, [searchParams, paginatedProducts]);

  return (
    <div>
      <BackToHome />
      <ProductList products={paginatedProducts} onOpenModal={handleOpenModal} />
      <div className="h-4" />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
};
