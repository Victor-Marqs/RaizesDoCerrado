import { motion } from 'motion/react';

type ThreeDMarqueeProps = { images: string[] };

export function ThreeDMarquee({ images }: ThreeDMarqueeProps) {
  const chunkSize = Math.ceil(images.length / 4);
  const columns = Array.from({ length: 4 }, (_, index) => images.slice(index * chunkSize, (index + 1) * chunkSize));

  return (
    <div className="h-[27rem] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0b0e0b] sm:h-[34rem]">
      <div className="flex size-full items-center justify-center">
        <div className="size-[1040px] shrink-0 scale-[.43] sm:scale-[.62] lg:scale-100">
          <div style={{ transform: 'rotateX(57deg) rotateZ(-43deg)' }} className="relative right-[50%] top-72 grid size-full origin-top-left grid-cols-4 gap-6 [transform-style:preserve-3d]">
            {columns.map((column, columnIndex) => (
              <motion.div key={columnIndex} animate={{ y: columnIndex % 2 === 0 ? 72 : -72 }} transition={{ duration: columnIndex % 2 === 0 ? 10 : 14, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }} className="flex flex-col gap-6">
                {column.map((image, imageIndex) => (
                  <motion.img key={image} whileHover={{ y: -12 }} transition={{ duration: 0.3 }} src={image} alt={`Espécime botânico ${imageIndex + 1}`} className="aspect-[1.28] rounded-xl object-cover ring-1 ring-white/10" loading="lazy" />
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
