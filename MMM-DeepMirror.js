"use strict"

Module.register("MMM-DeepMirror", {
  defaults: {
    spacing: 60,
    depth: 6,
    size: 5,
  },

  start: function () {
    var body = document.body, html = document.documentElement;

    var h = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)
    var w = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth)

    this.config.spacing = w / Math.round(w / this.config.spacing)

    this.svgElem = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svgElem.setAttributeNS(null, 'width', w);
    this.svgElem.setAttributeNS(null, 'height', h);

    for (var i = 1; i <= this.config.depth; i++) {

      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      svg.setAttributeNS(null, 'x', i * this.config.spacing);
      svg.setAttributeNS(null, 'y', (h * i * this.config.spacing) / w);
      svg.setAttributeNS(null, 'width', w - 2 * i * this.config.spacing);
      svg.setAttributeNS(null, 'height', h - 2 * (h * i * this.config.spacing) / w);
      svg.setAttributeNS(null, 'stroke', '#aaa');
      svg.setAttributeNS(null, 'stroke-width', this.config.size - i * this.config.size / (this.config.depth + 1));
      svg.setAttributeNS(null, 'fill', 'none');
      svg.setAttributeNS(null, 'stroke-linecap', 'round');
      svg.setAttributeNS(null, 'stroke-dasharray', '1, ' + ((this.config.spacing * (-2 * i * this.config.spacing + w)) / w));
      svg.setAttributeNS(null, 'stroke-opacity', 1 - i / (this.config.depth + 1));

      this.svgElem.appendChild(svg);

    }

  },

  // Override dom generator.
  getDom: function () {
    return this.svgElem;
  },

});
