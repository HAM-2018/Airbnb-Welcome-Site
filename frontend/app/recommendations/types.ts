
type Recommendation = {
  name: string;
  note: string;
  href?: string;
};

type Category = {
  title: string;
  description: string;
  items: Recommendation[];
};

export const categories: Category[] = [
  {
    title: "Coffee",
    description: "Best beans, brews and vibes according to us",
    items: [
      {
        name: "Desnudo",
        note: "Hands down the best cup of coffee in the city. Multiple locations throughout Austin!",
        href: "https://desnudocoffee.com/",
      },
      {
        name: "Mozarts",
        note: "Scenic views of Lake Austin, Live music on the weekends. Mozarts is always a good scene!",
        href: "https://mozartscoffee.com/",
      },
    ],
  },
  {
    title: "Restaurants",
    description:
      "From food-trucks, Famous Texas BBQ, to fine dining these are our top choices",
    items: [
      {
        name: "Fonda San Miguel",
        note: "Truly fantastic authentic Mexican Quisine, just make sure you account for the fact you will likely have to wait for a table!!",
        href: "https://www.fondasanmiguel.com/"
      },
      {
        name: "Vera Cruz",
        note: "You can't leave Austin without having some breakfast tacos, Vera Cruz is walking distance from the house and is a great breakfast or lunch option.",
        href: "https://www.veracruzallnatural.com/"
      },
    ],
  },
  {
    title: "Nightlife",
    description:
      "Everyone knows what 6th street can do for the party. Here are some alternative bars throughout the city for those who would rather just have a nice cocktail.",
    items: [
      {
        name: "TODO",
        note: "Truly fantastic authentic Mexican Quisine, just make sure you account for the fact you will likely have to wait for a table!!",
      },
    ],
  },
  {
    title: "Activities",
    description:
      "From food-trucks, Famous Texas BBQ, to fine dining these are our top choices",
    items: [
      {
        name: "",
        note: "Truly fantastic authentic Mexican Quisine, just make sure you account for the fact you will likely have to wait for a table!!",
      },
    ],
  },
];