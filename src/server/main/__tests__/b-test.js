jest.dontMock('../b');

describe('hello', () => {
    it('says hello', () => {
        const b = require('../b');
        expect(b.hello('Graham')).toBe('Hello, Graham!');
    });
});
