import makeRequest from "../utils/makeRequest";
import { unwrapAirtable } from "../utils/unwrap";
import airtable from "../utils/airtable";

const dictsService = {
  getAreas: () =>
    makeRequest
      .get(`Areas?&filterByFormula=Search('1', {level})`)
      .then((res) => unwrapAirtable(res)),
  getOccupations: () =>
    airtable.getAllPages((offset) =>
      makeRequest.get(`Occupation?offset=${offset}`)
    ),
  getSkills: () =>
    makeRequest
      .get(`Skills?&filterByFormula=Search('1', {level})`)
      .then((res) => unwrapAirtable(res)),
};

export default dictsService;
