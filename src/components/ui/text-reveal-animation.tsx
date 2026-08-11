import { motion } from 'framer-motion';

type TextRevealProps = {
  text: string;
  className?: string;
  delay?: number;
};

export function TextReveal({ text, className = '', delay = 0 }: TextRevealProps) {
  return (
    <span aria-label={text} className={`inline-block overflow-hidden ${className}`}>
      {Array.from(text).map((character, index) => (
        <motion.span
          aria-hidden="true"
          className="inline-block"
          initial={{ opacity: 0, y: '105%' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.52, delay: delay + index * 0.032, ease: [0.22, 1, 0.36, 1] }}
          key={`${character}-${index}`}
        >
          {character === ' ' ? '\u00a0' : character}
        </motion.span>
      ))}
    </span>
  );
}
