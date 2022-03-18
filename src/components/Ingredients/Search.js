import React, { useEffect, useRef, useState } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  const { onLoadIngredients } = props; //taking out onLoadIngredients function from the props and passing it as dependency, it will not solve the problem at first, it will create an infinite loop because it updates the state in the inredients.js
  //>> to solve this problem we will use useCallback
  const [enteredFilter, setEnteredFilter] = useState("");
  const inputRef = useRef();
  useEffect(() => {
    //seting a timeout after every key stoke, means a request will be sent after every 500 ms the user presses the key.
    setTimeout(() => {
      //-- checking that if the entered filter is same as the enter input 500 ms ago, if it's same it will send a request. like if i am searching mangoes, and typed mang, it will not send the request untill the word is complete.
      //>> doing this by using useRef()
      //>> enteredFilter is not the current input but the inputed fired 500ms ago
      // We will assing this ref to a dom element by the ref prop, in our case it is the input.
      // input ref is also a dependency

      if (enteredFilter === inputRef.current.value) {
        //filter using firebase query params
        const query =
          enteredFilter.length == 0
            ? ""
            : `?orderBy="title"&equalTo=${enteredFilter}`;
        //using the fetch logic from the ingredients.js
        fetch(
          "https://custom-react-hooks-5cf00-default-rtdb.firebaseio.com/hooks.json" +
            query //>> pass this query into firebase as well
        )
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
            //...logic of what we have to do with this data
            props.onLoadIngredients(loadedIngredients);
          });
      }
    }, 500);
  }, [enteredFilter, onLoadIngredients, inputRef]); //>> Only enteredFIlter as a dependency gives an error becuase props are also a dependency, since we can't put props as the dependency because it will mean that if any props changes, or any new props is given to the component the useEffect will run which we dont want, solviong this problem on top with object destructuring

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            ref={inputRef}
            type="text"
            value={enteredFilter}
            onChange={(e) => setEnteredFilter(e.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
