import React, { useState } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);

  const addIngredientHandler = (ingredient) => {
    setUserIngredients((prevIngredients) => [
      ...prevIngredients, //-- taking all the previos ingredients by using the spread operator.
      { id: Math.random().toString(), ...ingredient }, //adding the new ingredient and its id and then using the spread operator to take out the key value pair out of the array.
    ]);
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
