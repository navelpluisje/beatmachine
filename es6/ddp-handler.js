'use strict';

class DdpHandler {

	/**
	 * Initialize the handler
	 *
	 * @param  {String} host The url or ipaddress to connect to
	 * @param  {Number} port Portnumber to connect to
	 *
	 * @return {void}      
	 */
	constructor (host, port) {
		this.connected = false;
		// this.connectedEvent;
		this.ddpclient = null;

		this.host = host || localStorage.getItem('host') || app.get('settings').ddp.host;
		this.port = port || localStorage.getItem('port') || app.get('settings').ddp.port;
		this.createClient();
	}

	createClient () {
		this.ddpclient = null;

		this.ddpclient = new DDPClient({
		    host : this.host,
		    port : this.port,
		});
	}

	get isConnected() {
		return this.connected;
	}

	createEvent() {
	    let connectedEvent = new CustomEvent('ddp-connected', {'detail': {'connected': this.connected}});
    	document.querySelector('body').dispatchEvent(connectedEvent);		
	}

	/**
	 * Connect to the DDP-server
	 *
	 * @return {void}
	 */
	connect(added, changed, removed) {
		added = added || function (a) { console.log(a) },
		changed = changed || function (a) { console.log('id: '+a) },
		removed = removed || function (a) { console.log(a) };

		this.ddpclient.connect((error, wasReconnect) => {
			/**
			 * Initialy set connected to false. We're not quite sure if we will be getting connected
			 */
			this.connected = false

			/**
			 * Error has been thrown or the connection failed.
			 * Create the event
			 */
		    if (error || this.ddpclient._connectionFailed) { 
		    	console.log('DDP connection error!');
				this.createEvent();
	
		        return;
		    }

		    if (wasReconnect) {
		        console.log('Reestablishment of a connection.');
		    }

		    this.connected = true;
		    this.createEvent();

		    // Subscribe to a DDP Collection
		    this.ddpclient.subscribe('stepvalues', [], () => {
		        // console.log(ddpclient.collections.stepvalues);
		    });

		    /*
		     * Observe a collection.
		     * Not quite sure why, but the added and changed events do not work properly.
		     * That's why I use the on event
		     */
		    let observer = this.ddpclient.observe(
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
	close() {
		this.ddpclient.close();
		this.connected = false;
	}

	/**
	 * Call a ddp-server action		
	 *
	 * @param  {String} action Server action to call
	 * @param  {Array} params List of parameters to pass
	 *
	 * @return {void}
	 */
	call(action, params) {
		if (this.connected) {
			this.ddpclient.call(action, params)		
		}
	}
}