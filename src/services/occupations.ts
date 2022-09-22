import makeRequest from "../helpers/makeRequest";

const getOccupation = (id: string) => makeRequest.get(`Occupation/${id}`);
