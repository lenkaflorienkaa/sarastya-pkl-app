// FILE: /app/edit-profile/page.tsx
"use client";

import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { LayoutDashboard, Briefcase, User, ArrowLeft, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- shadcn/ui Component Imports --- //
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

// --- CONTEXT AND MOCK DATA --- //
// Moved context here to make component self-contained.
const initialProfile = {
    name: 'Budi Hartono',
    email: 'budi.hartono@example.com',
    phone: '+62 812 3456 7890',
    avatarUrl: 'https://github.com/shadcn.png',
    initials: 'BH',
    about: "Passionate and detail-oriented final year Computer Science student with a strong foundation in frontend development. Eager to apply my skills in a real-world setting and contribute to a forward-thinking team. Proficient in React, Next.js, and modern CSS frameworks.",
    resumeUrl: '/path/to/resume.pdf',
    links: {
        linkedin: 'https://linkedin.com/in/budi-hartono',
        github: 'https://github.com/budi-hartono',
        portfolio: 'https://budi-hartono.dev',
    }
};

interface ProfileContextType {
    userProfile: typeof initialProfile;
    setUserProfile: React.Dispatch<React.SetStateAction<typeof initialProfile>>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
    const [userProfile, setUserProfile] = useState(initialProfile);
    return (
        <ProfileContext.Provider value={{ userProfile, setUserProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (context === undefined) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }
    return context;
};


// --- SIDEBAR COMPONENT (Can be reused) --- //
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
                        <a 
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
                        </a>
                    ))}
                </nav>
            </div>
        </aside>
    );
};


// --- MAIN EDIT PROFILE PAGE --- //
const EditProfileContent = () => {
    const { userProfile, setUserProfile } = useProfile();
    const [formData, setFormData] = useState(userProfile);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal

    useEffect(() => {
        setFormData(userProfile);
    }, [userProfile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            links: { ...prev.links, [name]: value }
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setUserProfile(formData);
        setIsModalOpen(true); // Open the modal instead of showing an alert
    };

    const handleBackToProfile = () => {
        setIsModalOpen(false);
        window.location.href = '/account'; // Navigate back to the account page
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="flex items-center justify-between">
                    <Button variant="ghost" asChild>
                       <a href="/account"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Profile</a>
                    </Button>
                    <Button type="submit" className="bg-[#DD489A] hover:bg-[#DD489A]/90 text-white">Save Changes</Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Update your personal details here.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" name="name" value={formData.name} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>About Me</CardTitle></CardHeader>
                    <CardContent>
                        <Textarea name="about" value={formData.about} onChange={handleChange} rows={5} />
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Links</CardTitle>
                        <CardDescription>Update your portfolio and social links.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="linkedin">LinkedIn URL</Label>
                            <Input id="linkedin" name="linkedin" value={formData.links.linkedin} onChange={handleLinkChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="github">GitHub URL</Label>
                            <Input id="github" name="github" value={formData.links.github} onChange={handleLinkChange} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="portfolio">Portfolio URL</Label>
                            <Input id="portfolio" name="portfolio" value={formData.links.portfolio} onChange={handleLinkChange} />
                        </div>
                    </CardContent>
                </Card>
            </form>

            {/* --- SAVE CHANGES MODAL --- */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center">
                           <CheckCircle className="mr-2 h-6 w-6 text-green-500" />
                           Profile Saved Successfully!
                        </DialogTitle>
                        <DialogDescription>
                            Your changes have been saved. You can now return to your profile.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={handleBackToProfile} className="w-full bg-[#DD489A] hover:bg-[#DD489A]/90 text-white">
                           Back to Profile
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default function EditProfilePage() {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

    return (
        <ProfileProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
                <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} activePage="Account" />
                <main className={`transition-all duration-300 ease-in-out ${isSidebarExpanded ? 'ml-64' : 'ml-20'}`}>
                    <div className="p-8">
                        <EditProfileContent />
                    </div>
                </main>
            </div>
        </ProfileProvider>
    );
}
