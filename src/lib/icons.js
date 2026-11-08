import { FaGithub, FaLinkedin, FaMusic, FaGoogle } from 'react-icons/fa';
import { MdWork, MdSchool, MdGroups, MdCode, MdTerminal, MdCloud, MdDevices, MdBuild, MdAutoGraph } from 'react-icons/md';

export const ICON_MAP = {
    work: MdWork,
    school: MdSchool,
    github: FaGithub,
    groups: MdGroups,
    google: FaGoogle,
    music: FaMusic,
    code: MdCode,
    terminal: MdTerminal,
    cloud: MdCloud,
    devices: MdDevices,
    build: MdBuild,
    graph: MdAutoGraph,
};

export const SOCIAL_ICONS = { linkedin: FaLinkedin, github: FaGithub, music: FaMusic };

export const Icon = ({ name, ...p }) => {
    const C = ICON_MAP[name] || MdWork;
    return <C {...p} />;
};
