import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useOnboardingStore } from "./onboardingStore";
import { onboardingSteps } from "./steps";

const OnboardingModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { hasSeenOnboarding, setHasSeenOnboarding } = useOnboardingStore();

  useEffect(() => {
    // Show the modal if user hasn't seen onboarding
    if (!hasSeenOnboarding) {
      setIsOpen(true);
    }
  }, [hasSeenOnboarding]);

  const currentStepData = onboardingSteps[currentStep];

  const handleNext = () => {
    if (currentStep === onboardingSteps.length - 1) {
      setHasSeenOnboarding(true);
      setIsOpen(false);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSkip = () => {
    setHasSeenOnboarding(true);
    setIsOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="mx-auto mb-4">{currentStepData.icon}</div>
            <DialogTitle className="text-center text-2xl">
              {currentStepData.title}
            </DialogTitle>
            <DialogDescription className="text-center text-base">
              {currentStepData.description}
            </DialogDescription>
          </DialogHeader>

          {/* Progress indicators */}
          <div className="flex justify-center gap-2 py-4">
            {onboardingSteps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-16 rounded-full transition-colors ${
                  index === currentStep ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>

          <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-between sm:space-x-0">
            <div className="flex gap-2">
              {currentStep > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                >
                  Previous
                </Button>
              )}
              <Button type="button" onClick={handleNext}>
                {currentStep === onboardingSteps.length - 1
                  ? "Get Started"
                  : "Next"}
              </Button>
            </div>
            {currentStep < onboardingSteps.length - 1 && (
              <Button type="button" variant="ghost" onClick={handleSkip}>
                Skip
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OnboardingModal;
