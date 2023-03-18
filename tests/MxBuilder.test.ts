import { MxBuilder } from "../src/MxBuilder";

describe('Testing MxBuilder', () => {
    test('returns hello world', () => {
        var mx = new MxBuilder();
        var str = mx.toString();
        expect(str).toBe("Hello world");
    });

    test('Returns framework XML', () => {
        var mx = new MxBuilder();
        var str = mx.toDiagram();
        expect(str.indexOf('<?xml version="1.0" encoding="UTF-8"?>')).toBe(0);
    });

    test('Add Software System Object', () => {
        var mx = new MxBuilder();
        var id = mx.insertSoftwareSystem('System Name', 'System Description');
        var str = mx.toDiagram();
        console.log(str);
        expect(id.length).toBe(22);
    });

    test('Add External Software System Object', () => {
        var mx = new MxBuilder();
        var id = mx.insertExternalSoftwareSystem('External System Name', 'External System Description');
        var str = mx.toDiagram();
        console.log(str);
        expect(id.length).toBe(22);
    });

    test('Add System Scope Boundary Object', () => {
        var mx = new MxBuilder();
        var id = mx.insertSystemScopeBoundary('System name');
        var str = mx.toDiagram();
        console.log(str);
        expect(id.length).toBe(22);
    });

    test('Add Container Object', () => {
        var mx = new MxBuilder();
        var id = mx.insertContainer('Container name', 'ElasticSearch', 'Description of Container');
        var str = mx.toDiagram();
        console.log(str);
        expect(id.length).toBe(22);
    });

    test('Add Container Scope Boundary Object', () => {
        var mx = new MxBuilder();
        var id = mx.insertContainerScopeBoundary('Container name');
        var str = mx.toDiagram();
        console.log(str);
        expect(id.length).toBe(22);
    });

    test('Add Component Object', () => {
        var mx = new MxBuilder();
        var id = mx.insertComponent('Component name', 'Node.js', 'Description of Component');
        var str = mx.toDiagram();
        console.log(str);
        expect(id.length).toBe(22);
    });
});