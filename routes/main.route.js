'use strict';

module.exports = function(app) {
	console.log('main route loading!');
	// Root routing
	var main = require('../controllers/main.index.controller');
    var real = require('../controllers/main.real.controller');
    app.route('/ajax').get(main.ajax);
    app.route('/').get(main.index);
    app.route('/test').get(main.test);
    app.route('/gc').get(main.gc);
    app.route('/real').get(real.index);
    
};
