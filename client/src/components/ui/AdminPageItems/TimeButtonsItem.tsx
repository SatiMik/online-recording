import React from 'react';
import { Grid } from '@mui/material';
import type { RecordFromBackType } from '../../../types/recordAdminTypes';

type TimeButtonsPropsType = {
  times: RecordFromBackType[] | null | undefined;
  time: number;
  setTime: (newTime: number) => void;
};
export default function TimeButtonItem({
  times,
  time,
  setTime,
}: TimeButtonsPropsType): JSX.Element {
  return (
    <Grid container rowSpacing={1} alignItems="center" justifyContent="center">
      {times?.map((el) => (
        <Grid key={el.time} item xs={3}>
          <button
            onClick={() => {
              setTime(el.time);
            }}
            style={{
              backgroundColor: el.time === time ? '#4a875d' : 'white',
              borderRadius: '50px',
              width: '75px',
              height: `20px`,
              fontSize: '12px',
              borderColor: 'black',
              color: 'black',
            }}
            type="button"
          >
            {el.time % 100 ? `${Math.floor(el.time / 100)}:30` : `${Math.floor(el.time / 100)}:00`}
          </button>
        </Grid>
      ))}
    </Grid>
  );
}
