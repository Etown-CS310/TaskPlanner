// Handles cycling through sort criteria
export const getNextSortCriteria = (current) => {
    switch (current) {
        case 'Completed':
            return 'Category';
        case 'Category':
            return 'Repeating';
        case 'Repeating':
            return 'Completed';     // Temp while figure out fix, will eventually be 'Due By'
        default:
            return 'Completed';
        }
}

// Sorts tasks based on selected criteria
// 'Completed', 'Category', 'Repeating', 'Due By'
export const sortTasks = (tasks, sortCriteria) => {
    const sortedTasks = [...tasks];
    return sortedTasks.sort((a, b) => {
        switch (sortCriteria) {
            case 'Completed':
                return Number(a.completed) - Number(b.completed);
            case 'Category':
                if (!a.category && !b.category) return 0;
                if (!a.category) return 1;
                if (!b.category) return -1;
                return a.category.localeCompare(b.category);
            case 'Repeating':
                return (a.repeating ? 0 : 1) - (b.repeating ? 0 : 1);
            default:
                return tasks;
            }
        });
    };

