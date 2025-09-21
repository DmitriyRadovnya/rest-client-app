'use client';

import { forwardRef } from 'react';
import { Button, ButtonProps } from '@mui/material';
import { Link } from '@/i18n/routing';

type LocalizedButtonLinkProps = Omit<ButtonProps, 'href'> & {
  href: string;
};

const LinkBehaviour = forwardRef<HTMLAnchorElement, { href: string }>(
  function LinkBehaviour(props, ref) {
    return <Link ref={ref} {...props} />;
  }
);

export function LocalizedButtonLink({ href, children, ...props }: LocalizedButtonLinkProps) {
  return (
    <Button component={LinkBehaviour} href={href} {...props}>
      {children}
    </Button>
  );
}
