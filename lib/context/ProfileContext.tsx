// FILE: /lib/context/ProfileContext.tsx
"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

// This is the initial data for the profile. In a real app, you'd fetch this.
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

// Define the shape of your context data
interface ProfileContextType {
    userProfile: typeof initialProfile;
    setUserProfile: React.Dispatch<React.SetStateAction<typeof initialProfile>>;
}

// Create the context
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

// Create the Provider component. This is what will hold the state.
export const ProfileProvider = ({ children }: { children: ReactNode }) => {
    const [userProfile, setUserProfile] = useState(initialProfile);

    return (
        <ProfileContext.Provider value={{ userProfile, setUserProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};

// Create a custom hook for easy access to the context
export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (context === undefined) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }
    return context;
};
