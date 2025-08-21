// функция преобразования объекта в массив

const month = [
    { 1: 'Январь' },
    { 2: 'Февраль' },
    { 3: 'Март' },
    { 4: 'Апрель' },
    { 5: 'Май' },
    { 6: 'Июнь' },
    { 7: 'Июль' },
    { 8: 'Август' },
    { 9: 'Сентябрь' },
    { 10: 'Октябрь' },
    { 11: 'Ноябрь' },
    { 12: 'Декабрь' },
];

// функция преобразовывает объект в массив исключая ключи general и target
function convertToArray(obj, month) {
    return Object.keys(obj).filter(function (key) {
        return key !== 'general' && key !== 'target';

    }).map(function (key) {
        // Извлекаем номер месяца и год из ключа вида "7_2025"
        const [monthNum, year] = key.split('_');
        const monthItem = month.find(item => item.hasOwnProperty(parseInt(monthNum)));
        const monthName = monthItem ? monthItem[parseInt(monthNum)] : '';
        return {
            id: key, // сохраняем оригинальный ключ
            counter: obj[key].counter,
            email: obj[key].email,
            month: `${monthName} ${year}` // формат "Июль 2025"
        };
    });
}

// функция преобразует строку вида "7_2025" в "Июль 2025"
function convertDateToString(dateString) {
    const [monthNum, year] = dateString.split('_');
    const monthItem = month.find(item => item.hasOwnProperty(parseInt(monthNum)));
    const monthName = monthItem ? monthItem[parseInt(monthNum)] : '';
    return `${monthName} ${year}`;
}

export { convertToArray, convertDateToString, month };