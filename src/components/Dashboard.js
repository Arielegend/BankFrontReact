import React, { useState } from "react";
import { SetNumberOfClientsInDb, IsAllive } from "../utils/dbUtils";
// eslint-disable-next-line import/no-webpack-loader-syntax
//import Worker from "worker-loader!./Worker.js";

export default function Dashboard() {
  const [numberOfClients, setnumberOfClients] = useState(0);
  const [workers, setWorkers] = useState([]);

  const [submitPressed, setsubmitPressed] = useState(false);

  async function handleSubmit() {
    //Setting number of clinets
    if (numberOfClients > 0) {
      await SetNumberOfClientsInDb(numberOfClients);
      alert("Done Setting DB for clients");
      setsubmitPressed(true);
    } else {
      alert("Enter valid number of bacnk accounts to simulate...");
    }
  }

  function startFlow() {
    let myWorkers = [];
    for (let i = 0; i < numberOfClients; i++) {
      const worker = new Worker(new URL("./Worker.js", import.meta.url));
      myWorkers[i] = worker;
    }

    setWorkers(workers);

    myWorkers.forEach((element, idx) => {
      var workerParams = {
        activeThread: idx + 1,
        numberOfClients: numberOfClients,
      };
      element.postMessage(workerParams);
    });
  }

  function stopFlow() {
    workers.forEach((element) => {
      element.terminate();
    });
    window.location.reload(false);
  }

  return (
    <div>
      <input
        type="number"
        onChange={(e) => setnumberOfClients(parseInt(e.target.value))}
      ></input>
      <button onClick={() => handleSubmit()}>Submit {numberOfClients}</button>
      <button onClick={() => IsAllive()}>IsAllive </button>
      <div>
        {submitPressed ? (
          <div>
            <button onClick={() => startFlow()}>startFlow </button>
            <button onClick={() => stopFlow()}> stopFlow </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
