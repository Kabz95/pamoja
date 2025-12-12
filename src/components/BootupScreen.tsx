
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartHandshake } from "lucide-react";

const messages = [
  "You are not alone.",
  "Your feelings are valid.",
  "A space to heal.",
  "pamoja",
];

const messageVariants = {
  enter: {
    opacity: 0,
    y: 8,
  },
  center: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.8,
      ease: "easeIn",
    },
  },
};

// The onBootComplete prop is removed as it's no longer needed for the fixed logic
export function BootupScreen() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    // This interval cycles through the messages while the boot screen is visible.
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1));
    }, 2500); 

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center min-h-screen bg-[#050017]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.0, ease: "easeOut" } }}
    >
      <div className="flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, transition: { duration: 1.5 } }}
          className="relative w-24 h-24 flex items-center justify-center"
        >
            <HeartHandshake className="w-16 h-16 text-primary" />
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground mt-6">
          pamoja
        </h1>
        <div className="h-8 mt-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              className="text-lg text-muted-foreground"
              variants={messageVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {messages[messageIndex % messages.length]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
