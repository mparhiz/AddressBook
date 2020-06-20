export const CompareValues = (key, order = 'asc') => {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0;

        const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];

        let comparison = varA > varB ? 1 : varA < varB ? -1 : 0;

        return (
            (order === 'desc') ? (comparison * -1) : comparison
        );
    };
}

export const FilterValues = (list, filterOn, filterBy) => {
    if (filterBy && filterBy !== "") {
        return list.filter(x => x[filterOn].toUpperCase().indexOf(filterBy.toUpperCase()) > -1);
    }
    return list;
}