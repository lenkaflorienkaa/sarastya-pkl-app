// FILE: /app/position-view/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
// import { useSearchParams } from 'next/navigation'; // Removed to fix build error
import { LayoutDashboard, Briefcase, User, ArrowLeft, MapPin, Building2, CheckSquare, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- shadcn/ui Component Imports --- //
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// --- MOCK DATA (Should be consistent across your app) --- //
const allPositionsData = [
    { 
        id: 1, 
        title: 'Backend Developer Intern', 
        location: 'Malang, Indonesia', 
        type: 'Full-time', 
        description: 'Work on the server-side logic, database interactions, and API development for our applications.',
        responsibilities: [
            'Design and implement RESTful APIs.',
            'Collaborate with front-end developers to integrate user-facing elements.',
            'Troubleshoot, debug and upgrade existing software.',
            'Write clean, maintainable, and efficient code.'
        ],
        qualifications: [
            'Familiarity with Node.js or Python (Django/Flask).',
            'Basic understanding of database systems (SQL or NoSQL).',
            'Enthusiasm for learning new technologies.',
            'Strong problem-solving skills.'
        ]
    },
    { 
        id: 2, 
        title: 'Digital Marketing Intern', 
        location: 'Remote', 
        type: 'Part-time', 
        description: 'Assist in planning and executing our digital marketing campaigns across various channels.',
        responsibilities: [
            'Assist in the creation of digital content (e.g., website, blogs, press releases and podcasts).',
            'Manage and grow the company’s social media presence.',
            'Conduct market research and analyze marketing trends.',
            'Support the marketing team in daily administrative tasks.'
        ],
        qualifications: [
            'Strong desire to learn along with professional drive.',
            'Solid understanding of different marketing techniques.',
            'Excellent verbal and written communication skills.',
            'Familiarity with marketing software and online applications (e.g., CRM tools, Online analytics and Google Adwords).'
        ]
    },
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

// --- MAIN VIEW PAGE CONTENT --- //
const PositionViewContent = () => {
    const [position, setPosition] = useState<typeof allPositionsData[0] | null>(null);

    useEffect(() => {
        // Using browser's URLSearchParams to get query params to avoid Next.js specific hook issues.
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        
        if (id) {
            const foundPosition = allPositionsData.find(p => p.id === parseInt(id));
            setPosition(foundPosition || null);
        }
    }, []);

    if (!position) {
        return <div className="text-center py-20 text-muted-foreground">Position not found or loading...</div>;
    }
    
    return (
         <div className="space-y-6">
            <Button variant="ghost" asChild>
               <a href="/dashboard"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard</a>
            </Button>

            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div>
                            <CardTitle className="text-3xl">{position.title}</CardTitle>
                            <CardDescription className="flex items-center gap-4 pt-2">
                                <span className="flex items-center gap-1.5"><MapPin size={14} /> {position.location}</span>
                                <span className="flex items-center gap-1.5"><Building2 size={14} /> {position.type}</span>
                            </CardDescription>
                        </div>
                        <Button className="bg-[#DD489A] hover:bg-[#DD489A]/90 text-white w-full md:w-auto">Apply Now</Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-8 pt-6">
                    <div>
                        <h3 className="font-semibold text-xl mb-3">About the Role</h3>
                        <p className="text-muted-foreground leading-relaxed">{position.description}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-xl mb-3">Responsibilities</h3>
                        <ul className="space-y-2">
                            {position.responsibilities.map((resp, index) => (
                                <li key={index} className="flex items-start">
                                    <CheckSquare className="h-5 w-5 mt-0.5 text-[#DD489A] mr-3 flex-shrink-0" />
                                    <span className="text-muted-foreground">{resp}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                     <div>
                        <h3 className="font-semibold text-xl mb-3">Qualifications</h3>
                        <ul className="space-y-2">
                            {position.qualifications.map((qual, index) => (
                                <li key={index} className="flex items-start">
                                    <Sparkles className="h-5 w-5 mt-0.5 text-[#DD489A] mr-3 flex-shrink-0" />
                                    <span className="text-muted-foreground">{qual}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

// --- MAIN PAGE WRAPPER --- //
export default function PositionViewPage() {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
            <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} activePage="Dashboard" />
            <main className={`transition-all duration-300 ease-in-out ${isSidebarExpanded ? 'ml-64' : 'ml-20'}`}>
                <div className="p-8">
                   <PositionViewContent />
                </div>
            </main>
        </div>
    );
}
