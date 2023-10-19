import { Card, CardMedia } from '@mui/material';
import React from 'react';
import type { MasterWorkType } from '../../../types/masterTypes';

type MasterWorkPropType = {
  item: MasterWorkType;
};
export default function MasterWork({ item }: MasterWorkPropType): JSX.Element {
  return (
    <Card sx={{ width: 445 }}>
      <CardMedia sx={{ height: 240 }} image={item.image} title="green iguana" />
    </Card>
  );
}
