// FILE: /lib/context/ProfileContext.tsx
"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// This is the initial or fallback data for the profile.
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

    // FIX: Added useEffect to fetch profile data from the API when the app loads.
    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await fetch('/api/profile', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        // Restructure data to match the frontend's expected format
                        const profileData = {
                            ...data,
                            links: {
                                linkedin: data.links?.linkedin_url || '',
                                github: data.links?.github_url || '',
                                portfolio: data.links?.portfolio_url || '',
                            }
                        };
                        setUserProfile(profileData);
                    } else {
                        // Handle cases where the token is invalid or expired
                        console.error("Failed to fetch profile:", response.statusText);
                        localStorage.removeItem('token');
                    }
                } catch (error) {
                    console.error("An error occurred while fetching the profile:", error);
                }
            }
        };

        fetchProfile();
    }, []); // The empty dependency array ensures this runs only once on mount.

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
