export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/--+/g, "-") // Replace multiple - with single -
    .trim(); // Trim - from start and end
}

// Add reverse slug lookup
export function findContentBySlug(sidebarSetup, page, slug) {
  const pageContent = sidebarSetup[page];
  if (!pageContent) return null;

  // Look through numbered entries (1, 2, 3, etc.)
  for (const [key, content] of Object.entries(pageContent)) {
    if (key === "welcomeMessage") continue;

    const contentSlug = slugify(content.title);
    if (contentSlug === slug) {
      return { key, content };
    }
  }
  return null;
}

export function validateSlug(slug) {
  // Check if slug matches expected pattern
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

export function generateUniqueSlug(sidebarSetup, page, title) {
  let baseSlug = slugify(title);
  let slug = baseSlug;
  let counter = 1;

  // Check if slug already exists in this page
  while (findContentBySlug(sidebarSetup, page, slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}

export function getKeyFromSlug(sidebarSetup, page, slug) {
  const pageContent = sidebarSetup[page];
  if (!pageContent) return null;

  // Look through all entries except welcomeMessage
  for (const [key, content] of Object.entries(pageContent)) {
    if (key === "welcomeMessage") continue;

    const contentSlug = slugify(content.title);
    if (contentSlug === slug) {
      return key;
    }
  }
  return null;
}
