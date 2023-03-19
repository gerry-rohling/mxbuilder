import ELK, { ElkExtendedEdge, ElkNode } from 'elkjs/lib/elk-api';

export class PlacementEngine {

    private elk = new ELK({
        workerFactory: function(url) { // the value of 'url' is irrelevant here
            const { Worker } = require('elkjs/lib/elk-worker.js') // non-minified
            return new Worker(url)
        }
    });

    private graph: ElkNode;

    constructor() {
        this.graph = <ElkNode>{id: 'root', properties: {'algorithm':'layered', 'elk.spacing.nodeModule': 40}, children: [], edges: []};
        const child1 = <ElkNode>{id: 'n101', width: 240, height: 120};
        const child2 = <ElkNode>{id: 'n102', width: 240, height: 120};
        const child3 = <ElkNode>{id: 'n103', width: 240, height: 120};
        this.graph.children?.push(child1);
        this.graph.children?.push(child2);
        this.graph.children?.push(child3);
        const edge1 = <ElkExtendedEdge>{id: 'e101', sources:['n101'], targets:['n102']};
        const edge2 = <ElkExtendedEdge>{id: 'e102', sources:['n101'], targets:['n103']};
        this.graph.edges?.push(edge1);
        this.graph.edges?.push(edge2);
    }

    async getLayout() {
      const rez = await this.elk.layout(this.graph);
      return rez;
    }
}