import { Rss } from "lucide-react";
import { FaInstagram, FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import Link from "next/link";
const date = new Date();
const year = date.getFullYear();
export const Footer = () => {
    return (
        <footer className="bg-gray-900 pt-8 text-white">
            <div className="flex justify-between px-5">
                <div className="logo flex flex-col space-y-2 text-xl">
                    <span className="flex gap-2"><Rss /> Followtree</span>
                    <Link target="_blank" href={"https://github.com/mudasarmajeed5/links-hub"} className="text-gray-400 text-sm">Source Code</Link>

                </div>
                <div className="flex flex-col text-gray-400 text-sm flex-wrap space-y-2">
                    <Link href={"/contact"}>
                        Contact
                    </Link>
                    <Link href={"/terms"}>
                        Terms and Conditions
                    </Link>
                    <Link href={"/about"}>
                        About
                    </Link>
                </div>
                <div className="flex flex-col socials space-y-2">
                    <div>Follow</div>
                    <div className="flex gap-2">
                        <a href="https://instagram.com/mudasarmajeed5" target="_blank"><FaInstagram className="text-xl" /></a>
                        <a href="https://x.com/mudasarmajeed55" target="_blank"><FaTwitter className="text-xl" /></a>
                    </div>
                    <div className="flex gap-2">
                        <a href="https://github.com/mudasarmajeed5" target="_blank"><FaGithub className="text-xl" /></a>
                        <a href="https://linkedin.com/in/mudasarmajeed5" target="_blank"><FaLinkedin className="text-xl" /></a>
                    </div>
                </div>
            </div>
            <div className="text-xs mt-5 text-center bg-gray-800 py-2 px-2 rounded-md text-gray-500">&copy; {year} <Link target="_blank" href={"https://instagram.com/mudasarmajeed5"} className="text-muted-foreground">@mudasarmajeed5</Link> All rights reserved</div>
        </footer>

    )
}