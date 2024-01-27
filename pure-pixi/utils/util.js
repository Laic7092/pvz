export function getDefaultProps() {
    return {
        // width: 40,
        // height: 40,
        path: 'test.png',
        position: {
            x: 0,
            y: 0
        }
    }
}

export function deepCopy(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    const result = Array.isArray(obj) ? [] : {};

    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            result[key] = deepCopy(obj[key]);
        }
    }

    return result;
}