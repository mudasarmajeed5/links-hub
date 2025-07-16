import { create } from "zustand";
import { getSessionUser } from "@/app/dashboard/helpers/getSessionUser";
import type { User } from "@/types/user-account";

type UserStore = {
    user: User | undefined,
    loading: boolean,
    fetchUser: () => Promise<void>,
}

export const useUserStore = create<UserStore>((set) => ({
    user: undefined,
    loading: false,
    fetchUser: async () => {
        set({ loading: true })
        const data = await getSessionUser();
        set({ loading: false, user: data ?? undefined })
    }
}))