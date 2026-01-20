import { Check, X } from "lucide-react";
import Link from "next/link";

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  description: string;
  features: PricingFeature[];
  buttonText: string;
  buttonLink: string;
  isPopular?: boolean;
  highlightColor?: string;
  gradient?: string;
}

export function PricingCard({
  title,
  price,
  period = "/month",
  description,
  features,
  buttonText,
  buttonLink,
  isPopular = false,
  highlightColor = "blue",
  gradient,
}: PricingCardProps) {
  const isFree = price === "Free" || price === "$0";

  return (
    <div
      className={`relative flex flex-col p-6 rounded-2xl transition-all duration-300 ${
        isPopular
          ? "bg-white dark:bg-gray-800 shadow-xl border-2 border-primary-500 scale-105 z-10"
          : "bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1"
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
            Most Popular
          </span>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 min-h-[40px]">
          {description}
        </p>
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-baseline">
          <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
            {price}
          </span>
          {!isFree && (
            <span className="text-gray-500 dark:text-gray-400 ml-1">
              {period}
            </span>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="flex-grow mb-8 space-y-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start">
            <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
              {feature.included ? (
                <Check className={`w-5 h-5 text-${highlightColor}-500`} />
              ) : (
                <X className="w-4 h-4 text-gray-300 dark:text-gray-600" />
              )}
            </div>
            <span
              className={`ml-3 text-sm ${
                feature.included
                  ? "text-gray-700 dark:text-gray-300"
                  : "text-gray-400 dark:text-gray-500 line-through"
              }`}
            >
              {feature.text}
            </span>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <Link
        href={buttonLink}
        className={`w-full py-3 px-4 rounded-xl text-center font-semibold transition-all duration-200 ${
          isPopular
            ? `bg-gradient-to-r ${
                gradient || "from-blue-600 to-purple-600"
              } text-white hover:opacity-90 shadow-lg shadow-blue-500/30`
            : "bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
        }`}
      >
        {buttonText}
      </Link>
    </div>
  );
}
