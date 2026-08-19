export function getActiveProjectFilterCount(query: string, tag: string) {
  return Number(Boolean(query.trim())) + Number(Boolean(tag));
}
