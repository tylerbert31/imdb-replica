import React from "react";
import { motion } from "framer-motion";

export default function TrendingCards({ idx }: { idx: number }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        delay: idx * 0.05,
        bounceDamping: 0.5,
      }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="aspect-w-2 aspect-h-3 bg-gray-200"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </motion.div>
  );
}
