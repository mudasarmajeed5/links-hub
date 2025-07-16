// app/[username]/page.tsx

import TrackViews from "@theme/hook/TrackViews";
import CyberPunkTheme from "@theme/templates/free/cyberpunk-theme";
import MinimalTheme from "@theme/templates/free/minimal-theme";
import VibrantTheme from "@theme/templates/free/vibrant";
import { getUser } from "@/lib/getUserFromDatabase";

export default async function UserPage(props: { params: Promise<{ username: string }> }) {
  const { username } = await props.params;
  const user = await getUser(username);
  console.log("Rendering page for", username);

  if (!user) {
    return (
      <main className="min-h-screen flex justify-center items-center">
        <p className="text-xl font-semibold">User not found</p>
      </main>
    );
  }

  const { username: uname, isPremiumUser, userTheme } = user;

  const templateMapping = {
    1: <MinimalTheme user={user} />,
    2: <VibrantTheme user={user} />,
    3: <CyberPunkTheme user={user} />,
  };

  return (
    <main className="min-h-screen relative flex justify-center items-center">
      <TrackViews username={uname} isPremium={isPremiumUser} />

      {templateMapping[userTheme as 1 | 2 | 3] || <MinimalTheme user={user} />}
    </main>
  );
}
