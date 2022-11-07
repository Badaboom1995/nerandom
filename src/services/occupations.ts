import makeRequest from "../utils/makeRequest";

const getOccupation = (id: string) => makeRequest.get(`Occupation/${id}`);
