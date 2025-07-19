import { StyleConfig } from "@/themes/themeTypes/themeConfig"
import { FaFacebook, FaInstagram, FaLinkedin, FaMoon, FaWhatsapp } from "react-icons/fa"

// components/ThemeThumbnail.tsx
const ThemeThumbnail = ({ theme, mini = false }: { theme: StyleConfig, mini?: boolean }) => {

  const bg = theme.styles?.background?.dark || "bg-gradient-to-br from-pink-50 via-rose-100 to-orange-100"
  const card = theme.styles?.cards?.dark || "bg-white/30 border border-rose-200/60"
  const primary = theme.styles?.text?.primary?.dark || "text-gray-900"
  const secondary = theme.styles?.text?.secondary?.dark || "text-rose-600"
  const socialIcons = theme.components.socialIcons.icon;
  const { button, container, input } = theme.components.newsletter;
  return (
    <div className={`${mini ? "min-h-0 p-2 w-full h-[370px]" : "min-h-screen p-8 w-full"} mx-auto ${bg} relative overflow-hidden`}>

      <div className={`${mini ? "w-full space-y-0.5" : "sm:w-full md:w-4/5 xl:w-3/5 2xl:w-2/5 space-y-8"} mx-auto relative z-10`}>

        <div className="flex justify-start">
          <button className={`${mini ? "hidden" : ""} p-3 rounded-full bg-rose-100 text-rose-600 shadow-md`}>
            <FaMoon />
          </button>
        </div>

        <div className="flex justify-center relative">
          <img
            src="https://avatars.githubusercontent.com/u/38426912?s=200&v=4"
            alt="Profile"
            className={`${mini ? "w-16 h-16" : "w-32 h-32"} rounded-full object-cover border-4 border-rose-300 shadow-xl`}
          />

        </div>

        <div className="text-center space-y-2">
          <h2 className={`${mini ? "text-lg font-semibold" : "text-3xl font-bold"} ${primary}`}>John Doe</h2>
          <p className={`${mini ? "text-xs" : "text-lg"} ${secondary}`}>@slothcoder</p>
          <p className={`${mini ? "text-xs mb-2" : ""} ${primary} opacity-80`}>Bio appears here! 🦥</p>
        </div>

        <div className="flex gap-3 justify-center">
          <div className={socialIcons}>
            <FaInstagram />
          </div>
          <div className={socialIcons}>
            <FaFacebook />
          </div>
          <div className={socialIcons}>
            <FaLinkedin />
          </div>
        </div>
        {mini && <div className="text-xs text-transparent">Mini is true</div>}
        <div className={`${mini ? "mt-3" : ""} space-y-3`}>
          {[
            { label: "My Portfolio", icon: "🌐" },
            { label: "Resume", icon: "📄" },
            { label: "Instagram Projects", icon: "📷" },
          ].map(({ label, icon }, i) => (
            <div
              key={i}
              className={`flex items-center justify-between rounded-xl ${mini ? "p-2 text-xs" : "p-6 text-base"
                } ${card} shadow-md hover:shadow-xl cursor-pointer`}
            >
              <span className={`text-right font-medium ${mini ? "text-xs" : ""}`}>
                {label}
              </span>
              <span className={mini ? "text-sm" : "text-xl"}>{icon}</span>
            </div>
          ))}
        </div>

        {!mini && (
          <div className={`${container} text-xl space-y-4 relative z-10`}>
            <p className="text-xl font-semibold text-center">Join my newsletter</p>
            <input
              type="email"
              placeholder="Your email"
              className={input}
            />
            <button className={button}>Subscribe</button>
          </div>

        )}
        {!mini && (
          <>
            <a
              href="#"
              className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:animate-pulse"
            >
              <FaWhatsapp />
            </a>
          </>
        )}
      </div>
    </div>
  )
}

export default ThemeThumbnail
