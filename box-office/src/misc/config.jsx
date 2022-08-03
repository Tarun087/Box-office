const API_BASE_URL = 'https://api.tvmaze.com';

export async function getApi(queryString) {
  const response = await fetch(`${API_BASE_URL}${queryString}`).then(r =>
    r.json()
  );
  return response;
}
