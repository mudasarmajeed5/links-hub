# Links Hub

A **Next.js** application for managing and sharing links. This project uses **MongoDB**, **NextAuth**, and **Cloudinary** for authentication, database, and media storage.

## 🚀 Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/mudasarmajeed5/links-hub.git
cd links-hub
```

### 2. Install Dependencies

If you haven't installed dependencies, run:

```sh
npm install
```

### 3. Create the `.env.local` File

In your project's root directory (where `package.json` is located), create a new file named **.env.local** and add the following content:

```ini
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
NEXTAUTH_SECRET=your_random_secret
MONGODB_URI=your_mongodb_atlas_connection_uri
NEXTAUTH_URL=http://localhost:3000
GITHUB_SECRET=your_github_client_secret
GITHUB_ID=your_github_client_id
```

#### How to Get These Keys:

- **Cloudinary:**
  - Sign up at [Cloudinary](https://cloudinary.com/).
  - Go to the **Dashboard** to find your **Cloud Name**.

- **Google OAuth (Google Client ID & Secret):**
  - Go to [Google Cloud Console](https://console.cloud.google.com/).
  - Create a new project and navigate to **APIs & Services > Credentials**.
  - Create **OAuth 2.0 credentials** and get your **GOOGLE_CLIENT_ID** and **GOOGLE_CLIENT_SECRET**.
  - Set the **Authorized redirect URIs** to:
    ```
    http://localhost:3000/api/auth/callback/google
    ```
  - Set the **Homepage URL** to:
    ```
    http://localhost:3000
    ```

- **NextAuth Secret:**
  - Use a strong, random string (e.g., from [RandomKeygen](https://randomkeygen.com)).

- **MongoDB URI:**
  - Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
  - Create a new **cluster** and get the **connection string**, replacing `<username>` and `<password>` as needed.

- **GitHub OAuth (GitHub ID & Secret):**
  - Go to [GitHub Developer Settings](https://github.com/settings/developers).
  - Create a **new OAuth app** and set the **callback URL** to:
    ```
    http://localhost:3000/api/auth/callback/github
    ```
  - Set the **Homepage URL** to:
    ```
    http://localhost:3000
    ```
  - Copy the **Client ID** and **Client Secret**.

### 4. Start the Development Server

```sh
npm run dev
```

Open [localhost:3000](http://localhost:3000) in your browser.

## 🛠 Technologies Used
- **Next.js** - React framework for server-side rendering
- **MongoDB Atlas** - NoSQL database
- **NextAuth.js** - Authentication with Google and GitHub
- **Cloudinary** - Image hosting and management
- **Tailwind CSS** - Styling framework

## 📜 License
This project is open-source and available under the **MIT License**.

---

Now you're all set to run the project! 🚀

## 🤝 Contributing

We welcome contributions! Please see our [CONTRIBUTIONS.md](CONTRIBUTIONS.MD) guide for details about:
- How to add new themes
- Code style guidelines
- Development workflow
- Submitting pull requests

### Adding New Themes
Links Hub supports custom themes! Each theme is a TypeScript object that defines styles for both light and dark modes. Check out the [CONTRIBUTIONS.md](CONTRIBUTIONS.MD) file for detailed instructions on creating new themes.

## ✨ Features
- 🎨 Multiple customizable themes
- 🌓 Dark/Light mode support
- 📱 Responsive design
- 🔒 Secure authentication
- 📊 Analytics dashboard
- 📧 Email marketing tools
- 💳 Premium features
- 🎵 Spotify integration
- 💬 WhatsApp integration

## 🎨 Theme System
Links Hub features a powerful theme system that allows for:
- Custom background gradients
- Animated components
- Particle effects
- Customizable cards and buttons
- Responsive layout adjustments
- Dark/Light mode variants

Check out `themes/themes.ts` and `themes/themeTypes/themeConfig.ts` for theme configuration options.

