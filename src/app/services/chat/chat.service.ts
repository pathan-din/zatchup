import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  SECOND_MILLIS = 1000;
  MINUTE_MILLIS = 60 * 1000;
  HOUR_MILLIS = 60 * 60 * 1000;
  DAY_MILLIS = 24 * 60 * 60 * 1000;

  constructor() { }

  getTimeAgo(time: any) {
    if (time < 1000000000000) {
      // if timestamp given in seconds, convert to millis
      time *= 1000;
    }

    let now = new Date().valueOf();
    if (time > now || time <= 0) {
      return null;
    }

    let diff = now - time;
    if (diff < this.MINUTE_MILLIS) {
      return 'now';
    } else if (diff < 2 * this.MINUTE_MILLIS) {
      return "a minute ago";
    } else if (diff < 50 * this.MINUTE_MILLIS) {
      return Math.floor(diff / this.MINUTE_MILLIS) + " minutes ago";
    } else if (diff < 90 * this.MINUTE_MILLIS) {
      return "an hour ago";
    } else if (diff < 24 * this.HOUR_MILLIS) {
      return Math.floor(diff / this.HOUR_MILLIS) + " hours ago";
    } else if (diff < 48 * this.HOUR_MILLIS) {
      return "yesterday";
    } else {
      return Math.floor(diff / this.DAY_MILLIS) + " days ago";
    }
  }
  getTimewithday(time: any) {
    if (time < 1000000000000) {
      // if timestamp given in seconds, convert to millis
      time *= 1000;
    }
    var times = this.getTimeFromDate(time)
    //console.log("time of the day",times);
    
    let now = new Date().valueOf();
    if (time > now || time <= 0) {
      return null;
    }

    let diff = now - time;
    if (diff < this.MINUTE_MILLIS) {
      return 'Last seen today at  ' + times;
    } else if (diff < 2 * this.MINUTE_MILLIS) {
      return "Last seen today at  " + times;
    } else if (diff < 50 * this.MINUTE_MILLIS) {
      return "Last seen today at  " + times;
    } else if (diff < 90 * this.MINUTE_MILLIS) {
      return "Last seen today at  " + times;
    } else if (diff < 24 * this.HOUR_MILLIS) {
      return "Last seen today at  " + times;
    } else if (diff < 48 * this.HOUR_MILLIS) {
      return "Last seen yesterday at " + times;
    } else {
      var date = new Date(time)
      return 'Last seen at '+date.toLocaleString('en-US');
    }
  }
  getTimeFromDate(timestamp) {
    var date = new Date(timestamp).toLocaleString('en-US', { hour: 'numeric' , minute: 'numeric', hour12: true });
    return date
  }
}
