import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

// Checking for working days in a start date and end date
export const calculateBusinessDays = (firstDate, secondDate) => {
  let day1 = moment(firstDate).startOf('day');
  let day2 = moment(secondDate).startOf('day');
  let adjust = 1;

  if (day1.dayOfYear() === day2.dayOfYear() && day1.year() === day2.year()) {
    return 0;
  }

  if (day2.isBefore(day1)) {
    const temp = day1;
    day1 = day2;
    day2 = temp;
  }

  if (day1.day() === 6) {
    day1.day(8);
  } else if (day1.day() === 0) {
    day1.day(1);
  }

  if (day2.day() === 6) {
    day2.day(5);
  } else if (day2.day() === 0) {
    day2.day(-2);
  }

  const day1Week = day1.week();
  let day2Week = day2.week();

  if (day1Week !== day2Week) {
    if (day2Week < day1Week) {
      day2Week += day1Week;
    }

    adjust += -2 * (day2Week - day1Week);
  }

  return day2.diff(day1, 'days') + adjust;
};

// Rendering files view based on extensions and type
export const fileRender = file => {
  let ext = file ? file.substr(file.lastIndexOf('.')) : null;
  let fileTitle = file ? file.substr(file.lastIndexOf('/')) : null;

  if (ext === '.jpg' || ext === '.png' || ext === '.gif') {
    return (
      <div>
        <Link to={`//${file ? file.substr(file.indexOf('res')) : null}`} target="_blank">
          <img src={file} alt={fileTitle} width="200" height="150" />
        </Link>
      </div>
    );
  } else if (ext === '.mov' || ext === '.mp4') {
    return (
      <video width="320" height="240" controls>
        <source src={file} type="video/mp4" />
        <source src="movie.ogg" type="video/ogg" />
        Your browser does not support the video tag.
      </video>
    );
  } else if (ext === '.pdf') {
    return (
      <div>
        <Link to={`//${file ? file.substr(file.indexOf('res')) : null}`} target="_blank">
          <embed src={file} height="300" />
        </Link>
      </div>
    );
  } else if (ext === '.flv') {
    return (
      <div>
        <Link
          to={`//${file ? file.substr(file.indexOf('res')) : null}`}
          title="Click to download file"
          target="_blank"
        >
          <img src="assets/img/flv.svg" alt={fileTitle} width="200" height="150" />
        </Link>
      </div>
    );
  } else {
    return (
      <div>
        <Link
          to={`//${file ? file.substr(file.indexOf('res')) : null}`}
          title="Click to download file"
          target="_blank"
        >
          <img src="assets/img/doc.svg" alt={fileTitle} width="200" height="150" />
        </Link>
      </div>
    );
  }
};

// Rendering file list based on extensions and type
export const fileRenderLink = (file, name) => {
  let ext = file ? file.substr(file.lastIndexOf('.')) : null;

  if (ext === '.jpg' || ext === '.png' || ext === '.gif') {
    return (
      <div>
        <a
          href={`https://${file ? file.substr(file.indexOf('res')) : null}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span title="download">{name}</span>
        </a>
      </div>
    );
  } else if (ext === '.mov' || ext === '.mp4') {
    return (
      <video width="320" height="240" controls>
        <source src={file} type="video/mp4" />
        <source src="movie.ogg" type="video/ogg" />
        Your browser does not support the video tag.
      </video>
    );
  } else if (ext === '.pdf') {
    return (
      <div>
        <a
          href={`https://${file ? file.substr(file.indexOf('res')) : null}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span title="download">{name}</span>
        </a>
      </div>
    );
  } else if (ext === '.flv') {
    return (
      <div>
        <a
          href={`https://${file ? file.substr(file.indexOf('res')) : null}`}
          title="Click to download file"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span title="download">{name}</span>
        </a>
      </div>
    );
  } else {
    return (
      <div>
        <a
          href={`https://${file ? file.substr(file.indexOf('res')) : null}`}
          title="Click to download file"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span title="download">{name}</span>
        </a>
      </div>
    );
  }
};
