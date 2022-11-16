export const getPreparedForSubmissionFilters = (filters: any) => {
  const filtersKeys = Object.keys(filters ?? {});

  const preparedForSubmissionFilters = filtersKeys.reduce((handledFilters, filterKey) => {
    //@ts-ignore
    handledFilters[`filter.${filterKey}`] = `${filters[filterKey]}`
    return handledFilters
  }, {})

  return preparedForSubmissionFilters;
}
