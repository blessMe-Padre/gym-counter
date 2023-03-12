// функция преобразования объекта в массив

const month = [
    { 1: 'Январь 2023 г' },
    { 2: 'Февраль 2023 г' },
    { 3: 'Март 2023 г' },
    { 4: 'Апрель 2023 г' },
    { 5: 'Май 2023 г' },
    { 6: 'Июнь 2023 г' },
    { 7: 'Июль 2023 г' },
    { 8: 'Август 2023 г' },
    { 9: 'Сентябрь 2023 г' },
    { 10: 'Октябрь 2023 г' },
    { 11: 'Ноябрь 2023 г' },
    { 12: 'Декабрь 2023 г' },
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