const { validateProp } = require('./validateProp')

class Review {
    constructor(title, postedOn, shortDescription, description) {
        this.title = title;
        this.postedOn = postedOn;
        this.shortDescription = shortDescription;
        this.description = description;

        this.validate();
    }

    validate() {
        validateProp(this.title, 'string', 'title should not be empty');
        validateProp(this.postedOn, 'dateTime', 'date of submission should not be empty');
        validateProp(this.shortDescription, 'string', 'short description should not be empty');
        validateProp(this.description, 'string', 'description should not be empty');
    }
}

module.exports.Review = Review;