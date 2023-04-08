import { XMLParser } from "fast-xml-parser";
import { MxBuilder } from "../src/MxBuilder";

describe('Testing MxBuilder', () => {
    test('Returns framework XML', async () => {
        var mx = new MxBuilder();
        var str = await mx.toDiagram();
        expect(str.indexOf('<?xml version="1.0" encoding="UTF-8"?>')).toBe(0);
    });

    test('Draw Software System Object', async () => {
        var mx = new MxBuilder();
        var id = mx.drawSoftwareSystem('System Name', 'System Description', 100, 200);
        var str = await mx.toDiagram();
        console.log(str);
        expect(id.length).toBe(22);
    });

    test('Draw External Software System Object', async () => {
        var mx = new MxBuilder();
        var id = mx.drawExternalSoftwareSystem('External System Name', 'External System Description', 300, 500);
        var str = await mx.toDiagram();
        console.log(str);
        expect(id.length).toBe(22);
    });

    test('Draw System Scope Boundary Object', async () => {
        var mx = new MxBuilder();
        var id = mx.drawSystemScopeBoundary('System name', 200, 400);
        var str = await mx.toDiagram();
        console.log(str);
        expect(id.length).toBe(22);
    });

    test('Draw Container Object', async() => {
        var mx = new MxBuilder();
        var id = mx.drawContainer('Container name', 'ElasticSearch', 'Description of Container', 400, 500);
        var str = await mx.toDiagram();
        console.log(str);
        expect(id.length).toBe(22);
    });

    test('Draw Container Scope Boundary Object', async () => {
        var mx = new MxBuilder();
        var id = mx.drawContainerScopeBoundary('Container name', 500, 700);
        var str = await mx.toDiagram();
        console.log(str);
        expect(id.length).toBe(22);
    });

    test('Draw Component Object', async () => {
        var mx = new MxBuilder();
        var id = mx.drawComponent('Component name', 'Node.js', 'Description of Component', 200, 300);
        var str = await mx.toDiagram();
        console.log(str);
        expect(id.length).toBe(22);
    });

    test('Draw Person', async () => {
        var mx = new MxBuilder();
        var id = mx.drawPerson('Person name', 'Description of person', 200, 400);
        var str = await mx.toDiagram();
        console.log(str);
        expect(id.length).toBe(22);
    });

    test('Draw External Person', async () => {
        var mx = new MxBuilder();
        var id = mx.drawExternalPerson('Person name', 'Description of person', 200, 400);
        var str = await mx.toDiagram();
        console.log(str);
        expect(id.length).toBe(22);
    });

    test('Draw Relationship Object', async () => {
        var mx = new MxBuilder();
        var start = {x: 100, y: 200};
        var end = {x: 500, y: 900};
        var id = mx.drawRelationship('Make API Calls', 'JSON/HTTP', 'source_id', 'target_id', start, end);
        var str = await mx.toDiagram();
        console.log(str);
        const options = { ignoreAttributes: false };
        const parser = new XMLParser(options);
        let testObj = parser.parse(str);
        expect(id.length).toBe(22);
        expect(testObj.mxfile.diagram.mxGraphModel.root.object.mxCell.mxGeometry.mxPoint[0]["@_as"]).toBe("sourcePoint");
        expect(testObj.mxfile.diagram.mxGraphModel.root.object.mxCell.mxGeometry.mxPoint[1]["@_as"]).toBe("targetPoint");
    });
});