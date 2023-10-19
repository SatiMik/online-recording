/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from 'react';
// import { useAutocomplete } from '@mui/base/useAutocomplete';
// import { styled } from '@mui/system';
import { Autocomplete, TextField } from '@mui/material';
import type { MasterIdNameType } from '../../../types/masterAdminTypes';

type MastersPropsType = {
  masters: MasterIdNameType[];
  value: MasterIdNameType | undefined;
  setMaster: (newValue: MasterIdNameType) => void;
};

export default function ComboBox({ masters, value, setMaster }: MastersPropsType): JSX.Element {
  const defaultProps = {
    options: masters,
    getOptionLabel: (option: MasterIdNameType) => option?.name,
  };
  return (
    <Autocomplete
      {...defaultProps}
      id="clear-on-escape"
      disableClearable
      value={value}
      onChange={(event, newValue: MasterIdNameType) => {
        setMaster(newValue);
      }}
      renderInput={(params) => <TextField {...params} label="Мастера" variant="standard" />}
    />
  );
}
