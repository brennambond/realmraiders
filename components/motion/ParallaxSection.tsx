"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { ReactNode, useRef } from "react";

type ParallaxSectionProps = {
  children: ReactNode;
  backgroundImage?: string;
  backgroundPosition?: string;
  backgroundSize?: string;
  sectionClassName?: string;
  motionDivClassName?: string;
};

const ParallaxSection = ({
  children,
  backgroundImage,
  backgroundPosition,
  backgroundSize,
  sectionClassName,
  motionDivClassName,
}: ParallaxSectionProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  return (
    <section ref={ref} id='helper' className={sectionClassName}>
      <motion.div
        style={{
          backgroundImage: backgroundImage,
          backgroundPosition: backgroundPosition,
          backgroundSize: backgroundSize,
          y: backgroundY,
        }}
        className={motionDivClassName}
      />
      {children}
    </section>
  );
};

export default ParallaxSection;
