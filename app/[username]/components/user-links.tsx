"use client"
import { cn } from "@/lib/utils"
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

  return (
    <div className="space-y-6">
      {/* Social Links - Horizontal Layout */}
      {socialLinks.length > 0 && (
        <div className={cn(
          socialContainerClass,
        )}>
          {socialLinks.map((link, index) => (
            <SocialLink
              key={link._id?.$oid || `${link.label}-${index}`}
              link={link}
              isPremium={isPremium}
              socialIconClass={cn(
                socialIconClass,
                isPremium && ``,
                "hover:-translate-y-1 transition-transform duration-200"
              )
              }

            />
          ))}
        </div>
      )}

      {customLinks.length > 0 && (
        <div className={cn(
          linkContainerClass,
          isPremium && "slide-up-staggered"
        )}>
          {customLinks.map((link, index) => (
            <CustomLink
              key={link._id?.$oid || `${link.label}-${index}`}
              link={link}
              cardClass={cn(
                cardClass,
                isPremium && `slide-up-staggered stagger-${(index % 6) + 1}`
              )}
              primaryTextClass={primaryTextClass}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Helper component for social links
const SocialLink = ({
  link,
  isPremium,
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
      className={cn(
        socialIconClass,
        "transition-all duration-300 hover:scale-110",
        isPremium && "hover:shadow-[0_0_15px_rgba(255,215,0,0.5)]"
      )}

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
      "transition-all duration-300 hover:scale-[1.02]",
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

// Helper function to extract platform from link
function extractPlatform(link: UserLink): SocialPlatform | null {
  if (!link.icon) return null

  const iconLower = link.icon.toLowerCase()
  const urlLower = link.link.toLowerCase()

  // Check for platform in URL first
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