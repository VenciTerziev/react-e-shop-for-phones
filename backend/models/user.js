const { validateProp } = require('./validateProp')

class User {
    constructor(username, fullname, password, role) {
        this.username = username;
        this.fullname = fullname;
        this.password = password;
        this.role = role;

        this.validate();
    }

    validate() {
        validateProp(this.username, 'string', 'username should not be empty');
        validateProp(this.fullname, 'string', 'fullname should not be empty');
        validateProp(this.password, 'string', 'password should not be empty');
    }
}

module.exports.User = User