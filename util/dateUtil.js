/**
 * Convert a dueBy value (string or Date) to a Date object
 * @param {string|Date|null} dueBy - The due date value
 * @returns {Date|null} - Date object or null if invalid
 */
export function convertDueBytToDate(dueBy) {
  if (!dueBy) return null;
  
  if (dueBy instanceof Date) {
    return dueBy;
  }
  
  if (typeof dueBy === 'string') {
    const parsed = new Date(dueBy);
    return isNaN(parsed.getTime()) ? null : parsed;
  }
  
  return null;
}

/**
 * Check if a task is within the notification window
 * @param {Date} dueDate - The task's due date
 * @param {number} notifyDaysInAdvance - Number of days before due date to notify
 * @returns {boolean} - true if task should be notified now
 */
export function isTaskInNotificationWindow(dueDate, notifyDaysInAdvance) {
  const now = new Date();
  const notificationStartDate = new Date(now);
  notificationStartDate.setDate(now.getDate() + notifyDaysInAdvance);
  
  // Reset hours to compare dates only
  const dueDay = new Date(dueDate);
  dueDay.setHours(0, 0, 0, 0);
  
  const notifyDay = new Date(notificationStartDate);
  notifyDay.setHours(0, 0, 0, 0);
  
  // Task is in notification window if notification date >= due date
  return notifyDay >= dueDay;
}

/**
 * Get the ideal notification time for a task (8 AM on the notification day)
 * @param {Date} dueDate - The task's due date
 * @param {number} notifyDaysInAdvance - Number of days before due date
 * @returns {Date} - The notification trigger time
 */
export function getNotificationTriggerTime(dueDate, notifyDaysInAdvance) {
  const triggerDate = new Date(dueDate);
  triggerDate.setDate(dueDate.getDate() - notifyDaysInAdvance);
  triggerDate.setHours(8, 0, 0, 0); // Notify at 8 AM
  return triggerDate;
}

/**
 * Format a date to a readable string (e.g., "Dec 4, 2025")
 * @param {Date} date - The date to format
 * @returns {string} - Formatted date string
 */
export function formatDateForDisplay(date) {
  if (!date) return '';
  const d = convertDueBytToDate(date);
  return d ? d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '';
}

/**
 * Convert Date object to ISO string for storage
 * @param {Date} date - The date to convert
 * @returns {string} - ISO string representation
 */
export function dateToISOString(date) {
  return date instanceof Date ? date.toISOString() : date;
}

/**
 * Check if a date string is in a valid format
 * @param {string} dateString - The date string to validate
 * @returns {boolean} - true if valid date format
 */
export function isValidDateString(dateString) {
  if (!dateString) return false;
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}
