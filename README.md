<div align="center">
  <h1>Angular-MQTT-Client</h1>
</div>
<div align="center">
  <strong>Prototype of Angular single page app combined with MQTT over swebsockets</strong>
</div>

<br />

<div align="center">
  <sub>Built with :purple_heart: by
  <a href="https://engel-b.github.io">Björn Engel</a>
</div>

<br />
This is a mqtt client app written in Angular. It logs out all incoming messages.

## There are still some things to do:
* make the connection configurable
* make the mat-table filterable and sortable

## How to run
A running mqtt broker running on localhost with websocket enabled and listening on default port ... is currently requiered. "Settings" are in app.module.ts.MQTT_SERVICE_OPTIONS.

* git clone...
* change into directory
* npm i
* ng serve
* visit http://localhost:4200 in your favorite browser
