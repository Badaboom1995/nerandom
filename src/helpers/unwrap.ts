export const unwrapAirtable = (input: any) =>
  input.data.records.map((item: any) => ({
    id: item.id,
    createdTime: item.createdTime,
    ...item.fields,
  }));
