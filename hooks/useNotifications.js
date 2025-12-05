import { useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  scheduleNotification,
  cancelAllNotifications,
  requestNotificationPermissions,
} from '../services/NotificationService';
import { getNotificationTriggerTime, convertDueBytToDate } from '../util/dateUtil';

/**
 * Hook to manage task notifications
 * Schedules notifications based on tasks and user's notification preference
 */
export function useNotifications(tasks = []) {
  const notificationIdsRef = useRef({});

  // Initialize notifications and load preferences
  useEffect(() => {
    const initializeNotifications = async () => {
      try {
        const permissionsGranted = await requestNotificationPermissions();
        if (!permissionsGranted) {
          console.log('Notification permissions not granted');
          return;
        }
        
        // Load notification preference
        const notifyDaysStr = await AsyncStorage.getItem('notifyDaysInAdvance');
        const notifyDays = notifyDaysStr ? parseInt(notifyDaysStr, 10) : 3; // Default 3 days
        
        // Schedule notifications for all tasks with due dates
        await scheduleTaskNotifications(tasks, notifyDays);
      } catch (error) {
        console.error('Error initializing notifications:', error);
      }
    };

    initializeNotifications();
  }, [tasks]);

  /**
   * Schedule notifications for tasks with due dates
   */
  const scheduleTaskNotifications = async (tasksToSchedule, notifyDaysInAdvance) => {
    try {
      // Cancel existing notifications
      await cancelAllNotifications();
      notificationIdsRef.current = {};

      // Schedule new notifications for each task with a due date
      for (const task of tasksToSchedule) {
        if (!task.dueBy || task.completed) continue;

        const dueDate = convertDueBytToDate(task.dueBy);
        if (!dueDate) continue;

        const triggerTime = getNotificationTriggerTime(dueDate, notifyDaysInAdvance);
        
        // Only schedule if trigger time is in the future
        if (triggerTime > new Date()) {
          const notificationId = await scheduleNotification(
            triggerTime,
            `Task Due Soon: ${task.title}`,
            `Due on ${dueDate.toLocaleDateString()}`,
            { taskId: task.id, taskTitle: task.title }
          );

          if (notificationId) {
            notificationIdsRef.current[task.id] = notificationId;
          }
        }
      }

    } catch (error) {
      console.error('Error scheduling notifications:', error);
    }
  };

  /**
   * Update notification preference (called when user changes settings)
   */
  const updateNotificationPreference = async (notifyDaysInAdvance) => {
    try {
      await AsyncStorage.setItem('notifyDaysInAdvance', String(notifyDaysInAdvance));
      // Reschedule with new preference
      await scheduleTaskNotifications(tasks, notifyDaysInAdvance);
    } catch (error) {
      console.error('Error updating notification preference:', error);
    }
  };

  return { updateNotificationPreference };
}
