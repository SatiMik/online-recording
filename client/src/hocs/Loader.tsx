import type { CSSProperties } from 'react';
import React from 'react';
import { ClipLoader } from 'react-spinners';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

type LoaderPropsType = {
  isLoading: boolean;
  children: React.ReactElement;
};

export default function Loader({ isLoading, children }: LoaderPropsType): JSX.Element {
  if (isLoading)
    return (
      <ClipLoader
        color="red"
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  return children;
}
