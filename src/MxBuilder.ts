import { create } from "xmlbuilder2";
import { PlacementEngine } from "./PlacementEngine";

type point = {
    x: number,
    y: number
};

const RECTANGLE_WIDTH = 240;
const RECTANGLE_HEIGHT = 120;

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

    //#region Place Items

    placeSoftwareSystem(c4Name: string, c4Description: string, x: number, y: number, id?: string, parent?: string) {
        let itemID = id ?? getID(22);
        this.engine.addNode('SoftwareSystem', itemID, c4Name, c4Description, RECTANGLE_WIDTH, RECTANGLE_HEIGHT, parent);
        return itemID;
    }

    placeExternalSoftwareSystem(c4Name: string, c4Description: string, x: number, y: number, id?: string, parent?: string) {
        let itemID = id ?? getID(22);
        this.engine.addNode('ExternalSoftwareSystem', itemID, c4Name, c4Description, RECTANGLE_WIDTH, RECTANGLE_HEIGHT, parent);
        return itemID;
    }

    //#endregion

    //#region Draw Items

    drawSoftwareSystem(c4Name: string, c4Description: string, x: number, y: number, width: number = 240, height: number = 120): string {
        const id = getID(22);
        const obj = this.rootNode.ele('object', { placeholders: '1', c4Type: 'Software System', c4Name: c4Name, c4Description: c4Description, label: this.getSoftwareSystemLabel(), id: id });
        const cell = obj.ele('mxCell', { style: this.getSoftwareSystemStyle(), vertex: '1', parent: '1'});
        cell.ele('mxGeometry', {x: x, y: y, width: width, height: height, as: 'geometry'});
        return id;
    }

    drawExternalSoftwareSystem(c4Name: string, c4Description: string, x: number, y: number, width: number = 240, height: number = 120): string {
        const id = getID(22);
        const obj = this.rootNode.ele('object', { placeholders: '1', c4Type: 'Software System', c4Name: c4Name, c4Description: c4Description, label: this.getExternalSoftwareSystemLabel(), id: id });
        const cell = obj.ele('mxCell', { style: this.getExternalSoftwareSystemStyle(), vertex: '1', parent: '1'});
        cell.ele('mxGeometry', {x: x, y: y, width: width, height: height, as: 'geometry'});
        return id;
    }

    drawSystemScopeBoundary(c4Name: string, x: number, y: number, width: number = 720, height: number = 210): string {
        const id = getID(22);
        const obj = this.rootNode.ele('object', {placeholders: '1', c4Type: 'SystemScopeBoundary', c4Name: c4Name, c4Application: 'Software System', label: this.getSystemScopeBoundaryLabel(), id: id});
        const cell = obj.ele('mxCell', { style: this.getSystemScopeBoundaryStyle(), parent: '1', vertex: '1' });
        cell.ele('mxGeometry', {x: x, y: y, width: width, height: height, as: 'geometry'});
        return id;
    }

    drawContainer(c4Name: string, c4Technology: string, c4Description: string, x: number, y: number, width: number = 240, height: number = 120) : string {
        const id = getID(22);
        const obj = this.rootNode.ele('object', {placeholders: '1', c4Name: c4Name, c4Type: 'Container', c4Technology: c4Technology, c4Description: c4Description, label: this.getContainerLabel(), id: id});
        const cell = obj.ele('mxCell', { style: this.getContainerStyle(), parent: '1', vertex: '1'});
        cell.ele('mxGeometry', {x: x, y: y, width: width, height: height, as: 'geometry'});
        return id;
    }

    drawContainerScopeBoundary(c4Name: string, x: number, y: number, width: number = 360, height: number = 210): string {
        const id = getID(22);
        const obj = this.rootNode.ele('object', {placeholders: '1', c4Name: c4Name, c4Type: 'ContainerScopeBoundary', c4Application: 'Container', label: this.getContainerScopeBoundaryLabel(), id: id});
        const cell = obj.ele('mxCell', { style: this.getContainerScopeBoundaryStyle(), parent: '1', vertex: '1'});
        cell.ele('mxGeometry', {x: x, y: y, width: width, height: height, as: 'geometry'});
        return id;
    }

    drawComponent(c4Name: string, c4Technology: string, c4Description: string, x: number, y: number, width: number = 240, height: number = 120): string {
        const id = getID(22);
        const obj = this.rootNode.ele('object', {placeholders: '1', c4Name: c4Name, c4Type: 'Component', c4Technology: c4Technology, c4Description: c4Description, label: this.getComponentLabel(), id: id});
        const cell = obj.ele('mxCell', { style: this.getComponentStyle(), parent: '1', vertex: '1'});
        cell.ele('mxGeometry', {x:x, y:y, width:width, height:height, as: 'geometry'});
        return id;
    }

    drawPerson(c4Name: string, c4Description: string, x: number, y: number, width: number = 200, height: number = 180): string {
        const id = getID(22);
        const obj = this.rootNode.ele('object', {placeholders: '1', c4Name:c4Name, c4Description:c4Description, label:this.getPersonLabel(), id:id});
        const cell = obj.ele('mxCell', {style:this.getPersonStyle(), parent:'1', vertex:'1'});
        cell.ele('mxGeometry', {x:x, y:y, width:width, height:height, as:'geometry'});
        return id;
    }

    drawExternalPerson(c4Name: string, c4Description: string, x: number, y: number, width: number = 200, height: number = 180): string {
        const id = getID(22);
        const obj = this.rootNode.ele('object', {placeholders: '1', c4Name:c4Name, c4Description:c4Description, label:this.getExternalPersonLabel(), id:id});
        const cell = obj.ele('mxCell', {style:this.getExternalPersonStyle(), parent:'1', vertex:'1'});
        cell.ele('mxGeometry', {x:x, y:y, width:width, height:height, as:'geometry'});
        return id;
    }

    drawRelationship(c4Description: string, c4Technology: string, source: string, target: string, start: point, end: point): string {
        const id = getID(22);
        const obj = this.rootNode.ele('object', {placeholders: '1', c4Type: 'Relationship', c4Technology: c4Technology, c4Description: c4Description, label: this.getRelationshipLabel(), id: id});
        const cell = obj.ele('mxCell', {style: this.getRelationshipStyle(), parent: '1', source: source, target: target, edge: '1'});
        var cellWidth = Math.abs(start.x - end.x);
        var cellHeight = Math.abs(start.y - end.y);
        const geo = cell.ele('mxGeometry', { width: cellWidth, height: cellHeight, relative: '1', as: 'geometry'});
        geo.ele('mxPoint', { x:start.x, y:start.y, as: 'sourcePoint'});
        geo.ele('mxPoint', { x:end.x  , y:end.y,   as: 'targetPoint'});
        return id;

    }

    //#endregion

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

    getSystemScopeBoundaryLabel(): string {
        return '<font style="font-size: 16px"><b><div style="text-align: left">%c4Name%</div></b></font><div style="text-align: left">[%c4Application%]</div>';
    }

    getSystemScopeBoundaryStyle(): string {
        return 'rounded=1;fontSize=11;whiteSpace=wrap;html=1;dashed=1;arcSize=20;fillColor=none;strokeColor=#666666;fontColor=#333333;labelBackgroundColor=none;align=left;verticalAlign=bottom;labelBorderColor=none;spacingTop=0;spacing=10;dashPattern=8 4;metaEdit=1;rotatable=0;perimeter=rectanglePerimeter;noLabel=0;labelPadding=0;allowArrows=0;connectable=0;expand=0;recursiveResize=0;editable=1;pointerEvents=0;absoluteArcSize=1;points=[[0.25,0,0],[0.5,0,0],[0.75,0,0],[1,0.25,0],[1,0.5,0],[1,0.75,0],[0.75,1,0],[0.5,1,0],[0.25,1,0],[0,0.75,0],[0,0.5,0],[0,0.25,0]];';
    }

    getContainerLabel(): string {
        return '<font style="font-size: 16px"><b>%c4Name%</b></font><div>[%c4Type%: %c4Technology%]</div><br><div><font style="font-size: 11px"><font color="#E6E6E6">%c4Description%</font></div>';
    }

    getContainerStyle(): string {
        return 'rounded=1;whiteSpace=wrap;html=1;fontSize=11;labelBackgroundColor=none;fillColor=#23A2D9;fontColor=#ffffff;align=center;arcSize=10;strokeColor=#0E7DAD;metaEdit=1;resizable=0;points=[[0.25,0,0],[0.5,0,0],[0.75,0,0],[1,0.25,0],[1,0.5,0],[1,0.75,0],[0.75,1,0],[0.5,1,0],[0.25,1,0],[0,0.75,0],[0,0.5,0],[0,0.25,0]];';
    }

    getContainerScopeBoundaryLabel(): string {
        return '<font style="font-size: 16px"><b><div style="text-align: left">%c4Name%</div></b></font><div style="text-align: left">[%c4Application%]</div>';
    }

    getContainerScopeBoundaryStyle(): string {
        return 'rounded=1;fontSize=11;whiteSpace=wrap;html=1;dashed=1;arcSize=20;fillColor=none;strokeColor=#666666;fontColor=#333333;labelBackgroundColor=none;align=left;verticalAlign=bottom;labelBorderColor=none;spacingTop=0;spacing=10;dashPattern=8 4;metaEdit=1;rotatable=0;perimeter=rectanglePerimeter;noLabel=0;labelPadding=0;allowArrows=0;connectable=0;expand=0;recursiveResize=0;editable=1;pointerEvents=0;absoluteArcSize=1;points=[[0.25,0,0],[0.5,0,0],[0.75,0,0],[1,0.25,0],[1,0.5,0],[1,0.75,0],[0.75,1,0],[0.5,1,0],[0.25,1,0],[0,0.75,0],[0,0.5,0],[0,0.25,0]];';
    }

    getComponentLabel(): string {
        return '<font style="font-size: 16px"><b>%c4Name%</b></font><div>[%c4Type%: %c4Technology%]</div><br><div><font style="font-size: 11px">%c4Description%</font></div>';
    }

    getComponentStyle(): string {
        return 'rounded=1;whiteSpace=wrap;html=1;labelBackgroundColor=none;fillColor=#63BEF2;fontColor=#ffffff;align=center;arcSize=6;strokeColor=#2086C9;metaEdit=1;resizable=0;points=[[0.25,0,0],[0.5,0,0],[0.75,0,0],[1,0.25,0],[1,0.5,0],[1,0.75,0],[0.75,1,0],[0.5,1,0],[0.25,1,0],[0,0.75,0],[0,0.5,0],[0,0.25,0]];';
    }

    getPersonLabel(): string {
        return '<font style="font-size: 16px"><b>%c4Name%</b></font><div>[%c4Type%]</div><br><div><font style="font-size: 11px"><font color="#cccccc">%c4Description%</font></div>';
    }

    getPersonStyle(): string {
        return 'html=1;fontSize=11;dashed=0;whiteSpace=wrap;fillColor=#083F75;strokeColor=#06315C;fontColor=#ffffff;shape=mxgraph.c4.person2;align=center;metaEdit=1;points=[[0.5,0,0],[1,0.5,0],[1,0.75,0],[0.75,1,0],[0.5,1,0],[0.25,1,0],[0,0.75,0],[0,0.5,0]];resizable=0;';
    }

    getExternalPersonLabel(): string {
        return '<font style="font-size: 16px"><b>%c4Name%</b></font><div>[%c4Type%]</div><br><div><font style="font-size: 11px"><font color="#cccccc">%c4Description%</font></div>';
    }

    getExternalPersonStyle(): string {
        return 'html=1;fontSize=11;dashed=0;whiteSpace=wrap;fillColor=#6C6477;strokeColor=#4D4D4D;fontColor=#ffffff;shape=mxgraph.c4.person2;align=center;metaEdit=1;points=[[0.5,0,0],[1,0.5,0],[1,0.75,0],[0.75,1,0],[0.5,1,0],[0.25,1,0],[0,0.75,0],[0,0.5,0]];resizable=0;';
    }

    getRelationshipLabel(): string {
        return '<div style="text-align: left"><div style="text-align: center"><b>%c4Description%</b></div><div style="text-align: center">[%c4Technology%]</div></div>';
    }

    getRelationshipStyle(): string {
        return 'endArrow=blockThin;html=1;fontSize=10;fontColor=#404040;strokeWidth=1;endFill=1;strokeColor=#828282;elbow=vertical;metaEdit=1;endSize=14;startSize=14;jumpStyle=arc;jumpSize=16;rounded=0;edgeStyle=orthogonalEdgeStyle;';
    }
}

// Generates a random string, likely I can do better, first thing I found on Google!
function getID(idLength: number) {
    var id = [...Array(idLength).keys()].map((elem)=>Math.random().toString(36).substr(2, 1)).join("");
    return id;
}
