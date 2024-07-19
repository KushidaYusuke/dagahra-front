export async function load() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(`${apiUrl}/faq`);
  return {
    posts: await response.json(),
  };
}
