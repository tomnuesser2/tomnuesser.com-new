'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function BrandMark() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-6 left-6 z-40 md:top-8 md:left-10"
    >
      <Link
        href="/"
        className="text-lg md:text-xl font-bold tracking-tight hover:opacity-70 transition-opacity"
      >
        tom nuesser
      </Link>
    </motion.div>
  );
}
