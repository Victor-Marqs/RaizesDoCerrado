import { motion } from 'motion/react';

type ThreeDMarqueeProps = { images: string[] };

export function ThreeDMarquee({ images }: ThreeDMarqueeProps) {
  const columns = Array.from({ length: 4 }, (_, column) => images.filter((_, index) => index % 4 === column));
  return <div aria-hidden="true" className="absolute inset-[-12%] overflow-hidden opacity-55 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]"><div className="grid h-[145%] w-[130%] -rotate-[14deg] grid-cols-4 gap-4 [transform:translate3d(-7%,_-14%,_0)] md:gap-7">{columns.map((column, index) => <motion.div key={index} animate={{ y: index % 2 ? [-78, 58] : [58, -78] }} transition={{ duration: index % 2 ? 16 : 12, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }} className="flex flex-col gap-4 md:gap-7">{[...column, ...column].map((image, imageIndex) => <img key={`${image}-${imageIndex}`} src={image} alt="" className="aspect-[.82] w-full rounded-sm object-cover brightness-75 saturate-75" loading="lazy" />)}</motion.div>)}</div></div>;
}
