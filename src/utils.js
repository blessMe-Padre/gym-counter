// функция преобразования объекта в массив

const month = [
    { 3: 'Март 2023г' },
    { 4: 'Апрель 2023г' },
    { 5: 'Май 2023г' },
    { 6: 'Июнь 2023г' },
    { 7: 'Июль 2023г' },
    { 8: 'Август 2023г' },
    { 9: 'Сентябрь 2023г' },
    { 10: 'Октябрь 2023г' },
    { 11: 'Ноябрь 2023г' },
    { 12: 'Декабрь 2023г' },
];

function convertToArray(obj, month) {
    return Object.keys(obj).filter(function (key) {
        return key !== 'general';
    }).map(function (key) {
        const monthItem = month.find(item => item.hasOwnProperty(key));
        const monthName = monthItem ? monthItem[key] : '';
        return {
            id: parseInt(key),
            counter: obj[key].counter,
            squat: obj[key].squat,
            email: obj[key].email,
            month: monthName
        };
    });
}

export { convertToArray, month };