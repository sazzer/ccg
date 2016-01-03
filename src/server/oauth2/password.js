import {genSaltSync, hashSync} from 'bcrypt-nodejs';

/**
 * Representation of a Password, comprising of a Salt and Hash of the plaintext password
 * Note that this never actually stores or represents the real plaintext password, only
 * the hashed version
 */
export class Password {
    /**
     * Construct the password from the salt and hash
     * @param {String} hash The hash
     * @param {String} salt The salt that was used
     */
    constructor(hash, salt) {
        this._hash = hash;
        this._salt = salt;
    }
    
    /**
     * Get the salt that was used
     * @return {String} the salt
     */
    get salt() {
        return this._salt;
    }
    
    /**
     * Get the hash that was generated
     * @return {String} the hash
     */
    get hash() {
        return this._hash;
    }
    
    /**
     * Compare this to another password for equality.
     * If the provided password is a String then it will be hashed using the same
     * hash as this password was, and then the two will be compared.
     * If the provided password is already a Password instance then the Salt and Hash
     * will be compared for equality.
     * If anything else is provided then equality is impossible
     * @param {String|Password} password The password to compare to
     * @return {Boolean} true if the two are equal. False if not
     */
    equals(password) {
        let result;
        if (password instanceof Password) {
            result = this._salt === password.salt
                && this._hash === password.hash;
        } else if (typeof password === 'string') {
            result = this.equals(Password.hash({password: password, salt: this._salt}));
        } else {
            result = false;
        }
        return result;
    }
    
    /**
     * Hash the given password, with either the provided salt or generating one if
     * needed
     * @param {String} password the password to hash
     * @param {String} salt the salt to hash it with
     * @return {Password} the Hashed Password
     */
    static hash({password, salt = genSaltSync()}) {
        const hashed = hashSync(password, salt);
        return new Password(hashed, salt);
    }
}