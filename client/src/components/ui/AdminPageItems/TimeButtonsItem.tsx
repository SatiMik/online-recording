import React from 'react';
import { Grid } from '@mui/material';
import type { RecordFromBackType } from '../../../types/recordAdminTypes';

type TimeButtonsPropsType = {
  times: RecordFromBackType[] | null | undefined;
  setTime: (newTime: number) => void;
};
export default function TimeButtonItem({ times, setTime }: TimeButtonsPropsType): JSX.Element {
  console.log('TImeS', times);
  return (
    <Grid container rowSpacing={1} alignItems="center" justifyContent="center">
      {times?.map((el) => (
        <Grid key={el.time} item xs={3}>
          <button
            onClick={() => {
              setTime(el.time);
            }}
            style={{
              borderRadius: '50px',
              width: '75px',
              height: `20px`,
              fontSize: '12px',
              borderColor: 'black',
              color: 'black',
              background: 'white',
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
