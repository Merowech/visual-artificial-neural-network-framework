class controllerObject {

    constructor(divID) {
        var self = this;

        this.startLayer = null;

        this.layerArray = [];
        this.linkArray = [];

        this.tempLink = null;

        this.svgContainer = d3.select(divID)
            .append("svg")
            .attr("width", "100%")
            .attr("height", "500px");

        this.svgContainer
            .on("click", function() {
                self.onClick(this);
            });
    }

    onClick(self) {
        let classSelf = this;
        let m = d3.mouse(self);
        let mouse = {"x": m[0], "y": m[1]};
        for (let layer in this.layerArray) {
            let con1 = this.layerArray[layer].getCon1Pos();
            let con2 = this.layerArray[layer].getCon2Pos();
            if (this.tempLink !== null) {
                if ((this.tempLink.startCon.x === con1.x && this.tempLink.startCon.y === con1.y) ||
                    (this.tempLink.startCon.x === con2.x && this.tempLink.startCon.y === con2.y)) {
                    continue;
                }
            }
            if (Math.pow((con1.x - mouse.x), 2) + Math.pow((con1.y - mouse.y), 2) <= Math.pow(con1.r, 2)) {
                if (this.tempLink === null) {
                    let startPoint = {'x' : con1.x, 'y' : con1.y};
                    let endPoint = {'x' : mouse.x, 'y' : mouse.y};
                    this.tempLink = new linkObject(this.svgContainer, startPoint, endPoint);
                    this.tempLink.startCon = con1;

                    this.svgContainer
                        .on("mousemove", function() {
                            classSelf.mouseMove(this);
                        });
                } else {
                    let endPoint = {'x' : con1.x, 'y' : con1.y};
                    this.tempLink.setEndPoint(endPoint);

                    if (this.tempLink.startCon.t === "right") {
                        this.layerArray[layer].setLeftLink(this.tempLink);
                        this.layerArray[this.tempLink.startCon.l].setRightLink(this.tempLink);
                    } else if (this.tempLink.startCon.t === "left") {
                        this.layerArray[layer].setRightLink(this.tempLink);
                        this.layerArray[this.tempLink.startCon.l].setLeftLink(this.tempLink);
                    }

                    this.tempLink.endCon = con1;
                    this.linkArray.push(this.tempLink);
                    this.tempLink = null;

                    this.svgContainer
                        .on("mousemove", null);
                }
                return;
            } else if (Math.pow((con2.x - mouse.x), 2) + Math.pow((con2.y - mouse.y), 2) <= Math.pow(con2.r, 2)) {
                if (this.tempLink == null) {
                    let startPoint = {'x' : con2.x, 'y' : con2.y};
                    let endPoint = {'x' : mouse.x, 'y' : mouse.y};
                    this.tempLink = new linkObject(this.svgContainer, startPoint, endPoint);
                    this.tempLink.startCon = con2;

                    this.svgContainer
                        .on("mousemove", function() {
                            classSelf.mouseMove(this);
                        });
                } else {
                    let endPoint = {'x' : con2.x, 'y' : con2.y};
                    this.tempLink.setEndPoint(endPoint);

                    if (this.tempLink.startCon.t === "left") {
                        this.layerArray[layer].setRightLink(this.tempLink);
                        this.layerArray[this.tempLink.startCon.l].setLeftLink(this.tempLink);
                    } else if (this.tempLink.startCon.t === "right") {
                        this.layerArray[layer].setLeftLink(this.tempLink);
                        this.layerArray[this.tempLink.startCon.l].setRightLink(this.tempLink);
                    }

                    this.tempLink.endCon = con2;
                    this.linkArray.push(this.tempLink);
                    this.tempLink = null;

                    this.svgContainer
                        .on("mousemove", null);
                }
                return;
            }
        }

        this.svgContainer
            .on("mousemove", null);

        if (this.tempLink) {
            this.tempLink.remove();
            this.tempLink = null;
        }
    }

    mouseMove(self) {
        var m = d3.mouse(self);
        let endPoint = {'x' : m[0], 'y' : m[1]};
        this.tempLink.setEndPoint(endPoint);
    }

    addLayer(input) {
        if (typeof input === "undefined") {
            input = false;
        }

        const startcoords = {
            "x": 10,
            "y": 10
        };

        var t1 = new layerObject(this.svgContainer, startcoords);
        this.layerArray.push(t1);
        t1.setLayerNr(this.layerArray.indexOf(t1));
        t1.setInputState(input);
    }

    removeLayer() {
        
    }

    sanityCheck() {

    }
}
