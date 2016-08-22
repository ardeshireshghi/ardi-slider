'use strict';

/**
 * Test module for the slider.js
 */
describe("ardi-slider", function() {
  var testSlider,
    sliderEl;

  var expect = chai.expect,
    assert = chai.assert;

  beforeEach(function (done) {
    sliderEl = (function(selector) {
      var el = document.createElement('div');
      el.className = selector;

      return el;
    })('ardi-slider');

    document.body.appendChild(sliderEl);
    done();
  });

  describe("#constructor", function() {
    it("should return a slider object", function() {
      var slider = new ArdiSlider(sliderEl);
      var sliderHandleEl = sliderEl.firstChild;
      expect(slider).to.be.instanceof(ArdiSlider);
      expect(sliderHandleEl.className).to.equal(ArdiSlider.defaults.handleClassName);
    });
  });

  afterEach(function (done) {
    document.body.removeChild(sliderEl);
    done();
  });
});
