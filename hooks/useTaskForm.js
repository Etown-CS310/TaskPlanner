import { useState, useEffect } from 'react';
import { convertDueBytToDate, dateToISOString } from '../util/dateUtil';

/**
 * Hook to manage task form state for adding/editing tasks
 * Handles all form fields and validation
 */
export function useTaskForm(initialTask = null) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [repeatable, setRepeatable] = useState(false);
  const [dueDate, setDueDate] = useState(false);
  const [dueDateValue, setDueDateValue] = useState(null);
  const [repeatingData, setRepeatingData] = useState(null);

  // Load initial task values when editing
  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title || '');
      setCategory(initialTask.category || '');
      setRepeatable(!!initialTask.repeating);
      setDueDate(!!initialTask.dueBy);
      setDueDateValue(initialTask.dueBy ? convertDueBytToDate(initialTask.dueBy) : null);
      setRepeatingData(initialTask.repeating || null);
    }
  }, [initialTask]);

  const resetForm = () => {
    setTitle('');
    setCategory('');
    setRepeatable(false);
    setDueDate(false);
    setDueDateValue(null);
    setRepeatingData(null);
  };

  const buildTaskObject = (userId, existingTaskId = null) => {
    const taskObject = {
      id: existingTaskId || Date.now().toString(),
      userId: userId || 'defaultUser',
      title: title || 'Untitled Task',
      completed: initialTask?.completed || false,
      category: category,
      repeating: repeatable ? repeatingData : null,
      dueBy: dueDate && dueDateValue ? dateToISOString(dueDateValue) : null,
    };
    return taskObject;
  };

  const handleRepeatingDataChange = (data) => {
    setRepeatingData(data);
    setRepeatable(true);
  };

  return {
    // State
    title,
    category,
    repeatable,
    dueDate,
    dueDateValue,
    repeatingData,
    // Setters
    setTitle,
    setCategory,
    setRepeatable,
    setDueDate,
    setDueDateValue,
    setRepeatingData,
    // Methods
    resetForm,
    buildTaskObject,
    handleRepeatingDataChange,
  };
}
