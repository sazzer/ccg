import {METHODS} from '../methods';
import {expect} from 'chai';

describe('Methods', () => {
    describe('All compare to themselves', () => {
        Object.keys(METHODS).forEach((m) => {
            it(m, () => {
                expect(m === m).to.be.true;
            });
        });
    });
    describe('Don\'t compare to anything else', () => {
        Object.keys(METHODS).forEach((m) => {
            Object.keys(METHODS).filter((m2) => m !== m2).forEach((m2) => {
                it(`${m} === ${m2}`, () => {
                    expect(m === m2).to.be.false;
                });
            });
        });
    });
});
