function validateProp(value, type, message) {
    let hasError = false;
    if (!value) {
        hasError = true;
    } else {
        if (type === 'string') {
            hasError = value.trim() === '';
        } else if (type === 'array') {
            hasError = value.length === 0;
        } else if (type === 'number') {
            hasError = value <= 0;
        }
    }

    if (hasError) {
        throw Error(message)
    }
}

module.exports.validateProp = validateProp