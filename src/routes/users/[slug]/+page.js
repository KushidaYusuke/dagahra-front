export async function load( {params} ) {
    const response = await fetch(`http://localhost:8000/faq/users/${params.slug}`);
    return {
        selected_user_posts: await response.json()
    };
}