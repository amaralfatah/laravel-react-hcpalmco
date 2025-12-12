import FullScreenLayoutTemplate from '@/layouts/full/full-screen-layout';
import { type ReactNode } from 'react';

interface AppLayoutFullProps {
    children: ReactNode;
    title?: string;
    description?: string;
}

export default ({ children, title, description, ...props }: AppLayoutFullProps) => (
    <FullScreenLayoutTemplate title={title} description={description} {...props}>
        {children}
    </FullScreenLayoutTemplate>
);
