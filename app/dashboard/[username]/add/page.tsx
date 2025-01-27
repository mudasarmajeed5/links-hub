"use client";

import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter, FaSnapchat, FaPinterest, FaMedium, FaDiscord, FaYoutube, FaTiktok } from "react-icons/fa"; // Importing remaining icons

const AddLink = () => {
  const [formLinks, setFormLinks] = useState({
    instagram: 'https://',
    facebook: 'https://',
    discord: 'https://',
    linkedIn: 'https://',
    medium: 'https://',
    x: 'https://',
    youtube: 'https://',
    snapchat: 'https://',
    pinterest: 'https://',
    github: 'https://',
    tiktok: 'https://',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormLinks(prevForm => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formLinks);
  };

  return (
    <div className="p-4 h-[80vh] flex flex-col gap-6 items-center justify-center rounded-lg max-w-3xl mx-auto">
      <h1 className="text-center my-6 text-2xl font-medium underline underline-offset-2">Add your Favorite Links and Submit</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <FaInstagram className="w-6 h-6 text-blue-500" />
              <Label htmlFor="instagram">Instagram</Label>
            </div>
            <Input
              id="instagram"
              name="instagram"
              value={formLinks.instagram}
              onChange={handleChange}
              placeholder="Instagram URL"
              className="mt-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <FaFacebook className="w-6 h-6 text-blue-600" />
              <Label htmlFor="facebook">Facebook</Label>
            </div>
            <Input
              id="facebook"
              name="facebook"
              value={formLinks.facebook}
              onChange={handleChange}
              placeholder="Facebook URL"
              className="mt-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <FaTwitter className="w-6 h-6 text-blue-400" />
              <Label htmlFor="x">X (Twitter)</Label>
            </div>
            <Input
              id="x"
              name="x"
              value={formLinks.x}
              onChange={handleChange}
              placeholder="Twitter URL"
              className="mt-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <FaGithub className="w-6 h-6 text-gray-800" />
              <Label htmlFor="github">Github</Label>
            </div>
            <Input
              id="github"
              name="github"
              value={formLinks.github}
              onChange={handleChange}
              placeholder="Github URL"
              className="mt-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <FaLinkedin className="w-6 h-6 text-blue-700" />
              <Label htmlFor="linkedIn">LinkedIn</Label>
            </div>
            <Input
              id="linkedIn"
              name="linkedIn"
              value={formLinks.linkedIn}
              onChange={handleChange}
              placeholder="LinkedIn URL"
              className="mt-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <FaSnapchat className="w-6 h-6 text-yellow-500" />
              <Label htmlFor="snapchat">Snapchat</Label>
            </div>
            <Input
              id="snapchat"
              name="snapchat"
              value={formLinks.snapchat}
              onChange={handleChange}
              placeholder="Snapchat URL"
              className="mt-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <FaPinterest className="w-6 h-6 text-red-600" />
              <Label htmlFor="pinterest">Pinterest</Label>
            </div>
            <Input
              id="pinterest"
              name="pinterest"
              value={formLinks.pinterest}
              onChange={handleChange}
              placeholder="Pinterest URL"
              className="mt-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <FaYoutube className="w-6 h-6 text-red-500" />
              <Label htmlFor="youtube">YouTube</Label>
            </div>
            <Input
              id="youtube"
              name="youtube"
              value={formLinks.youtube}
              onChange={handleChange}
              placeholder="YouTube URL"
              className="mt-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <FaMedium className="w-6 h-6 text-black" />
              <Label htmlFor="medium">Medium</Label>
            </div>
            <Input
              id="medium"
              name="medium"
              value={formLinks.medium}
              onChange={handleChange}
              placeholder="Medium URL"
              className="mt-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <FaDiscord className="w-6 h-6 text-indigo-600" />
              <Label htmlFor="discord">Discord</Label>
            </div>
            <Input
              id="discord"
              name="discord"
              value={formLinks.discord}
              onChange={handleChange}
              placeholder="Discord URL"
              className="mt-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <FaTiktok className="w-6 h-6 text-black" />
              <Label htmlFor="tiktok">TikTok</Label>
            </div>
            <Input
              id="tiktok"
              name="tiktok"
              value={formLinks.tiktok}
              onChange={handleChange}
              placeholder="TikTok URL"
              className="mt-2"
            />
          </div>
        </div>

        <div className="flex gap-2">
        <Button type="submit" variant={"secondary"} className="mt-6 w-full">
          Save
        </Button>
        <Button type="submit" variant={"outline"} className="mt-6 w-full">
          Next
        </Button>
        </div>
      </form>
    </div>
  );
};

export default AddLink;
