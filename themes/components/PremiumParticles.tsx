export const PremiumParticles = ({ count = 2 }: { count?: number }) => {
    const particles = Array.from({ length: count }).map((_, i) => {
        const size = Math.random() * 8 + 4
        const duration = Math.random() * 10 + 10
        const delay = Math.random() * 5
        const left = Math.random() * 100
        const animationType = Math.random() > 0.5 ? 'particle-float' : 'particle-drift'

        return (
            <div
                key={i}
                className={`particle ${animationType} absolute rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 opacity-80`}
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
    })

    return <>{particles}</>
}
