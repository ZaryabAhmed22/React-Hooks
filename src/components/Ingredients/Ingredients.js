import React, { useCallback, useEffect, useState } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import Search from "./Search";

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  //-- Don't need it anymore since we are sending request using the search logic
  // useEffect(() => {
  //   fetch(
  //     "https://custom-react-hooks-5cf00-default-rtdb.firebaseio.com/hooks.json"
  //   )
  //     .then((response) => response.json())
  //     .then((responseData) => {
  //       const loadedIngredients = [];
  //       for (const key in responseData) {
  //         loadedIngredients.push({
  //           id: key,
  //           title: responseData[key].title,
  //           amount: responseData[key].amount,
  //         });
  //       }
  //       setUserIngredients(loadedIngredients);
  //     });
  // }, []);

  const filteredIngredientsHandler = useCallback((filteredIngredient) => {
    setUserIngredients(filteredIngredient);
  }, []);
  //Function for adding ingredients
  const addIngredientHandler = (ingredient) => {
    setIsLoading(true);
    fetch(
      "https://custom-react-hooks-5cf00-default-rtdb.firebaseio.com/hooks.json",
      {
        method: "POST",
        body: JSON.stringify(ingredient),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        setIsLoading(false);
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
    setIsLoading(true);
    fetch(
      `https://custom-react-hooks-5cf00-default-rtdb.firebaseio.com/hooks/${ingredientId}.json`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        setIsLoading(false);
        setUserIngredients((prevIng) =>
          prevIng.filter((ing) => ing.id !== ingredientId)
        );
      })
      .catch((error) => {
        setError(error.message);
        isLoading(false);
      });
  };

  //-- creating a function to clear the error
  const clearError = () => {
    setError(null);
    //isLoading(false); //>> stoping the loader but it won't work
  };

  console.log(userIngredients);
  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
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
