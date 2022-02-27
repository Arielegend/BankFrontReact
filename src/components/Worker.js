import React from "react";
const axios = require("axios");
const PATH_TO_SERVER = "https://localhost:7200/";
const BANK_API_PATH_IN_SERVER = "Bank";
var pathToRequset = PATH_TO_SERVER + BANK_API_PATH_IN_SERVER + "/Deposit";

onmessage = async function (e) {
  const activeThread = e.data.activeThread;
  const numberOfClients = e.data.numberOfClients;

  while (true) {
    let depositParams = getRandomDepositParams(activeThread, numberOfClients);
    let headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.post(pathToRequset, depositParams, headers);
    waitRandomTime();
  }
};

function getRandomDepositParams(activeThread, numberOfClients) {
  return {
    RequestingClientThread: activeThread,
    ClientId: randomIntFromInterval(1, numberOfClients),
    Amount: randomIntFromInterval(1, 10),
  };
}

function waitRandomTime() {
  var d1 = Date.now();
  var randSeconds = 1000 * randomIntFromInterval(1, 5);
  while (Date.now() < d1 + randSeconds) {}
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
