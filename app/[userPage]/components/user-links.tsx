"use client";

import { User } from '@/app/types/user-account';
import { useState, useEffect } from 'react';
import * as Icon from "react-icons/fa";
import Link from 'next/link';

interface UserLinkProps {
    data: User;
    linkClass?: string;
    iconClass?: string;
    textClass?: string;
}

type UserLink = {
    icon: string;
    link: string;
    label: string;
}[];

const UserLinks = ({ data, linkClass, iconClass, textClass }: UserLinkProps) => {
    const [links, setLinks] = useState<UserLink>([]);

    useEffect(() => {
        if (data) {
            const filteredLinks = data.userLinks.filter((item) => item.link?.length > 4);
            setLinks(filteredLinks);
        }
    }, [data]);

    return (
        <>
            {links.map((link, index) => {
                const IconComponent = Icon[link.icon as keyof typeof Icon];
                return (
                    <div key={index} className="flex justify-center items-center m-1">
                        <Link 
                            target="_blank" 
                            href={link.link} 
                            className={`flex justify-center items-center gap-4 transition-all rounded-full py-2 ${linkClass}`}
                        >
                            {IconComponent && <IconComponent className={iconClass} />}
                            <span className={textClass}>{link.label}</span>
                        </Link>
                    </div>
                );
            })}
        </>
    );
};

export default UserLinks;
