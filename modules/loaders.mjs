// loaders.mjs
export async function loadHTMLContent(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to load content from ${url}: ${response.statusText}`
      );
    }
    const content = await response.text();
    return content;
  } catch (error) {
    console.log("Error loading HTML content:", error);
    console.log(error);
    return `<p>Error loading content from ${url}</p>`;
  }
}
