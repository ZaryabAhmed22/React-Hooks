import React, { useEffect, useState } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  const { onLoadIngredients } = props; //taking out onLoadIngredients function from the props and passing it as dependency
  const [enteredFilter, setEnteredFilter] = useState("");
  useEffect(() => {
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
  }, [enteredFilter]); //>> Only enteredFIlter as a dependency gives an error becuase props are also a dependency, since we can't put props as the dependency because it will mean that if any props changes, or any new props is given to the component the useEffect will run which we dont want, solviong this problem on top with object destructuring

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
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
