jest.dontMock('../scopes');

const Scopes = require('../scopes').Scopes;

describe('Scopes', () => {
    describe('Returns the correct scopes', () => {
        it('is an already sorted set of scopes', () => {
            const scopes = new Scopes(['a', 'b', 'c']);
            expect(scopes.scopes).toEqual(['a', 'b', 'c']);
        });
        it('Includes space padded entries', () => {
            const scopes = new Scopes(['a  ', '  b', '  c  ']);
            expect(scopes.scopes).toEqual(['a', 'b', 'c']);
        });
        it('Includes blank entries', () => {
            const scopes = new Scopes(['a', '', 'b', ' ', 'c']);
            expect(scopes.scopes).toEqual(['a', 'b', 'c']);
        });
        it('is an unsorted set of scopes', () => {
            const scopes = new Scopes(['c', 'b', 'a']);
            expect(scopes.scopes).toEqual(['a', 'b', 'c']);
        });
        it('is a non-unique set of scopes', () => {
            const scopes = new Scopes(['a', 'b', 'c', 'a', 'b', 'c']);
            expect(scopes.scopes).toEqual(['a', 'b', 'c']);
        });
    });
    it('Generates the correct string', () => {
        const scopes = new Scopes(['a', 'b', 'c']);
        expect(scopes.toString()).toEqual('a b c');
    });
    describe('Parses a string', () => {
        it('is an already sorted set of scopes', () => {
            const scopes = Scopes.parse('a b c');
            expect(scopes.scopes).toEqual(['a', 'b', 'c']);
        });
        it('is separated with multiple spaces', () => {
            const scopes = Scopes.parse('a   b   c');
            expect(scopes.scopes).toEqual(['a', 'b', 'c']);
        });
        it('is separated with tabs', () => {
            const scopes = Scopes.parse('a\tb\tc');
            expect(scopes.scopes).toEqual(['a', 'b', 'c']);
        });
        it('is an unsorted set of scopes', () => {
            const scopes = Scopes.parse('c b a');
            expect(scopes.scopes).toEqual(['a', 'b', 'c']);
        });
        it('is a non-unique set of scopes', () => {
            const scopes = Scopes.parse('a b c a b c');
            expect(scopes.scopes).toEqual(['a', 'b', 'c']);
        });
    });
});
