import type { StyleConfig } from "./themeTypes/themeConfig"

const themes: StyleConfig[] = [
  {
    userTheme: 1,
    styles: {
      background: {
        light: "bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100",
        dark: "bg-gradient-to-br from-purple-900 via-indigo-900 to-black",
      },
      cards: {
        light: "bg-white/80 backdrop-blur-sm border border-purple-200/50 shadow-lg",
        dark: "bg-purple-800/80 backdrop-blur-sm border border-purple-500/30 shadow-xl shadow hover:shadow-2xl", 
      },
      text: {
        primary: {
          light: "text-gray-900",
          dark: "text-white",
        },
        secondary: {
          light: "text-purple-600",
          dark: "text-purple-300",
        },
      },
    },
    animations: {
      profileEntrance: "profile-entrance",
      slideUp: [
        "slide-up",
        "slide-up-staggered stagger-1",
        "slide-up-staggered stagger-2",
        "slide-up-staggered stagger-3",
      ],
      socialHover: "social-hover",
      cardHover: "card-hover",
      buttonHover: "button-hover",
      glowEffect: "glow-effect",
    },
    components: {
      avatar: {
        size: "w-32 h-32 rounded-full object-cover",
        border: "border-4 border-purple-300",
        shadow: "shadow-2xl shadow-purple-500/20",
        hover: "hover:shadow-3xl hover:shadow-purple-500/30 transition-all duration-300",
      },
      socialIcons: {
        container: "flex gap-2 justify-center items-center", // social icons container
        icon: "w-8 h-8 text-white hover:text-white/60 cursor-pointer border social-hover flex justify-center items-center rounded-full", // social icons individual 
      },
      links: {
        container: "space-y-4",
        card: "card-hover rounded-2xl p-6 cursor-pointer transform transition-all duration-300",
      },
      newsletter: {
        container: "card-hover rounded-2xl p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white",
        input:
          "w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/70 text-white focus:ring-2 focus:ring-white/50",
        button: "button-hover px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold shadow-lg",
      },
      whatsapp: {
        button:
          "button-hover fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl z-50 floating",
      },
      themeToggle: {
        button:
          "button-hover p-3 rounded-full bg-purple-100 text-purple-600 shadow-lg",
      },
      spotify: {
        container: "card-hover rounded-2xl p-6 bg-gradient-to-r from-green-500 to-green-600 text-white",
        icon: "w-6 h-6 bounce",
      },
      premium: {
        badge:
          "glow-effect bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg",
        crown: "text-yellow-400 bounce",
        banner:
          "bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white p-4 rounded-xl shadow-xl",
      },
    },
    star: {
      enabled: true,
      count: 100,
      animations: ["particle-float", "particle-drift", "particle-glow"],
    },
    particles: {
      enabled: true,
      count: 70,
      animations: ["particle-zoom", "particle-float-soft", "blue-glow"],
    },
  },
  {
    userTheme: 2,
    styles: {
      background: {
        light: "bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-100",
        dark: "bg-gradient-to-br from-gray-900 via-blue-900 to-black",
      },
      cards: {
        light: "bg-white/30 backdrop-blur-md border border-blue-200/60 shadow-md hover:shadow-xl",
        dark: "bg-blue-800/80 backdrop-blur-md border border-blue-400/30 shadow-lg hover:shadow-2xl",
      },
      text: {
        primary: {
          light: "text-slate-900",
          dark: "text-gray-100",
        },
        secondary: {
          light: "text-blue-600",
          dark: "text-cyan-300",
        },
      },
    },
    animations: {
      profileEntrance: "fade-in-up",
      slideUp: [
        "fade-up",
        "fade-up-staggered stagger-1",
        "fade-up-staggered stagger-2",
        "fade-up-staggered stagger-3",
      ],
      socialHover: "pulse-on-hover",
      cardHover: "scale-bounce",
      buttonHover: "hover-flicker",
      glowEffect: "glow-effect",
    },
    components: {
      avatar: {
        size: "w-32 h-32 rounded-full object-cover",
        border: "border-4 border-blue-300",
        shadow: "shadow-xl shadow-blue-400/30",
        hover: "hover:shadow-3xl hover:shadow-blue-500/40 transition-all duration-300",
      },
      socialIcons: {
        container: "flex gap-2 justify-center items-center",
        icon: "w-8 h-8 text-cyan-600 hover:text-cyan-700 cursor-pointer border pulse-on-hover flex justify-center items-center rounded-full",
      },
      links: {
        container: "space-y-4",
        card: "scale-bounce rounded-xl p-6 cursor-pointer transform transition-all duration-300",
      },
      newsletter: {
        container: "scale-bounce rounded-2xl p-6 bg-gradient-to-r from-cyan-600 to-blue-600 text-white",
        input: "w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder-white/70 text-white focus:ring-2 focus:ring-white/40",
        button: "hover-flicker px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold shadow-md",
      },
      whatsapp: {
        button: "hover-flicker fixed bottom-6 right-6 bg-emerald-500 text-white p-4 rounded-full shadow-2xl z-50 floating",
      },
      themeToggle: {
        button: "hover-flicker p-3 rounded-full bg-blue-100 text-blue-600 shadow-md",
      },
      spotify: {
        container: "scale-bounce rounded-2xl p-6 bg-gradient-to-r from-green-700 to-lime-600 text-white",
        icon: "w-6 h-6 pulse",
      },
      premium: {
        badge: "blue-glow bg-gradient-to-r from-blue-400 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md",
        crown: "text-cyan-300 pulse",
        banner: "bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-600 text-white p-4 rounded-xl shadow-xl",
      },
    },
    star: {
      enabled: true,
      count: 20,
      animations: ["particle-zoom", "particle-float-soft", "blue-glow"],
    },
    particles: {
      enabled: true,
      count: 20,
      animations: ["particle-zoom", "particle-float-soft", "blue-glow"],
    },
  },
  {
    userTheme: 3,
    styles: {
      background: {
        light: "bg-gradient-to-br from-rose-50 via-pink-50 to-orange-100",
        dark: "bg-gradient-to-br from-gray-900 via-rose-900 to-black",
      },
      cards: {
        light: "bg-white/30 backdrop-blur-md border border-rose-200/60 shadow-md hover:shadow-xl",
        dark: "bg-rose-800/80 backdrop-blur-md border border-rose-400/30 shadow-lg hover:shadow-2xl",
      },
      text: {
        primary: {
          light: "text-zinc-900",
          dark: "text-gray-100",
        },
        secondary: {
          light: "text-rose-600",
          dark: "text-pink-300",
        },
      },
    },
    animations: {
      profileEntrance: "fade-in-up",
      slideUp: [
        "fade-up",
        "fade-up-staggered stagger-1",
        "fade-up-staggered stagger-2",
        "fade-up-staggered stagger-3",
      ],
      socialHover: "pulse-on-hover",
      cardHover: "scale-bounce",
      buttonHover: "hover-flicker",
      glowEffect: "glow-effect",
    },
    components: {
      avatar: {
        size: "w-32 h-32 rounded-full object-cover",
        border: "border-4 border-rose-300",
        shadow: "shadow-xl shadow-rose-400/30",
        hover: "hover:shadow-3xl hover:shadow-rose-500/40 transition-all duration-300",
      },
      socialIcons: {
        container: "flex gap-2 justify-center items-center",
        icon: "w-8 h-8 text-rose-600 hover:text-rose-700 cursor-pointer border pulse-on-hover flex justify-center items-center rounded-full",
      },
      links: {
        container: "space-y-4",
        card: "scale-bounce rounded-xl p-6 cursor-pointer transform transition-all duration-300",
      },
      newsletter: {
        container: "scale-bounce rounded-2xl p-6 bg-gradient-to-r from-pink-600 to-rose-600 text-white",
        input: "w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder-white/70 text-white focus:ring-2 focus:ring-white/40",
        button: "hover-flicker px-6 py-3 bg-white text-rose-600 rounded-xl font-semibold shadow-md",
      },
      whatsapp: {
        button: "hover-flicker fixed bottom-6 right-6 bg-rose-500 text-white p-4 rounded-full shadow-2xl z-50 floating",
      },
      themeToggle: {
        button: "hover-flicker p-3 rounded-full bg-rose-100 text-rose-600 shadow-md",
      },
      spotify: {
        container: "scale-bounce rounded-2xl p-6 bg-gradient-to-r from-rose-700 to-pink-600 text-white",
        icon: "w-6 h-6 pulse",
      },
      premium: {
        badge: "rose-glow bg-gradient-to-r from-rose-400 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md",
        crown: "text-pink-300 pulse",
        banner: "bg-gradient-to-r from-rose-600 via-pink-600 to-red-600 text-white p-4 rounded-xl shadow-xl",
      },
    },
    star: {
      enabled: true,
      count: 20,
      animations: ["particle-zoom", "particle-float-soft", "rose-glow"],
    },
    particles: {
      enabled: true,
      count: 20,
      animations: ["particle-zoom", "particle-float-soft", "blue-glow"],
    },
  }

]

export const getUserThemeConfig = (userTheme: number): StyleConfig => {
  const config = themes.find((item) => item.userTheme === userTheme)
  return config ?? themes[0]
}
