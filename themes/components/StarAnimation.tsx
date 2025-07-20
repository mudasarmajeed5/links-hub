"use client"
import { Star } from "lucide-react"
import { JSX, useMemo } from "react"

const StarsBackground = ({ 
  count = 30, 
  isPremium = false, 
  theme = "light" 
}: {
  count?: number
  isPremium?: boolean
  theme?: "light" | "dark"
}) => {
  const stars = useMemo(() => {
    if (!isPremium) return []
    
    return Array.from({ length: count }).map((_, i) => {
      const size = Math.random() > 0.7 ? 'w-5 h-5' : 'w-3 h-3'
      const animationDelay = `${Math.random() * 5}s`
      const left = `${Math.random() * 100}%`
      const top = `${Math.random() * 100}%`
      const isGold = Math.random() > 0.7
      const isLarge = Math.random() > 0.5

      // Theme-aware colors
      const fillColor = theme === "dark"
        ? (isGold ? 'fill-yellow-300/30' : 'fill-white/10')
        : (isGold ? 'fill-yellow-500/60' : 'fill-purple-400/50')

      return (
        <div
          key={i}
          className={`star ${isLarge ? 'star-lg' : ''} ${isGold ? 'star-gold' : ''} ${size}`}
          style={{
            left,
            top,
            animationDelay,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
        >
          <Star className={`w-full h-full ${fillColor}`} />
        </div>
      )
    })
  }, [count, isPremium, theme])

  return <>{stars}</>
}

export default StarsBackground