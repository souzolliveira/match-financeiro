export default function handleResponse(response) {
  return new Promise(resolve => {
    const { data } = response;
    resolve(data);
  });
}
