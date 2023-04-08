import { XMLParser } from "fast-xml-parser";
import { MxBuilder } from "../src/MxBuilder";

describe('Testing Full Stack', () => {
    test('Render Software System Object', async () => {
        var mx = new MxBuilder();
        var id = mx.placeSoftwareSystem('System Name', 'System Description', 'ss001');
        var str = await mx.toDiagram();
        //console.log(str);
        expect(id).toBe('ss001');
    });

    test('Render Container within SoftwareSystem Scope', async () => {
        var mx = new MxBuilder();
        var id = mx.placeSystemScopeBoundary('System Name', 'System Description', 'ss001');
        var id2 = mx.placeContainer('Container', 'Tech', 'Container Desc', 'c100', 'ss001');
        var str = await mx.toDiagram();
        //console.log(str);
        expect(id).toBe('ss001');
        expect(id2).toBe('c100');
    });

    test('Render Connected Containers within SoftwareSystem Scope',async () => {
        var mx = new MxBuilder();
        var id = mx.placeSystemScopeBoundary('System Name', 'System Description', 'ss001');
        var id2 = mx.placeContainer('Container 1', 'Tech 1', 'Container 1 Desc', 'c100', 'ss001');
        var id3 = mx.placeContainer('Container 2', 'Tech 2', 'Container 2 Desc', 'c200', 'ss001');
        var c1  = mx.placeRelationship('Rel 1 Desc', 'Rel 1 Tech', id2, id3);
        var str = await mx.toDiagram();
        console.log(str);
        expect(id).toBe('ss001');
        expect(id2).toBe('c100');
        expect(id3).toBe('c200');
        expect(c1.length).toBe(22);
    })
});