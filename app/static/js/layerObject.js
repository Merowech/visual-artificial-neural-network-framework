class layerObject {

    constructor(svg, coords) {
        this.width = 120;
        this.height = 40;

        this.layerObj = svg
            .append("g");

        this.rectObj = this.layerObj
            .append("rect");

        this.con1Obj = this.layerObj
            .append("circle");

        this.con2Obj = this.layerObj
            .append("circle");

        this.textObj = this.layerObj
            .append("text");

        this.rectObj
            .attr("rx", 6)
            .attr("ry", 6)
            .attr("x", coords.x)
            .attr("y", coords.y)
            .attr("width", this.width)
            .attr("height", this.height)
            .style("fill", "white")
            .style("stroke", "black")
            .call(d3.drag()
                .on("drag", this.dragged)
            );

        this.con1Obj
            .attr("cx", coords.x - 10)
            .attr("cy", coords.y + this.height / 2)
            .attr("x-offset",  -10)
            .attr("y-offset",  this.height / 2)
            .attr("r", 6)
            .on('mousedown', this.mouseDown);

        this.con2Obj
            .attr("cx", coords.x + this.width + 10)
            .attr("cy", coords.y + this.height / 2)
            .attr("x-offset",  this.width + 10)
            .attr("y-offset",  this.height / 2)
            .attr("r", 6);

        this.textObj
            .attr("x", coords.x + this.width / 2 - 10)
            .attr("y", coords.y + 10)
            .attr("x-offset",  this.width / 2 - 10)
            .attr("y-offset",  10)
            .text("LSTM")
            .attr("pointer-events", "none")
            .attr("transform", "rotate(90, " + (coords.x + this.width / 2 - 10) + ", " + (coords.y + 10) + ")")
            .attr("font-family", "sans-serif")
            .attr("font-size", "20px");
    }

    dragged() {
        for (let i = 0; i < this.parentNode.children.length; i++) {
            if (this.parentNode.children[i].tagName == "circle") {
                let x_offset = parseInt(d3.select(this.parentNode.children[i]).attr("x-offset"));
                let y_offset = parseInt(d3.select(this.parentNode.children[i]).attr("y-offset"));
                d3.select(this.parentNode.children[i])
                    .attr("cx", d3.event.x + x_offset)
                    .attr("cy", d3.event.y + y_offset);
            } else if (this.parentNode.children[i].tagName == "text") {
                let x_offset = parseInt(d3.select(this.parentNode.children[i]).attr("x-offset"));
                let y_offset = parseInt(d3.select(this.parentNode.children[i]).attr("y-offset"));
                d3.select(this.parentNode.children[i])
                    .attr("x", d3.event.x + x_offset)
                    .attr("y", d3.event.y + y_offset)
                    .attr("transform", "rotate(90, " + (d3.event.x + x_offset) + ", " + (d3.event.y + y_offset) + ")");
                this.parentNode.appendChild(this.parentNode.children[i]);
            } else {
                d3.select(this.parentNode.children[i])
                    .attr("x", d3.event.x)
                    .attr("y", d3.event.y);
            }
        }
    }

    mouseDown() {
        let layerObj = d3.select(this.parentNode);
        let obj = d3.select(this);
        layerObj
            .append("line")
            .attr("x1", obj.attr("cx"))
.attr("y1", obj.attr("cy"))
.attr("x2", d3.event.x)
.attr("y2", d3.event.y);
    }

    mouseMove() {

    }

    mouseUp() {

    }

    getCon1Pos() {
        let ret = {};
        ret.x = this.con1Obj.attr("cx");
        ret.y = this.con1Obj.attr("cy");
        return ret;
    }

    getCon2Pos() {
        let ret = {};
        ret.x = this.con2Obj.attr("cx");
        ret.y = this.con2Obj.attr("cy");
        return ret;
    }
}

class linkObject {

    constructor(layerObj1, layerObj2) {

    }

}
