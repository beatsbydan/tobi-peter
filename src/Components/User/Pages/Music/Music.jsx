import Socials from '../../../UI/Socials/Socials'
import StreamingPlatforms from '../../../UI/StreamingPlatforms/StreamingPlatforms'
import Loading from '../../../UI/Loading/Loading'
import { BiRightArrowAlt } from 'react-icons/bi'
import { motion } from 'framer-motion'
import Blogs from './Blogs/Blogs'
import ImageCarousel from './ImageCarousel/ImageCarousel'
import { pageTransition, staggerContainerOnMount, staggerItem } from '../../../../lib/motion'
import { useSiteContentQuery } from '../../../../queries/useSiteContent'
import { LOGO_URL } from '../../../../lib/cloudinary'

// The bio paragraph that names the artists Tobi has worked with (currently paragraph 3) keeps its
// lead-in/"amongst others" framing hardcoded here — only the paragraph text itself and the bold
// artist list come from admin-managed site content.
const FEATURED_ARTISTS_PARAGRAPH_INDEX = 2

const Music = () => {
  const { data: siteContent, isPending, isSuccess } = useSiteContentQuery()
  const bio = siteContent?.bio ?? []
  const song = {
    streamingLink: {
      appleMusic: 'https://music.apple.com/ng/artist/tobi-peter/1459306113',
      spotify: 'https://open.spotify.com/artist/6akFVTtPvrAsoyLSv8U6nw',
      audiomack: 'https://audiomack.com/tobi-peter',
      youtube: 'https://www.youtube.com/@tobipeter8',
      tidal: 'https://tidal.com/browse/artist/15111616',
      boomPlay: 'https://music.youtube.com/channel/UCO4KidrAHVyduGJUiOkGJNw',
      youtubeMusic: 'https://music.youtube.com/channel/UCO4KidrAHVyduGJUiOkGJNw',
    },
  }
  return (
    <motion.div className="mx-auto w-full max-w-[800px] font-sans" {...pageTransition}>
      <h1 className="sr-only">Music</h1>
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-ink">BIO</h3>
        <Socials />
      </div>
      <div className="relative mt-[2.2em] mb-[3em] min-h-[100px]">
        {isPending ? (
          <Loading />
        ) : isSuccess && bio.length > 0 ? (
          <motion.div {...staggerContainerOnMount}>
            {bio.map((paragraph, index) => (
              <motion.p
                key={index}
                {...staggerItem}
                className={`text-[0.9rem] leading-[2.1em] text-muted text-justify ${
                  index < bio.length - 1 ? 'mb-[1.2rem]' : ''
                }`}
              >
                {index === FEATURED_ARTISTS_PARAGRAPH_INDEX ? (
                  <>
                    {paragraph} <span className="font-bold">{siteContent.bioFeaturedArtists}</span>{' '}
                    amongst others.
                  </>
                ) : (
                  paragraph
                )}
              </motion.p>
            ))}
          </motion.div>
        ) : isSuccess && bio.length === 0 ? (
          <p className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center text-[0.85rem] font-medium text-[var(--color-muted)]">
            <span className="mt-[0.6rem] block">
              <img className="mx-auto h-[45px] w-[45px]" src={LOGO_URL} alt="" />
            </span>
            NO BIO YET.
          </p>
        ) : (
          <p className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center text-[0.85rem] font-medium text-[var(--color-muted)]">
            <span className="mt-[0.6rem] block">
              <img className="mx-auto h-[45px] w-[45px]" src={LOGO_URL} alt="" />
            </span>
            SOMETHING WENT WRONG.
          </p>
        )}
      </div>
      <div className="my-[4em] w-full rounded-[0.6rem] bg-[#d9d9d936] p-[1.5rem]">
        <ImageCarousel />
      </div>
      <div>
        <p className="text-[0.9rem] text-muted">
          Check out my music on any of these streaming platforms:{' '}
        </p>
        <StreamingPlatforms song={song} isEmpty={false} />
      </div>
      <div className="mt-[2em] grid grid-cols-[47%_47%] gap-[6%] max-[600px]:grid-cols-none">
        <div className="flex flex-col gap-[1.2rem] rounded-[0.6rem] bg-[#d9d9d936] p-[2rem] text-center">
          <h5 className="text-[0.87rem] font-bold text-muted">DJs CHECK THIS OUT!</h5>
          <p className="text-[0.9rem] text-muted">
            Would you like to have some songs from me to spin during your sets?
          </p>
          <p className="text-[0.9rem] text-muted">Make a request below!</p>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://docs.google.com/forms/d/e/1FAIpQLSeCLsPi2jX7p9Nut5EVnCdMmsTsMPS9Iww-nHn6gvoWLfFw-g/viewform?usp=sf_link"
            className="flex flex-row items-center justify-center gap-[0.3rem] text-[1.1rem] font-medium text-muted transition-all duration-300 ease-in-out hover:gap-[1.2rem]"
          >
            MAKE REQUEST
            <BiRightArrowAlt size={15} />
          </a>
        </div>
        <div className="flex flex-col gap-[1.2rem] rounded-[0.6rem] bg-[#d9d9d936] p-[2rem] text-center">
          <h5 className="text-[0.87rem] font-bold text-muted">ESSENTIALS PLAYLIST</h5>
          <p className="text-[0.9rem] text-muted">
            Check out an ESSENTIALS PLAYLIST curated by me.
          </p>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://music.apple.com/ng/playlist/tobi-peter-essentials/pl.33827f1b0b494d7d953f49fe2488622c"
            className="flex flex-row items-center justify-center gap-[0.3rem] text-[1.1rem] font-medium text-muted transition-all duration-300 ease-in-out hover:gap-[1.2rem]"
          >
            APPLE MUSIC
            <BiRightArrowAlt size={15} />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://open.spotify.com/playlist/7v1D1eCj6GOq1pFWXa7U2w?si=97cdbca3b1404e2a"
            className="flex flex-row items-center justify-center gap-[0.3rem] text-[1.1rem] font-medium text-muted transition-all duration-300 ease-in-out hover:gap-[1.2rem]"
          >
            SPOTIFY
            <BiRightArrowAlt size={15} />
          </a>
        </div>
      </div>
      <div className="mt-[5em]">
        <h4 className="font-medium text-ink">PRESS</h4>
        <Blogs />
      </div>
    </motion.div>
  )
}
export default Music
