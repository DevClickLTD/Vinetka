const API_BASE_URL = "https://vinetka.admin-panels.com/wp-json/wp/v2";
import { cache } from "react";

/**
 * Universal fetch function with retry logic and caching
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options (optional)
 * @returns {Promise<any>} - JSON response
 */
export const fetchAPI = cache(async (endpoint, options = {}) => {
  const maxRetries = 3;
  let lastError = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 60, // Cache for 1 minute (faster updates)
          tags: ['wordpress-api']
        },
        ...options,
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`);
      }

      const text = await res.text();

      try {
        // Опитваме се да парснем отговора като JSON
        return JSON.parse(text);
      } catch (parseError) {
        // Ако получим HTML вместо JSON, хвърляме по-ясна грешка
        if (text.includes("<br />") || text.includes("<html")) {
          throw new Error(
            `WordPress върна HTML вместо JSON: ${text.substring(0, 100)}...`
          );
        }
        throw new Error(
          `Failed to parse API response as JSON: ${parseError.message}`
        );
      }
    } catch (error) {
      lastError = error;
      console.error(`Fetch API Error (attempt ${attempt}/${maxRetries}):`, error);
      
      // Retry with exponential backoff
      if (attempt < maxRetries) {
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  // All retries failed
  console.error("All fetch attempts failed:", lastError);
  return null;
});
