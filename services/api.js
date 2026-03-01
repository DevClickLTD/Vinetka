const API_BASE_URL = "https://vinetka.admin-panels.com/wp-json/wp/v2";
import { cache } from "react";

/**
 * Universal fetch function with retry logic and caching
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options (optional)
 * @returns {Promise<any>} - JSON response
 */
export const fetchAPI = cache(async (endpoint, options = {}) => {
  const maxRetries = 2; // Намалени опити за по-бърз build
  let lastError = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Създаваме AbortController за timeout контрол
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 секунди timeout

      const res = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        next: {
          revalidate: 60, // Cache for 1 minute (faster updates)
          tags: ['wordpress-api']
        },
        ...options,
      });

      clearTimeout(timeoutId);

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
      
      // По-тих error logging за да не замърсява build output-а
      if (attempt === maxRetries) {
        console.warn(`WordPress API недостъпен (${endpoint}):`, error.message);
      }
      
      // Retry само ако не е abort error (timeout)
      if (attempt < maxRetries && error.name !== 'AbortError') {
        const delay = Math.min(2000 * attempt, 5000);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else if (error.name === 'AbortError') {
        // При timeout, не retry-ваме
        break;
      }
    }
  }

  // All retries failed - връщаме null за graceful degradation
  return null;
});
