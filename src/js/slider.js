'use strict';

(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(['ardi-slider'], factory);
  } else if (typeof exports === "object") {
    module.exports = factory();
  } else {
    root.ArdiSlider = factory();
  }
})(this,function() {

  function ArdiSlider(el, options) {
    options = options || {};
    var defaults = ArdiSlider.defaults;

    this.sliderEl = (typeof el === 'string' || !(HTMLElement && el instanceof HTMLElement))
              ? document.querySelector(el)
              : el;

    this.dragging = false;
    this.max = parseInt(options.max, 10) || defaults.max;
    this.min = parseInt(options.min, 10) || defaults.min;
    this.value = parseInt(options.value, 10) || defaults.value;
    this.handleClassName = options.handleClassName || defaults.handleClassName;
    this.pos = {};

    this._createWidget();
  }

  ArdiSlider.defaults = {
    max: 100,
    min: 0,
    value: 0,
    handleClassName: 'ardi-slider__handle'
  };

  ArdiSlider.prototype = {
    val: function() {
      return this.value;
    },

    _createWidget: function() {
      if (this.value < this.min || this.value > this.max) {
        throw new Error('can not create slider as the value is not in the range');
      }

      this._checkBindSupport();
      this.handleEl = this._createHandleEl();
      this.sliderEl.appendChild(this.handleEl);
      this.pos = this._calcInitialPos();

      this._updateHandlePos(this.pos);
      this._initEvents();
    },
    _checkBindSupport: function() {
      Function.prototype.bind = Function.prototype.bind || function(context) {
        var fn = this;
        return function() {
          fn.apply(context, arguments);
        };
      };
    },
    _createHandleEl: function() {
      var handleEl = document.createElement('div');
      handleEl.className = this.handleClassName;
      return handleEl;
    },

    _updateHandlePos: function(pos) {
      this.handleEl.style.webkitTransform = 'translateX(' + pos.translateX + 'px) translateY(0) translateZ(0)';
      this.handleEl.style.mozTransform = 'translateX(' + pos.translateX + 'px) translateY(0) translateZ(0)';
      this.handleEl.style.oTransform = 'translateX(' + pos.translateX + 'px) translateY(0) translateZ(0)';
      this.handleEl.style.msTransform = 'translateX(' + pos.translateX + 'px) translateY(0) translateZ(0)';
      this.handleEl.style.transform = 'translateX(' + pos.translateX + 'px) translateY(0) translateZ(0)';
    },

    _updateValue: function() {
      this.value = Math.round((this.pos.translateX / this.sliderEl.offsetWidth) * (this.max - this.min) + this.min);
    },

    _calcHandleOffset: function(clientX) {
      var sliderLeft = this.sliderEl.getBoundingClientRect().left;
      return Math.min(clientX - sliderLeft, this.sliderEl.offsetWidth);
    },

    _update: function(clientX) {
      this.pos.translateX = this._calcHandleOffset(clientX);
      this.pos.translateX = Math.max(0, this.pos.translateX);
      this._updateHandlePos(this.pos);
      this._updateValue();
    },

    _mouseEventHandler: function(e) {
        if (e.type  === 'mousedown') {
          this._update(e.clientX);
          this.dragging = true;
        } else if (e.type === 'mousemove' && this.dragging && e.clientX > 0) {
          this._update(e.clientX);
        } else if (e.type === 'mouseup') {
          this.dragging = false;
        }
    },

    _initEvents: function() {
        this.sliderEl.addEventListener('mousedown', this._mouseEventHandler.bind(this), false);
        this.sliderEl.addEventListener('mouseup', this._mouseEventHandler.bind(this), false);
        document.addEventListener('mousemove', this._mouseEventHandler.bind(this), false);
        document.addEventListener('mouseup', this._mouseEventHandler.bind(this), false);
    },

    _calcInitialPos: function() {
      return {
        translateX: ((this.value - this.min) / (this.max - this.min)) * this.sliderEl.offsetWidth
      };
    }
  };

  return ArdiSlider;
});
