// FILE: /account/page.tsx
// This page displays the user's profile information.
"use client";

import React, { useState } from 'react';
import Link from 'next/link'; // Import Link for navigation
import { useProfile } from '@/lib/context/ProfileContext'; // Import the custom hook
import { LayoutDashboard, Briefcase, User, Edit, Mail, Phone, FileText, Linkedin, Github, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- shadcn/ui Component Imports --- //
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


// --- SIDEBAR COMPONENT (Modified for active page prop) --- //
const Sidebar = ({ isExpanded, setIsExpanded, activePage }: { isExpanded: boolean; setIsExpanded: (isExpanded: boolean) => void; activePage: string; }) => {
    const menuItems = [
        { icon: LayoutDashboard, title: 'Dashboard', href: '/dashboard' },
        { icon: Briefcase, title: 'Positions', href: '/positions' },
        { icon: User, title: 'Account', href: '/account' },
    ];
    return (
        <aside 
            className={`fixed top-0 left-0 h-full bg-card border-r z-50 transition-all duration-300 ease-in-out ${isExpanded ? 'w-64' : 'w-20'}`}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-center h-20 border-b">
                     <img src="/sarastya-logo-warna.jpeg" alt="Sarastya Group Logo" className={`transition-all duration-300 ${isExpanded ? 'h-10' : 'h-8'}`} />
                </div>
                <nav className="flex-1 px-4 py-6 space-y-2">
                    {menuItems.map(item => (
                        <Link 
                            key={item.title} 
                            href={item.href}
                            className={`flex items-center p-3 rounded-lg transition-colors ${
                                activePage === item.title
                                ? 'bg-[#DD489A]/10 text-[#DD489A]'
                                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                            }`}
                        >
                            <item.icon className="h-6 w-6 flex-shrink-0" />
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.span 
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: 'auto' }}
                                        exit={{ opacity: 0, width: 0 }}
                                        transition={{ duration: 0.2, delay: 0.1 }}
                                        className="ml-4 font-medium whitespace-nowrap overflow-hidden"
                                    >
                                        {item.title}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Link>
                    ))}
                </nav>
            </div>
        </aside>
    );
};

// --- PROFILE COMPONENTS --- //

const ProfileHeader = ({ userProfile }: { userProfile: any }) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
                <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} />
                <AvatarFallback>{userProfile.initials}</AvatarFallback>
            </Avatar>
            <div>
                <h1 className="text-3xl font-bold">{userProfile.name}</h1>
                <p className="text-muted-foreground">{userProfile.email}</p>
            </div>
        </div>
        <Button asChild variant="outline" className="bg-[#DD489A]/10 text-[#DD489A] border-[#DD489A]/20 hover:bg-[#DD489A]/20">
            <Link href="/edit-profile">
                <Edit className="mr-2 h-4 w-4" /> Edit Profile
            </Link>
        </Button>
    </div>
);

const DetailItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string }) => (
    <div className="flex items-center">
        <Icon className="h-5 w-5 text-muted-foreground" />
        <div className="ml-4">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="font-medium">{value}</p>
        </div>
    </div>
);

const LinkItem = ({ icon: Icon, href, label }: { icon: React.ElementType, href: string, label: string }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center p-3 hover:bg-accent rounded-lg transition-colors">
        <Icon className="h-5 w-5 text-[#DD489A]" />
        <span className="ml-4 font-medium">{label}</span>
    </a>
);

// --- MAIN ACCOUNT PAGE --- //
export default function AccountPage() {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
    const { userProfile } = useProfile(); // Get profile data from context

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
            <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} activePage="Account" />
            <main className={`transition-all duration-300 ease-in-out ${isSidebarExpanded ? 'ml-64' : 'ml-20'}`}>
                <div className="p-8">
                    <div className="space-y-6">
                        <ProfileHeader userProfile={userProfile} />
                        
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Left Column */}
                            <div className="lg:col-span-2 space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>About Me</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{userProfile.about}</p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Resume / CV</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <FileText className="h-6 w-6 text-[#DD489A]" />
                                            <span className="ml-3 font-medium">Budi_Hartono_Resume.pdf</span>
                                        </div>
                                        <Button asChild variant="outline" className="bg-[#DD489A]/10 text-[#DD489A] border-[#DD489A]/20 hover:bg-[#DD489A]/20">
                                            <a href={userProfile.resumeUrl} download>Download</a>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">
                                <Card>
                                    <CardHeader><CardTitle>Details</CardTitle></CardHeader>
                                    <CardContent className="space-y-4">
                                        <DetailItem icon={Mail} label="Email" value={userProfile.email} />
                                        <DetailItem icon={Phone} label="Phone" value={userProfile.phone} />
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader><CardTitle>Links</CardTitle></CardHeader>
                                    <CardContent>
                                        <LinkItem icon={Linkedin} href={userProfile.links.linkedin} label="LinkedIn" />
                                        <LinkItem icon={Github} href={userProfile.links.github} label="GitHub" />
                                        <LinkItem icon={Globe} href={userProfile.links.portfolio} label="Portfolio" />
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
