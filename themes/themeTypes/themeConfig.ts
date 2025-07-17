export interface StyleConfig {
    userTheme: number,
    styles: {
        background: {
            light: string,
            dark: string,
        }
        cards: {
            light: string,
            dark: string,
        },
        text: {
            primary: {
                light: string,
                dark: string,
            }
            secondary: {
                light: string,
                dark: string,
            }
        }
    }
    animations: {
        profileEntrance: string,
        slideUp: string[],
        socialHover: string,
        cardHover: string,
        buttonHover: string,
        glowEffect: string,
    }
    components: {
        avatar: {
            size: string
            border: string
            shadow: string
            hover: string
        }
        socialIcons: {
            container: string
            icon: string
        }
        links: {
            container: string
            card: string
        }
        newsletter: {
            container: string
            input: string
            button: string
        }
        whatsapp: {
            button: string
        }
        themeToggle: {
            button: string
        }
        spotify: {
            container: string
            icon: string
        }
        premium: {
            badge: string
            crown: string
            banner: string
        }
    }
    star: {
        enabled: boolean
        count: number
        animations: string[]
    },
    particles: {
        enabled: boolean,
        count: number,
        animations: string[]
    }
}
