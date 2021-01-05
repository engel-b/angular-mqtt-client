# angular-mqtt-client

This is a mqtt client app written in Angular. It logs out all incoming messages.

There are still some things to do:
* make the connection configurable
* make the mat-table filterable and sortable

How to run
A running mqtt broker running on localhost with websocket enabled and listening on default port ... is currently requiered. "Settings" are in app.module.ts.MQTT_SERVICE_OPTIONS.

* git clone...
* change into directory
* npm i
* ng serve
* visit http://localhost:4200 in your favorite browser