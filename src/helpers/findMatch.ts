import makeRequest from "./makeRequest";
import { unwrapAirtable } from "./unwrap";
import matchesSerivce from "../services/matches";

const findMatch = () => {
  makeRequest
    .get("Users?filterByFormula=Search('Yes', {readyForCoffee})")
    .then((results) => {
      const unwrappedResult = unwrapAirtable(results).map((item: any) => ({
        id: item.id,
        name: item.name,
        skills: item.skills,
        areas: item.areas,
        requestAreas: item.requestAreas,
        requestSkills: item.requestSkills,
      }));
      const data = [...unwrappedResult];
      console.log(unwrappedResult);
      const getPairScore = (lh: any, rh: any) => {
        let score = 0;
        lh.requestAreas.forEach((area: string) => {
          if (rh.areas.includes(area)) score++;
        });
        lh.requestSkills.forEach((skill: string) => {
          if (rh.skills.includes(skill)) score++;
        });
        rh.requestSkills.forEach((skill: string) => {
          if (lh.skills.includes(skill)) score++;
        });
        rh.requestSkills.forEach((skill: string) => {
          if (lh.skills.includes(skill)) score++;
        });
        return score;
      };
      const findBestMatches = (people: any[], matches: any[] = []): any[] => {
        const currUser = people[0];
        let bestMatch: any = { score: 0, index: 0 };
        people.shift();
        people.forEach((item: any, index) => {
          const currScore = getPairScore(item, currUser);
          if (bestMatch && currScore > bestMatch.score) {
            bestMatch = { score: currScore, index, ...item };
          }
        });
        if (bestMatch) {
          people.splice(bestMatch.index, 1);
          delete bestMatch.score;
          delete bestMatch.index;
        }
        matches.push({ lh: bestMatch, rh: currUser });
        if (people.length === 2) {
          matches.push({ lh: people[0], rh: people[1] });
          people = [];
        }
        if (people.length > 1) {
          return findBestMatches(people, matches);
        } else {
          return matches;
        }
      };

      const finalPairs = findBestMatches(data).map((item) => ({
        fields: {
          SeedPhrase: `${item.lh.name}-${item.rh.name}`,
          UserOne: [item.lh.id],
          UserTwo: [item.rh.id],
        },
      }));
      matchesSerivce.create({ records: finalPairs });
      console.log(finalPairs);
    });
};

export default findMatch;