import Vue from "vue";
import moment from "moment";

export default function ({ store, redirect }) {
  Number.prototype.zeroPad = function (length) {
    length = length || 2; // defaults to 2 if no parameter is passed
    return (new Array(length).join("0") + this).slice(length * -1);
  };

  Date.prototype.formatString = function (formatString) {
    if (this) {
      let time = new Date(this);
      let y = time.getFullYear();
      let m = (time.getMonth() + 1).zeroPad();
      let d = time.getDate().zeroPad();
      let h = time.getHours().zeroPad();
      let i = time.getMinutes().zeroPad();
      let s = time.getSeconds().zeroPad();
      formatString = formatString
        .replace("yyyy", y)
        .replace("mm", m)
        .replace("dd", d)
        .replace("hh", h)
        .replace("MM", i)
        .replace("ss", s);
      return formatString;
    }
  };

  Vue.filter("formatDate", function (value, formatString) {
    if (value) {
      let time = new Date(parseInt(value));
      let y = time.getFullYear();
      let m = (time.getMonth() + 1).zeroPad();
      let d = time.getDate().zeroPad();
      let h = time.getHours().zeroPad();
      let i = time.getMinutes().zeroPad();
      let s = time.getSeconds().zeroPad();
      formatString = formatString
        .replace("yyyy", y)
        .replace("mm", m)
        .replace("dd", d)
        .replace("hh", h)
        .replace("MM", i)
        .replace("ss", s);
      return formatString;
    }
  });

  Vue.filter("syncTimeZone", function (value) {
    try {
      let data = new Date(value);
      data.setHours(data.getHours() + 7);
      let y = data.getFullYear();
      let m = (data.getMonth() + 1).zeroPad();
      let d = data.getDate().zeroPad();
      let h = data.getHours().zeroPad();
      let i = data.getMinutes().zeroPad();
      let s = data.getSeconds().zeroPad();
      return `${y}/${m}/${d} ${h}:${i}:${s}`;
    } catch (error) {
      return value;
    }
  });
  Vue.prototype.moment = moment;
}
