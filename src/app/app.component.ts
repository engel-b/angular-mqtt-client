import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Subscription } from 'rxjs';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
  public dataSource: MatTableDataSource<IMqttMessage> = new MatTableDataSource<IMqttMessage>();
  columnsToDisplay = ['messageId', 'topic', 'timestamp', 'retain', 'qos'];
  expandedElement: IMqttMessage | null;

  private subscription: Subscription;
  public message: string;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter',  {static: true}) filter: ElementRef;

  constructor(private _mqttService: MqttService) {
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public connect(): void {
    this.subscription = this._mqttService.observe('#').subscribe((message: IMqttMessage) => {
      this.addUpdate(message);
      console.log("Msg: " + JSON.stringify(message));
      console.log("Topic: "+message.topic);
      console.log("Msg: "+message.payload);
    });
  }

  private addUpdate(message: IMqttMessage): void {
    if (!message.messageId) {
      message.messageId = this.dataSource.data.length + 1;
    }

    message['timestamp'] = moment(new Date(), this.DATE_TIME_FORMAT);
    // add message
    this.dataSource.data.push(message);
    this.dataSource.data = this.dataSource.data;
  }

  public disconnect(): void {
    this.subscription.unsubscribe();
  }

  public test(): void {
    // send test message
  }

  public getClassName(topic: string): string {
    // replace all "/" by "-"
    let regex = /\//gi;
    return topic.replace(regex, "-");
  }

  public unsafePublish(topic: string, message: string): void {
    this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});
  }

  public ngOnDestroy(): void {
    this.disconnect();
  }

  public ngOnInit(): void {
    this.connect();
  }
}
