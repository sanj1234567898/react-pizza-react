import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./FullPizza.module.scss";

export const FullPizza = () => {
  const navigate = useNavigate();
  const [pizza, setPizza] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://63b041be6a74151a1bbd1a07.mockapi.io/pizza-items/" + id
        );
        setPizza(data);
      } catch (e) {
        console.error(e.message);
        alert("Ошибка");
        navigate("/");
      }
    };
    fetchData();
  }, []);

  if (!pizza) {
    return "Загрузка...";
  }

  return (
    <div className="container">
      <div className={styles.fullPizza}>
        <img src={pizza.imageUrl} alt="pizza" />
        <div className={styles["fullPizza__description"]}>
          <h2>{pizza.title}</h2>
          <h4>{pizza.price} ₽</h4>
        </div>
      </div>
    </div>
  );
};
export default FullPizza;
