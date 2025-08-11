"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/labels";

type Profile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  currentRole: string;
  yearsExperience: string;
  skills: string[];
  linkedinUrl?: string;
  portfolioUrl?: string;
  summary?: string;
  currentSalary?: string;
  expectationSalary?: string;
  resumeUrl?: string;
  education?: string; // simplified as string input for now
  workHistory?: string; // simplified as string input for now
  jobPreferences?: string[];
  availability?: string;
  workAuthorization?: string;
  languages?: string[];
  profileImageUrl?: string;
};

export default function OnboardingProfile() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState<Profile>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    currentRole: "",
    yearsExperience: "",
    skills: [],
    linkedinUrl: "",
    portfolioUrl: "",
    summary: "",
    currentSalary: "",
    expectationSalary: "",
    resumeUrl: "",
    education: "",
    workHistory: "",
    jobPreferences: [],
    availability: "",
    workAuthorization: "",
    languages: [],
    profileImageUrl: "",
  });

  useEffect(() => {
    // Prefill from session (extraction) or existing saved profile
    const fromExtraction = sessionStorage.getItem("extractedProfile");
    const saved = localStorage.getItem("userProfile");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Profile;
        setForm((prev) => ({ ...prev, ...parsed }));
        return;
      } catch {}
    }
    if (fromExtraction) {
      try {
        const parsed = JSON.parse(fromExtraction) as Profile;
        setForm((prev) => ({ ...prev, ...parsed }));
      } catch {}
    }
  }, []);

  const skillsText = useMemo(() => form.skills.join(", "), [form.skills]);
  const jobPreferencesText = useMemo(
    () => form.jobPreferences?.join(", ") || "",
    [form.jobPreferences]
  );
  const languagesText = useMemo(
    () => form.languages?.join(", ") || "",
    [form.languages]
  );

  const handleChange = (field: keyof Profile, value: string) => {
    if (field === "skills") {
      setForm((p) => ({
        ...p,
        skills: value
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      }));
    } else if (field === "jobPreferences") {
      setForm((p) => ({
        ...p,
        jobPreferences: value
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      }));
    } else if (field === "languages") {
      setForm((p) => ({
        ...p,
        languages: value
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      }));
    } else {
      setForm((p) => ({ ...p, [field]: value }));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem("userProfile", JSON.stringify(form));
      sessionStorage.removeItem("extractedProfile");
      // Go to dashboard
      router.push("/user/dashboard");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Complete your profile
          </h1>
          <p className="text-gray-600">
            Review and edit your details extracted from your resume
          </p>
        </div>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Personal information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  value={form.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  value={form.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={form.location}
                onChange={(e) => handleChange("location", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6 bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Professional information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Years of experience</Label>
                <Select
                  value={form.yearsExperience}
                  onValueChange={(v) => handleChange("yearsExperience", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select years of experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1">0-1</SelectItem>
                    <SelectItem value="2-3">2-3</SelectItem>
                    <SelectItem value="4-5">4-5</SelectItem>
                    <SelectItem value="5+">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="currentRole">Current role</Label>
                <Input
                  id="currentRole"
                  value={form.currentRole}
                  onChange={(e) => handleChange("currentRole", e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="skills">Skills (comma separated)</Label>
              <Input
                id="skills"
                value={skillsText}
                onChange={(e) => handleChange("skills", e.target.value)}
                placeholder="React, TypeScript, Node.js"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                <Input
                  id="linkedinUrl"
                  type="url"
                  value={form.linkedinUrl || ""}
                  onChange={(e) => handleChange("linkedinUrl", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="portfolioUrl">Portfolio URL</Label>
                <Input
                  id="portfolioUrl"
                  type="url"
                  value={form.portfolioUrl || ""}
                  onChange={(e) => handleChange("portfolioUrl", e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                rows={4}
                value={form.summary || ""}
                onChange={(e) => handleChange("summary", e.target.value)}
                placeholder="Brief professional summary..."
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6 bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Additional information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="currentSalary">Current Salary</Label>
                <Input
                  id="currentSalary"
                  value={form.currentSalary || ""}
                  onChange={(e) =>
                    handleChange("currentSalary", e.target.value)
                  }
                  placeholder="e.g. 70000 USD"
                />
              </div>
              <div>
                <Label htmlFor="expectationSalary">Expected Salary</Label>
                <Input
                  id="expectationSalary"
                  value={form.expectationSalary || ""}
                  onChange={(e) =>
                    handleChange("expectationSalary", e.target.value)
                  }
                  placeholder="e.g. 85000 USD"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="education">
                Education (e.g. Degree, Institution, Year)
              </Label>
              <Textarea
                id="education"
                rows={3}
                value={form.education || ""}
                onChange={(e) => handleChange("education", e.target.value)}
                placeholder="Bachelor's in Computer Science, XYZ University, 2018"
              />
            </div>

            <div>
              <Label htmlFor="workHistory">
                Work History (e.g. Role, Company, Years)
              </Label>
              <Textarea
                id="workHistory"
                rows={3}
                value={form.workHistory || ""}
                onChange={(e) => handleChange("workHistory", e.target.value)}
                placeholder="Frontend Developer, ABC Corp, 2019-2021"
              />
            </div>

            <div>
              <Label htmlFor="jobPreferences">
                Job Preferences (comma separated)
              </Label>
              <Input
                id="jobPreferences"
                value={jobPreferencesText}
                onChange={(e) => handleChange("jobPreferences", e.target.value)}
                placeholder="Full-time, Remote, Engineering"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="availability">Availability</Label>
                <Input
                  id="availability"
                  value={form.availability || ""}
                  onChange={(e) => handleChange("availability", e.target.value)}
                  placeholder="e.g. Immediate, 2 weeks notice"
                />
              </div>

              <div>
                <Label htmlFor="workAuthorization">Work Authorization</Label>
                <Input
                  id="workAuthorization"
                  value={form.workAuthorization || ""}
                  onChange={(e) =>
                    handleChange("workAuthorization", e.target.value)
                  }
                  placeholder="e.g. Citizen, H1B visa"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="languages">Languages (comma separated)</Label>
              <Input
                id="languages"
                value={languagesText}
                onChange={(e) => handleChange("languages", e.target.value)}
                placeholder="English, Spanish, French"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end mt-6">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save and continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}
