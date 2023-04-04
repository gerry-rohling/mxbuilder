import { XMLParser } from "fast-xml-parser";
import { MxBuilder } from "../src/MxBuilder";

describe('Testing Full Stack', () => {
    test('Render Software System Object', async () => {
        var mx = new MxBuilder();
        var id = mx.placeSoftwareSystem('System Name', 'System Description', 100, 200, 'ss001');
        var str = await mx.toDiagram();
        console.log(str);
        expect(id).toBe('ss001');
    });

    test('Render Container within SoftwareSystem Scope', async () => {
        var mx = new MxBuilder();
        var id = mx.placeSystemScopeBoundary('System Name', 'System Description', 100, 100, 'ss001');
        var id2 = mx.placeContainer('Container', 'Tech', 'Container Desc', 200, 200, 'c100', 'ss001');
        var str = await mx.toDiagram();
        console.log(str);
        expect(id).toBe('ss001');
        expect(id2).toBe('c100');
    });
});