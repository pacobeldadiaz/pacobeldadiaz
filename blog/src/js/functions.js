export async function fetchPosts() {
    try {
        const response = await fetch('/blog.json');
        const data = await response.json();
        return data.posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}