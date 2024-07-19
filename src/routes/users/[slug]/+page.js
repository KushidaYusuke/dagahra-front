export async function load({ params }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(
    `${apiUrl}/faq/users/${params.slug}`,
  );
  return {
    selected_user_posts: await response.json(),
  };
}
