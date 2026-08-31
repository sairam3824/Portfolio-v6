import { projectsData } from "./projectsData";
import { skillCategories } from "./skillsData";
import { profileDetails } from "./siteMetadata";

const totalSkills = new Set(
    skillCategories.flatMap((category) => category.skills.map((skill) => skill.name)),
).size;

export type PublicMetric = {
    label: string;
    value: string;
    sub: string;
    href: string;
    external?: boolean;
};

export const publicMetrics: readonly PublicMetric[] = [
    {
        label: "LeetCode",
        value: "2400+",
        sub: "Guardian",
        href: profileDetails.socials.leetcodePrimary,
        external: true,
    },
    {
        label: "DSA Solved",
        value: "1000+",
        sub: "Problems",
        href: profileDetails.socials.leetcodeSecondary,
        external: true,
    },
    {
        label: "Projects",
        value: `${projectsData.length}+`,
        sub: "Built",
        href: "/projects",
    },
    {
        label: "CodeChef",
        value: "3★",
        sub: "1600+ Rating",
        href: profileDetails.socials.codechef,
        external: true,
    },
    {
        label: "Skills",
        value: `${totalSkills}+`,
        sub: "Mastered",
        href: "/skills",
    },
    {
        label: "Live SaaS",
        value: "11+",
        sub: "Deployed",
        href: "/projects",
    },
    {
        label: "Certs",
        value: "12+",
        sub: "Earned",
        href: "/certifications",
    },
];
