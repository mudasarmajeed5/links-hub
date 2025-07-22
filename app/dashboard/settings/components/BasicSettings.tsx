import { Form } from "../../types/Form"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CldUploadWidget, CloudinaryUploadWidgetResults } from "next-cloudinary"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
type BasicSettingsProps = {
    form: Form
    setForm: (form: Form) => void   
    handleSuccess: (results: CloudinaryUploadWidgetResults) => void
    uploadWidgetState: boolean
    setUploadWidgetState: (state: boolean) => void
    error: string
}

export const BasicSettings = ({ form, setForm, handleSuccess, uploadWidgetState, setUploadWidgetState, error }: BasicSettingsProps) => {
    return (
        <>
            <div className="flex flex-col md:flex-row w-full min-h-0">
                {/* Profile Picture (Mobile: Top, Desktop: Right) */}
                <div className="w-full md:w-1/4 p-4 order-1 md:order-2">
                    {form.profilePic && (
                        <div className="flex flex-col items-center justify-between gap-4 h-full">
                            <Avatar className="w-44 h-44">
                                <AvatarImage
                                    className="object-cover object-center"
                                    src={form.profilePic}
                                    alt="Profile preview"
                                />
                                <AvatarFallback>Preview</AvatarFallback>
                            </Avatar>

                            <CldUploadWidget
                                uploadPreset="links-hub-pfp"
                                onSuccess={handleSuccess}
                                onCloseAction={() => setUploadWidgetState(false)}
                            >
                                {({ open }) => (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full"
                                        disabled={uploadWidgetState}
                                        onClick={() => {
                                            open();
                                            setUploadWidgetState(true);
                                        }}
                                    >
                                        Upload an Image {uploadWidgetState && <Loader2 className="animate-spin ml-2" />}
                                    </Button>
                                )}
                            </CldUploadWidget>

                            {error && (
                                <span className="text-red-600 text-sm w-full text-center">
                                    {error}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Form Fields */}
                <div className="w-full md:w-3/4 h-full order-2 md:order-1">
                    <div className="flex flex-col justify-between h-full p-4 gap-4">
                        <div className="flex flex-col flex-1 min-h-0">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                className="text-muted-foreground w-full flex-1"
                                id="name"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                placeholder="Enter new Name"
                            />
                        </div>

                        <div className="flex flex-col flex-1 min-h-0">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                className="text-muted-foreground w-full flex-1"
                                value={form.username}
                                onChange={(e) => setForm({ ...form, username: e.target.value })}
                                placeholder="Enter new username"
                            />
                        </div>

                        <div className="flex flex-col flex-1 min-h-0">
                            <Label htmlFor="profilePic">Profile Picture URL</Label>
                            <Input
                                id="profilePic"
                                className="text-muted-foreground w-full flex-1"
                                value={form.profilePic}
                                onChange={(e) => setForm({ ...form, profilePic: e.target.value })}
                                placeholder="Enter profile picture URL"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="space-y-2 px-4 md:w-3/4 w-full">
                <Label htmlFor="bio">Add Bio</Label>
                <Textarea
                    id="bio"
                    cols={20}
                    rows={10}
                    className="text-muted-foreground"
                    value={form.bio}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    placeholder="Enter your Bio"
                />
            </div>

        </>
    )
}
