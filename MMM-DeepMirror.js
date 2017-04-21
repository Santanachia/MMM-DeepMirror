"use strict"

Module.register("MMM-DeepMirror", {
  defaults: {
    spacing: 60,
    depth: 6,
    size: 5,
    color: '#aaa',
  },

  start: function () {
    var body = document.body, html = document.documentElement;

    var h = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)
    var w = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth)

    this.svgElem = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svgElem.setAttributeNS(null, 'width', w);
    this.svgElem.setAttributeNS(null, 'height', h);

    var dx = Math.round(w / this.config.spacing)
    var dy = Math.round(h / this.config.spacing)

    var params = {}

    for (var i = 1; i <= this.config.depth; i++) {
      var startx = i * this.config.spacing
      var starty = startx * h / w
      var spacingx = (w - 2 * startx) / dx
      var spacingy = (h - 2 * starty) / dy

      params.o = 1 - i / (this.config.depth + 1)
      params.r = this.config.size * params.o

      params.y = startx * h / w
      for (var j = 0; j <= dx; j++) {

        params.x = startx + j * spacingx

        var svgTop = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        svgTop.setAttributeNS(null, 'cx', params.x);
        svgTop.setAttributeNS(null, 'cy', params.y);
        svgTop.setAttributeNS(null, 'r', params.r);
        svgTop.setAttributeNS(null, 'fill-opacity', params.o);
        svgTop.setAttributeNS(null, 'fill', this.config.color);

        this.svgElem.appendChild(svgTop);

        var svgBottom = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        svgBottom.setAttributeNS(null, 'cx', params.x);
        svgBottom.setAttributeNS(null, 'cy', h - params.y);
        svgBottom.setAttributeNS(null, 'r', params.r);
        svgBottom.setAttributeNS(null, 'fill-opacity', params.o);
        svgBottom.setAttributeNS(null, 'fill', this.config.color);

        this.svgElem.appendChild(svgBottom);

      }

      params.x = startx
      for (var j = 1; j < dx - 4; j++) {

        params.y = starty + j * spacingy

        var svgLeft = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        svgLeft.setAttributeNS(null, 'cx', params.x);
        svgLeft.setAttributeNS(null, 'cy', params.y);
        svgLeft.setAttributeNS(null, 'r', params.r);
        svgLeft.setAttributeNS(null, 'fill-opacity', params.o);
        svgLeft.setAttributeNS(null, 'fill', this.config.color);

        this.svgElem.appendChild(svgLeft);

        var svgRight = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        svgRight.setAttributeNS(null, 'cx', w - params.x);
        svgRight.setAttributeNS(null, 'cy', params.y);
        svgRight.setAttributeNS(null, 'r', params.r);
        svgRight.setAttributeNS(null, 'fill-opacity', params.o);
        svgRight.setAttributeNS(null, 'fill', this.config.color);

        this.svgElem.appendChild(svgRight);

      }
    }

  },

  // Override dom generator.
  getDom: function () {
    return this.svgElem;
  },

});
