// API Service Module
// Centralized API call management with environment variables

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com';
const API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT || 10000;

/**
 * Fetch wrapper with timeout and error handling
 * @param {string} url - The API endpoint
 * @param {object} options - Fetch options
 * @returns {Promise<Response>}
 */
const fetchWithTimeout = (url, options = {}) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('API request timeout')), API_TIMEOUT)
    )
  ]);
};

/**
 * API Service Object
 * Contains all methods for CRUD operations
 */
const apiService = {
  /**
   * Fetch all posts
   * @returns {Promise<Array>} Array of posts
   */
  fetchPosts: async () => {
    try {
      const response = await fetchWithTimeout(`${API_BASE_URL}/posts`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw new Error('Failed to fetch posts. Please try again later.');
    }
  },

  /**
   * Create a new post
   * @param {object} postData - Post data object {title, body, userId}
   * @returns {Promise<object>} Created post object
   */
  createPost: async (postData) => {
    try {
      const response = await fetchWithTimeout(`${API_BASE_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const createdPost = await response.json();
      return createdPost;
    } catch (error) {
      console.error('Error creating post:', error);
      throw new Error('Failed to create post. Please try again later.');
    }
  },

  /**
   * Update an existing post
   * @param {number} postId - ID of the post to update
   * @param {object} postData - Updated post data {title, body}
   * @returns {Promise<object>} Updated post object
   */
  updatePost: async (postId, postData) => {
    try {
      const response = await fetchWithTimeout(`${API_BASE_URL}/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedPost = await response.json();
      return updatedPost;
    } catch (error) {
      console.error('Error updating post:', error);
      throw new Error('Failed to update post. Please try again later.');
    }
  },

  /**
   * Delete a post
   * @param {number} postId - ID of the post to delete
   * @returns {Promise<void>}
   */
  deletePost: async (postId) => {
    try {
      const response = await fetchWithTimeout(`${API_BASE_URL}/posts/${postId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return true;
    } catch (error) {
      console.error('Error deleting post:', error);
      throw new Error('Failed to delete post. Please try again later.');
    }
  }
};

export default apiService;
