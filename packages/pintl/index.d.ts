import * as React from 'react';

type Lang = string;
type Messages = {
  [key: string]: string;
};

interface IntlWrapperProps {
  children: React.ReactNode;
  lang?: Lang;
  messages?: Messages;
  inShell?: boolean;
}

declare interface IntlContext {
  getText: (id: string, args?: string | {[key: string]: string} | null, context?: string | number) => string;
  getName: (firstName: string, lastName: string) => string;
  getDate: (date: Date | string, format?: Intl.DateTimeFormatOptions) => string;
  lang: Lang;
}

declare const IntlWrapper: React.ComponentType<IntlWrapperProps>;
