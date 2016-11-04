var Layer = function(config) {
	var config = config || {};

	this.init(config);
};

Layer.prototype.init = function(config) {
	var _handle	= config.handle || '';

	jQuery('#' + APP_CONTAINER_ID).append('<canvas id="' + _handle + '" width="1200" height="900" />');

	var _elem	= document.getElementById(_handle);
	var _ctx	= _elem.getContext('2d');
	// var order/z-index
}

Layer.prototype.draw = function() {
	// get viewports and draw those
}

Layer.prototype.destroy = function() {
	// remove from DOM
}
