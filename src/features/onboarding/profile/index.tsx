"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {

  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Label } from "~/components/ui/labels";
import { CandidateProfile } from "~/types/user";
import { profileSchema } from "~/validations/profileSchema";
import { sanitizeProfileData } from "~/lib/utils";
import { useCreateCandidate } from "~/apis/candidates";


export default function OnboardingProfile() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const { mutate: createCandidate, isPending } = useCreateCandidate();
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof CandidateProfile, string>>
  >({});

  const [form, setForm] = useState<CandidateProfile>({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    availability: "",
    current_position: "",
    current_salary: "",
    education: "",
    expectation_salary: "",
    job_preferences: [],
    languages: [""],
    linkedin_url: "",
    phone: "",
    portfolio_url: "",
    profile_image_url: "",
    resume_url: "",
    skills: [],
    summary: "",
    work_authorization: "",
    work_history: "",
    years_experience: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("extractedProfile");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        console.log("saved", parsed);

        const educationStr = Array.isArray(parsed.education)
          ? parsed.education
              .map(
                (edu: any) =>
                  `${edu.degree || ""}, ${edu.university || ""}, ${
                    edu.start_date || ""
                  } - ${edu.end_date || ""}`
              )
              .join("\n")
          : parsed.education || "";

        const workHistoryStr = Array.isArray(parsed.workHistory)
          ? parsed.workHistory
              .map(
                (work: any) =>
                  `${work.role || ""}, ${work.company || ""}, ${
                    work.start_date || ""
                  } - ${work.end_date || ""}`
              )
              .join("\n")
          : parsed.workHistory || "";

        setForm((prev) => ({
          ...prev,
          ...sanitizeProfileData(parsed),
          education: educationStr,
          workHistory: workHistoryStr,
        }));
      } catch (error) {
        console.error("Failed to parse userProfile from localStorage", error);
      }
    }
  }, []);

  const skillsText = useMemo(() => form.skills.join(", "), [form.skills]);
  const jobPreferencesText = useMemo(
    () => form.job_preferences?.join(", ") || "",
    [form.job_preferences]
  );

  const languagesText = useMemo(
    () => form.languages?.join(", ") || "",
    [form.languages]
  );

  const handleChange = (field: keyof CandidateProfile, value: string) => {
    if (field === "skills") {
      setForm((prev) => ({
        ...prev,
        skills: value
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      }));
    } else if (field === "job_preferences") {
      setForm((prev) => ({
        ...prev,
        job_preferences: value
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      }));
    } else if (field === "languages") {
      setForm((prev) => ({
        ...prev,
        languages: value
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      }));
    } else {
      setForm((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setFormErrors({});

    try {
      const result = profileSchema.safeParse(form);
      console.log("resutl", result);
      if (!result.success) {
        const fieldErrors: Partial<Record<keyof CandidateProfile, string>> = {};

        for (const issue of result.error.issues) {
          const field = issue.path[0] as keyof CandidateProfile;
          fieldErrors[field] = issue.message;
        }

        setFormErrors(fieldErrors);
        setIsSaving(false);
        return;
      }

      await new Promise<void>((resolve, reject) => {
        createCandidate(form, {
          onSuccess: () => {
            sessionStorage.removeItem("extractedProfile");
            router.push("/user/dashboard");
            resolve();
          },
          onError: (error) => {
            console.error("Failed to create candidate:", error);
            reject(error);
          },
        });
      });
    } catch (err) {
      console.error("Unexpected error in handleSave:", err);
    } finally {
      setIsSaving(false);
    }
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
                  value={form.first_name}
                  onChange={(e) => handleChange("first_name", e.target.value)}
                />
                {formErrors.first_name && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.first_name}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  value={form.last_name}
                  onChange={(e) => handleChange("last_name", e.target.value)}
                />
                {formErrors.last_name && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.last_name}
                  </p>
                )}
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
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.email}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
                {formErrors.phone && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.phone}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="location">Address</Label>
              <Input
                id="location"
                value={form.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
              {formErrors.address && (
                <p className="mt-1 text-sm text-red-600">
                  {formErrors.address}
                </p>
              )}
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
                  value={form.years_experience}
                  onValueChange={(v) => handleChange("years_experience", v)}
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
                {formErrors.years_experience && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.years_experience}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="current_position">Current Position</Label>
                <Input
                  id="current_position"
                  value={form.current_position}
                  onChange={(e) =>
                    handleChange("current_position", e.target.value)
                  }
                />
                {formErrors.current_position && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.current_position}
                  </p>
                )}
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
              {formErrors.skills && (
                <p className="mt-1 text-sm text-red-600">{formErrors.skills}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                <Input
                  id="linkedinUrl"
                  type="url"
                  value={form.linkedin_url || ""}
                  onChange={(e) => handleChange("linkedin_url", e.target.value)}
                />
                {formErrors.linkedin_url && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.linkedin_url}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="portfolioUrl">Portfolio URL</Label>
                <Input
                  id="portfolioUrl"
                  type="url"
                  value={form.portfolio_url || ""}
                  onChange={(e) =>
                    handleChange("portfolio_url", e.target.value)
                  }
                />
                {formErrors.portfolio_url && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.portfolio_url}
                  </p>
                )}
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
              {formErrors.summary && (
                <p className="mt-1 text-sm text-red-600">
                  {formErrors.summary}
                </p>
              )}
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
                <Label htmlFor="current_salary">Current Salary</Label>
                <Input
                  id="current_salary"
                  value={form.current_salary || ""}
                  onChange={(e) =>
                    handleChange("current_salary", e.target.value)
                  }
                  placeholder="e.g. 70000 USD"
                />
                {formErrors.current_salary && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.current_salary}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="expectation_salary">Expected Salary</Label>
                <Input
                  id="expectation_salary"
                  value={form.expectation_salary || ""}
                  onChange={(e) =>
                    handleChange("expectation_salary", e.target.value)
                  }
                  placeholder="e.g. 85000 USD"
                />
                {formErrors.expectation_salary && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.expectation_salary}
                  </p>
                )}
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
              {formErrors.education && (
                <p className="mt-1 text-sm text-red-600">
                  {formErrors.education}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="workHistory">
                Work History (e.g. Role, Company, Years)
              </Label>
              <Textarea
                id="workHistory"
                rows={3}
                value={form.work_history || ""}
                onChange={(e) => handleChange("work_history", e.target.value)}
                placeholder="Frontend Developer, ABC Corp, 2019-2021"
              />
              {formErrors.work_history && (
                <p className="mt-1 text-sm text-red-600">
                  {formErrors.work_history}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="job_preferences">
                Job Preferences (comma separated)
              </Label>
              <Input
                id="job_preferences"
                value={jobPreferencesText}
                onChange={(e) =>
                  handleChange("job_preferences", e.target.value)
                }
                placeholder="Full-time, Remote, Engineering"
              />
              {formErrors.job_preferences && (
                <p className="mt-1 text-sm text-red-600">
                  {formErrors.job_preferences}
                </p>
              )}
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
                {formErrors.availability && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.availability}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="workAuthorization">Work Authorization</Label>
                <Input
                  id="workAuthorization"
                  value={form.work_authorization || ""}
                  onChange={(e) =>
                    handleChange("work_authorization", e.target.value)
                  }
                  placeholder="e.g. Citizen, H1B visa"
                />
                {formErrors.work_authorization && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.work_authorization}
                  </p>
                )}
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
              {formErrors.languages && (
                <p className="mt-1 text-sm text-red-600">
                  {formErrors.languages}
                </p>
              )}
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
