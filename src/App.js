import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import logo from "./img/deliveroo-logo.png";
import noImg from "./img/no-img.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
library.add(faStar);

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://back-deliveroo.herokuapp.com/"
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <div className="App">
      <div className="wrapper">
        <div className="containerHeader">
          <Header logo={logo} />
          <div className="heroBanner">
            <div className="restaurantInfos">
              <h1>{data.restaurant.name}</h1>
              <p>{data.restaurant.description}</p>
            </div>
            <img alt="The restaurant" src={data.restaurant.picture}></img>
          </div>
        </div>
        <div className="mainContent">
          <div className="category">
            {data.categories.map((category, index) => {
              return (
                <>
                  <h2>
                    {data.categories[index].meals.length !== 0 &&
                      data.categories[index].name}
                  </h2>
                  <div className="cardsMenu">
                    {category.meals.map((meal) => {
                      return (
                        <div className="card">
                          <div className="cardDescription">
                            <h3>{meal.title}</h3>
                            <p className="dishDescription">
                              {meal.description}
                            </p>
                            <div className="pricePopular">
                              <p className="price">{meal.price} € </p>
                              <p className="popular">
                                {meal.popular === true && (
                                  <FontAwesomeIcon icon="star" />
                                )}
                              </p>
                            </div>
                          </div>

                          <img
                            src={meal.picture ? meal.picture : noImg}
                            alt=""
                          />
                        </div>
                      );
                    })}
                  </div>
                </>
              );
            })}
          </div>
          <div className="basket">
            <button className="btnValidateBasket">Valider mon panier</button>
            <p>Votre panier est vide</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
