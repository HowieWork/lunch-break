import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

// GET ALL POSTS FILES
export const getPostsFiles = () => {
  return fs.readdirSync(postsDirectory);
};

// GET POST DATA
export const getPostData = (postIdentifier) => {
  // 1) CREATE SLUG
  const postSlug = postIdentifier.replace(/\.md$/, '');
  // 2) FILE PATH
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  // 3) GET FILE CONTENT
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  // 4) EXTRACT FILE META DATA AND CONTENT
  const { data, content } = matter(fileContent);
  const postData = { slug: postSlug, ...data, content };
  // 5) RETURN DATA
  return postData;
};

// GET ALL POSTS DATA
export const getAllPosts = () => {
  // 1) READ ALL FILES
  const postFiles = getPostsFiles();
  // 2) MAP ALL FILES AND RETURN ALL DATA
  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });
  // 3) SORT POSTS BASED ON DATE
  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );
  // 4) RETURN SORTED POSTS
  return sortedPosts;
};

// GET ALL FEATURED POSTS
export const getAllFeaturedPosts = () => {
  const allPosts = getAllPosts();
  const allFeaturedPosts = allPosts.filter((post) => post.isFeatured);
  return allFeaturedPosts;
};

// GET FEATURED POSTS BASED ON CATEGORY
export const getCategoryFeaturedPosts = (category) => {
  const allFeaturedPosts = getAllFeaturedPosts();
  const categoryFeaturedPosts = allFeaturedPosts.filter((post) =>
    post.category.includes(category)
  );
  return categoryFeaturedPosts;
};
