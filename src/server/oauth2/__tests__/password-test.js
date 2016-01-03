import {expect} from 'chai';
import mockery from 'mockery';
import sinon from 'sinon';

describe('Password', function() {
    let Password;
    let mockBcrypt;

    beforeEach(function() {
        mockBcrypt = {
            genSaltSync: sinon.stub(),
            hashSync: sinon.stub()
        };

        mockery.enable({useCleanCache: true});
        mockery.registerMock('bcrypt-nodejs', mockBcrypt);
        mockery.registerAllowable('../password');
        Password = require('../password').Password;
    });
    afterEach(function() {
        mockery.deregisterAll();
        mockery.disable();
    });

    it('Returns the correct values when constructed', function() {
        const password = new Password('theHashHere', 'theSaltHere');
        expect(password.hash).to.equal('theHashHere');
        expect(password.salt).to.equal('theSaltHere');
    });
    
    describe('When comparing a password', function() {
        describe('To a string', function() {
            it('matches the same password', function() {
                mockBcrypt.hashSync.withArgs('thePassword', 'theSaltHere')
                    .returns('theHashHere');

                const password = new Password('theHashHere', 'theSaltHere');
                const isEqual = password.equals('thePassword');

                expect(mockBcrypt.genSaltSync.called).to.be.false;
                expect(mockBcrypt.hashSync.withArgs('thePassword', 'theSaltHere').called).to.be.true;
                expect(isEqual).to.be.true;
            });
            it('matches the wrong password', function() {
                mockBcrypt.hashSync.withArgs('anotherPassword', 'theSaltHere')
                    .returns('wrongHashHere');

                const password = new Password('theHashHere', 'theSaltHere');
                
                const isEqual = password.equals('anotherPassword');

                expect(mockBcrypt.genSaltSync.called).to.be.false;
                expect(mockBcrypt.hashSync.withArgs('anotherPassword', 'theSaltHere').called).to.be.true;
                expect(isEqual).to.be.false;
            });
        });
        describe('To a Password object', function() {
            it('matches the same hash and salt', function() {
                const password = new Password('theHashHere', 'theSaltHere');
                const secondPassword = new Password('theHashHere', 'theSaltHere');
                expect(password.equals(secondPassword)).to.equal(true);
            });
            it('doesn\'t match the same hash and wrong salt', function() {
                const password = new Password('theHashHere', 'theSaltHere');
                const secondPassword = new Password('theHashHere', 'Pepper');
                expect(password.equals(secondPassword)).to.equal(false);
            });
            it('doesn\'t match the wrong hash and same salt', function() {
                const password = new Password('theHashHere', 'theSaltHere');
                const secondPassword = new Password('Other', 'theSaltHere');
                expect(password.equals(secondPassword)).to.equal(false);
            });
            it('doesn\'t match the wrong hash and salt', function() {
                const password = new Password('theHashHere', 'theSaltHere');
                const secondPassword = new Password('Other', 'Pepper');
                expect(password.equals(secondPassword)).to.equal(false);
            });
        });
        describe('To a number', function() {
            it('doesn\'t match', function() {
                const password = new Password('theHashHere', 'theSaltHere');
                expect(password.equals(1)).to.equal(false);
            });
        });
    });
    
    describe('When hashing a password', function() {
        describe('With a provided salt', function() {
            it('returns the correct values', function() {
                mockBcrypt.hashSync.withArgs('thePassword', 'theSaltHere')
                    .returns('theHashHere');
                
                const password = Password.hash({
                    password: 'thePassword',
                    salt: 'theSaltHere'
                });
                
                expect(mockBcrypt.genSaltSync.called).to.be.false;
                expect(mockBcrypt.hashSync.withArgs('thePassword', 'theSaltHere').called).to.be.true;
                
                expect(password.salt).to.equal('theSaltHere');
                expect(password.hash).to.equal('theHashHere');
            });
        });
        describe('With a generated salt', function() {
            it('returns the correct values', function() {
                mockBcrypt.genSaltSync.onFirstCall().returns('genSaltHere');
                mockBcrypt.hashSync.withArgs('thePassword', 'genSaltHere')
                    .returns('genHashHere');

                const password = Password.hash({
                    password: 'thePassword'
                });

                expect(mockBcrypt.genSaltSync.withArgs().called).to.be.true;
                expect(mockBcrypt.hashSync.withArgs('thePassword', 'genSaltHere').called).to.be.true;

                expect(password.salt).to.equal('genSaltHere');
                expect(password.hash).to.equal('genHashHere');
            });
        });
    });
});
