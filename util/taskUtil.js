import { isValidDateString } from './dateUtil';

// Handles cycling through sort criteria
export const getNextSortCriteria = (current) => {
    switch (current) {
        case 'All':
            return 'Due Date';
        case 'Due Date':
            return 'Completed';
        case 'Completed':
            return 'Category';
        case 'Category':
            return 'Repeating';
        case 'Repeating':
            return 'All';
        default:
            return 'All';
        }
}

// Filters and sorts tasks based on selected criteria
// 'All', 'Due Date', 'Completed', 'Category', 'Repeating'
export const sortTasks = (tasks, sortCriteria) => {
    const sortedTasks = [...tasks];
    
    switch (sortCriteria) {
        case 'All':
            return sortedTasks;
        case 'Due Date':
            return sortedTasks.filter(task => task.dueBy && isValidDateString(task.dueBy));
        case 'Completed':
            return sortedTasks.filter(task => task.completed);
        case 'Category':
            return sortedTasks.filter(task => task.category && task.category.trim() !== '')
                .sort((a, b) => a.category.localeCompare(b.category));
        case 'Repeating':
            return sortedTasks.filter(task => task.repeating);
        default:
            return sortedTasks;
    }
};

