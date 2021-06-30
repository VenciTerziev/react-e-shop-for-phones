const { validateProp } = require('./validateProp')

class User {
    constructor(username, fullname, email, password, role, fromUpdate) {
        this.username = username;
        this.fullname = fullname;
        this.email = email;
        this.password = password;
        this.role = role;

        this.validate(fromUpdate);
    }

    validate(fromUpdate) {
        validateProp(this.username, 'string', 'username should not be empty');
        validateProp(this.fullname, 'string', 'fullname should not be empty');
        validateProp(this.email, 'string', 'email should not be empty');
        if (!fromUpdate) {
            validateProp(this.password, 'string', 'password should not be empty');
        }
    }
}

module.exports.User = User