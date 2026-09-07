export type Wish = {
  id: string;
  index: string;
  label: string;
  body: string;
};

export const wishes: Wish[] = [
  {
    id: "logiqgen",
    index: "01",
    label: "At Logiqgen",
    body: "Happy Birthday, Kavya Reddy. You're the colleague everyone hopes is on their sprint — reliable, sharp, and genuinely great to work with.",
  },
  {
    id: "team",
    index: "02",
    label: "On the dev team",
    body: "Standups, code reviews, debugging at odd hours — you bring calm and clarity when things get messy. That kind of teammate is rare.",
  },
  {
    id: "observer",
    index: "03",
    label: "As our observer",
    body: "You notice what others rush past — the detail in a design, the pause in a meeting, the bug in plain sight. Your eyes make this whole team sharper.",
  },
  {
    id: "year",
    index: "04",
    label: "This year",
    body: "May you ship everything you're working toward — clean wins, steady growth, and days off that actually feel like days off. You've earned all of it.",
  },
  {
    id: "from-team",
    index: "05",
    label: "From the Logiqgen team",
    body: "You're one of the easiest people to work with and one of the hardest to replace — thoughtful, dependable, and genuinely kind. We're glad you're on our team. Keep shining, Kavya.",
  },
];
