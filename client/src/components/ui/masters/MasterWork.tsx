import { Card, CardMedia } from '@mui/material';
import React from 'react';
import type { MasterWorkType } from '../../../types/masterTypes';

type MasterWorkPropType = {
  item: MasterWorkType;
};
export default function MasterWork({ item }: MasterWorkPropType): JSX.Element {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={item.image} title="green iguana" />
    </Card>
  );
}
