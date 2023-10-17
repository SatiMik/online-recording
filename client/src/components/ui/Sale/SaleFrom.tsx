import React, { useState } from 'react';
import type { SaleFormType } from '../../../types/saleTypes';
import { useAppDispatch } from '../../../redux/hooks';
import { addSaleThunk } from '../../../redux/slices/sale/SaleThunks';

export default function SaleForm(): JSX.Element {
  const [input, setInput] = useState<SaleFormType>({ description: '', img: '' });

  const dispatch = useAppDispatch();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const description = e.currentTarget.description as HTMLInputElement;
    const fileInput = e.currentTarget.file as HTMLInputElement;

    if (!description.value || !fileInput.files || !fileInput.files[0]) return;

    const formData = new FormData();
    formData.append('description', description.value);
    formData.append('file', fileInput.files[0]);

    e.currentTarget.reset();
    void dispatch(addSaleThunk(formData));
  };

  return (
    <form onSubmit={submitHandler}>
      <input name="description" placeholder="Название акции" onChange={changeHandler} />
      <input type="file" name="file" onChange={changeHandler} />
      <input type="submit" value="Загрузить файл" />
    </form>
  );
}
