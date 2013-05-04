(function () {
  var moment = (typeof require === 'undefined') ? this.moment : require('moment');
  var iso8601 = '^P(?:([0-9]+W)|([0-9]+Y)?([0-9]+M)?([0-9]+D)?(?:T([0-9]+H)?([0-9]+M)?([0-9]+S)?([0-9]+Z)?)?)$';

  moment.isoDuration = function (text) {
    var matches = text.match(iso8601);
    return moment.duration({
      weeks: parseInt(matches[1], 10),
      years: parseInt(matches[2], 10),
      months: parseInt(matches[3], 10),
      days: parseInt(matches[4], 10),
      hours: parseInt(matches[5], 10),
      minutes: parseInt(matches[6], 10),
      seconds: parseInt(matches[7], 10),
      milliseconds: parseInt(matches[8], 10)
    });
  };

  moment.duration.fn.toISOString = function () {
    function append(number, suffix) {
      return number > 0 ? (number + suffix) : '';
    }

    return 'P' +
        append(this.weeks(), 'W') +
        append(this.years(), 'Y') +
        append(this.months(), 'M') +
        append(this.days(), 'D') +
        ((this.hours() + this.minutes() + this.seconds() + this.milliseconds() > 0) ? 'T' : '') +
        append(this.hours(), 'H') +
        append(this.minutes(), 'M') +
        append(this.seconds(), 'S') +
        append(this.milliseconds(), 'Z');
  };
}(this));