import React from 'react';
import { Button } from '@mui/material';
import type { RecordFromBackType } from '../../../types/recordAdminTypes';

type RecordPropsType = {
  record: RecordFromBackType;
  handleOpen: (record: RecordFromBackType) => void;
};
export default function ButtonItem({ record, handleOpen }: RecordPropsType): JSX.Element {
  const color = record.status !== -1 ? '#DCDCDC' : '#f9f9f9';
  const height = `${Math.abs(record.status) * 50}px`;
  let fontSize;
  if (height === `50px`) fontSize = `12px`;
  else fontSize = `16px`;
  return (
    <Button
      onClick={() => handleOpen(record)}
      style={{
        borderRadius: '0',
        width: '300px',
        height,
        fontSize,
        border: '1px solid #566F5F',
        color: 'black',
        padding: '8px 16px',
        backgroundColor: color,
      }}
      type="button"
    >
      {record.record
        ? `Гость ${record.record.user.data.name}\n на услугу ${record.record.Service.name} \n стоимость: ${record.record.Service.price}`
        : ''}
    </Button>
  );
}
