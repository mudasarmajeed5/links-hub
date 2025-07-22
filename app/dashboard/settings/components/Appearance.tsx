"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Form } from "../../types/Form"
import { useSession } from "next-auth/react"
type AppearanceProps = {
    form: Form
    setForm: (form: Form) => void
}

export const Appearance = ({ form, setForm }: AppearanceProps) => {
    const { data: session } = useSession()
    return (
        <>
            <div className="space-y-4 px-4">
                {/* Theme Selection */}
                <div className="space-y-2">
                    <Label htmlFor="theme">Add Theme</Label>
                    <select
                        id="theme"
                        value={form.theme}
                        onChange={(e) =>
                            setForm({ ...form, theme: e.target.value as "light" | "dark" })
                        }
                        className="w-full p-1 rounded-md"
                    >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>

                    {/* Accent Color Picker */}
                    <Label htmlFor="accentColor">Add Accent Color for your Profile</Label>
                    <Input
                        id="accentColor"
                        disabled={!session?.user.isPremiumUser}
                        className="text-muted-foreground"
                        value={form.accentColor}
                        type="color"
                        onChange={(e) =>
                            setForm({ ...form, accentColor: e.target.value })
                        }
                        placeholder="Enter Accent Color"
                    />
                </div>

                {/* Animation Options */}
                <div className="space-y-2 text-xs text-muted-foreground">
                    <p className="text-sm font-medium text-foreground">Experimental Features</p>

                    {/* Particle Animation */}
                    <div className="flex items-center justify-between">
                        <Label>Particle Animation</Label>
                        <Switch disabled checked={false} />
                    </div>
                    <Input disabled placeholder="Particle Count (e.g. 30)" />

                    {/* Star Animation */}
                    <div className="flex items-center justify-between">
                        <Label>Star Animation</Label>
                        <Switch disabled checked={false} />
                    </div>
                    <Input disabled placeholder="Star Count (e.g. 10)" />

                    {/* Stagger Animation */}
                    <div className="flex items-center justify-between">
                        <Label>Stagger on Social Icons</Label>
                        <Switch disabled checked={false} />
                    </div>
                    <Input disabled placeholder="Speed (ms, e.g. 300)" />

                    <p className="text-[10px] italic text-center text-muted-foreground">
                        These features are under development and will be available soon.
                    </p>
                </div>
            </div>
        </>
    )
}
