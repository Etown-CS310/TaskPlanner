import { useState } from 'react';
import { getNextSortCriteria, sortTasks } from '../util/taskUtil';

/**
 * Hook to manage task sorting, filtering, and search
 */
export function useSortAndFilter(tasks = []) {
  const [sortCriteria, setSortCriteria] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSortToggle = () => {
    setSortCriteria(prev => getNextSortCriteria(prev));
  };

  const sortedTasks = sortTasks(tasks, sortCriteria);

  // Filter sorted tasks by search query
  const filteredTasks = sortedTasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    sortCriteria,
    searchQuery,
    setSearchQuery,
    handleSortToggle,
    filteredTasks,
  };
}
