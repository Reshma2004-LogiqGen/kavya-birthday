export type Wish = {
  id: string;
  index: string;
  label: string;
  title: string;
  body: string;
};

export const traits = [
  { id: "teammate", label: "Teammate", line: "The one who makes the room feel steady." },
  { id: "developer", label: "Developer", line: "Careful craft. Quiet ownership. Clear thinking." },
  { id: "observer", label: "Observer", line: "She notices what others rush past." },
  { id: "human", label: "Best Human", line: "Kindness without performance." },
];

export const wishes: Wish[] = [
  {
    id: "01",
    index: "01",
    label: "Wish one",
    title: "Happy Birthday, Kavya Reddy",
    body: "You're the colleague everyone hopes is on their sprint — reliable, sharp, and genuinely great to work with. Today we celebrate you.",
  },
  {
    id: "02",
    index: "02",
    label: "Wish two",
    title: "To our favorite teammate",
    body: "Standups, code reviews, debugging at odd hours — you bring calm and clarity when things get messy. That kind of teammate is rare.",
  },
  {
    id: "03",
    index: "03",
    label: "Wish three",
    title: "For the keenest observer",
    body: "You notice what others rush past — the detail in a design, the pause in a meeting, the bug in plain sight. Your eyes make this team sharper.",
  },
  {
    id: "04",
    index: "04",
    label: "Wish four",
    title: "May this year be kind",
    body: "Clean wins, steady growth, and days off that actually feel like days off. You've earned all of it — go after everything you're working toward.",
  },
  {
    id: "05",
    index: "05",
    label: "Wish five",
    title: "From your Logiqgen family",
    body: "You're one of the easiest people to work with and one of the hardest to replace. Thank you for being brilliant and kind. Keep shining, Kavya.",
  },
];
