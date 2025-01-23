import { Dog, Heart, Search } from "lucide-react";

export interface OnboardingStep {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const onboardingSteps: OnboardingStep[] = [
  {
    title: "Find Your Perfect Match",
    description:
      "Welcome to Fetch Takehome! We'll help you find your ideal canine companion through our personalized matching system.",
    icon: <Dog className="h-12 w-12 text-primary" />,
  },
  {
    title: "Filter by Breed",
    description:
      "Use our filters to discover dogs by breed to find ones that match your lifestyle.",
    icon: <Search className="h-12 w-12 text-primary" />,
  },
  {
    title: "Save Your Favorites",
    description:
      "Like the dogs you're interested in, and we'll use your preferences to recommend the perfect match for you.",
    icon: <Heart className="h-12 w-12 text-primary" />,
  },
];
