"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { themes } from "@/themes/themes"
import ThemeThumbnail from "./ThemeThumbnail"
import { toast } from "sonner"
import { StyleConfig } from "@/themes/themeTypes/themeConfig"
import { useSession } from "next-auth/react"

const ITEMS_PER_PAGE = 6

const ThemesPage = () => {
    const { data: session } = useSession();
    const email = session?.user?.email;
    const [page, setPage] = useState(0);
    const [selectedTheme, setSelectedTheme] = useState<StyleConfig>(themes[0]);
    const updatedThemeToDatabase = async (email: string, userTheme: number) => {
        try {
            await fetch('/api/update-to-database',
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'email': email,
                    },
                    body: JSON.stringify(userTheme),
                }
            )
            toast.success('Theme updated');
        } catch (error) {
            console.log(error)
        }
    }
    const saveCurrentTheme = async (userTheme: number) => {
        if (!selectedTheme) {
            toast.info("Please select a theme first.")
            return;
        }
        if (email) {
            updatedThemeToDatabase(email, userTheme)
        }
    }

    const currentThemes = themes.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE)

    return (
        <div className="w-full p-6 mx-auto space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentThemes.map((theme, indexTheme) => (
                    <div
                        key={indexTheme}
                        className="rounded-xl p-4 dark:bg-slate-900 shadow-md space-y-3"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-sm dark:text-white">Theme {page * ITEMS_PER_PAGE + indexTheme + 1}</h3>
                            <Dialog>
                                <div className="flex gap-2 text-sm items-center">
                                    <DialogTrigger asChild>
                                        <Button onClick={() => setSelectedTheme(theme)}>
                                            Preview
                                        </Button>
                                    </DialogTrigger>

                                    <Button onClick={() => saveCurrentTheme(indexTheme + 1)}>
                                        Save
                                    </Button>
                                </div>

                                <DialogContent className="p-0 w-screen h-screen max-w-none max-h-none rounded-none">
                                    <DialogTitle className="sr-only">Theme Preview</DialogTitle>

                                    <div className="flex-1 overflow-y-auto">
                                        <ThemeThumbnail theme={selectedTheme} />
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>

                        {/* Mini Preview */}
                        <div className="rounded-lg overflow-hidden z-0  shadow-inner">
                            <ThemeThumbnail theme={theme} mini />
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center gap-4">
                <Button
                    variant="outline"
                    disabled={page === 0}
                    onClick={() => setPage(prev => prev - 1)}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    disabled={(page + 1) * ITEMS_PER_PAGE >= themes.length}
                    onClick={() => setPage(prev => prev + 1)}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}

export default ThemesPage
