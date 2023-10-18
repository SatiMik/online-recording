import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RevueFormType, RevueType } from '../../../types/revueTypes';
import {
  deleteRevue,
  editRevue,
  editStatus,
  getRevues,
  submitRevue,
} from '../../../services/revueServices';

export const getRevuesThunk = createAsyncThunk<RevueType[]>('revue/getRevuesThunk', async () =>
  getRevues(),
);

export const deleteRevueThunk = createAsyncThunk<RevueType['id'], { id: RevueType['id'] }>(
  'revue/deleteRevueThunk',
  async ({ id }) => deleteRevue(id),
);

export const addRevueThunk = createAsyncThunk<RevueType, RevueFormType>(
  'revue/addRevueThunk',
  async (inputs) => submitRevue(inputs),
);

export const editRevueThunk = createAsyncThunk<
  RevueType,
  { id: RevueType['id']; formData: RevueFormType }
>('/revue/deleteRevueThunk', async ({ id, formData }) => editRevue(id, formData));

export const changeStatusThunk = createAsyncThunk<
  RevueType,
  { id: RevueType['id']; status: RevueFormType['status'] }
>('revue/changeStatusThunk', async ({ id, status }) => editStatus(id, status));

export const getSortedByABSDateRevuesThunk = createAsyncThunk<RevueType[]>(
  'revue/getSortedByABSDateRevuesThunk',
  async () => getRevues(),
);

export const getSortedByDESCDateRevuesThunk = createAsyncThunk<RevueType[]>(
  'revue/getSortedByDESCDateRevuesThunk',
  async () => getRevues(),
);
