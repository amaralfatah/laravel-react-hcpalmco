import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { Menu, Phone, Mail, MapPin } from 'lucide-react';

interface CompanyHeaderProps {
    companyName?: string;
    logo?: string;
    contact?: {
        phone?: string;
        email?: string;
        address?: string;
    };
    navigation?: Array<{
        title: string;
        href: string;
    }>;
    onMenuClick?: () => void;
    className?: string;
}

export default function CompanyHeader({
    companyName = "HC Palm Co",
    logo,
    contact = {},
    navigation = [],
    onMenuClick,
    className
}: CompanyHeaderProps) {
    return (
        <header className={cn(
            "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
            className
        )}>
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo and Company Name */}
                <Link href="/" className="flex items-center space-x-3">
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
                    <div className="hidden sm:block">
                        <h1 className="text-xl font-bold text-foreground">
                            {companyName}
                        </h1>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6">
                    {navigation.map((item) => (
                        <Link
                            key={item.title}
                            href={item.href}
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {item.title}
                        </Link>
                    ))}
                </nav>

                {/* Contact Info - Desktop */}
                <div className="hidden lg:flex items-center space-x-4 text-sm text-muted-foreground">
                    {contact.phone && (
                        <div className="flex items-center space-x-1">
                            <Phone className="h-4 w-4" />
                            <span>{contact.phone}</span>
                        </div>
                    )}
                    {contact.email && (
                        <div className="flex items-center space-x-1">
                            <Mail className="h-4 w-4" />
                            <span>{contact.email}</span>
                        </div>
                    )}
                    {contact.address && (
                        <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{contact.address}</span>
                        </div>
                    )}
                </div>

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
        </header>
    );
}