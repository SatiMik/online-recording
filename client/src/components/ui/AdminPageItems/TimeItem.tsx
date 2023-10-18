import React from 'react';

export default function TimeItem(): JSX.Element {
  const timeArray = [
    'Время',
    '8:00',
    '8:30',
    '9:00',
    '9:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
  ];
  return (
    <>
      {timeArray.map((time) => (
        <button
          key={time}
          style={{
            width: '100px',
            height: '50px',
            fontSize: '16px',
            borderColor: 'black',
            color: 'black',
            background: '#dcdcdc',
            padding: '8px 16px',
          }}
          type="button"
        >
          {time}
        </button>
      ))}
    </>
  );
}
