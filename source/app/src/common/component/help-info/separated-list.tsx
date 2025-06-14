// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import './styles.scss';

interface SeparatedListProps {
  ariaLabel?: string;
  items: Array<React.ReactNode>;
}

export function SeparatedList({ ariaLabel, items }: SeparatedListProps) {
  return (
    <ul aria-label={ariaLabel} className="root">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
