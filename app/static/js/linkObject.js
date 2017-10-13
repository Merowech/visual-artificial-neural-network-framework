class linkObject {

    constructor(svg, startPoint, endPoint) {

        this.startPoint = {'x' : startPoint.x, 'y' : startPoint.y};
        this.endPoint = {'x' : endPoint.x, 'y' : endPoint.y};

        this.svgContainer = svg;

        this.startCon = null;
        this.endCon = null;

        this.line = null;
        this.createLine();

    }

    createLine() {
        this.line = this.svgContainer
            .append("line")
            .attr("x1", this.startPoint.x)
            .attr("y1", this.startPoint.y)
            .attr("x2", this.endPoint.x)
            .attr("y2", this.endPoint.y);
    }

    updateLine() {
        this.line
            .attr("x1", this.startPoint.x)
            .attr("y1", this.startPoint.y)
            .attr("x2", this.endPoint.x)
            .attr("y2", this.endPoint.y);
    }

    setStartPoint(startPoint) {
        this.startPoint = {'x' : startPoint.x, 'y' : startPoint.y};
        this.updateLine();
    }

    setEndPoint(endPoint) {
        this.endPoint = {'x' : endPoint.x, 'y' : endPoint.y};
        this.updateLine();
    }

    remove() {
        this.line.remove();
    }

}
