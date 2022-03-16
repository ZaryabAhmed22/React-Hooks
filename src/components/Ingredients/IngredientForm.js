import React, { useState } from "react";

import Card from "../UI/Card";
import "./IngredientForm.css";

const IngredientForm = React.memo((props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    // ...
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              value={enteredTitle} //--2 way binding
              onChange={(event) => setEnteredTitle(event.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={enteredAmount} //--2 way binding
              onChange={(event) => setEnteredAmount(event.target.value)}
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;

//-- ALTERNATIVE WAY
/*
               const [initialValue, setInitialValue] = useState({ title: "", amount: "" });

              value={initialValue.amount} //--2 way binding
              onChange={(event) => {
                const newAmount = event.target.value; //-- to use event.target to be recreated on every key stroke.--//
                setInitialValue((prevInputSate) => ({
                  amount: newAmount,
                  title: prevInputSate.title, //-- Restoring the value on State update so it is not lost
                }));
              }}
*/
