export const navList = [
    {
        title: "Attendance",
        items: [
            {
                text: "View Profile",
                link: "/dashboard/profile",
                roles: ["student", "teacher"],
            },
            {
                text: "Edit Attendance",
                link: "/dashboard/attendance",
            },
        ],
    },
    {
        title: "Marks",
        items: [
            {
                text: "View Profile",
                link: "/dashboard/profile",
            }
        ],
    },
];

export interface NavList {
    title: string;
    items: {
        text: string;
        link: string;
        roles?: string[];
    }[];
}