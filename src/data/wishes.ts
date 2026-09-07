export type Wish = {
  id: string;
  chapter: string;
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
    chapter: "Chapter I",
    title: "The teammate we trust",
    body: "Kavya Reddy, you turn a group of people into a team. In every standup and late fix, you bring calm that others borrow — and the work becomes lighter because you are in it.",
  },
  {
    id: "02",
    chapter: "Chapter II",
    title: "Craft without noise",
    body: "You write and think with honesty. No shortcuts for show. No ego in the review. Just clean work that holds — the rare kind of excellence that never needs a spotlight.",
  },
  {
    id: "03",
    chapter: "Chapter III",
    title: "The gift of noticing",
    body: "While the world rushes, you observe. The detail in a design. The pause in a meeting. The bug hiding in plain sight. Your eyes make Logiqgen sharper every day.",
  },
  {
    id: "04",
    chapter: "Chapter IV",
    title: "A year worthy of you",
    body: "May this year give you soft mornings, bright wins, and rest that actually restores you. Ship what you dream of — and leave room for joy that has nothing to do with tickets.",
  },
  {
    id: "05",
    chapter: "Chapter V",
    title: "From all of us",
    body: "Talent can be trained. A beautiful heart cannot. Thank you for being both brilliant and kind. We are lucky to build beside you. Happy Birthday, Kavya Reddy.",
  },
];
