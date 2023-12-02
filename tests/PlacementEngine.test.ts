import * as fsPromise from 'fs/promises';
import { PlacementEngine } from "../src/PlacementEngine";

describe('Testing PlacementEngine', () => {

    test('Add node to elkjs', async() => {
        var pe = new PlacementEngine();
        pe.addNode('SoftwareSystem', 'ss001', 'System Name', '', 'System Desc', 200, 100);
        var layout = await pe.getLayout();
        expect(layout.children?.length).toBe(1);
        const targetNode = layout.children?.[0];
        expect(targetNode).toBeDefined();
        expect(targetNode?.labels?.length).toBe(4);
    });

    test('Add two nodes and edge to elkjs', async() => {
        var pe = new PlacementEngine();
        pe.addNode('Container', 'node1', 'Node One', 'Node One Tech', 'Node One Desc', 240, 120);
        pe.addNode('Container', 'node2', 'Node Two', 'Node Two Tech', 'Node Two Desc', 240, 120);
        pe.addEdge('edge1', 'Edge Desc', 'Edge Tech', 'node1', 'node2');
        var layout = await pe.getLayout();
        // console.log(JSON.stringify(layout));
        await fsPromise.writeFile("./tests/outputs/placement-two-nodes.json", JSON.stringify(layout));
        expect(layout.children?.length).toBe(2);
        expect(layout.edges?.length).toBe(1);
    });

    test('Add three nodes and a parent container',async () => {
        var pe = new PlacementEngine();
        pe.addNode('SoftwareSystem', 'ss001', 'Software System', '', 'Parent Software System', 240, 120);
        pe.addNode('Container', 'node1', 'Node One', 'Node One Tech', 'Node One Desc', 240, 120, 'ss001');
        pe.addNode('Container', 'node2', 'Node Two', 'Node Two Tech', 'Node Two Desc', 240, 120, 'ss001');
        pe.addNode('Container', 'node3', 'Node Three', 'Node Three Tech', 'Node Three Desc', 240, 120, 'ss001');
        pe.addEdge('edge1', 'Edge Desc', 'Edge Tech', 'node1', 'node2');
        pe.addEdge('edge2', 'Edge Desc', 'Edge Tech', 'node1', 'node3');
        var layout = await pe.getLayout();
        // console.log(JSON.stringify(layout));
        await fsPromise.writeFile("./tests/outputs/placement-three-nodes-and-parent.json", JSON.stringify(layout));
        expect(layout.children?.length).toBe(1);
        expect(layout.children?.[0].children?.length).toBe(3);
        expect(layout.edges?.length).toBe(2);
    });
})