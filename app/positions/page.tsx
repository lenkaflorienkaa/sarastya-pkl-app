// FILE: /positions/page.tsx
// This page displays available internship positions with search and filter functionality.
"use client";

import React, { useState, useEffect } from 'react';
// import Link from 'next/link'; // Removed to fix compilation error. Using standard <a> tags for navigation.
import { LayoutDashboard, Briefcase, User, Search, MapPin, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- shadcn/ui Component Imports --- //
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// --- MOCK DATA FOR POSITIONS --- //
const allPositions = [
    { 
        id: 1, 
        title: 'Frontend Developer Intern', 
        location: 'Malang', 
        type: 'Full-time', 
        description: 'Join our team to build and maintain our web applications using modern frontend technologies.' 
    },
    { 
        id: 2, 
        title: 'UI/UX Designer Intern', 
        location: 'Remote', 
        type: 'Part-time', 
        description: 'Help shape the user experience of our products by creating intuitive and beautiful designs.' 
    },
    { 
        id: 3, 
        title: 'Backend Developer Intern', 
        location: 'Malang', 
        type: 'Full-time', 
        description: 'Work on the server-side logic, database interactions, and API development for our applications.' 
    },
    { 
        id: 4, 
        title: 'Data Analyst Intern', 
        location: 'Malang', 
        type: 'Full-time', 
        description: 'Analyze large datasets to extract meaningful insights and support data-driven decision-making.' 
    },
    { 
        id: 5, 
        title: 'Digital Marketing Intern', 
        location: 'Remote', 
        type: 'Part-time', 
        description: 'Assist in planning and executing our digital marketing campaigns across various channels.' 
    },
    { 
        id: 6, 
        title: 'Human Resources Intern', 
        location: 'Malang', 
        type: 'Full-time', 
        description: 'Support the HR team in recruitment, onboarding, and other administrative tasks.' 
    },
];

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

// --- FILTERS COMPONENT --- //
const PositionFilters = ({ setSearchTerm, setLocation, setJobType }: {
    setSearchTerm: (term: string) => void;
    setLocation: (location: string) => void;
    setJobType: (type: string) => void;
}) => (
    <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
                placeholder="Search by position or keyword..." 
                className="pl-10" 
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        <Select onValueChange={(value) => setLocation(value === "all" ? "" : value)}>
            <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="Malang">Malang</SelectItem>
                <SelectItem value="Remote">Remote</SelectItem>
            </SelectContent>
        </Select>
        <Select onValueChange={(value) => setJobType(value === "all" ? "" : value)}>
            <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
            </SelectContent>
        </Select>
    </div>
);


// --- POSITION CARD COMPONENT --- //
const PositionCard = ({ position }: { position: typeof allPositions[0] }) => (
    <Card className="flex flex-col">
        <CardHeader>
            <CardTitle>{position.title}</CardTitle>
            <CardDescription className="flex items-center gap-4 pt-2">
                <span className="flex items-center gap-1.5"><MapPin size={14} /> {position.location}</span>
                <span className="flex items-center gap-1.5"><Building2 size={14} /> {position.type}</span>
            </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
            <p className="text-muted-foreground">{position.description}</p>
        </CardContent>
        <CardFooter>
            <Button className="w-full bg-[#DD489A] hover:bg-[#DD489A]/90 text-white">Apply Now</Button>
        </CardFooter>
    </Card>
);


// --- MAIN POSITIONS PAGE --- //
export default function PositionsPage() {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [location, setLocation] = useState("");
    const [jobType, setJobType] = useState("");
    const [filteredPositions, setFilteredPositions] = useState(allPositions);

    useEffect(() => {
        const lowercasedTerm = searchTerm.toLowerCase();
        const results = allPositions.filter(pos => {
            const matchesSearch = lowercasedTerm === "" ||
                pos.title.toLowerCase().includes(lowercasedTerm) ||
                pos.description.toLowerCase().includes(lowercasedTerm);
            
            const matchesLocation = location === "" || pos.location === location;
            const matchesJobType = jobType === "" || pos.type === jobType;

            return matchesSearch && matchesLocation && matchesJobType;
        });
        setFilteredPositions(results);
    }, [searchTerm, location, jobType]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
            <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} activePage="Positions" />
            <main className={`transition-all duration-300 ease-in-out ${isSidebarExpanded ? 'ml-64' : 'ml-20'}`}>
                <div className="p-8">
                    <div className="space-y-6">
                        <div>
                           <h1 className="text-3xl font-bold">Find Your Internship</h1>
                           <p className="text-muted-foreground">Explore exciting opportunities at Sarastya Group.</p>
                        </div>
                        <PositionFilters setSearchTerm={setSearchTerm} setLocation={setLocation} setJobType={setJobType} />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPositions.length > 0 ? (
                                filteredPositions.map(position => (
                                    <PositionCard key={position.id} position={position} />
                                ))
                            ) : (
                                <div className="col-span-full text-center py-12 text-muted-foreground">
                                    <p>No positions found matching your criteria.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
