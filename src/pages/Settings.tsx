import { useState, useRef } from "react";
import {
  Building2,
  Users,
  Shield,
  Bell,
  Calendar,
  Palette,
  Globe,
  Database,
  Mail,
  Save,
  Upload,
  ImageIcon,
  X,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const settingsSections = [
  { id: "general", label: "General", icon: Building2 },
  { id: "users", label: "Users & Roles", icon: Users },
  { id: "academic", label: "Academic", icon: Calendar },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState("general");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen">
      <Header title="Settings" subtitle="Configure institution preferences and system settings" />
      
      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="rounded-xl border border-border bg-card p-2">
              <nav className="space-y-1">
                {settingsSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        activeSection === section.id
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {section.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            {activeSection === "general" && (
              <div className="space-y-6 animate-fade-in">
                {/* Institution Logo & Banner */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Institution Branding</h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Logo Upload */}
                    <div className="space-y-3">
                      <Label>Institution Logo</Label>
                      <div className="flex items-center gap-4">
                        <div className="relative h-24 w-24 rounded-lg border-2 border-dashed border-border bg-muted/50 flex items-center justify-center overflow-hidden">
                          {logoPreview ? (
                            <>
                              <img src={logoPreview} alt="Logo preview" className="h-full w-full object-cover" />
                              <button
                                onClick={() => setLogoPreview(null)}
                                className="absolute top-1 right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:bg-destructive/90"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </>
                          ) : (
                            <ImageIcon className="h-8 w-8 text-muted-foreground" />
                          )}
                        </div>
                        <div className="space-y-2">
                          <input
                            type="file"
                            ref={logoInputRef}
                            onChange={handleLogoChange}
                            accept="image/*"
                            className="hidden"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => logoInputRef.current?.click()}
                            className="gap-2"
                          >
                            <Upload className="h-4 w-4" />
                            Upload Logo
                          </Button>
                          <p className="text-xs text-muted-foreground">PNG, JPG up to 2MB</p>
                        </div>
                      </div>
                    </div>

                    {/* Banner Upload */}
                    <div className="space-y-3">
                      <Label>Institution Banner</Label>
                      <div className="space-y-2">
                        <div className="relative h-24 w-full rounded-lg border-2 border-dashed border-border bg-muted/50 flex items-center justify-center overflow-hidden">
                          {bannerPreview ? (
                            <>
                              <img src={bannerPreview} alt="Banner preview" className="h-full w-full object-cover" />
                              <button
                                onClick={() => setBannerPreview(null)}
                                className="absolute top-1 right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:bg-destructive/90"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </>
                          ) : (
                            <div className="text-center">
                              <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto" />
                              <p className="text-xs text-muted-foreground mt-1">Banner Image</p>
                            </div>
                          )}
                        </div>
                        <input
                          type="file"
                          ref={bannerInputRef}
                          onChange={handleBannerChange}
                          accept="image/*"
                          className="hidden"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => bannerInputRef.current?.click()}
                          className="gap-2"
                        >
                          <Upload className="h-4 w-4" />
                          Upload Banner
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Institution Profile */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Institution Profile</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="institution-name">Institution Name</Label>
                      <Input id="institution-name" defaultValue="Delhi Public School" className="text-lg font-medium" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="tagline">Tagline / Motto</Label>
                      <Input id="tagline" placeholder="Enter institution motto or tagline" defaultValue="Excellence in Education" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="institution-code">Institution Code</Label>
                      <Input id="institution-code" defaultValue="DPS-DEL-001" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="institution-type">Institution Type</Label>
                      <Select defaultValue="school">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="school">School (K-12)</SelectItem>
                          <SelectItem value="college">College / University</SelectItem>
                          <SelectItem value="both">Both School & College</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="affiliation">Board / Affiliation</Label>
                      <Select defaultValue="cbse">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cbse">CBSE</SelectItem>
                          <SelectItem value="icse">ICSE</SelectItem>
                          <SelectItem value="state">State Board</SelectItem>
                          <SelectItem value="ib">International Baccalaureate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="established">Established Year</Label>
                      <Input id="established" type="number" placeholder="e.g., 1985" defaultValue="1985" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" defaultValue="123 Education Street, New Delhi - 110001" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue="+91 11 2345 6789" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="info@dps-delhi.edu" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" type="url" placeholder="https://www.example.com" defaultValue="https://www.dps-delhi.edu" />
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Contact Information</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="principal">Principal Name</Label>
                      <Input id="principal" defaultValue="Dr. Rajesh Kumar" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="admin-email">Admin Email</Label>
                      <Input id="admin-email" type="email" defaultValue="admin@dps-delhi.edu" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="gap-2 gradient-primary border-0">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </div>
            )}

            {activeSection === "academic" && (
              <div className="space-y-6 animate-fade-in">
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Academic Year</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="current-year">Current Academic Year</Label>
                      <Select defaultValue="2024-25">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2024-25">2024-25</SelectItem>
                          <SelectItem value="2023-24">2023-24</SelectItem>
                          <SelectItem value="2022-23">2022-23</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="year-start">Year Start Date</Label>
                      <Input id="year-start" type="date" defaultValue="2024-04-01" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="year-end">Year End Date</Label>
                      <Input id="year-end" type="date" defaultValue="2025-03-31" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="grading">Grading System</Label>
                      <Select defaultValue="percentage">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">Percentage</SelectItem>
                          <SelectItem value="grade">Grade Points (GPA)</SelectItem>
                          <SelectItem value="letter">Letter Grades</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Attendance Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Minimum Attendance Required</p>
                        <p className="text-sm text-muted-foreground">Students below this will be flagged</p>
                      </div>
                      <div className="w-24">
                        <Input type="number" defaultValue="75" className="text-center" />
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Late Entry Cutoff Time</p>
                        <p className="text-sm text-muted-foreground">Mark as late after this time</p>
                      </div>
                      <Input type="time" defaultValue="08:30" className="w-32" />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Send Absence Alerts</p>
                        <p className="text-sm text-muted-foreground">Notify parents when student is absent</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="gap-2 gradient-primary border-0">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </div>
            )}

            {activeSection === "users" && (
              <div className="space-y-6 animate-fade-in">
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Role Permissions</h3>
                  <div className="space-y-4">
                    {["Super Admin", "Admin", "Teacher", "Staff"].map((role) => (
                      <div key={role} className="flex items-center justify-between p-4 rounded-lg border border-border">
                        <div>
                          <p className="font-medium text-foreground">{role}</p>
                          <p className="text-sm text-muted-foreground">
                            {role === "Super Admin" && "Full access to all features"}
                            {role === "Admin" && "Manage students, teachers, and reports"}
                            {role === "Teacher" && "Manage own classes and attendance"}
                            {role === "Staff" && "Limited access to student data"}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSection === "notifications" && (
              <div className="space-y-6 animate-fade-in">
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Notification Preferences</h3>
                  <div className="space-y-4">
                    {[
                      { title: "Fee Payment Reminders", description: "Send reminders for pending fees" },
                      { title: "Attendance Alerts", description: "Daily absence notifications to parents" },
                      { title: "Exam Schedules", description: "Notify about upcoming exams" },
                      { title: "Event Updates", description: "Announce school events and activities" },
                      { title: "Result Publication", description: "Notify when exam results are published" },
                    ].map((item) => (
                      <div key={item.title} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">{item.title}</p>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSection === "security" && (
              <div className="space-y-6 animate-fade-in">
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Security Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                      </div>
                      <Switch />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Session Timeout</p>
                        <p className="text-sm text-muted-foreground">Auto logout after inactivity</p>
                      </div>
                      <Select defaultValue="30">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="120">2 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Password Policy</p>
                        <p className="text-sm text-muted-foreground">Enforce strong passwords</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "appearance" && (
              <div className="space-y-6 animate-fade-in">
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Theme Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Color Scheme</p>
                        <p className="text-sm text-muted-foreground">Choose light or dark mode</p>
                      </div>
                      <Select defaultValue="light">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Sidebar Collapsed by Default</p>
                        <p className="text-sm text-muted-foreground">Start with minimized sidebar</p>
                      </div>
                      <Switch />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Show Animations</p>
                        <p className="text-sm text-muted-foreground">Enable UI animations and transitions</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
