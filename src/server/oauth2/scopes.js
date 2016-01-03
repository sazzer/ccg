import {uniq} from 'lodash';

/**
 * Class representing a set of OAuth2 Scopes to request
 */
export class Scopes {
    /**
     * Construct the set of scopes
     * @param {Array} scopes the scopes
     */
    constructor (scopes) {
        this._scopes = uniq(scopes
            .map((s) => s.trim())
            .filter((s) => s !== '')
            .sort());
    }
    
    /**
     * Get the array of scopes to work with
     * @return {Array} the scopes
     */
    get scopes() {
        return this._scopes;
    }
    
    /**
     * Get the scopes as a single string
     * @return {String} the scopes as a string
     */
    toString() {
        return this._scopes.join(' ');
    }
    
    /**
     * Parse a string representing scopes into a Scopes object
     * @param {String} scopes The scopes to parse. This is in the same form as toString() returns
     * @return {Scopes} the parsed scopes object
     */
    static parse(scopes) {
        return new Scopes(scopes.split(/\s/));
    }
}