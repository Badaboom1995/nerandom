import axios from "axios";

const makeRequest = axios.create({
  baseURL: "https://api.airtable.com/v0/appHdKA9RYY3fiyw6/",
  timeout: 10000,
  headers: { Authorization: "Bearer keyt8sfJjSLa8j8W9" },
});

export default makeRequest;
