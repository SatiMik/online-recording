import React from 'react';
import { Button } from '@mui/material';
import type { RecordFromBackType } from '../../../types/recordAdminTypes';

type RecordPropsType = {
  record: RecordFromBackType;
  handleOpen: (record: RecordFromBackType) => void;
};
export default function ButtonItem({ record, handleOpen }: RecordPropsType): JSX.Element {
  const color = record.status !== -1 ? '#bbbbbb' : '#f9f9f9';
  return (
    <Button
      onClick={() => handleOpen(record)}
      style={{
        borderRadius: '0',
        width: '300px',
        height: `${Math.abs(record.status) * 50}px`,
        fontSize: '16px',
        border: '1px solid #566F5F',
        color: 'black',
        padding: '8px 16px',
      }}
      type="button"
    >
      {record.record
        ? `Гость ${record.record.User.name}\n на услугу ${record.record.Service.name} \n стоимость: ${record.record.Service.price}`
        : ''}
    </Button>
  );
}
