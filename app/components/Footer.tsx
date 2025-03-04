import { FaInstagram, FaTwitter, FaFacebook, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MdArrowForward } from "react-icons/md";
export const Footer = () => {
    return (
        <footer
                className="py-8 px-4 md:px-6 lg:px-8"
                style={{ backgroundColor: "#0C1838", borderTop: "1px solid #263466" }}
            >
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="font-bold text-lg text-white mb-4">Links Hub</h3>
                            <p className="text-sm text-[#C4CBF5]">
                                The ultimate platform for creating your personalized link page. Connect all your online profiles in one
                                place.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-white mb-4">Quick Links</h3>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link href="/" className="text-[#C4CBF5] hover:text-[#2EF2FF] transition-colors">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/features" className="text-[#C4CBF5] hover:text-[#2EF2FF] transition-colors">
                                        Features
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/pricing" className="text-[#C4CBF5] hover:text-[#2EF2FF] transition-colors">
                                        Pricing
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="text-[#C4CBF5] hover:text-[#2EF2FF] transition-colors">
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-white mb-4">Legal</h3>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link href="/terms" className="text-[#C4CBF5] hover:text-[#2EF2FF] transition-colors">
                                        Terms of Service
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about" className="text-[#C4CBF5] hover:text-[#2EF2FF] transition-colors">
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/cookies" className="text-[#C4CBF5] hover:text-[#2EF2FF] transition-colors">
                                        Cookie Policy
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-white mb-4">Newsletter</h3>
                            <p className="text-sm text-[#C4CBF5] mb-2">Subscribe to get updates on new features and announcements.</p>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Your email"
                                    className="bg-[#263466] border-0 text-white placeholder:text-[#C4CBF5]/50"
                                />
                                <Button className="bg-[#3C52D9] hover:bg-[#1959AD]">
                                    <MdArrowForward className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-[#263466] mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-[#C4CBF5]">© {new Date().getFullYear()} Links Hub. All rights reserved.</p>
                        <div className="flex gap-4 mt-4 md:mt-0">
                            <a href="#" className="text-[#C4CBF5] hover:text-[#2EF2FF] transition-colors">
                                <FaFacebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-[#C4CBF5] hover:text-[#2EF2FF] transition-colors">
                                <FaTwitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-[#C4CBF5] hover:text-[#2EF2FF] transition-colors">
                                <FaInstagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-[#C4CBF5] hover:text-[#2EF2FF] transition-colors">
                                <FaLinkedinIn className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>

    )
}