import TrackViews from "@theme/hook/TrackViews";

import { getUser } from "@/services/database/getUserFromDatabase";
import PlayGround from "./components/PlayGround";

export default async function UserPage(props: { params: Promise<{ username: string }> }) {
  const { username } = await props.params;
  const user = await getUser(username);

  if (!user) {
    return (
      <main className="min-h-screen flex justify-center items-center">
        <p className="text-xl font-semibold">User not found</p>
      </main>
    );
  }
  const { username: uname, isPremiumUser } = user;
  return (
    <main className="min-h-screen relative flex justify-center items-center">
      <TrackViews username={uname} isPremium={isPremiumUser} />
      <PlayGround user={user} />
    </main>
  );
}
