// @flow
/* global localStorage CustomEvent document */

import DDPClient from '@navelpluisje/ddp-client';
import { DDPException } from '../helpers/exceptions';

class DdpHandler {
  connected: boolean;
  ddpclient: DDPClient;
  host: string;
  port: number;

  /**
  * Initialize the handler
  *
  * @param  {String} host The url or ipaddress to connect to
  * @param  {Number} port Portnumber to connect to
  *
  * @return {void}
  */
  constructor(host: ?string = undefined, port: ?number = undefined) {
    this.connected = false;
    this.ddpclient = null;

    this.host = host || '';
    this.port = port || 0;

    this.createClient();
  }

  setHost(host: string, reconnect: boolean = false) {
    this.host = host;

    if (reconnect) {
      this.connect();
    }
  }

  setPort(port: number, reconnect: boolean = false) {
    this.port = port;

    if (reconnect) {
      this.connect();
    }
  }

  createClient() {
    this.ddpclient = null;
    const options = {
      host: this.host,
      port: this.port,
    };

    this.ddpclient = new DDPClient(options);
  }

  createEvent() {
    this.host = 'test'; // eslint-disable-line

    // const connectedEvent = new CustomEvent('ddp-connected', {
    //   detail: {
    //     connected: this.connected,
    //   },
    // });
    // document.body.dispatchEvent(connectedEvent);
  }

  /**
  * Connect to the DDP-server
  *
  * @return {void}
  */
  connect(addedCb?: Function, changedCb?: Function, removedCb?: Function) {
    if (this.connected) {
      this.close();
      this.connected = false;
    }
    const added = addedCb || function added(a) { console.log(a); }; // eslint-disable-line
    const changed = changedCb || function changed(a) { console.log(`id: ${a}`); }; // eslint-disable-line
    const removed = removedCb || function removed(a) { console.log(a); }; // eslint-disable-line

    this.ddpclient.connect((error, wasReconnect) => {
      /**
      * Initialy set connected to false. We're not quite sure if we will be getting connected
      */
      this.connected = false;

      /**
      * Error has been thrown or the connection failed.
      * Create the event
      */
      if (error || this.ddpclient.connectionFailed) {
        throw new DDPException(`Error while connecting to the DDP server: ${error}`);
      }

      if (wasReconnect) {
        console.log('Reestablishment of a connection.'); // eslint-disable-line
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
      this.ddpclient.observe(
        'stepvalues',
        added,
        changed,
        removed,
      );
    });

    return this.connected;
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

  reConnect(addedCb?: Function, changedCb?: Function, removedCb?: Function) {
    if (this.connected) {
      this.close();
      this.connect(
        addedCb,
        changedCb,
        removedCb,
      );
    }
  }

  /**
  * Call a ddp-server action
  *
  * @param  {String} action Server action to call
  * @param  {Array} params List of parameters to pass
  *
  * @return {void}
  */
  call(action: string, params: Array<mixed>) {
    if (this.connected) {
      this.ddpclient.call(action, params);
    }
  }
}

export default DdpHandler;
