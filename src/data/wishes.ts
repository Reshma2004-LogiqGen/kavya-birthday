export type Wish = {
  id: string;
  index: string;
  label: string;
  quote: string;
  note: string;
};

export const wishes: Wish[] = [
  {
    id: "teammate",
    index: "01",
    label: "Teammate",
    quote: "You don’t just join a team — you make everyone feel they belong.",
    note: "In every standup, every late fix, every quiet check-in, you turn work into trust. We build better because we build with you.",
  },
  {
    id: "developer",
    index: "02",
    label: "Developer",
    quote: "Your code is careful. Your thinking is clear. Your ownership is rare.",
    note: "You ship with honesty and finish what others leave half-done. May this year reward the craft you give so generously.",
  },
  {
    id: "observer",
    index: "03",
    label: "Observer",
    quote: "While the world rushes, you notice — and that noticing changes everything.",
    note: "The detail in a design. The hesitation in a room. The bug hiding in plain sight. Your eyes make this team sharper.",
  },
  {
    id: "person",
    index: "04",
    label: "Good Person",
    quote: "Your kindness is not a performance. It is your practice.",
    note: "You speak with care, lead with patience, and leave people lighter than you found them. That is a gift beyond skill.",
  },
  {
    id: "human",
    index: "05",
    label: "Best Human",
    quote: "Talent can be trained. A beautiful heart cannot — and yours is unmistakable.",
    note: "Thank you for the laughter, the steadiness, the warmth. Today we celebrate Kavya Reddy — the work, and the human behind it.",
  },
];
