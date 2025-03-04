"use client"
import { useState } from "react";
import {
    FaEnvelope,
    FaGithub,
    FaLinkedinIn,
    FaTwitter,
    FaPaperPlane,
    FaUser,
} from "react-icons/fa"
import { MdMessage, MdArrowForward } from "react-icons/md"
import Navbar from "../components/Navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Footer } from "../components/Footer"
export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
        contactType: "general",
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleRadioChange = (value: string) => {
        setFormData((prev) => ({ ...prev, contactType: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate form submission
        setTimeout(() => {
            toast.success("Message sent, we will respond soon")
                setFormData({
                    name: "",
                    email: "",
                    subject: "",
                    message: "",
                    contactType: "general",
                })
      setIsSubmitting(false)
    }, 1500)
    }

    return (
        <div className="min-h-screen" style={{ backgroundColor: "#080D27" }}>
            {/* Main Content */}
            <Navbar/>
            <main className="py-16 px-4 md:px-6 lg:px-8">
                <div className="container  mx-auto max-w-6xl">
                    <div className="text-center min-h-[70vh] flex justify-center items-center flex-col gap-10 mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#2EF2FF]">Get in Touch</h1>
                        <p className="text-lg md:text-xl max-w-2xl mx-auto text-[#C4CBF5]">
                            Have questions about Links Hub? Need help with your account? Or want to work with our developer? Were
                            here to help!
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                        {/* Redesigned Contact Form */}
                        <Card
                            className="shadow-xl border-0 overflow-hidden"
                            style={{ backgroundColor: "#0C1838", borderColor: "#263466" }}
                        >
                            <div className="h-2 bg-gradient-to-r from-[#2EF2FF] to-[#3C52D9]"></div>
                            <CardHeader className="pb-4">
                                <CardTitle className="text-2xl text-[#EAEDFF]">Send us a message</CardTitle>
                                <CardDescription className="text-[#C4CBF5]">
                                    Fill out the form below and well get back to you as soon as possible.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="space-y-3">
                                        <Label htmlFor="contactType" className="text-[#C8EA80] font-medium">
                                            Who would you like to contact?
                                        </Label>
                                        <div className="grid grid-cols-1 gap-2 p-3 rounded-lg" style={{ backgroundColor: "#263466" }}>
                                            <RadioGroup
                                                defaultValue="general"
                                                value={formData.contactType}
                                                onValueChange={handleRadioChange}
                                                className="flex flex-col space-y-2"
                                            >
                                                <div className="flex items-center space-x-2 p-2 rounded hover:bg-[#334679] transition-colors">
                                                    <RadioGroupItem value="general" id="general" className="border-[#2EF2FF]" />
                                                    <Label htmlFor="general" className="text-[#EAEDFF] cursor-pointer">
                                                        General Help & Support
                                                    </Label>
                                                    <span className="text-xs text-[#C4CBF5] ml-auto">helpdesk@linkshub.space</span>
                                                </div>
                                                <div className="flex items-center space-x-2 p-2 rounded hover:bg-[#334679] transition-colors">
                                                    <RadioGroupItem value="admin" id="admin" className="border-[#2EF2FF]" />
                                                    <Label htmlFor="admin" className="text-[#EAEDFF] cursor-pointer">
                                                        Administrative Inquiries
                                                    </Label>
                                                    <span className="text-xs text-[#C4CBF5] ml-auto">admin@linkshub.space</span>
                                                </div>
                                                <div className="flex items-center space-x-2 p-2 rounded hover:bg-[#334679] transition-colors">
                                                    <RadioGroupItem value="developer" id="developer" className="border-[#2EF2FF]" />
                                                    <Label htmlFor="developer" className="text-[#EAEDFF] cursor-pointer">
                                                        Hire the Developer
                                                    </Label>
                                                    <span className="text-xs text-[#C4CBF5] ml-auto">mudassar.majeed@linkshub.space</span>
                                                </div>
                                            </RadioGroup>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <Label htmlFor="name" className="text-[#C8EA80] font-medium">
                                                Your Name
                                            </Label>
                                            <div className="relative">
                                                <div className="absolute left-3 top-3 text-[#3C52D9]">
                                                    <FaUser className="h-4 w-4" />
                                                </div>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="John Doe"
                                                    className="pl-10 bg-[#263466] border-0 focus:ring-1 focus:ring-[#2EF2FF] text-[#EAEDFF] placeholder:text-[#C4CBF5]/50"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-[#C8EA80] font-medium">
                                                Your Email
                                            </Label>
                                            <div className="relative">
                                                <div className="absolute left-3 top-3 text-[#3C52D9]">
                                                    <FaEnvelope className="h-4 w-4" />
                                                </div>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    type="email"
                                                    placeholder="john@example.com"
                                                    className="pl-10 bg-[#263466] border-0 focus:ring-1 focus:ring-[#2EF2FF] text-[#EAEDFF] placeholder:text-[#C4CBF5]/50"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="subject" className="text-[#C8EA80] font-medium">
                                            Subject
                                        </Label>
                                        <Input
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            placeholder="How can we help you?"
                                            className="bg-[#263466] border-0 focus:ring-1 focus:ring-[#2EF2FF] text-[#EAEDFF] placeholder:text-[#C4CBF5]/50"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message" className="text-[#C8EA80] font-medium">
                                            Message
                                        </Label>
                                        <div className="relative">
                                            <div className="absolute left-3 top-3 text-[#3C52D9]">
                                                <MdMessage className="h-4 w-4" />
                                            </div>
                                            <Textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder="Please describe your inquiry in detail..."
                                                className="min-h-[150px] pl-10 bg-[#263466] border-0 focus:ring-1 focus:ring-[#2EF2FF] text-[#EAEDFF] placeholder:text-[#C4CBF5]/50"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full flex items-center justify-center gap-2 mt-4 bg-gradient-to-r from-[#3C52D9] to-[#1959AD] hover:from-[#2EF2FF] hover:to-[#3C52D9] transition-all duration-300 text-white"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Sending..." : "Send Message"}
                                        <FaPaperPlane className="h-4 w-4" />
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Contact Info */}
                        <div className="space-y-6">
                            <Card className="shadow-xl border-0" style={{ backgroundColor: "#0C1838", borderColor: "#263466" }}>
                                <div className="h-2 bg-gradient-to-r from-[#C8EA80] to-[#2EF2FF]"></div>
                                <CardHeader>
                                    <CardTitle className="text-2xl text-[#2EF2FF]">Contact Information</CardTitle>
                                    <CardDescription className="text-[#C4CBF5]">Choose the best way to reach out to us</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-5">
                                        <div className="flex items-start gap-4 p-4 rounded-lg" style={{ backgroundColor: "#263466" }}>
                                            <div className="rounded-full p-3 flex-shrink-0" style={{ backgroundColor: "#334679" }}>
                                                <FaEnvelope className="h-5 w-5 text-[#2EF2FF]" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-[#C8EA80]">Help & Support</h3>
                                                <p className="text-[#C4CBF5] text-sm mb-2">For general inquiries and account support</p>
                                                <a
                                                    href="mailto:helpdesk@linkshub.space"
                                                    className="text-[#2EF2FF] hover:underline flex items-center gap-1 group"
                                                >
                                                    helpdesk@linkshub.space
                                                    <MdArrowForward className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4 p-4 rounded-lg" style={{ backgroundColor: "#263466" }}>
                                            <div className="rounded-full p-3 flex-shrink-0" style={{ backgroundColor: "#334679" }}>
                                                <FaEnvelope className="h-5 w-5 text-[#2EF2FF]" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-[#C8EA80]">Administrative Inquiries</h3>
                                                <p className="text-[#C4CBF5] text-sm mb-2">
                                                    For business partnerships and administrative matters
                                                </p>
                                                <a
                                                    href="mailto:admin@linkshub.space"
                                                    className="text-[#2EF2FF] hover:underline flex items-center gap-1 group"
                                                >
                                                    admin@linkshub.space
                                                    <MdArrowForward className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4 p-4 rounded-lg" style={{ backgroundColor: "#263466" }}>
                                            <div className="rounded-full p-3 flex-shrink-0" style={{ backgroundColor: "#334679" }}>
                                                <FaEnvelope className="h-5 w-5 text-[#2EF2FF]" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-[#C8EA80]">Hire the Developer</h3>
                                                <p className="text-[#C4CBF5] text-sm mb-2">
                                                    Interested in working with Mudassar for your project?
                                                </p>
                                                <a
                                                    href="mailto:mudassar.majeed@linkshub.space"
                                                    className="text-[#2EF2FF] hover:underline flex items-center gap-1 group"
                                                >
                                                    mudassar.majeed@linkshub.space
                                                    <MdArrowForward className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="shadow-xl border-0" style={{ backgroundColor: "#0C1838", borderColor: "#263466" }}>
                                <div className="h-2 bg-gradient-to-r from-[#3C52D9] to-[#C8EA80]"></div>
                                <CardHeader>
                                    <CardTitle className="text-2xl text-[#C8EA80]">Frequently Asked Questions</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-5">
                                    <div className="p-4 rounded-lg" style={{ backgroundColor: "#263466" }}>
                                        <h3 className="font-medium text-[#2EF2FF]">What is Links Hub?</h3>
                                        <p className="text-[#C4CBF5] text-sm mt-1">
                                            Links Hub is a profile linking platform similar to Linktree, allowing you to create a personalized
                                            page with all your important links in one place.
                                        </p>
                                    </div>
                                    <div className="p-4 rounded-lg" style={{ backgroundColor: "#263466" }}>
                                        <h3 className="font-medium text-[#2EF2FF]">How do I create an account?</h3>
                                        <p className="text-[#C4CBF5] text-sm mt-1">
                                            Click the Get Started button at the top of the page and follow the simple registration process
                                            to create your Links Hub profile.
                                        </p>
                                    </div>
                                    <div className="p-4 rounded-lg" style={{ backgroundColor: "#263466" }}>
                                        <h3 className="font-medium text-[#2EF2FF]">Is Links Hub free to use?</h3>
                                        <p className="text-[#C4CBF5] text-sm mt-1">
                                            Links Hub offers both free and premium plans. The free plan includes essential features, while
                                            premium plans offer additional customization options.
                                        </p>
                                    </div>

                                    <Button
                                        variant="outline"
                                        className="w-full mt-2 border-[#3C52D9] text-[#2EF2FF] hover:bg-[#334679] hover:text-white"
                                    >
                                        View All FAQs
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Developer Section */}
                    <Card className="shadow-xl border-0 mb-16" style={{ backgroundColor: "#0C1838", borderColor: "#263466" }}>
                        <div className="h-2 bg-gradient-to-r from-[#2EF2FF] via-[#3C52D9] to-[#C8EA80]"></div>
                        <CardContent className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                <div>
                                    <h2 className="text-3xl font-bold mb-4 text-[#C8EA80]">Work with Our Developer</h2>
                                    <p className="text-[#C4CBF5] mb-6">
                                        Mudassar Majeed is the lead developer behind Links Hub. With expertise in web development and a
                                        passion for creating user-friendly applications, Mudassar is available for freelance projects and
                                        consultations.
                                    </p>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#263466] transition-colors">
                                            <div className="w-2 h-2 rounded-full bg-[#2EF2FF]"></div>
                                            <p className="text-[#EAEDFF]">Full-stack web development</p>
                                        </div>
                                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#263466] transition-colors">
                                            <div className="w-2 h-2 rounded-full bg-[#2EF2FF]"></div>
                                            <p className="text-[#EAEDFF]">Custom web applications</p>
                                        </div>
                                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#263466] transition-colors">
                                            <div className="w-2 h-2 rounded-full bg-[#2EF2FF]"></div>
                                            <p className="text-[#EAEDFF]">UI/UX design and implementation</p>
                                        </div>
                                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#263466] transition-colors">
                                            <div className="w-2 h-2 rounded-full bg-[#2EF2FF]"></div>
                                            <p className="text-[#EAEDFF]">Technical consultations</p>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex gap-3">
                                        <Button className="bg-gradient-to-r from-[#3C52D9] to-[#1959AD] hover:from-[#2EF2FF] hover:to-[#3C52D9] transition-all duration-300">
                                            Hire for a Project
                                        </Button>
                                        <div className="flex gap-2">
                                            <a
                                                href="https://github.com/mudasarmajeed5"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 rounded-full bg-[#263466] text-[#2EF2FF] hover:bg-[#334679] transition-colors"
                                            >
                                                <FaGithub className="h-5 w-5" />
                                            </a>
                                            <a
                                                href="https://linkedin.com/mudasarmajeed5"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 rounded-full bg-[#263466] text-[#2EF2FF] hover:bg-[#334679] transition-colors"
                                            >
                                                <FaLinkedinIn className="h-5 w-5" />
                                            </a>
                                            <a
                                                href="https://twitter.com/mudasarmajeed55"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 rounded-full bg-[#263466] text-[#2EF2FF] hover:bg-[#334679] transition-colors"
                                            >
                                                <FaTwitter className="h-5 w-5" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-[#3C52D9]">
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#3C52D9] to-[#1959AD] opacity-70"></div>
                                        <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-medium">
                                            Developer Profile
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Office Hours */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        <Card className="shadow-xl border-0" style={{ backgroundColor: "#0C1838", borderColor: "#263466" }}>
                            <div className="h-2 bg-[#2EF2FF]"></div>
                            <CardHeader>
                                <CardTitle className="text-xl text-[#EAEDFF]">Office Hours</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-[#C4CBF5]">
                                    Monday - Friday
                                    <br />
                                    9:00 AM - 5:00 PM (EST)
                                </p>
                                <p className="mt-2 text-sm text-[#C4CBF5]/70">
                                    We strive to respond to all inquiries within 24 hours during business days.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="shadow-xl border-0" style={{ backgroundColor: "#0C1838", borderColor: "#263466" }}>
                            <div className="h-2 bg-[#3C52D9]"></div>
                            <CardHeader>
                                <CardTitle className="text-xl text-[#EAEDFF]">Support Response Time</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-[#C4CBF5]">
                                    General Inquiries: 24 hours
                                    <br />
                                    Technical Support: 48 hours
                                    <br />
                                    Emergency Issues: 4-6 hours
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="shadow-xl border-0" style={{ backgroundColor: "#0C1838", borderColor: "#263466" }}>
                            <div className="h-2 bg-[#C8EA80]"></div>
                            <CardHeader>
                                <CardTitle className="text-xl text-[#EAEDFF]">Follow Us</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex gap-4">
                                    <a
                                        href="#"
                                        className="p-2 rounded-full bg-[#263466] text-[#2EF2FF] hover:bg-[#334679] transition-colors"
                                    >
                                        <FaTwitter className="h-5 w-5" />
                                    </a>
                                    <a
                                        href="#"
                                        className="p-2 rounded-full bg-[#263466] text-[#2EF2FF] hover:bg-[#334679] transition-colors"
                                    >
                                        <FaGithub className="h-5 w-5" />
                                    </a>
                                    <a
                                        href="#"
                                        className="p-2 rounded-full bg-[#263466] text-[#2EF2FF] hover:bg-[#334679] transition-colors"
                                    >
                                        <FaLinkedinIn className="h-5 w-5" />
                                    </a>
                                </div>
                                <p className="mt-3 text-sm text-[#C4CBF5]/70">
                                    Stay updated with our latest features and announcements.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    )
}

