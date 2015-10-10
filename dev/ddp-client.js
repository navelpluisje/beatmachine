var DDPClient = require('ddp-client');

var ddpclient = new DDPClient({
    host : '192.168.1.49',
    // host : '127.0.0.1',
    port : 3000,
});

/*
 * Connect to the Meteor Server
 */
ddpclient.connect(function(error, wasReconnect) {

    if (error) {
        console.log('DDP connection error!');
        return;
    }

    if (wasReconnect) {
        console.log('Reestablishment of a connection.');
    }

    console.log('connected!');
    /*
     * Subscribe to a Meteor Collection
     */
    ddpclient.subscribe('stepvalues', [], function() {
        console.log(ddpclient.collections.stepvalues);
    });

    /*
     * Observe a collection.
     * Not quite sure why, but the added and changed events do not work properly.
     * That's why I use the on event
     */
    var observer = ddpclient.observe('stepvalues');
    observer.added = function(id) {
    };
    observer.changed = function(id, oldFields, clearedFields, newFields) {
    };

    ddpclient.on('message', function (msg) {
        var x = JSON.parse(msg),
            element;
        if (x.msg === 'changed' || x.msg === 'added') {
            element = document.getElementById(x.id);
            if (element.checked !== x.fields.value) {
                element.click();
            }
        }
    });

    /*
     * Send a remote procedure call
     */
    var steps = document.querySelectorAll('.seq-step'),
        i = 0;

    for (i; i < steps.length; i += 1) {
        steps[i].addEventListener('change', function(evt) {
            if (this.checked !== ddpclient.collections.stepvalues.items[this.id].value) {
                ddpclient.call('click', [this.id, this.checked]);
            }
        });
    }
});

/**
 * Make the object global available for the app.
 */
app.ddpclient = ddpclient;



