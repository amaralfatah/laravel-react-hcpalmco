import React from 'react';
import { Link } from '@inertiajs/react';

interface HcSubHeaderProps {
    title?: string;
    subtitle?: string;
}

export default function HcSubHeader({
    title = "HC Roadmap PTPN IV Palmco 2026 – 2030",
    subtitle = "(1/2)"
}: HcSubHeaderProps) {
    return (
        <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
            <div className="container mx-auto flex h-16 items-center justify-between px-2 sm:px-4">
                {/* Left Logo */}
                <div className="flex items-center">
                    <Link href="/" className="flex items-center">
                        <img
                            src="/images/danantara-logo.png"
                            alt="Danantara Indonesia"
                            className="h-8 w-auto sm:h-10 lg:h-12"
                        />
                    </Link>
                </div>

                {/* Center Title */}
                <div className="flex-1 px-2 sm:px-4 lg:px-8">
                    <h1 className="text-sm sm:text-lg lg:text-2xl xl:text-3xl font-bold text-primary italic text-center leading-tight">
                        {title}
                        {/* {subtitle && (
                            <span className="block text-xs sm:text-sm lg:text-base xl:text-lg font-normal mt-1">
                                {subtitle}
                            </span>
                        )} */}
                    </h1>
                </div>

                {/* Right Logos */}
                <div className="flex items-center gap-1 sm:gap-2">
                    <img
                        src="/images/holding-logo.png"
                        alt="Perkebunan Nusantara"
                        className="h-8 w-auto sm:h-10 lg:h-12"
                    />
                    <img
                        src="/images/palmco-logo.png"
                        alt="PTPN IV Palmco"
                        className="h-8 w-auto sm:h-10 lg:h-12"
                    />
                </div>
            </div>
        </header>
    );
}
