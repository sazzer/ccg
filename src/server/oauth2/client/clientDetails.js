import {METHODS} from '../methods';

/**
 * Representation of the details of an OAuth2 Client
 */
export class ClientDetails {
    /**
     * Construct the client details
     * @param {String} id the Client ID
     * @param {Password} password the Client password
     * @param {String} name The Client name
     * @param {String} owner The Owner ID
     * @param {Array} methods The supported methods
     * @param {Array} scopes The supported scopes
     */
    constructor(id, password, name, owner, methods, scopes) {
        this._id = id;
        this._password = password;
        this._name = name;
        this._owner = owner;
        this._methods = methods;
        this._scopes = scopes;
    }
    
    /**
     * Get the ID of the Client
     * @return {String} the ID
     */
    get id() {
        return this._id;
    }
    
    /**
     * Get the password of the Client
     * @return {Password} the password of the Client
     */
    get password() {
        return this._password;
    }
    
    /**
     * Get the name of the Client
     * @return {String} the name of the Client
     */
    get name() {
        return this._name;
    }
    
    /**
     * Get the ID of the user that owns this client
     * @return {String} the ID of the owner
     */
    get owner() {
        return this._owner;
    }
    
    /**
     * Get the collection of OAuth2 Authentication Methods that this client supports
     * @return {Array} The collection of supported authentication methods
     */
    get supportedMethods() {
        return this._methods;
    }
    
    /**
     * Get the collection of OAuth2 Scopes that this client supports
     * @return {Array} The collection of supported Scopes
     */
    get supportedScopes() {
        return this._scopes;
    }
}
