import { Card, CardMedia } from '@mui/material';
import React from 'react';
import type { MasterWorkType } from '../../../types/masterTypes';

type MasterWorkPropType = {
  item: MasterWorkType;
};
export default function MasterWork({ item }: MasterWorkPropType): JSX.Element {
  return (
    <Card sx={{ width: 900 }}>
      <CardMedia sx={{ height: 750 }} image={item.image} title="green iguana" />
    </Card>
  );
}
