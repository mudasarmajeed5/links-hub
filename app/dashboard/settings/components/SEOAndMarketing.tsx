import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Form } from "../../types/Form"
type SEOAndMarketingProps = {
    form: Form,
    setForm: (form: Form) => void;
}
export const SEOAndMarketing = ({ form, setForm }: SEOAndMarketingProps) => {
    return (
        <>
            <div className="space-y-2 px-4">
                <Label htmlFor="seoName">Add SEO Name</Label>
                <Input
                    id="seoName"
                    className="text-muted-foreground"
                    value={form.seoRanking.name}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            seoRanking: { ...form.seoRanking, name: e.target.value },
                        })
                    }
                    placeholder="Enter SEO Name"
                />
                <Label htmlFor="seoDescription">Add SEO Description</Label>
                <Input
                    id="seoDescription"
                    className="text-muted-foreground"
                    value={form.seoRanking.description}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            seoRanking: { ...form.seoRanking, description: e.target.value },
                        })
                    }
                    placeholder="Enter SEO Description"
                />
                <Label htmlFor="seoKeywords">Add comma separated seo keywords</Label>
                <Input
                    id="seoKeywords"
                    className="text-muted-foreground"
                    value={form.seoRanking.keywords?.join(",") || ""}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            seoRanking: {
                                ...form.seoRanking,
                                keywords: e.target.value.split(","),
                            },
                        })
                    }
                    placeholder="Enter SEO Keywords"
                />
                <Label htmlFor="seoMetaTags">Add comma separated seo meta-tags</Label>
                <Input
                    id="seoMetaTags"
                    className="text-muted-foreground"
                    value={form.seoRanking.metaTags?.join(",") || ''}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            seoRanking: {
                                ...form.seoRanking,
                                metaTags: e.target.value.split(","),
                            },
                        })
                    }
                    placeholder="Enter SEO Meta Tags" />
            </div>
            <div className="flex items-center space-x-2 px-4">
                <Checkbox
                    id="enableSignupForm"
                    checked={form.emailMarketing.enableSignupForm}
                    onCheckedChange={(checked) =>
                        setForm({
                            ...form,
                            emailMarketing: {
                                ...form.emailMarketing,
                                enableSignupForm: !!checked,
                            },
                        })
                    }
                />
                <Label htmlFor="enableSignupForm">Enable Email Marketing</Label>
            </div>
            <div className="space-y-2 px-4">
                <Label htmlFor="welcomeEmail">Welcome Email</Label>
                <Textarea
                    id="welcomeEmail"
                    className="text-muted-foreground"
                    value={form.emailMarketing.welcomeEmail}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            emailMarketing: {
                                ...form.emailMarketing,
                                welcomeEmail: e.target.value,
                            },
                        })
                    }
                    placeholder="Add what you wan't users to see on newsletter"
                />
            </div>
        </>
    )
}