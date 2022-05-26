import React from "react";
import Config from "../Config";
import { useAnalytics } from "../hooks/useAnalytics";
import RatingCard from "./RatingCard";

interface ITargetRatingInputProps {
    value: number | undefined;
    onChange: (newRating: number | undefined) => void;
}

export function TargetRatingInput({
    value,
    onChange
}: ITargetRatingInputProps) {
    const { event } = useAnalytics();

    const setRating = (rating: number) => {
        onChange(rating);
        event({
            action: "SET_TARGET",
            details: { rating }
        });
    };

    return (
        <div>
            <div className="my-4 flex align-items-center">
                <strong className="mr-3">
                    {value ? "Selected" : "Not Selected"}
                </strong>
                <span className="text-4xl" style={{ opacity: value ? 1 : 0 }}>
                    {value || -1}
                </span>
            </div>
            <div className="flex flex-wrap gap-3">
                {Config.allRatings.map((rating, index) => {
                    return (
                        <div key={index}>
                            <span onClick={() => setRating(rating)}>
                                <RatingCard
                                    rating={rating}
                                    selected={value === rating}
                                />
                            </span>
                        </div>
                    );
                })}
            </div>
            <div className="mt-4">
                <small>Select the desired squad rating</small>
            </div>
        </div>
    );
}
