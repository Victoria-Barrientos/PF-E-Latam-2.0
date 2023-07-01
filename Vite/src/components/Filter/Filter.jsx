import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Styles from "../../components/Filter/Filter.module.css";
import { setOrderByName, setOrderByPrice, setFilterByCategory, axiosAllProductByCountryCategory, axiosProductsByCatalogListing } from '../../redux/slice/productSlice';

const Filter = ({ countryId, setOrden, setCurrentPage }) => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.products.category);
  const productsCountry = useSelector((state) => state.products.country);
  const userData = useSelector((state) => state.user.userData);

  function handleSort(event) {
    setCurrentPage(1);
    setOrden(`Ordenado ${event.target.value}`);
    dispatch(setOrderByName(event.target.value));
  }

  function handlePriceChange(event) {
    setCurrentPage(1);
    setOrden(`Ordenado ${event.target.value}`);
    dispatch(setOrderByPrice(event.target.value));
  }

  function handleCategoryChange(event) {
    setCurrentPage(1);
    setOrden(`Categoría ${event.target.value}`);
    dispatch(axiosAllProductByCountryCategory(countryId, event.target.value));
    dispatch(setOrderByPrice("---"))
    dispatch(setOrderByName("---"))
  }



  return (
    <div className={Styles.filtercontainer}>
      <label>Precio</label>
      <select className={Styles.select} onChange={handlePriceChange}>
        <option value="---">---</option>
        <option value="mayormenor">De mayor a menor</option>
        <option value="menormayor">De menor a mayor</option>
      </select>

      <label>Orden</label>
      <select className={Styles.select} onChange={handleSort}>
        <option value="---">---</option>
        <option value="asc">A-Z</option>
        <option value="des">Z-A</option>
      </select>

      <label>Categoría</label>
      <select className={Styles.select} onChange={handleCategoryChange}>
        <option value="all">Todas las categorías</option>
        <option value="computacion">Computación</option>
        <option value="celulares">Celulares</option>
        <option value="electronica">Electrónica</option>
        <option value="videojuegos">Videojuegos</option>
        {/* {filteredCategories && filteredCategories.map(category => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))} */}
      </select>
    </div>
  );
};

export default Filter;
