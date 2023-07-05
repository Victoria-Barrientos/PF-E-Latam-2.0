

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { salesByUser, findProduct } from "../../redux/slice/productSlice";
import Styles from './SalesUsuario.module.css';

const SalesUsuario = () => {
  const { email } = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const ventas = useSelector((state) => state.products.sales);
  const productos = useSelector((state) => state.products.productById);

  const [productList, setProductList] = useState([]);
  const [searchedProductIds, setSearchedProductIds] = useState([]);

  const sortByUpdatedAt = (objects) => {
    return objects.slice().sort((a, b) => {
      const dateA = new Date(a.updatedAt);
      const dateB = new Date(b.updatedAt);
      return dateB - dateA;
    });
  };

  const sortedObjects = sortByUpdatedAt(ventas);

  useEffect(() => {
    if (email) {
      dispatch(salesByUser(email));
    }
  }, [dispatch, email]);

  useEffect(() => {
    const productsIds = sortedObjects.flatMap((venta) => venta.products_id);
    productsIds.forEach((productId) => {
      if (!searchedProductIds.includes(productId)) {
        dispatch(findProduct(productId));
        setSearchedProductIds((prevIds) => [...prevIds, productId]);
      }
    });
  }, [dispatch, sortedObjects, searchedProductIds]);

  useEffect(() => {
    if (productos && !productList.some((product) => product.id === productos.id)) {
      setProductList((list) => [...list, productos]);
    }
  }, [productos, productList]);

  return (
    <div className={Styles.container}>
      <h2 className={Styles.titleSales}>Tu historial de compras:</h2>
      <div>
        {productList?.map((product, index) => (
          <div className={Styles.productContainer} key={index}>
            <img className={Styles.image} src={product?.thumbnail} alt={product.title} />
            <div className={Styles.dataContainer}>
              <p>{product?.title}</p>
              {product.original_price ? 
              (
                <h3>Precio: ${product?.original_price}</h3>
              ):(
                null
              )
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesUsuario;

