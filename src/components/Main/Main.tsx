import React from 'react';

interface IMain {
  children: React.ReactNode;
}

export default function Main({ children }: IMain): JSX.Element {
  return <main>{children}</main>;
}
