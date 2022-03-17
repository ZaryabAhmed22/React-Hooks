import React, { useEffect, useState } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);

  useEffect(() => {
    fetch("https://hooks-e7354-default-rtdb.firebaseio.com/ingredients.json")
      .then((response) => response.json())
      .then((responseData) => {
        const loadedIngredients = [];
        for (const key in responseData) {
          loadedIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount,
          });
        }
        setUserIngredients(loadedIngredients);
      });
  }, []);

  //Function for adding ingredients
  const addIngredientHandler = (ingredient) => {
    fetch("https://hooks-e7354-default-rtdb.firebaseio.com/ingredients.json", {
      method: "POST",
      body: JSON.stringify(ingredient),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setUserIngredients((prevIngredients) => [
          ...prevIngredients, //-- taking all the previos ingredients by using the spread operator.
          { id: responseData.name, ...ingredient }, //adding the new ingredient and its id and then using the spread operator to take out the key value pair out of the array.
        ]);
      });

    //fetch returns a promise
  };

  const removeIngredientHandler = (ingredientId) => {
    setUserIngredients((prevIng) =>
      prevIng.filter((ing) => ing.id !== ingredientId)
    );
  };
  console.log(userIngredients);
  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
}

export default Ingredients;
/*
Assignment

onRemoveItem={(id) => {
            console.log(id);
            const a = userIngredients.findIndex((ing) => ing.id === id);
            console.log(a);
            setUserIngredients((userIngredients) =>
              userIngredients.splice(a, 1)
            );
          }}
*/
