import { PlacementEngine } from "../src/PlacementEngine";

describe('Testing PlacementEngine', () => {
    test('returns hello world', async () => {
        var pe = new PlacementEngine();
        var str = await pe.getLayout();
        console.log(str);
        expect(str.children?.length).toBeGreaterThan(0);
    });
})