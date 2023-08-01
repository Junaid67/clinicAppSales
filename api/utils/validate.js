const validate = async (schema, req) => {
    try {
        await schema
            .unknown(true)
            .validateAsync(req, { abortEarly: false });
    }
    catch (err) {
        throw err;
    }
};
function checkDate(date) {
    return validateDate(date, responseType = 'boolean');
}
const isJson = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};
function arrToIntArr(arr) {
    return arr.map(Number);
}

function returnUniqueArray(value, index, self) {
    return self.indexOf((value)) === index;
}

function validateArrOfNumbers(arr) {
    let tempArr = arrToIntArr(arr);
    tempArr = arrToIntArr(tempArr);
    arr = tempArr.filter(returnUniqueArray);

    return arr;
}
function timeSince(date) {

    let seconds = Math.floor((new Date() - date) / 1000);

    let interval = seconds / 31536000;

    if (interval > 1) {
        let roundedInterval = Math.floor(interval);
        if (roundedInterval > 1) {
            return Math.floor(interval) + ' years';
        }
        return Math.floor(interval) + ' year';
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        let roundedInterval = Math.floor(interval);
        if (roundedInterval > 1) {
            return Math.floor(interval) + ' months';
        }
        return Math.floor(interval) + ' month';
    }
    interval = seconds / 86400;
    if (interval > 1) {
        let roundedInterval = Math.floor(interval);
        if (roundedInterval > 1) {
            return Math.floor(interval) + ' days';
        }
        return Math.floor(interval) + ' day';
    }
    interval = seconds / 3600;
    if (interval > 1) {
        let roundedInterval = Math.floor(interval);
        if (roundedInterval > 1) {
            return Math.floor(interval) + ' hours';
        }
        return Math.floor(interval) + ' hour';
    }
    interval = seconds / 60;
    if (interval > 1) {
        let roundedInterval = Math.floor(interval);
        if (roundedInterval > 1) {
            return Math.floor(interval) + ' minutes';
        }
        return Math.floor(interval) + ' minute';
    }
    let roundedInterval = Math.floor(interval);
    if (roundedInterval > 1) {
        return Math.floor(interval) + ' seconds';
    }
    return Math.floor(interval) + ' second';
}
function returnMonths() {
    let m = {
        0: 'Jan',
        1: 'Feb',
        2: 'Mar',
        3: 'Apr',
        4: 'May',
        5: 'Jun',
        6: 'Jul',
        7: 'Aug',
        8: 'Sep',
        9: 'Oct',
        10: 'Nov',
        11: 'Dec'
    };
    return m;
}
function returnDate(date) {
    return new Date(date);
}
function returnIds(obj, value) {
    let arr = [];
    obj.forEach((item) => {
        if (item[value] !== null) {
            arr.push(item[value]);
        }
    });
    return arr;
}
function currTimestamp() {
    let timestamp = new Date().getTime();
    return timestamp;
}
function validateReqiuiredFields(array, request) {

    let isValid = true;
    let requiredFields = [];

    // request.forEach(function(item, index){
    array.forEach((item, index) => {
        if (request[item] == undefined || request[item] == null || request[item] === '') {
            isValid = false;
            requiredFields.push(item);
        }
        // })
    });

    return { isValid: isValid, requiredFields: requiredFields };
}

function returnHTMLForImage(value) {

    return `<!DOCTYPE html>
                <html>
                <head>
                  <title>notes</title>
                <style type="text/css">
                .text-center{
                   text-align: center !important; 
                  }
                  </style>
                </head>
                <body>
                <div class="text-center">
                  <img src="${value}">
                </div>
                </body>
                </html>`;

}
function dateDiff(startingDate, endingDate) {
    var startDate = new Date(startingDate);

    // var endDate = new Date(endingDate);
    var endDate = new Date(endingDate);
    if (startDate > endDate) {
        var swap = startDate;
        startDate = endDate;
        endDate = swap;
    }

    var startYear = startDate.getFullYear();
    var february =
        (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0
            ? 29
            : 28;
    var daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    var yearDiff = endDate.getFullYear() - startYear;
    var monthDiff = endDate.getMonth() - startDate.getMonth();
    if (monthDiff < 0) {
        yearDiff--;
        monthDiff += 12;
    }
    var dayDiff = endDate.getDate() - startDate.getDate();
    if (dayDiff < 0) {
        if (monthDiff > 0) {
            monthDiff--;
        } else {
            yearDiff--;
            monthDiff = 11;
        }
        dayDiff += daysInMonth[startDate.getMonth()];
    }

    var duration = '';
    if (yearDiff * 1 > 0) {
        duration = yearDiff + ' Year';
    } else {
        if (dayDiff * 1 > 10) {
            monthDiff = monthDiff * 1 + 1;
        }
        duration = monthDiff + ' Months';
    }

    return duration;
}
let isDate = function (date) {
    return (new Date(date) !== 'Invalid Date') && !isNaN(new Date(date));
};

let groupBy = function (xs, key) {
    return xs.reduce((rv, x) => {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

let removeFieldsFromObject = (items, fields) => {
    items.map((item) => {
        for (const field of fields) {
            delete item[field];
        }
        return item;
    });
    return items;
};
function alphaNumeric(inputTxt) {
    let letterNumber = /^[0-9a-zA-Z]+$/;
    if (inputTxt.match(letterNumber)) {
        return true;
    } else {
        return false;
    }
}
module.exports = {
    validate,
    isJson,
    arrToIntArr,
    returnUniqueArray,
    validateArrOfNumbers,
    timeSince,
    returnMonths,
    returnDate,
    returnIds,
    currTimestamp,
    validateReqiuiredFields,
    returnHTMLForImage,
    checkDate,
    dateDiff,
    isDate,
    groupBy,
    removeFieldsFromObject,
    alphaNumeric
};
