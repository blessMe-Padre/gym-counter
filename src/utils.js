// функция преобразования объекта в массив
function convertToArray(obj) {
    return Object.keys(obj).filter(function (key) {
        return key !== 'general';
    }).map(function (key) {
        return {
            id: parseInt(key),
            counter: obj[key].counter,
            squat: obj[key].squat,
            email: obj[key].email
        };
    });
}

export { convertToArray };