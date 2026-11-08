const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const fmt = (m) => `${MONTHS[Number(m.slice(5)) - 1]} ${m.slice(0, 4)}`;

export const formatRange = (start, end) => (start ? `${fmt(start)} – ${end ? fmt(end) : 'Present'}` : end ? `Until ${fmt(end)}` : '');
