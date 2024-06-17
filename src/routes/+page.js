export async function load() {
    const response = await fetch('http://localhost:8000/faq');
    return {
        posts: await response.json()
    };
}