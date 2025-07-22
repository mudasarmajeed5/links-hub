"use client"
import { useEffect, useState, useRef } from "react"
import { Crown } from "lucide-react"
import { getUserThemeConfig } from "@/themes/themes"
import { cn } from "@/lib/utils"
import "@/themes/styles.css"
import { motion } from "motion/react";
import StarsBackground from "../../../themes/components/StarAnimation"
import SpotifyPlayer from "@/app/[username]/components/SpotifyPlayer"
import type { User } from "@/types/user-account";
import ThemeToggleButton from "@/themes/components/ThemeToggle"
import { PremiumParticles } from "@/themes/components/PremiumParticles"
import UserLinks from "./user-links"
import PushEmail from "./PushEmail"
import { SelectedIcon } from "./SelectedIcon"
interface ExtendedUser extends User {
    isPremiumUser: boolean,
}
const PlayGround = ({ user }: { user: ExtendedUser | null }) => {
    const [mounted, setMounted] = useState(false)
    const [theme, setTheme] = useState<"light" | "dark">("dark")
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted || !user) return null

    const toggleTheme = () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"))
    }

    const userTheme = getUserThemeConfig(user.userTheme)
    const backgroundClass = userTheme.styles.background[theme]
    const primaryTextClass = userTheme.styles.text.primary[theme]
    const secondaryTextClass = userTheme.styles.text.secondary[theme]
    const cardClass = userTheme.styles.cards[theme]
    const isPremium = user.isPremiumUser

    return (
        <div
            className={cn("min-h-screen p-8 w-full mx-auto relative overflow-hidden", backgroundClass)}
            ref={containerRef}
        >
            {isPremium && <StarsBackground count={userTheme.star.count} isPremium={isPremium} theme={theme} />}
            {/* Premium Particles Background */}
            {isPremium && <PremiumParticles count={userTheme.particles.count} />}

            <div className="sm:w-full md:w-4/5 xl:w-3/5 2xl:w-2/5 mx-auto space-y-8 relative z-10">
                <ThemeToggleButton themeToggleStyles={userTheme.components.themeToggle.button} theme={theme} toggleTheme={toggleTheme} />

                {/* Avatar with Premium Crown */}
                <div className={cn("flex justify-center relative", isPremium && userTheme.animations.profileEntrance)}>
                    <div className="flex flex-col gap-2">
                        <img
                            src={user.profilePic ?? "/default-profile.png"}
                            alt={`${user.name}'s profile picture`}
                            className={cn(
                                userTheme.components.avatar.size,
                                userTheme.components.avatar.border,
                                userTheme.components.avatar.shadow,
                                userTheme.components.avatar.hover,
                                "relative z-10"
                            )}
                        />
                        <p className={cn(userTheme.components.premium.badge)}>
                            Premium User
                        </p>
                    </div>
                    {isPremium && (
                        <>
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20">
                                <Crown
                                    className={cn(
                                        "w-10 h-10 text-yellow-400 fill-yellow-400/20",
                                        "drop-shadow-[0_2px_4px_rgba(255,215,0,0.5)]",
                                        "animate-[float_4s_ease-in-out_infinite]"
                                    )}
                                />
                            </div>
                        </>
                    )}
                </div>

                {/* Rest of your existing components... */}
                <div className="text-center space-y-2">
                    <h2 className={cn("text-3xl font-bold", primaryTextClass)}>
                        {user.name}
                    </h2>
                    <p className={cn("text-lg", secondaryTextClass)}>
                        @{user.username}
                    </p>
                    {user.bio && (
                        <p className={cn(primaryTextClass, "opacity-80")}>
                            {user.bio}
                        </p>
                    )}
                </div>
                {
                    user.userLinks && (
                        <UserLinks
                            userLinks={user.userLinks}
                            isPremium={user.isPremiumUser}
                            cardClass={cardClass}
                            primaryTextClass={primaryTextClass}
                            socialIconClass={userTheme.components.socialIcons.icon}
                            socialContainerClass={userTheme.components.socialIcons.container}
                            linkContainerClass={userTheme.components.links.container}
                        />
                    )
                }
                {isPremium && (
                    <>
                        {user.emailMarketing?.enableSignupForm && (
                            <motion.div
                                className={cn(
                                    userTheme.components.newsletter.container,
                                    "relative overflow-hidden"
                                )}
                                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{
                                    duration: 0.6,
                                    ease: "easeOut",
                                    delay: 0.4 // After links finish
                                }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <PushEmail isPremiumUser={true} userTheme={userTheme} />
                            </motion.div>
                        )}

                        {user.spotifyUrl && (
                            <SpotifyPlayer spotifyUrl={user.spotifyUrl} />  
                        )}

                        {user.cta && (
                            <motion.a
                                href={user.cta.url}
                                target="_blank"
                                className={cn(
                                    "flex items-center gap-2",
                                    userTheme.components.whatsapp.button,
                                )}
                                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 20,
                                    delay: 0.8
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {user.cta.text}
                                <SelectedIcon iconName={user.cta.icon} />
                            </motion.a>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default PlayGround