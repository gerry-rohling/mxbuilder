import { create } from "xmlbuilder2";
import { PlacementEngine } from "./PlacementEngine";

export class MxBuilder {
    private doc: any;
    private rootNode: any;
    private rootParent = '1';
    engine: PlacementEngine;


    constructor() {
        this.engine = new PlacementEngine();
        this.doc = create({ version: '1.0', encoding: 'UTF-8' });
        this.doc.ele('mxfile', { agent: 'Structurizr DSL Plugin' });
        var diagram = this.doc.root().ele('diagram', { name: 'Page-1', id: 'LazyBrownDog' });
        var model = diagram.ele('mxGraphModel', { grid: '1', gridSize: '10', guides: '1', tooltips: '1', connect: '1', arrows: '1', fold: '1', page: '1', pageScale: '1', math: '0', shadow: '0'});
        this.rootNode = model.ele('root');
        this.rootNode.ele('mxCell', { id: '0' });
        this.rootNode.ele('mxCell', { id: '1', parent: '0' });
    }

    toDiagram(): string {
        return this.doc.end({ prettyPrint: true });
    }
    toString(): string {
        return "Hello world";
    }

    insertSoftwareSystem(c4Name: string, c4Description: string): string {
        const {x,y} = this.engine.getPlacementCoordinates();
        const id = getID(22);
        const obj = this.rootNode.ele('object', { placeholders: '1', c4Type: 'Software System', c4Name: c4Name, c4Description: c4Description, label: this.getSoftwareSystemLabel(), id: id });
        const cell = obj.ele('mxCell', { style: this.getSoftwareSystemStyle(), vertex: '1', parent: '1'});
        // TODO: work out location of item on page
        cell.ele('mxGeometry', {x: '280', y: '320', width: '240', height: '120', as: 'geometry'});
        return id;
    }

    insertExternalSoftwareSystem(c4Name: string, c4Description: string): string {
        const id = getID(22);
        const obj = this.rootNode.ele('object', { placeholders: '1', c4Type: 'Software System', c4Name: c4Name, c4Description: c4Description, label: this.getExternalSoftwareSystemLabel(), id: id });
        const cell = obj.ele('mxCell', { style: this.getExternalSoftwareSystemStyle(), vertex: '1', parent: '1'});
        // TODO: Work out location of item on page
        cell.ele('mxGeometry', {x: '680', y: '320', width: '240', height: '120', as: 'geometry'});
        return id;
    }

    getSoftwareSystemLabel(): string {
        return '<font style="font-size: 16px"><b>%c4Name%</b></font><div>[%c4Type%]</div><br><div><font style="font-size: 11px"><font color="#cccccc">%c4Description%</font></div>';
    }

    getSoftwareSystemStyle(): string {
        return 'rounded=1;whiteSpace=wrap;html=1;labelBackgroundColor=none;fillColor=#1061B0;fontColor=#ffffff;align=center;arcSize=10;strokeColor=#0D5091;metaEdit=1;resizable=0;points=[[0.25,0,0],[0.5,0,0],[0.75,0,0],[1,0.25,0],[1,0.5,0],[1,0.75,0],[0.75,1,0],[0.5,1,0],[0.25,1,0],[0,0.75,0],[0,0.5,0],[0,0.25,0]];';
    }

    getExternalSoftwareSystemLabel(): string {
        return '<font style="font-size: 16px"><b>%c4Name%</b></font><div>[%c4Type%]</div><br><div><font style="font-size: 11px"><font color="#cccccc">%c4Description%</font></div>';
    }

    getExternalSoftwareSystemStyle(): string {
        return 'rounded=1;whiteSpace=wrap;html=1;labelBackgroundColor=none;fillColor=#8C8496;fontColor=#ffffff;align=center;arcSize=10;strokeColor=#736782;metaEdit=1;resizable=0;points=[[0.25,0,0],[0.5,0,0],[0.75,0,0],[1,0.25,0],[1,0.5,0],[1,0.75,0],[0.75,1,0],[0.5,1,0],[0.25,1,0],[0,0.75,0],[0,0.5,0],[0,0.25,0]];';
    }
}

// Generates a random string, likely I can do better, first thing I found on Google!
function getID(idLength: number) {
    var id = [...Array(idLength).keys()].map((elem)=>Math.random().toString(36).substr(2, 1)).join("");
    return id;
}
