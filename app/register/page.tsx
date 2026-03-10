"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field";
import { FileCheck, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

const commitmentTypes = [
  { value: "financial_support", label: "Financial Support" },
  { value: "dev_support", label: "Dev Support" },
  { value: "design_support", label: "Design Support" },
  { value: "mentorship", label: "Mentorship" },
  { value: "open_source", label: "Open Source" },
];

const amountUnits = [
  { value: "percent", label: "Percent (%)" },
  { value: "hours", label: "Hours" },
  { value: "usd", label: "USD ($)" },
  { value: "deliverable", label: "Deliverable" },
];

export default function RegisterPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    projectName: "",
    githubUsername: "",
    walletAddress: "",
    commitmentType: "",
    description: "",
    optionalAmount: "",
    optionalAmountUnit: "",
    proofUrl: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.projectName || !formData.commitmentType || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Simulate submission
    setSubmitted(true);
    toast.success("Commitment registered successfully!");
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <div className="container py-8 px-4 md:px-6">
        <Toaster />
        <div className="max-w-2xl mx-auto">
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardContent className="pt-12 pb-12">
              <div className="flex flex-col items-center text-center gap-6">
                <div className="p-4 rounded-full bg-green-500/20">
                  <CheckCircle2 className="h-12 w-12 text-green-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">Commitment Registered!</h2>
                  <p className="text-muted-foreground max-w-md">
                    Your commitment has been publicly recorded. You can now track its status 
                    and submit proof when completed.
                  </p>
                </div>
                <div className="flex gap-4 mt-4">
                  <Button onClick={() => setSubmitted(false)} variant="outline">
                    Register Another
                  </Button>
                  <Button asChild>
                    <a href="/registry">View Registry</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 px-4 md:px-6">
      <Toaster />
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileCheck className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Register Commitment</h1>
          </div>
          <p className="text-muted-foreground">
            Publicly declare your commitment to support the ecosystem
          </p>
        </div>

        <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>New Commitment</CardTitle>
            <CardDescription>
              Fill in the details of your commitment. Required fields are marked with an asterisk.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <Field>
                  <FieldLabel>Project Name *</FieldLabel>
                  <Input
                    placeholder="e.g., Alpha Protocol"
                    value={formData.projectName}
                    onChange={(e) => handleChange("projectName", e.target.value)}
                    className="bg-background/50"
                  />
                </Field>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel>GitHub Username</FieldLabel>
                    <FieldDescription>Optional</FieldDescription>
                    <Input
                      placeholder="e.g., devsam"
                      value={formData.githubUsername}
                      onChange={(e) => handleChange("githubUsername", e.target.value)}
                      className="bg-background/50"
                    />
                  </Field>

                  <Field>
                    <FieldLabel>Wallet Address</FieldLabel>
                    <FieldDescription>Optional</FieldDescription>
                    <Input
                      placeholder="0x..."
                      value={formData.walletAddress}
                      onChange={(e) => handleChange("walletAddress", e.target.value)}
                      className="bg-background/50"
                    />
                  </Field>
                </div>

                <Field>
                  <FieldLabel>Commitment Type *</FieldLabel>
                  <Select
                    value={formData.commitmentType}
                    onValueChange={(value) => handleChange("commitmentType", value)}
                  >
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select commitment type" />
                    </SelectTrigger>
                    <SelectContent>
                      {commitmentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel>Description *</FieldLabel>
                  <FieldDescription>
                    Describe your commitment in detail
                  </FieldDescription>
                  <Textarea
                    placeholder="e.g., 20 hours helping new teams integrate with our protocol"
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    className="bg-background/50 min-h-[100px]"
                  />
                </Field>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel>Amount</FieldLabel>
                    <FieldDescription>Optional quantity</FieldDescription>
                    <Input
                      type="number"
                      placeholder="e.g., 20"
                      value={formData.optionalAmount}
                      onChange={(e) => handleChange("optionalAmount", e.target.value)}
                      className="bg-background/50"
                    />
                  </Field>

                  <Field>
                    <FieldLabel>Amount Unit</FieldLabel>
                    <FieldDescription>Optional</FieldDescription>
                    <Select
                      value={formData.optionalAmountUnit}
                      onValueChange={(value) => handleChange("optionalAmountUnit", value)}
                    >
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        {amountUnits.map((unit) => (
                          <SelectItem key={unit.value} value={unit.value}>
                            {unit.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </div>

                <Field>
                  <FieldLabel>Proof URL</FieldLabel>
                  <FieldDescription>
                    Optional - add later when commitment is fulfilled
                  </FieldDescription>
                  <Input
                    placeholder="https://github.com/... or https://snowtrace.io/tx/..."
                    value={formData.proofUrl}
                    onChange={(e) => handleChange("proofUrl", e.target.value)}
                    className="bg-background/50"
                  />
                </Field>
              </FieldGroup>

              <div className="mt-8">
                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                  Register Commitment
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
