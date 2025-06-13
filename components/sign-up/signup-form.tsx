'use client';

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import SignUpHeader from "./signup-header";
import SignUpInput from "./signup-input";
import SignUpTerms from "./signup-terms";
import SignUpFooter from "./signup-footer";
import { useRouter } from "next/navigation";

export const SignUpForm = ({
  className,
  ...props
}: React.ComponentProps<"form">) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "", // Changed from firstName
    institutions: "", // Changed from lastName
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handler for text inputs
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  // Handler for checkbox
  function handleCheckboxChange(checked: boolean) {
    setFormData((prev) => ({
      ...prev,
      terms: checked,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!formData.terms) {
      setError("You must agree to the terms of use");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `api/auth/signin/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            // Changed how 'name' is constructed - now just 'fullName'
            name: formData.fullName,
            institution: formData.institutions, // Added institution to the payload
            email: formData.email,
            phone: formData.phone || undefined,
            password: formData.password,
            password_confirmation: formData.confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("User registered:", data);
        alert("Registration successful! Please log in.");
        setFormData({
          fullName: "", // Reset to empty string
          institutions: "", // Reset to empty string
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          terms: false,
        });
        router.push("/sign-in");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setError("Network error. Please try again later.");
    }

    setLoading(false);
  }

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <SignUpHeader />
      <div className="grid gap-6">
        {/* Changed id to "fullName" and label to "Full Name" */}
        <SignUpInput id="fullName" label="Full Name" value={formData.fullName} onChange={handleInputChange} required />
        {/* Changed id to "institutions" and label to "Institutions" */}
        <SignUpInput id="institutions" label="Institutions" value={formData.institutions} onChange={handleInputChange} required />
        <SignUpInput id="email" label="Email" type="email" value={formData.email} onChange={handleInputChange} required />
        <SignUpInput id="phone" label="Phone Number (optional)" type="tel" value={formData.phone} onChange={handleInputChange} />
        <SignUpInput id="password" label="Password" type="password" value={formData.password} onChange={handleInputChange} required />
        <SignUpInput id="confirmPassword" label="Confirm Password" type="password" value={formData.confirmPassword} onChange={handleInputChange} required />
        <SignUpTerms terms={formData.terms} onChange={handleCheckboxChange} />
        {error && <p className="text-red-600">{error}</p>}
        <Button
          type="submit"
          className="w-full p-6 bg-gray-500 hover:bg-gray-600 text-white uppercase"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </Button>
      </div>
      <SignUpFooter />
    </form>
  );
};