import React from 'react';
import type { RecordFromBackType } from '../../../types/recordAdminTypes';

type RecordPropsType = {
  record: RecordFromBackType;
  handleOpen: (record: RecordFromBackType) => void;
};
export default function ButtonItem({ record, handleOpen }: RecordPropsType): JSX.Element {
  const color = record.status !== -1 ? '#bbbbbb' : '#f9f9f9';
  return (
    <button
      onClick={() => handleOpen(record)}
      style={{
        borderRadius: '40px',
        width: '300px',
        height: `${Math.abs(record.status) * 50}px`,
        fontSize: '16px',
        borderColor: 'black',
        color: 'black',
        background: color,
        padding: '8px 16px',
      }}
      type="button"
    >
      {record.record
        ? `Гость ${record.record.User.name}\n на услугу ${record.record.Service.name} \n стоимость: ${record.record.Service.price}`
        : ''}
    </button>
  );
}
