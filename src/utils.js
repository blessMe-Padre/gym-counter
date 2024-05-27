// функция преобразования объекта в массив

const month = [
    { 1: 'Январь 2024 г' },
    { 2: 'Февраль 2024 г' },
    { 3: 'Март 2024 г' },
    { 4: 'Апрель 2024 г' },
    { 5: 'Май 2024 г' },
    { 6: 'Июнь 2024 г' },
    { 7: 'Июль 2024 г' },
    { 8: 'Август 2024 г' },
    { 9: 'Сентябрь 2024 г' },
    { 10: 'Октябрь 2024 г' },
    { 11: 'Ноябрь 2024 г' },
    { 12: 'Декабрь 2024 г' },
];

// функция преобразовывает объект в массив исключая ключи general и target
function convertToArray(obj, month) {
    return Object.keys(obj).filter(function (key) {
        return key !== 'general' && key !== 'target';

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