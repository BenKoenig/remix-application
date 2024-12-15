import { Link as RemixLink } from '@remix-run/react';
import React from 'react';
import { css } from '../../styled-system/css'

interface LinkProps {
    to: string;
    children: React.ReactNode;
    className?: string;
}

const Link: React.FC<LinkProps> = ({ to, children, className }) => {
    return (
        <RemixLink
            to={to}
            className={css({
                all: 'unset',
                width: '100px',
                height: '30px',
                fontSize: '16px',
                background: 'transparent',
                border: 'none',
                position: 'relative',
                color: '#f0f0f0',
                cursor: 'pointer',
                zIndex: 1,
                padding: '10px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                whiteSpace: 'nowrap',
                userSelect: 'none',
                touchAction: 'manipulation',
                '&::after, &::before': {
                    content: "''",
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    zIndex: -99999,
                    transition: 'all .4s',
                },
                '&::before': {
                    transform: 'translate(0%, 0%)',
                    width: '100%',
                    height: '100%',
                    background: '#28282d',
                    borderRadius: '10px',
                },
                '&::after': {
                    transform: 'translate(10px, 10px)',
                    width: '35px',
                    height: '35px',
                    background: '#ffffff15',
                    backdropFilter: 'blur(5px)',
                    borderRadius: '50px',
                },
                '&:hover::before': {
                    transform: 'translate(5%, 20%)',
                    width: '110%',
                    height: '110%',
                },
                '&:hover::after': {
                    borderRadius: '10px',
                    transform: 'translate(0, 0)',
                    width: '100%',
                    height: '100%',
                },
                '&:active::after': {
                    transition: '0s',
                    transform: 'translate(0, 5%)',
                },
            })}
        >
            {children}
        </RemixLink>
    );
};

export default Link;
