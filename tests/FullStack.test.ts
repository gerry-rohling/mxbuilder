import * as fsPromise from 'fs/promises';
import { create } from "xmlbuilder2";
import { MxBuilder } from "../src/MxBuilder";
import { select } from "xpath";

describe('Testing Full Stack', () => {
    test('Render Software System Object', async () => {
        var mx = new MxBuilder();
        var id = mx.placeSoftwareSystem('System Name', 'System Description', 'ss001');
        var str = await mx.toDiagram();
        var doc = create(str);
        let src = select('//object[@id = "ss001"]', doc.node as any) as any;
        expect(id).toBe('ss001');
        expect(src.length).toBeGreaterThan(0);
    });

    test('Link Internal and External Person to a Software System', async () => {
        var mx = new MxBuilder();
        var pid1 = mx.placePerson('Internal Person', 'An internal person', 'p001');
        var pid2 = mx.placeExternalPerson('External Person', 'An external person', 'p002');
        var id = mx.placeSoftwareSystem('System Name', 'System Description', 'ss001');
        var c1 = mx.placeRelationship('Rel 1 Desc', 'Tech', pid1, id);
        var c2 = mx.placeRelationship('Rel 2 Desc', 'Tech', pid2, id);
        var str = await mx.toDiagram();
        await fsPromise.writeFile("./tests/outputs/full-stack-two-people-softwaresystem.xml", str);
        var doc = create(str);
        let src = select('//object[@id = "ss001"]', doc.node as any) as any;
        expect(id).toBe('ss001');
        expect(src.length).toBeGreaterThan(0);
    });

    test('Two Software Systems with a Single Relationship', async() => {
        var mx = new MxBuilder();
        var id1 = mx.placeSoftwareSystem('System Name', 'System Description', 'ss001');
        var id2 = mx.placeSoftwareSystem('System Two', 'System 2 Description', 'ss002');
        var c1  = mx.placeRelationship('Rel 1 Desc', '', id1, id2);
        var str = await mx.toDiagram();
        await fsPromise.writeFile("./tests/outputs/full-stack-two-related-softwaresystems.xml", str);
        var doc = create(str);
        let src = select('//object[@id = "ss001"]', doc.node as any) as any;
        expect(id1).toBe('ss001');
        expect(id2).toBe('ss002');
        expect(src.length).toBeGreaterThan(0);
    });

    test('Render Container within SoftwareSystem Scope', async () => {
        var mx = new MxBuilder();
        var id = mx.placeSystemScopeBoundary('System Name', 'System Description', 'ss001');
        var id2 = mx.placeContainer('Container', 'Tech', 'Container Desc', 'c100', 'ss001');
        var str = await mx.toDiagram();
        var doc = create(str);
        let src = select('//object[@id = "c100"]', doc.node as any) as any;
        expect(id).toBe('ss001');
        expect(id2).toBe('c100');
        expect(src.length).toBeGreaterThan(0);
    });

    test('Render Connected Containers within SoftwareSystem Scope',async () => {
        var mx = new MxBuilder();
        var id1 = mx.placeSystemScopeBoundary('System Name', 'System Description', 'ss001');
        var id2 = mx.placeContainer('Container 1', 'Tech 1', 'Container 1 Desc', 'c100', 'ss001');
        var id3 = mx.placeContainer('Container 2', 'Tech 2', 'Container 2 Desc', 'c200', 'ss001');
        var id4 = mx.placeContainer('Container 3', 'Tech 3', 'Container 3 Desc', 'c300', 'ss001');
        var c1  = mx.placeRelationship('Rel 1 Desc', 'Rel 1 Tech', id2, id3);
        var c2  = mx.placeRelationship('Rel 2 Desc', 'Rel 2 Tech', id2, id4);
        var str = await mx.toDiagram();
        await fsPromise.writeFile("./tests/outputs/full-stack-connected-containers-in-softwaresystem.xml", str);
        var doc = create(str);
        let src = select('//object[@id = "ss001"]', doc.node as any) as any;
        let join = select(`//object[@id = "${c1}"]`, doc.node as any) as any;
        expect(id1).toBe('ss001');
        expect(id2).toBe('c100');
        expect(id3).toBe('c200');
        expect(c1.length).toBe(22);
        expect(c2.length).toBe(22);
        expect(src.length).toBeGreaterThan(0);
        expect(join.length).toBeGreaterThan(0);
    });

    test('Render Container with External SoftwareSystem Relationships', async () => {
        var mx = new MxBuilder();
        var id1 = mx.placeSystemScopeBoundary('System Name', 'System Description', 'ss001');
        var id2 = mx.placeContainer('Container 1', 'Tech 1', 'Container 1 Desc', 'c100', 'ss001');
        var id3 = mx.placeSoftwareSystem('System 2', 'System 2 Desc', 'ss002');
        var id4 = mx.placeSoftwareSystem('System 3', 'System 3 Desc', 'ss003');
        var id5 = mx.placeSoftwareSystem('System 4', 'System 4 Desc', 'ss004');
        var c1  = mx.placeRelationship('Rel 1 Desc', 'Rel 1 Tech', 'ss002', 'c100');
        var c2  = mx.placeRelationship('Rel 2 Desc', 'Rel 2 Tech', 'ss003', 'c100');
        var c3  = mx.placeRelationship('Rel 3 Desc', 'Rel 3 Tech', 'ss004', 'c100');
        var str = await mx.toDiagram();
        await fsPromise.writeFile("./tests/outputs/full-stack-container-with-external-softwaresystem.xml", str);
        expect(id1).toBe('ss001');
    });

    test('Place Software Systems in a Group', async() => {
        var mx = new MxBuilder();
        var id1 = mx.placeGroupBoundary('Group Name', 'Group Description', 'grp001');
        var id3 = mx.placeSoftwareSystem('System 1', 'System 1 Desc', 'ss001', 'grp001');
        var id4 = mx.placeSoftwareSystem('System 2', 'System 2 Desc', 'ss002', 'grp001');
        var str = await mx.toDiagram();
        await fsPromise.writeFile("./tests/outputs/full-stack-group-with-softwaresystems.xml", str);
        expect(id1).toBe('grp001');
    });
});