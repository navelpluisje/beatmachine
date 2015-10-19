var DdpHandler = function () {
	'use strict';

	var connected = false,
		ddpclient = {},
		connectedEvent;

	function isConnected() {
		return connected;
	}

	function createEvent() {
	    connectedEvent = new CustomEvent('ddp-connected', {'detail': {'connected': connected}});
    	document.querySelector('body').dispatchEvent(connectedEvent);		
	}

	/**
	 * Connect to the DDP-server
	 *
	 * @return {void}
	 */
	function connect(added, changed, removed) {
		var self = this,
			added = added || function (a) {console.log(a)},
			changed = changed || function (a) {console.log('id: '+a)},
			removed = removed || function (a) {console.log(a)};

		ddpclient.connect(function(error, wasReconnect) {
			/**
			 * Initialy set connected to false. We're not quite sure if we will be getting connected
			 */
			connected = false

			/**
			 * Error has been thrown or the connection failed.
			 * Create the event
			 */
		    if (error || ddpclient._connectionFailed) { 
		    	console.log('DDP connection error!');
				createEvent();
	
		        return;
		    }

		    if (wasReconnect) {
		        console.log('Reestablishment of a connection.');
		    }

		    connected = true;
		    createEvent();

		    // Subscribe to a DDP Collection
		    ddpclient.subscribe('stepvalues', [], function() {
		        // console.log(ddpclient.collections.stepvalues);
		    });

		    /*
		     * Observe a collection.
		     * Not quite sure why, but the added and changed events do not work properly.
		     * That's why I use the on event
		     */
		    var observer = ddpclient.observe(
		    	'stepvalues',
		    	added, 
		    	changed, 
		    	removed
		    	);
		});
	}

	/**
	 * Close the connection
	 *
	 * @return {void}
	 */
	function close() {
		ddpclient.close();
		connected = false;
	}

	/**
	 * Call a ddp-server action		
	 *
	 * @param  {String} action Server action to call
	 * @param  {Array} params List of parameters to pass
	 *
	 * @return {void}
	 */
	function call(action, params) {
		if (connected) {
			ddpclient.call(action, params)		
		}
	}

	/**
	 * Initialize the handler
	 *
	 * @param  {String} host The url or ipaddress to connect to
	 * @param  {Number} port Portnumber to connect to
	 *
	 * @return {void}      
	 */
	function init(host, port) {
		host = host || localStorage.getItem('host') || app.get('settings').ddp.host;
		port = port || localStorage.getItem('port') || app.get('settings').ddp.port;
		ddpclient = null;
		ddpclient = new DDPClient({
		    host : host,
		    // host : '127.0.0.1',
		    port : port,
		});
	}

	init();

	return {
		init: init,
		connect: connect,
		close: close,
		call: call,
		ddpclient: ddpclient,
		isConnected: isConnected,
	};
}