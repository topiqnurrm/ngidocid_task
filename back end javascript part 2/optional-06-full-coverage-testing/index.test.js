const { add, subtract, multiply, divide } = require('./index');

describe('Math Functions', () => {
    describe('add', () => {
        it('should return the sum of two positive numbers', () => {
            expect(add(2, 3)).toBe(5);
        });

        it('should return the sum of a positive and a negative number', () => {
            expect(add(5, -3)).toBe(2);
        });

        it('should throw an error if inputs are not numbers', () => {
            expect(() => add('2', 3)).toThrow('Inputs must be numbers');
        });
    });

    describe('subtract', () => {
        it('should return the difference of two numbers', () => {
            expect(subtract(10, 5)).toBe(5);
        });

        it('should handle negative results correctly', () => {
            expect(subtract(5, 10)).toBe(-5);
        });

        it('should throw an error if inputs are not numbers', () => {
            expect(() => subtract(5, '10')).toThrow('Inputs must be numbers');
        });
    });

    describe('multiply', () => {
        it('should return the product of two numbers', () => {
            expect(multiply(4, 5)).toBe(20);
        });

        it('should return zero if one of the numbers is zero', () => {
            expect(multiply(4, 0)).toBe(0);
        });

        it('should throw an error if inputs are not numbers', () => {
            expect(() => multiply(4, 'a')).toThrow('Inputs must be numbers');
        });
    });

    describe('divide', () => {
        it('should return the quotient of two numbers', () => {
            expect(divide(10, 2)).toBe(5);
        });

        it('should throw an error when dividing by zero', () => {
            expect(() => divide(10, 0)).toThrow('Division by zero is not allowed');
        });

        it('should throw an error if inputs are not numbers', () => {
            expect(() => divide('10', 2)).toThrow('Inputs must be numbers');
        });
    });
});
