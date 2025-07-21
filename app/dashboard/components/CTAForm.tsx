"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    ArrowRight,
    Send,
    ShoppingCart,
    Download,
    LogIn,
    PhoneCall,
    Mail,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { type User } from "@/types/user-account";

type Form = Omit<User, "_id" | "createdAt" | "updatedAt" | "__v" | "isPremiumUser" | "userLinks" | "userTheme" | "viewCount" | "viewHistory">;
interface CTAFormProps {
    form: Form;
    setForm: (form: Form) => void;
    user: User | null;
}
const RenderIcon = ({ form, setForm, user }: CTAFormProps) => {
    const icons = {
        arrowRight: ArrowRight,
        send: Send,
        shoppingCart: ShoppingCart,
        download: Download,
        logIn: LogIn,
        phoneCall: PhoneCall,
        mail: Mail,
        whatsapp: FaWhatsapp,
    };
    const [currentIcon, setCurrentIcon] = useState(user?.cta?.icon ?? "mail");
    return (
        <>
            {Object.entries(icons).map(([key, Icon]) => (
                <Icon
                    key={key}
                    onClick={() => {
                        setCurrentIcon(key as keyof typeof icons);
                        setForm({
                            ...form,
                            cta: {
                                ...form.cta,
                                icon: key,
                            },
                        });
                    }}
                    className={`h-10 w-10 border rounded-xl cursor-pointer p-2 transition ${currentIcon === key ? "bg-black text-white" : ""
                        }`}
                />
            ))}
        </>
    )
}


const CTAForm = ({ form, setForm, user }: CTAFormProps) => {

    return (
        <div className="space-y-4 px-4">
            <div>
                <Label htmlFor="spotifyUrl">Add Spotify URL</Label>
                <Input
                    id="spotifyUrl"
                    className="text-muted-foreground"
                    value={form.spotifyUrl}
                    onChange={(e) => setForm({ ...form, spotifyUrl: e.target.value })}
                    placeholder="Enter Spotify Url"
                />
            </div>

            <div>
                <Label htmlFor="ctaText">Add Call to Action Text</Label>
                <Input
                    id="ctaText"
                    disabled={!user?.isPremiumUser}
                    className="text-muted-foreground"
                    value={form.cta?.text}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            cta: {
                                ...form.cta,
                                text: e.target.value,
                            },
                        })
                    }
                    placeholder="Enter CTA Text"
                />
            </div>

            <div>
                <Label htmlFor="ctaUrl">Add Call to Action Link</Label>
                <Input
                    id="ctaUrl"
                    disabled={!user?.isPremiumUser}
                    className="text-muted-foreground"
                    value={form.cta?.url}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            cta: {
                                ...form.cta,
                                url: e.target.value,
                            },
                        })
                    }
                    placeholder="Enter CTA URL"
                />
            </div>

            <div>
                <Label>Select CTA Icon</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                    <RenderIcon form={form} setForm={setForm} user={user} />
                </div>
            </div>
        </div>
    );
};

export default CTAForm;
