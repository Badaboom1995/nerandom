import makeRequest from "./makeRequest";
import { unwrapAirtable } from "./unwrap";

const airtable = {
  getAllPages: async function (
    callback: (offset: string) => Promise<any>,
    accum = [],
    offset = ""
  ): Promise<any> {
    const result = await callback(offset);

    const data: any = [...accum, ...unwrapAirtable(result)];
    if (result.data.offset) {
      return this.getAllPages(callback, data, result.data.offset);
    } else {
      return data;
    }
  },
};

export default airtable;
