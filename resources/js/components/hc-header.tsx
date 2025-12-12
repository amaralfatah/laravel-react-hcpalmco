import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { Menu } from 'lucide-react';

interface HcHeaderProps {
    companyName?: string;
    logo?: string;
    rightLogo?: string;
    navigation?: Array<{
        title: string;
        href: string;
    }>;
    onMenuClick?: () => void;
    className?: string;
}

export default function HcHeader({
    companyName = "HC Palm Co",
    logo,
    rightLogo,
    navigation = [],
    onMenuClick,
    className
}: HcHeaderProps) {
    return (
        <header className={cn(
            "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
            className
        )}>
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Left Logo */}
                <Link href="/" className="flex items-center">
                    {logo ? (
                        <img
                            src={logo}
                            alt={companyName}
                            className="h-10 w-auto"
                        />
                    ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <span className="text-lg font-bold">
                                {companyName.charAt(0)}
                            </span>
                        </div>
                    )}
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6">
                    {navigation.map((item) => (
                        <button
                            key={item.title}
                            onClick={() => {
                                const element = document.querySelector(item.href);
                                if (element) {
                                    const headerHeight = 64; // h-16 = 64px
                                    const elementPosition = element.getBoundingClientRect().top;
                                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                                    window.scrollTo({
                                        top: offsetPosition,
                                        behavior: 'smooth'
                                    });
                                }
                            }}
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
                        >
                            {item.title}
                        </button>
                    ))}
                </nav>

                {/* Right Section: Right Logo and Mobile Menu */}
                <div className="flex items-center space-x-4">
                    {/* Right Logo */}
                    {rightLogo && (
                        <img
                            src={rightLogo}
                            alt="Partner Logo"
                            className="h-10 w-auto hidden sm:block"
                        />
                    )}

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={onMenuClick}
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </div>
            </div>
        </header>
    );
}
