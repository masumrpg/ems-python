"use client";
import React from "react";
import Lottie from "lottie-react";
import peopleOfficeAnimationData from "./people-office.json";

interface AnimationsProps {
    className?: string;
}

const Animations: React.FC<AnimationsProps> = ({ className }) => {
    return (
        <div className={className}>
            <Lottie
                animationData={peopleOfficeAnimationData}
                loop
                autoplay
                style={{ width: 500, height: 500 }}
            />
        </div>
    );
};

export default Animations;
