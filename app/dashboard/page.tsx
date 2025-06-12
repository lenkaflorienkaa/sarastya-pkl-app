// FILE: /app/dashboard/page.tsx
// All components are combined into this single file for simplicity.
// The pink color #DD489A is applied directly using Tailwind's arbitrary values.
"use client";

import React, { useState } from 'react';
// import Link from 'next/link'; // Removed this import to resolve the error. Standard <a> tags will be used for navigation.
import { LayoutDashboard, Briefcase, User, FileText, Calendar, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- shadcn/ui Component Imports --- //
// You would have these components in your project after running `npx shadcn-ui@latest init`
// and `npx shadcn-ui@latest add card button`.
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// --- MOCK DATA --- //
const userApplications = [
    { id: 1, position: 'Frontend Developer Intern', status: 'Under Review', submitted: 'June 10, 2025' },
    { id: 2, position: 'UI/UX Designer Intern', status: 'Application Viewed', submitted: 'June 5, 2025' },
];
const upcomingInterviews = [
    { id: 1, position: 'Frontend Developer Intern', type: 'HR Screening', date: 'June 18, 2025', time: '10:00 AM WIB' },
];
const recommendedPositions = [
    { id: 1, position: 'Backend Developer Intern', location: 'Malang, Indonesia', type: 'Full-time' },
    { id: 2, position: 'Digital Marketing Intern', location: 'Remote', type: 'Part-time' },
];

// --- SIDEBAR COMPONENT --- //
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
                                ? 'bg-[#DD489A]/10 text-[#DD489A]' // Use pink for active state
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

// --- WELCOME CARD COMPONENT --- //
const WelcomeCard = () => (
    <Card>
        <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between">
            <div>
                <h2 className="text-2xl font-bold">Welcome back, Budi!</h2>
                <p className="mt-1 text-muted-foreground">Let's continue your journey with Sarastya Group.</p>
            </div>
            <div className="mt-4 md:mt-0 text-center">
                <p className="text-sm font-medium">Profile Completeness</p>
                <div className="w-32 h-2 bg-secondary rounded-full mt-2 mx-auto">
                    <div className="w-3/4 h-2 bg-[#DD489A] rounded-full"></div>
                </div>
                <a href="#" className="mt-2 text-sm text-[#DD489A] hover:underline">Complete Profile</a>
            </div>
        </CardContent>
    </Card>
);

// --- APPLICATION STATUS COMPONENT --- //
const ApplicationStatus = () => (
    <Card>
        <CardHeader>
            <CardTitle>My Applications</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                {userApplications.map(app => (
                    <div key={app.id} className="flex items-center space-x-4 p-4 rounded-lg bg-secondary">
                        <div className="flex-shrink-0 w-10 h-10 bg-[#DD489A]/10 text-[#DD489A] rounded-lg flex items-center justify-center">
                            <FileText size={20} />
                        </div>
                        <div className="flex-grow">
                            <p className="font-semibold">{app.position}</p>
                            <p className="text-sm text-muted-foreground">Submitted: {app.submitted}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            app.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                        }`}>
                            {app.status}
                        </span>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
);

// --- UPCOMING INTERVIEWS COMPONENT --- //
const UpcomingInterviewsCard = () => (
    <Card>
        <CardHeader>
            <CardTitle>Upcoming Interviews</CardTitle>
        </CardHeader>
        <CardContent>
             {upcomingInterviews.length > 0 ? (
                <div className="space-y-4">
                    {upcomingInterviews.map(interview => (
                         <div key={interview.id} className="flex items-start space-x-4 p-4 rounded-lg bg-secondary">
                            <div className="flex-shrink-0 w-10 h-10 bg-[#DD489A]/10 text-[#DD489A] rounded-lg flex items-center justify-center">
                                <Calendar size={20} />
                            </div>
                            <div>
                                <p className="font-semibold">{interview.position}</p>
                                <p className="text-sm text-muted-foreground">{interview.type}</p>
                                <p className="text-sm font-semibold text-[#DD489A] mt-1">{interview.date} at {interview.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
             ) : (
                <p className="text-center text-muted-foreground py-4">No interviews scheduled yet.</p>
             )}
        </CardContent>
    </Card>
);

// --- RECOMMENDED POSITIONS COMPONENT --- //
const RecommendedPositionsCard = () => (
     <Card>
        <CardHeader>
            <CardTitle>Urgently Needed</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                {recommendedPositions.map(pos => (
                    <div key={pos.id} className="flex items-center space-x-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-[#DD489A]/10 text-[#DD489A] rounded-lg flex items-center justify-center">
                            <Lightbulb size={20} />
                        </div>
                        <div className="flex-grow">
                            <p className="font-semibold">{pos.position}</p>
                            <p className="text-sm text-muted-foreground">{pos.location} &middot; {pos.type}</p>
                        </div>
                        <Button variant="ghost" size="sm">View</Button>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
);


// --- MAIN PAGE --- //
export default function DashboardPage() {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
            <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} activePage="Dashboard" />
            <main className={`transition-all duration-300 ease-in-out ${isSidebarExpanded ? 'ml-64' : 'ml-20'}`}>
                <div className="p-8">
                    <div className="space-y-6">
                        <WelcomeCard />
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2">
                                <ApplicationStatus />
                            </div>
                            <div>
                                <UpcomingInterviewsCard />
                            </div>
                        </div>
                        <RecommendedPositionsCard />
                    </div>
                </div>
            </main>
        </div>
    );
}
