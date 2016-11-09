var Layer = function(config) {
	var config = config || {};

	this.init(config);
};

Layer.prototype.init = function(config) {
	var _self		= this;
	var _handle	= config.handle || '';

	jQuery('#' + APP_CONTAINER_ID).append('<canvas id="' + _handle + '" width="1200" height="900" />');

	var _elem		= document.getElementById(_handle);
	var _ctx		= _elem.getContext('2d');
	// var order/z-index

	_self.getHandle = function() {
		return _handle;
	}

	_self.draw = function(assets, area) {
		// need clear boundaries
		_self.clear(area);
		_self.drawAssets(assets);
	}

	_self.clear = function(area) {
		// clear area if specified. otherwise clear entire layer?
	}

	_self.drawAssets = function(assets) {

	}

	_self.drawAsset = function(asset) {

	}

	_self.destroy = function() {
		// remove from DOM
	}
}
