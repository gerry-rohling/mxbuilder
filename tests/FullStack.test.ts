import { XMLParser } from "fast-xml-parser";
import { MxBuilder } from "../src/MxBuilder";

describe('Testing Full Stack', () => {
    test('Render Software System Object', async () => {
        var mx = new MxBuilder();
        var id = mx.placeSoftwareSystem('System Name', 'System Description', 100, 200, 'ss001');
        var str = await mx.toDiagram();
        console.log(str);
        expect(id.length).toBe(5);
    });
});