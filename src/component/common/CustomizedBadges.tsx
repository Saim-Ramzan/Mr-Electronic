import * as React from 'react';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// eslint-disable-next-line
const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 1,
    top: 1,
    // border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',

  },
}));

interface props  {
  badgeCount: number
}
export default function CustomizedBadges({badgeCount}: props) {
  return (
    <IconButton aria-label="cart">
      <StyledBadge badgeContent={badgeCount} color="info">
        <ShoppingCartIcon htmlColor='#fff' />
      </StyledBadge>
    </IconButton>
  );
}
