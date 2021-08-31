import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { darken, lighten } from 'polished';

const sizes: {
  [size: string]: { height: string; fontSize: string };
} = {
  large: {
    height: '3rem',
    fontSize: '1.25rem',
  },
  medium: {
    height: '2.25rem',
    fontSize: '1rem',
  },
  small: {
    height: '1.75rem',
    fontSize: '0.875rem',
  },
};

const sizeStyles = ({ size = 'medium' }: ButtonProps) => css`
  height: ${sizes[size].height};
  font-size: ${sizes[size].fontSize};
`;

const fullWidthStyles = ({ fullWidth }: ButtonProps) =>
  fullWidth &&
  css`
    width: 100%;
    justify-content: center;
    & + & {
      margin-left: 0;
      margin-top: 1rem;
    }
  `;

const StyledButton = styled.button<ButtonProps>`
  /* 공통 스타일 */
  display: inline-flex;
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;

  /* 크기 */
  ${sizeStyles}
  ${fullWidthStyles}

  /* 색상 */
  ${({ theme, color = 'blue' }) => {
    const selected = theme.palette[color];
    return css`
      background: ${selected};
      &:hover {
        background: ${lighten(0.1, selected)};
      }
      &:active {
        background: ${darken(0.1, selected)};
      }
    `;
  }}

  /* 기타 */
  & + & {
    margin-left: 1rem;
  }
`;

interface ButtonProps {
  children?: React.ReactNode;
  color?: string;
  size?: string;
  fullWidth?: boolean;
  [rest: string]: any;
}

function Button({
  children,
  color = 'blue',
  size = 'medium',
  fullWidth = false,
  ...rest
}: ButtonProps) {
  return (
    <StyledButton color={color} size={size} fullWidth={fullWidth} {...rest}>
      {children}
    </StyledButton>
  );
}

export default Button;
