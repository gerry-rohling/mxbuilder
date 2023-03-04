import { MxBuilder } from "../src/MxBuilder";

describe('Testing MxBuilder', () => {
    test('returns hello world', () => {
        var mx = new MxBuilder();
        var str = mx.toString();
        console.log(str);
        expect(str).toBe("Hello world");
    });
});