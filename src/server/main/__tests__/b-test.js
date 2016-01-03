import {hello} from '../b';
import {expect} from 'chai';

describe('hello', () => {
    it('says hello', () => {
        expect(hello('Graham')).to.equal('Hello, Graham!');
    });
});
