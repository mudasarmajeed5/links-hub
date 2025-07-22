# Contributing to Links Hub
### The Project really requires Contributions! I would appreciate if you contribute.
### Well apparently [this guy](https://github.com/haseebabid72) swore to contribute, and I'm still waiting for that day.
We love your input! We want to make contributing to Links Hub as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Creating new themes

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally
   ```bash
   git clone https://github.com/mudasarmajeed5/links-hub.git
   ```
3. Create a new branch for your feature
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Adding a New Theme

Themes in Links Hub are TypeScript objects that conform to the `StyleConfig` interface. To add a new theme:

1. Navigate to `themes/themes.ts`
2. Add your theme object to the `themes` array
3. Ensure your theme implements all required properties from the `StyleConfig` interface:

```typescript
interface StyleConfig {
    userTheme: number;  // Unique theme identifier
    styles: {
        background: {
            light: string;  // Tailwind classes for light mode
            dark: string;   // Tailwind classes for dark mode
        };
        cards: {
            light: string;
            dark: string;
        };
        text: {
            primary: {
                light: string;
                dark: string;
            };
            secondary: {
                light: string;
                dark: string;
            };
        };
    };
    animations: {
        profileEntrance: string;
        slideUp: string[];
    };
    components: {
        // Component-specific styling
        avatar: {
            size: string;
            border: string;
            shadow: string;
            hover: string;
        };
        // ... other component styles
    };
    star: {
        enabled: boolean;
        count: number;
        animations: string[];
    };
    particles: {
        enabled: boolean;
        count: number;
        animations: string[];
    };
}
```

### Theme Guidelines

1. Use Tailwind CSS classes for styling
2. Ensure both light and dark mode variants are provided
3. Test your theme in both modes before submitting
4. Keep performance in mind when adding animations
5. Follow the existing theme structure for consistency

## Development Process

1. Install dependencies
   ```bash
   npm install
   ```

2. Start the development server
   ```bash
   npm run dev
   ```

3. Make your changes
4. Test your changes thoroughly
5. Commit your changes with a descriptive message
   ```bash
   git commit -m "Add feature: description of changes"
   ```

## Submitting Changes

1. Push to your fork
   ```bash
   git push origin feature/your-feature-name
   ```

2. Submit a Pull Request (PR)
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Select your feature branch
   - Fill out the PR template with:
     - Description of changes
     - Screenshots (if UI changes)
     - Related issue numbers

## Code Style

- Follow the existing code style
- Use TypeScript for type safety
- Write meaningful commit messages
- Add comments for complex logic
- Use meaningful variable and function names

## Reporting Bugs

We use GitHub issues to track bugs. Report a bug by opening a new issue:

- Use a clear and descriptive title
- Describe the exact steps to reproduce the problem
- Provide specific examples if possible
- Describe the behavior you observed and what behavior you expected to see
- Include screenshots if possible

## License

By contributing, you agree that your contributions will be licensed under the project's license.

## Questions?

Feel free to open an issue for any questions about contributing!
