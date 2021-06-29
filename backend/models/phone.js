const { validateProp } = require('./validateProp')

class Phone {
    constructor(name, description, images, defaultImage, price) {
        this.name = name;
        this.description = description;
        this.images = images;
        this.defaultImage = defaultImage;
        this.price = price;

        this.validate();
    }

    validate() {
        validateProp(this.name, 'string', 'name should not be empty');
        validateProp(this.description, 'string', 'description should not be empty');
        validateProp(this.images, 'array', 'images should not be empty');
        validateProp(this.defaultImage, 'string', 'default image should not be empty');
        validateProp(this.price, 'number', 'price should not be 0 or negative');
    }
}

module.exports.Phone = Phone