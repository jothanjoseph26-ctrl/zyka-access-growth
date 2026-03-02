import { Settings as SettingsIcon, Save, Building2, Percent, Clock, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="section-padding py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your business settings</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Company Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Company Name</Label>
                <Input defaultValue="Zyka Credit Limited" />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input defaultValue="+234 800 000 0000" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input defaultValue="info@zykacredit.com" />
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Input defaultValue="Lagos, Nigeria" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Percent className="h-5 w-5" />
              Loan Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Default Interest Rate (%)</Label>
                <Input type="number" defaultValue="3" />
              </div>
              <div className="space-y-2">
                <Label>Default Tenure (days)</Label>
                <Input type="number" defaultValue="30" />
              </div>
              <div className="space-y-2">
                <Label>Max LTV (%)</Label>
                <Input type="number" defaultValue="75" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Business Hours
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Opening Time</Label>
                <Input type="time" defaultValue="09:00" />
              </div>
              <div className="space-y-2">
                <Label>Closing Time</Label>
                <Input type="time" defaultValue="18:00" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive email alerts for new pawns</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">SMS Reminders</p>
                <p className="text-sm text-muted-foreground">Send SMS to customers before maturity</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button className="bg-primary hover:bg-primary/90">
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
