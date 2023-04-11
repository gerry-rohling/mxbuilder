import { ElkLabel } from 'elkjs';
import ELK, { ElkExtendedEdge, ElkNode } from 'elkjs/lib/elk-api';

interface c4label {
    c4item: string;
    payload: string;
}

export class PlacementEngine {

    private elk = new ELK({
        workerFactory: function(url) { // the value of 'url' is irrelevant here
            const { Worker } = require('elkjs/lib/elk-worker.js') // non-minified
            return new Worker(url)
        }
    });

    private graph: ElkNode;

    constructor() {
        this.graph = <ElkNode>{id: 'root', children: [], edges: [], labels: []};
    }

    reset() {
        this.graph = <ElkNode>{id: 'root', children: [], edges: [], labels: []};
    }

    addNode(c4Type: string, itemID: string, c4Name: string, c4Technology: string, c4Description: string, width: number, height: number, parent?: string) {
        const child = <ElkNode>{id: itemID, width: width, height: height, labels: [], children: [] };
        let typeLabel:c4label = { c4item: 'c4Type', payload: c4Type};
        let nameLabel:c4label = { c4item: 'c4Name', payload: c4Name };
        let techLabel:c4label = { c4item: 'c4Technology', payload: c4Technology};
        let descLabel:c4label = { c4item: 'c4Description', payload: c4Description };
        const label0 = <ElkLabel>{text: JSON.stringify(typeLabel)};
        const label1 = <ElkLabel>{text: JSON.stringify(nameLabel)};
        const label2 = <ElkLabel>{text: JSON.stringify(techLabel)};
        const label3 = <ElkLabel>{text: JSON.stringify(descLabel)};
        child.labels?.push(label0);
        child.labels?.push(label1);
        child.labels?.push(label2);
        child.labels?.push(label3);
        if (parent){
            const parents = this.graph.children?.filter(item => item.id === parent);
            if (parents?.length != 1) {
                throw new ReferenceError();
            }
            parents[0].children?.push(child);
        } else {
            this.graph.children?.push(child);
        }
    }

    addEdge(itemID: string, c4Description: string, c4Technology: string, source: string, target: string) {
        const edge = <ElkExtendedEdge>{id: itemID, sources: [], targets: [], labels: []};
        edge.sources.push(source);
        edge.targets.push(target);
        let techLabel:c4label = { c4item: 'c4Technology', payload: c4Technology};
        let descLabel:c4label = { c4item: 'c4Description', payload: c4Description };
        const label0 = <ElkLabel>{text: JSON.stringify(techLabel)};
        const label1 = <ElkLabel>{text: JSON.stringify(descLabel)};
        edge.labels?.push(label0);
        edge.labels?.push(label1);
        this.graph.edges?.push(edge);
    }

    async getLayout() {
        console.log(JSON.stringify(this.graph));
      const rez = await this.elk.layout(this.graph, { layoutOptions: {'algorithm': 'layered', 'elk.padding': '[left=48, top=48, right=48, bottom=48]', 'elk.spacing.nodeNode': '96' } });
      return rez;
    }
}