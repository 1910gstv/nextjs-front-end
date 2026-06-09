import type { SolutionCard } from "@/app/lib/definitions";
import { lusitana } from "@/app/ui/fonts";
import { Icon } from "lucide-react";

export default function SolutionCard({
  solutionCard,
}: {
  solutionCard: SolutionCard[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {solutionCard.map((r) => {
        const Icon = r.icon;

        return (
          <div
            key={r.title}
            className="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5"
          >
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center justify-center rounded-md bg-indigo-500 p-2 shadow-lg">
                <Icon className="h-6 w-6 text-white" />
              </span>

              <h3 className="text-gray-900 dark:text-white text-base font-medium tracking-tight">
                {r.title}
              </h3>
            </div>

            <p className="text-gray-500 dark:text-gray-400 mt-4 text-sm">
              {r.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
