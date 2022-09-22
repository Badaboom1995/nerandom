export const unwrapAirtable = (input: any) =>
  input.data.records.map((item: any) => ({
    id: item.id,
    createdTime: item.createdTime,
    ...item.fields,
  }));

export const unwrapIdsToNames = (
  ids: string[],
  dict: any[],
  log?: boolean
): string[] => {
  return ids?.map((id) => dict.find((dictItem) => dictItem.id === id)?.name);
};
