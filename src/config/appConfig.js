/**
 * Application Configuration
 * Centralized configuration for the entire application
 */

export const config = {
  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com',
    timeout: import.meta.env.VITE_API_TIMEOUT || 10000,
    endpoints: {
      posts: '/posts'
    }
  },

  // App Configuration
  app: {
    name: 'Posts Manager',
    version: '1.0.0',
    description: 'A professional React CRUD application'
  },

  // UI Configuration
  ui: {
    postsPerPage: 10,
    animationDuration: 300,
    confirmBeforeDelete: true
  },

  // Error Messages
  errors: {
    fetchFailed: 'Failed to fetch posts. Please try again later.',
    createFailed: 'Failed to create post. Please try again later.',
    updateFailed: 'Failed to update post. Please try again later.',
    deleteFailed: 'Failed to delete post. Please try again later.',
    timeout: 'Request timeout. Please try again.',
    validation: 'Please fill in all required fields.'
  },

  // Success Messages
  messages: {
    postCreated: 'Post created successfully!',
    postUpdated: 'Post updated successfully!',
    postDeleted: 'Post deleted successfully!',
    loading: 'Loading posts...',
    noPostsFound: 'No posts available.'
  }
};

export default config;
