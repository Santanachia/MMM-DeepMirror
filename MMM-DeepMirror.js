"use strict"

Module.register("MMM-DeepMirror", {
  defaults: {
    spacing: 60,
    depth: 6,
    size: 5,
    color: '#aaa',
  },

  getScripts: function () {
    return [
      '//rawgit.com/svgdotjs/svg.js/master/dist/svg.min.js'
    ];
  },

  start: function () {
    var body = document.body, html = document.documentElement;

    var h = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)
    var w = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth)

    this.svgElem = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    var draw = SVG.adopt(this.svgElem).size(w, h)

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

        draw.circle(params.r).fill({ color: this.config.color, opacity: params.o }).move(params.x, params.y)
        draw.circle(params.r).fill({ color: this.config.color, opacity: params.o }).move(params.x, h - params.y)

      }

      params.x = startx
      for (var j = 1; j < dx - 4; j++) {

        params.y = starty + j * spacingy

        draw.circle(params.r).fill({ color: this.config.color, opacity: params.o }).move(params.x, params.y)
        draw.circle(params.r).fill({ color: this.config.color, opacity: params.o }).move(w - params.x, params.y)

      }
    }

    //this.svgElem = draw.doc()
    //this.svgElem = draw.svg()
  },

  // Override dom generator.
  getDom: function () {
    return this.svgElem;
  },

});
