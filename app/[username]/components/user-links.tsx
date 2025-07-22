"use client"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import { UserLink } from "@/types/user-account"
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaSnapchat,
  FaPinterest,
  FaYoutube,
  FaMedium,
  FaDiscord,
  FaTiktok,
  FaStackOverflow,
  FaLink
} from "react-icons/fa"

const socialPlatforms = [
  'instagram',
  'facebook',
  'twitter',
  'github',
  'linkedin',
  'snapchat',
  'pinterest',
  'youtube',
  'medium',
  'discord',
  'tiktok',
  'stackoverflow'
] as const

type SocialPlatform = typeof socialPlatforms[number]

interface UserLinksProps {
  userLinks?: UserLink[]
  isPremium?: boolean
  cardClass?: string
  primaryTextClass?: string
  socialIconClass?: string,
  socialContainerClass?: string,
  linkContainerClass?: string,
}

const UserLinks = ({
  userLinks = [],
  isPremium = false,
  cardClass = '',
  primaryTextClass = '',
  socialIconClass = '',
  linkContainerClass = '',
  socialContainerClass = ''
}: UserLinksProps) => {
  if (!userLinks.length) return null
  
  const { socialLinks, customLinks } = userLinks.reduce((acc, link) => {
    const platform = extractPlatform(link)
    if (platform) {
      acc.socialLinks.push({ ...link, platform })
    } else {
      acc.customLinks.push(link)
    }
    return acc
  }, { socialLinks: [] as Array<UserLink & { platform: SocialPlatform }>, customLinks: [] as UserLink[] })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const socialItemVariants = {
    hidden: { 
      opacity: 0,   
      scale: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 24
      }
    }
  }

  const linkItemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 260,
        damping: 20
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Social Links - Horizontal Layout with Stagger Animation */}
      {socialLinks.length > 0 && (
        <motion.div
          className={cn(socialContainerClass)}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {socialLinks.map((link, index) => (
            <motion.div
              key={link._id?.$oid || `${link.label}-${index}`}
              variants={socialItemVariants}
              whileHover={{ 
                scale: 1.25, 
                transition: { type: "spring", stiffness: 300, damping: 17 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <SocialLink
                link={link}
                isPremium={isPremium}
                socialIconClass={socialIconClass}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Custom Links with Stagger Animation */}
      {customLinks.length > 0 && (
        <motion.div
          className={cn(linkContainerClass, "space-y-3")}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {customLinks.map((link, index) => (
            <motion.div
              key={link._id?.$oid || `${link.label}-${index}`}
              variants={linkItemVariants}
              whileHover={{ 
                scale: 1.02, 
                y: -2,
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <CustomLink
                link={link}
                cardClass={cn(
                  cardClass,
                  "rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                )}
                primaryTextClass={primaryTextClass}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

// Helper component for social links
const SocialLink = ({
  link,
  socialIconClass
}: {
  link: UserLink & { platform: SocialPlatform },
  isPremium: boolean,
  socialIconClass: string,
}) => {
  const iconMap = {
    instagram: <FaInstagram className="w-5 h-5" />,
    facebook: <FaFacebook className="w-5 h-5" />,
    twitter: <FaTwitter className="w-5 h-5" />,
    github: <FaGithub className="w-5 h-5" />,
    linkedin: <FaLinkedin className="w-5 h-5" />,
    snapchat: <FaSnapchat className="w-5 h-5" />,
    pinterest: <FaPinterest className="w-5 h-5" />,
    youtube: <FaYoutube className="w-5 h-5" />,
    medium: <FaMedium className="w-5 h-5" />,
    discord: <FaDiscord className="w-5 h-5" />,
    tiktok: <FaTiktok className="w-5 h-5" />,
    stackoverflow: <FaStackOverflow className="w-5 h-5" />
  }

  return (
    <a
      href={link.link}
      target="_blank"
      rel="noopener noreferrer"
      className={socialIconClass}
      aria-label={link.label}
      title={link.label}
    >
      {iconMap[link.platform] || <FaLink className="w-5 h-5" />}
    </a>
  )
}

// Helper component for custom links
const CustomLink = ({
  link,
  cardClass,
  primaryTextClass
}: {
  link: UserLink,
  cardClass: string,
  primaryTextClass: string
}) => (
  <a
    href={link.link}
    target="_blank"
    rel="noopener noreferrer"
    className={cn(
      "block text-center p-4",
      cardClass,
      primaryTextClass,
    )}
  >
    <div className="flex items-center justify-between px-5 flex-row-reverse gap-2">
      <FaLink className="w-4 h-4 opacity-70" />
      {link.label}
    </div>
  </a>
)

function extractPlatform(link: UserLink): SocialPlatform | null {
  if (!link.icon) return null

  const iconLower = link.icon.toLowerCase()
  const urlLower = link.link.toLowerCase()

  for (const platform of socialPlatforms) {
    if (urlLower.includes(platform)) {
      return platform
    }
  }

  // Then check icon name
  for (const platform of socialPlatforms) {
    if (iconLower.includes(platform)) {
      return platform
    }
  }

  return null
}

export default UserLinks