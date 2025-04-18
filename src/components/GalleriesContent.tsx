'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { galleriesData } from '@/data';
import { computeDimensions, getBestFitRow } from '@/utils/utils';

const GalleriesContent = () => {
  return (
    <section className='pt-[120px] md:pt-[220px]'>
      <h1 className='custom-text text-white uppercase absolute top-0 left-1/2 -translate-x-1/2 origin-center'>
        Galleries
      </h1>

      <ul className="flex flex-col gap-10">
        {Object.entries(galleriesData).map(([slug, { name, photos }]) => {
          const bestFitPhotos = getBestFitRow(photos);

          return (
            <li key={slug}>
              <Link
                href={`/galleries/${slug}`}
                aria-label={`Go to ${name} gallery page`}
                className='w-full flex flex-col'
              >
                {/* Title + Divider */}
                <div className='relative py-4'>
                  <div className="absolute top-0 left-0 right-0 h-px bg-[var(--secondary)]" />
                  <p className='w-max'>{name}</p>
                </div>

                {/* Gallery Row */}
                <div className='grid grid-cols-12 gap-x-5 h-max-[230px] overflow-hidden'>
                  {bestFitPhotos.map(({ photo, index, colSpan }) => {
                    const { width, height } = computeDimensions(photo.aspectRatio, 200);

                    return (
                      <motion.div 
                        key={`${name}-${index}`} 
                        className={`relative col-span-${colSpan}`}
                        style={{ aspectRatio: photo.aspectRatio }}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Image
                          src={`https://d14lj85n4pdzvr.cloudfront.net/galleries/${slug}/${slug}-${index + 1}.jpg`}
                          alt={`Picture of ${name}`}
                          width={width}
                          height={height}
                          draggable="false"
                          className="object-cover w-full h-full"
                        />
                      </motion.div>
                    )
                  })}
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default GalleriesContent;
