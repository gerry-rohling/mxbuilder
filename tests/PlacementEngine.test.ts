import { PlacementEngine } from "../src/PlacementEngine";

describe('Testing PlacementEngine', () => {
    test('returns hello world', async () => {
        var pe = new PlacementEngine();
        var str = await pe.getLayout();
        console.log(str);
        expect(str.children?.length).toBeGreaterThan(0);
    });

    test('Add node to elkjs', async() => {
        var pe = new PlacementEngine();
        pe.addNode('SoftwareSystem', 'ss001', 'System Name', 'System Desc', 200, 100);
        var node = await pe.getLayout();
        console.log(node);
        expect(node.children?.length).toBe(4);
        const targetNode = node.children?.[3];
        if (targetNode){
            console.log(targetNode.labels);
        }
        expect(targetNode).toBeDefined();
    });
})