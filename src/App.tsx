import React from "react";
import "./App.css";
import { action, computed, makeObservable, observable } from "mobx";
import { observer } from "mobx-react-lite";
class Counter {
  mutations: number[];

  constructor() {
    makeObservable(this, {
      mutations: observable,
      change: action,
      undo: action,
      count: computed
    });

    this.mutations = [];
  }
  get count() {
    return this.mutations.reduce((prev, cur) => prev + cur, 0);
  }
  change(n: number) {
    this.mutations = [...this.mutations, n];
  }
  undo() {
    this.mutations = this.mutations.slice(0, this.mutations.length - 1);
  }
}

const myCounter = new Counter();

const App = observer(() => {
  return (
    <div className="App">
      <p>count: {myCounter.count}</p>
      <div>
        <button onClick={() => myCounter.change(1)}>+</button>
        <button onClick={() => myCounter.change(5)}>+5</button>
        <button onClick={() => myCounter.change(-1)}>-</button>
        <button onClick={() => myCounter.change(-5)}>-5</button>
      </div>
      <p>History: {myCounter.mutations.join(",")}</p>
      <button onClick={() => myCounter.undo()}>Undo</button>
    </div>
  );
});

export default App;
