import { useRecoilState } from "recoil";
import dictsState from "./dictsAtom";
import dictsService from "../../services/dicts";
import { useEffect } from "react";

export const useDictsBootstrap = () => {
  const [dicts, setDicts] = useRecoilState(dictsState);
  const fetchData = async () => {
    const [occupation, areas, skills]: any = await Promise.all([
      dictsService.getOccupations(),
      dictsService.getAreas(),
      dictsService.getSkills(),
    ]);
    setDicts({
      loading: false,
      fulfilled: true,
      occupation,
      areas,
      skills,
    });
  };

  useEffect(() => {
    if (!dicts.fulfilled) fetchData();
  }, []);

  return dicts;
};
