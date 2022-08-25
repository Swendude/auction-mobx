import React from "react";
import { makeObservable, observable, computed, action, flow } from "mobx";
import { observer } from "mobx-react-lite";
import "./App.css";

class Counter {
  mutations: number[];

  constructor() {
    this.mutations = [0];
    makeObservable(this, {
      mutations: observable,
      increase: action,
      undo: action,
      count: computed
    });
  }

  get count() {
    return this.mutations.reduce((prev, next) => prev + next, 0);
  }

  increase(n: number) {
    this.mutations = [...this.mutations, n];
  }
  undo() {
    this.mutations = this.mutations.slice(0, this.mutations.length - 1);
  }
}

const myCounter = new Counter();

function App() {
  return (
    <div className="App">
      <p>{myCounter.count}</p>
      <p className="history">
        {myCounter.mutations
          .map((num) => (num > 0 ? `+${num}` : `${num}`))
          .join(",")}
      </p>
      <button onClick={() => myCounter.increase(1)}>+</button>
      <button onClick={() => myCounter.increase(5)}>+5</button>
      <button onClick={() => myCounter.increase(-1)}>-</button>
      <button onClick={() => myCounter.increase(-5)}>-5</button>
      <button onClick={() => myCounter.undo()}>undo</button>
    </div>
  );
}

export default observer(App);
