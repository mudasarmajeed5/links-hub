"use client"
import { useMemo } from 'react'

export const PremiumParticles = ({ count = 0 }: { count?: number }) => {
    const particles = useMemo(() =>
        Array.from({ length: count }).map((_, i) => {
            const size = Math.random() * 8 + 4
            const duration = Math.random() * 10 + 10
            const delay = Math.random() * 5
            const left = Math.random() * 100
            const useGlow = Math.random() > 0.6
            const animationBase = Math.random() > 0.5 ? 'particle-float' : 'particle-drift'
            const animationClasses = `${animationBase} ${useGlow ? 'particle-glow' : ''}`
            const blur = Math.random() > 0.7 ? 'blur-sm' : ''
            const glow = Math.random() > 0.6 ? 'shadow-[0_0_10px_rgba(253,224,71,0.6)]' : ''

            return (
                <div
                    key={i}
                    className={`particle ${animationClasses} absolute rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 opacity-80 ${blur} ${glow}`}
                    style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        left: `${left}%`,
                        top: '-20px',
                        animationDuration: `${duration}s`,
                        animationDelay: `${delay}s`,
                    }}
                />
            )
        }), [count]
    )

    return <>{particles}</>
}
