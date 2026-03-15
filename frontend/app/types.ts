export const cards = [
    {
      title: "Check-in and Check-out",
      items: [
        "Check-in: 3:00 PM",
        "Check-out: 12:00 AM",
      ],
    },
    {
      title: "House Rules",
      items: ["No smoking inside", "No parties or events", "No pets"],
    },
    {
      title: "Parking",
      items: [
        "Park under the carport to the left of the entrance, in the spot on the right!",
        "Street parking is allowed in TarryTown",
      ],
    },
    {
      title: "Quick Help",
      items: [
        "Thermostat: Spin left or right to adjust temp",
        "TV: Use HDMI 1",
        "Extra towels can be found beneath the bathroom sink",
      ],
    },
  ];

  export type FAQItem = {
  question: string;
  answer: string;
};

export const faqData: FAQItem[] = [
  {
    question: "Why is the microwave or coffee machine not working?",
    answer:
      "If either machine has no power, all you have to do is hit the reset button on the outlet it is plugged into!",
  },
];