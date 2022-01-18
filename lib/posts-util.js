import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';
import { CLIENT_RENEG_LIMIT } from 'tls';

const postsDirectory = path.join(process.cwd(), 'posts');

// NOTE GET ALL POSTS FILES
export const getPostsFiles = () => {
  return fs.readdirSync(postsDirectory);
};

// NOTE GET POST DETAIL DATA INCLUDING META DATA AND CONTENT
export const getPostData = (postIdentifier) => {
  // 1) CREATE POST SLUG
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

// NOTE GET POST META DATA ONLY
export const getPostMetaData = (postIdentifier) => {
  // 1) CREATE POST SLUG
  const postSlug = postIdentifier.replace(/\.md$/, '');
  // 2) FILE PATH
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  // 3) GET FILE CONTENT
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  // 4) EXTRACT FILE META DATA AND CONTENT
  const { data } = matter(fileContent);
  const postMetaData = { slug: postSlug, ...data };
  // 5) RETURN DATA
  return postMetaData;
};

// NOTE GET ALL POSTS DATA INCLUDING META DATA AND CONTENT *SORTED BY DATE
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

// NOTE GET ALL POSTS META DATA *NO SORTING
export const getAllPostsMetaData = () => {
  // 1. READ ALL FILES
  const postFiles = getPostsFiles();
  // 2. MAP ALL FILES
  const allPostsMetaData = postFiles.map((postFile) => {
    return getPostMetaData(postFile);
  });
  // 3. RETUEN ALL POSTS META DATA
  return allPostsMetaData;
};

// NOTE GET ALL FEATURED POSTS
export const getAllFeaturedPosts = () => {
  const allPosts = getAllPosts();
  const allFeaturedPosts = allPosts.filter((post) => post.isFeatured);
  return allFeaturedPosts;
};

// NOTE GET FEATURED POSTS BASED ON CATEGORY
export const getCategoryFeaturedPosts = (category) => {
  const allFeaturedPosts = getAllFeaturedPosts();
  const categoryFeaturedPosts = allFeaturedPosts.filter((post) =>
    post.category.includes(category)
  );
  return categoryFeaturedPosts;
};

// NOTE GET FILTERED POSTS BY KEYWORD / DATE
export const getFilteredPostsMetaData = (filterData) => {
  const { keyword, year, month } = filterData;

  // GET ALL POSTS META DATA
  const allPostsMetaData = getAllPostsMetaData();

  // SEARCHING BY KEYWORD
  if (keyword) {
    const filteredPostsMetaData = allPostsMetaData.filter((postMetaData) =>
      postMetaData.slug.split('-').includes(keyword)
    );

    return filteredPostsMetaData;
  }

  // FILTERING BY DATE
  if (year && month) {
    const filteredPostsMetaData = allPostsMetaData.filter((postMetaData) => {
      const postDate = new Date(postMetaData.date);
      return (
        postDate.getFullYear() === year && postDate.getMonth() === month - 1
      );
    });

    return filteredPostsMetaData;
  }
};
