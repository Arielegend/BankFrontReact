import React from "react";
import axios from "axios";
const PATH_TO_SERVER = "https://localhost:7200/";
const BANK_API_PATH_IN_SERVER = "Bank";

export async function SetNumberOfClientsInDb(numberOfClients) {
  var pathToRequset =
    PATH_TO_SERVER + BANK_API_PATH_IN_SERVER + "/SetNumberOfClients";

  console.log(pathToRequset);
  var response = await axios.post(
    pathToRequset,
    {
      numberOfClients: numberOfClients,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response.data);
}

export async function IsAllive() {
  var pathToRequset = PATH_TO_SERVER + BANK_API_PATH_IN_SERVER + "/IsAllive";
  var response = await axios.get(pathToRequset);

  if (response.data.returnStatus === 3) {
    alert("Allive");
  } else {
    alert("NotAllive");
  }
}
