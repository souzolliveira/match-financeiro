export default function handleParams(filters, formatDateFromFrontToAPI) {
  const p = [];
  Object.keys(filters).forEach(filter => {
    p.push({
      key: filter,
      value: filters[filter],
    });
  });
  let params = '';
  p.forEach(filter => {
    if (filter.key === 'startDate' || filter.key === 'endDate') {
      params = `${params}&${filter.key}=${formatDateFromFrontToAPI(filter.value) || ''}`;
    } else {
      params = `${params}&${filter.key}=${filter.value}`;
    }
  });
  return params;
}
