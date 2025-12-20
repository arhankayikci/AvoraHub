/**
 * Visibility Helpers for Guest Content Wall
 * 
 * Implements a "rotating content wall" strategy where guests see different
 * items each day based on deterministic randomness. This creates a perception
 * of dynamic, fresh content while maintaining security and driving conversions.
 */

/**
 * Determines if an item should be visible to guests
 * Uses deterministic randomness that changes daily at midnight
 * 
 * @param {string|number} itemId - Unique item identifier
 * @param {number} visibilityRatio - Fraction of items to show (default: 0.3 = 30%)
 * @returns {boolean} - True if item should be visible to guests
 */
export function isItemVisibleToGuest(itemId, visibilityRatio = 0.3) {
    // Get current date (changes daily at midnight)
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 0);
    const diff = now - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    // Convert itemId to number if it's a string
    const numericId = typeof itemId === 'string'
        ? itemId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
        : itemId;

    // Create seed from itemId and day (magic number for better distribution)
    const seed = (numericId + dayOfYear) * 7;

    // Deterministic "random" check
    const threshold = Math.floor(1 / visibilityRatio);
    return seed % threshold === 0;
}

/**
 * Filters items array to show only visible ones for guests
 * Always ensures at least GUEST_LIMIT items are shown
 * 
 * @param {Array} items - Array of items to filter
 * @param {boolean} isAuthenticated - Whether user is logged in
 * @param {number} GUEST_LIMIT - Minimum number of items to show (default: 3)
 * @returns {Object} - { displayedItems, hiddenCount }
 */
export function filterItemsForGuests(items, isAuthenticated, GUEST_LIMIT = 3) {
    if (isAuthenticated) {
        return {
            displayedItems: items,
            hiddenCount: 0,
            isFiltered: false
        };
    }

    if (!items || items.length === 0) {
        return {
            displayedItems: [],
            hiddenCount: 0,
            isFiltered: false
        };
    }

    // Get items that pass the rotation filter
    const rotatedItems = items.filter(item =>
        isItemVisibleToGuest(item.id || item._id || Math.random())
    );

    // Ensure minimum visibility - fallback to first N items if rotation gives too few
    const displayedItems = rotatedItems.length >= GUEST_LIMIT
        ? rotatedItems
        : items.slice(0, GUEST_LIMIT);

    const hiddenCount = items.length - displayedItems.length;

    return {
        displayedItems,
        hiddenCount,
        isFiltered: true
    };
}

/**
 * Checks if a specific item should be shown in detail to guests
 * Use this for individual item pages
 * 
 * @param {string|number} itemId - Item identifier
 * @param {boolean} isAuthenticated - Whether user is logged in
 * @returns {boolean} - True if full details should be shown
 */
export function shouldShowFullDetails(itemId, isAuthenticated) {
    if (isAuthenticated) return true;
    return isItemVisibleToGuest(itemId);
}

/**
 * Gets a message for the freemium gate based on hidden count
 * 
 * @param {number} hiddenCount - Number of hidden items
 * @param {string} itemType - Type of items (e.g., 'iş ilanı', 'startup')
 * @returns {string} - Formatted message
 */
export function getFreemiumMessage(hiddenCount, itemType = 'içerik') {
    if (hiddenCount === 0) return '';

    return `${hiddenCount} ${itemType} daha görmek için giriş yapın`;
}
