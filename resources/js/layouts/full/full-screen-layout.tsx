import { type PropsWithChildren } from 'react';

interface FullScreenLayoutProps {
    title?: string;
    description?: string;
}

export default function FullScreenLayout({
    children,
}: PropsWithChildren<FullScreenLayoutProps>) {
    return (
        <div className="min-h-screen w-full bg-background text-foreground">
            {children}
        </div>
    );
}
