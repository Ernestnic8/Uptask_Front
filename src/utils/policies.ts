import type { Project, TeamMember } from "@/types/index";

const isManager = (managerId: Project["_id"], userId: TeamMember["_id"]) => {
    return managerId === userId;
};

export default isManager;
