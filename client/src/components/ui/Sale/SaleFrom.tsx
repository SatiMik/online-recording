import React, { useState } from 'react';
import type { SaleFormType } from '../../../types/Sale';

export default function SaleFrom(): JSX.Element {
  const [input, setInput] = useState<SaleFormType>({ description: '', img: '' });

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  return (
    <>
      <input
        name="description"
        value={input.description}
        placeholder="Название акции"
        onChange={changeHandler}
      />
      <form action="/upload" method="post" encType="multipart/form-data">
        <input type="file" name="file" />
        <input type="submit" value="Загрузить файл" />
      </form>
    </>
  );
}
