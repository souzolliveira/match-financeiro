export default function handleParams(filters) {
  const p = [];
  Object.keys(filters).forEach(filter => {
    p.push({
      key: [filter],
      value: filters[filter],
    });
  });
  let params = '';
  p.forEach(filter => {
    params = `${params}&${filter.key}=${filter.value}`;
  });
  return params;
}
