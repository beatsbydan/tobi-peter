import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useShowsQuery, useShowStatsQuery } from '../../../../queries/useShows'
import { useSiteContentQuery } from '../../../../queries/useSiteContent'
import { toYoutubeEmbedUrl } from '../../../../lib/youtube'
import LazyImage from '../../../UI/LazyImage/LazyImage'
import BulletPoint from '../../../UI/BulletPoint/BulletPoint'
import VideoPlayer from '../../../UI/Video/VideoPlayer'
import Counter from '../../../UI/Counter/Counter'
import ShowsMap from '../../../UI/ShowsMap/ShowsMap'
import Loading from '../../../UI/Loading/Loading'
import { fadeUp, pageTransition, staggerContainer, staggerItem } from '../../../../lib/motion'
import { LOGO_URL, cloudinaryTransform } from '../../../../lib/cloudinary'
import endorsements from '../../../../data/endorsement.json'

const heading =
  'w-full border-b-[1.5px] border-ink pb-[0.5rem] pl-[10px] font-medium text-ink mt-[3em] max-[500px]:text-[18px]'

const collaborations = [
  {
    name: 'Interswitch',
    src: cloudinaryTransform(
      'https://res.cloudinary.com/dlgzlrzfh/image/upload/v1784421418/interswitch_os9nbd.png',
    ),
  },
  {
    name: 'Sony',
    src: cloudinaryTransform(
      'https://res.cloudinary.com/dlgzlrzfh/image/upload/v1784421423/sony_jp3p24.png',
    ),
  },
  {
    name: 'BBC',
    src: cloudinaryTransform(
      'https://res.cloudinary.com/dlgzlrzfh/image/upload/v1784421414/bbc_aaowcv.png',
    ),
  },
  {
    name: 'XP',
    src: cloudinaryTransform(
      'https://res.cloudinary.com/dlgzlrzfh/image/upload/v1784421424/xp_mgl9vc.jpg',
    ),
  },
  {
    name: 'Red Bull',
    src: cloudinaryTransform(
      'https://res.cloudinary.com/dlgzlrzfh/image/upload/v1784421423/red-bull_padwak.png',
    ),
  },
  {
    name: 'Mavin',
    src: cloudinaryTransform(
      'https://res.cloudinary.com/dlgzlrzfh/image/upload/v1784421421/mavin_vxsmfl.png',
    ),
  },
  {
    name: 'Lagos',
    src: cloudinaryTransform(
      'https://res.cloudinary.com/dlgzlrzfh/image/upload/v1784421420/lagos_yr4gqt.png',
    ),
  },
  {
    name: 'The Good Beach',
    src: cloudinaryTransform(
      'https://res.cloudinary.com/dlgzlrzfh/image/upload/v1784421424/the-good-beach_onhmon.png',
    ),
  },
  {
    name: 'Hennessy',
    src: cloudinaryTransform(
      'https://res.cloudinary.com/dlgzlrzfh/image/upload/v1784421417/hennessy_edl6qt.svg',
    ),
  },
  {
    name: 'Jägermeister',
    src: cloudinaryTransform(
      'https://res.cloudinary.com/dlgzlrzfh/image/upload/v1784421419/Jaggermeister_qbybfg.png',
    ),
  },
  {
    name: 'Beefeater',
    src: cloudinaryTransform(
      'https://res.cloudinary.com/dlgzlrzfh/image/upload/v1784421414/beefeater_mc4xof.png',
    ),
  },
  {
    name: 'Budweiser',
    src: cloudinaryTransform(
      'https://res.cloudinary.com/dlgzlrzfh/image/upload/v1784421414/budweiser_basqcs.png',
    ),
  },
  {
    name: 'Flying Fish',
    src: cloudinaryTransform(
      'https://res.cloudinary.com/dlgzlrzfh/image/upload/v1784421416/flying-fish_q1hiex.png',
    ),
  },
  {
    name: 'Monkey Shoulder',
    src: cloudinaryTransform(
      'https://res.cloudinary.com/dlgzlrzfh/image/upload/v1784421421/monkey-shoulder_i6ahta.png',
    ),
  },
  {
    name: 'Ashluxe',
    src: cloudinaryTransform(
      'https://res.cloudinary.com/dlgzlrzfh/image/upload/v1784421413/ashluxe_lfxmns.png',
    ),
  },
  {
    name: 'Landmark',
    src: cloudinaryTransform(
      'https://res.cloudinary.com/dlgzlrzfh/image/upload/v1784421420/landmark_ogtgjp.png',
    ),
  },
]

const Epk = () => {
  const { data: shows } = useShowsQuery()
  const { data: mapStats, isPending: isMapPending, isSuccess: isMapSuccess } = useShowStatsQuery()
  const {
    data: siteContent,
    isPending: isSiteContentPending,
    isSuccess: isSiteContentSuccess,
  } = useSiteContentQuery()
  const stats = siteContent?.stats
  const sets = siteContent?.sets ?? []
  const [showsStats, setShowStats] = useState({
    allTimeShows: 0,
    showsThisYear: 0,
  })

  useEffect(() => {
    if (shows) {
      const filteredShowsForTheYear = shows.pastShows.filter(
        (show) => new Date(show?.date).getFullYear() === new Date().getFullYear(),
      )
      setShowStats({
        allTimeShows: shows.pastShows.length,
        showsThisYear: filteredShowsForTheYear.length,
      })
    }
  }, [shows])

  return (
    <motion.div {...pageTransition}>
      <div className="mb-[2rem] flex flex-col items-center justify-center gap-[0.8rem]">
        <div className="aspect-square w-full max-w-[250px]">
          <LazyImage
            src={cloudinaryTransform(
              'https://res.cloudinary.com/dlgzlrzfh/image/upload/v1784421424/epk_wrylvl.svg',
            )}
            type="image"
            rounded="full"
            alt=""
          />
        </div>
        <h1 className="mt-0 w-auto border-b-0 pb-0 pl-0 text-2xl leading-normal font-medium tracking-[0.08rem] text-ink max-[500px]:text-[18px]">
          TOBI PETER
        </h1>
      </div>

      <p className="leading-[2.5em] text-muted text-justify">
        Tobi Peter is an international DJ, music producer and songwriter based in Lagos, Nigeria.
      </p>
      <p className="leading-[2.5em] text-muted text-justify">
        Tobi makes music across a wide range of genres, however, in recent time, he has established
        himself as a producer & DJ to be reckoned with when it comes to EDM and amapiano in Africa.
      </p>
      <p className="leading-[2.5em] text-muted text-justify">
        While DJing, Tobi Peter can be seen wearing his signature blue agbada which serves as an
        appeal to the eyes while he serenades the audience with his unique set.
      </p>
      <p className="mt-[2em] leading-[2.5em] text-muted text-justify">
        With a broad discography of 12 singles and 6 EPs, he continues to continuously reinvent
        himself with chart topping projects.
      </p>

      <motion.div
        {...fadeUp}
        className="w-full [&_h1]:text-[64px] [&_h1]:font-medium max-[850px]:[&_h1]:text-[32px]"
      >
        <h2 className={`${heading} mb-[2em]`}>STATS</h2>
        <div className="flex w-full items-center justify-between rounded-[9px] bg-[rgba(217,217,217,0.21)] px-[7%] py-[3.5rem] text-center text-muted max-[850px]:flex-col max-[850px]:gap-[2rem]">
          <div>
            <Counter targetNumber={showsStats.allTimeShows} />
            <p className="mt-[1rem] leading-normal [&_span]:block max-[850px]:[&_span]:inline">
              SHOWS<span>(ALL TIME)</span>
            </p>
          </div>
          <div>
            <Counter targetNumber={showsStats.showsThisYear} />
            <p className="mt-[1rem] leading-normal [&_span]:block max-[850px]:[&_span]:inline">
              SHOWS<span>(THIS YEAR)</span>
            </p>
          </div>
          <div>
            <Counter
              targetNumber={stats?.monthlyListeners.value ?? 0}
              largeValue={stats?.monthlyListeners.label || undefined}
            />
            <p className="mt-[1rem] leading-normal [&_span]:block max-[850px]:[&_span]:inline">
              MONTHLY <span>LISTENERS</span>
            </p>
          </div>
          <div>
            <Counter
              targetNumber={stats?.allTimeRemixes.value ?? 0}
              largeValue={stats?.allTimeRemixes.label || undefined}
            />
            <p className="mt-[1rem] leading-normal [&_span]:block max-[850px]:[&_span]:inline">
              REMIXES <span>(ALL TIME)</span>
            </p>
          </div>
        </div>
        <div className="mt-[3.5rem] flex w-full items-center justify-between rounded-[9px] bg-[rgba(217,217,217,0.21)] px-[7%] py-[3.5rem] text-center text-muted max-[850px]:flex-col max-[850px]:gap-[2rem]">
          <div>
            <Counter
              targetNumber={stats?.singles.value ?? 0}
              largeValue={stats?.singles.label || undefined}
            />
            <p className="leading-[2.5em] text-muted">SINGLES</p>
          </div>
          <div>
            <Counter
              targetNumber={stats?.eps.value ?? 0}
              largeValue={stats?.eps.label || undefined}
            />
            <p className="leading-[2.5em] text-muted">EPS</p>
          </div>
          <div>
            <Counter
              targetNumber={stats?.mixtapes.value ?? 0}
              largeValue={stats?.mixtapes.label || undefined}
            />
            <p className="leading-[2.5em] text-muted">MIXTAPES</p>
          </div>
          <div>
            <Counter
              targetNumber={stats?.streams.value ?? 0}
              largeValue={stats?.streams.label || undefined}
            />
            <p className="leading-[2.5em] text-muted">STREAMS</p>
          </div>
        </div>
      </motion.div>

      <motion.div {...fadeUp} className="mt-[2em] w-full">
        {/*
         * `min-[1200px]:` bleed — lets the map render wider than the page's shared text column once
         * there's actually room to gain: `main` (App.css) is `width:85%; max-width:1000px`, so its cap
         * only engages once the viewport exceeds ~1176px (1000 / 0.85); below that this is a no-op and
         * the map behaves exactly as before. Capped at 1050px, not wider — `header` (App.css) is itself
         * `max-width:1050px`, and letting the map bleed past that (an earlier version capped at 1250px)
         * makes it visibly wider than the navbar sitting above it, breaking the shared page boundary
         * every other element respects. `mx-[calc(50%-min(50vw,525px))]` is the standard centered
         * "bleed to a wider max-width" technique — using `min(50vw, 525px)` (525 = half of 1050) instead
         * of a plain `calc(50%-50vw)` means it degrades gracefully instead of overflowing if this ever
         * renders somewhere narrower than 1050px despite the breakpoint guard.
         *
         * `max-[700px]:` bleed — the opposite problem on phones: `main`'s 85% width also applies at
         * the small end, so the map (and its SVG, which scales to fill its container) was rendering at
         * ~80% of an already-small viewport — noticeably cramped. `mx-[calc(50%-50vw)]` + `w-screen` is
         * the same centered-bleed technique as above but taken all the way to the viewport edges (no
         * `min(...)` cap needed here, since there's no wider max-width to respect below 700px like
         * `header`'s 1050px above).
         */}
        <div className="relative min-h-[300px] max-[700px]:mx-[calc(50%-50vw)] max-[700px]:w-screen min-[1200px]:max-w-[1050px] min-[1200px]:mx-[calc(50%-min(50vw,525px))]">
          {isMapPending ? (
            <Loading />
          ) : isMapSuccess && mapStats.byCountry.length > 0 ? (
            <ShowsMap byCountry={mapStats.byCountry} byCity={mapStats.byCity} />
          ) : isMapSuccess && mapStats.byCountry.length === 0 ? (
            <p className="defaultText">
              <span>
                <img src={LOGO_URL} alt="" />
              </span>
              NO SHOWS DATA YET.
            </p>
          ) : (
            <p className="defaultText">
              <span>
                <img src={LOGO_URL} alt="" />
              </span>
              SOMETHING WENT WRONG.
            </p>
          )}
        </div>
      </motion.div>

      <div className="w-full">
        <h2 className={heading}>NOTABLE COLLABORATIONS</h2>
        <motion.section
          {...staggerContainer}
          className="mx-auto mt-[50px] flex max-w-[850px] flex-wrap items-center gap-[4.5rem] max-[500px]:gap-[1rem]"
        >
          {collaborations.map((brand) => (
            <motion.div
              key={brand.name}
              {...staggerItem}
              className="flex w-[50%] max-w-[153px] justify-self-center self-center max-[500px]:m-auto"
            >
              <LazyImage src={brand.src} type="epk" alt={brand.name} />
            </motion.div>
          ))}
        </motion.section>
      </div>

      <div className="w-full">
        <h2 className={heading}>ENDORSEMENTS/CO-SIGNS</h2>
        <p className="leading-[2.5em] text-muted text-justify">
          TOBI PETER HAS BEEN ENDORSED/PRAISED FOR HIS EXCEPTIONAL TALENT BY THE FOLLOWING INDUSTRY
          EXPERTS:
        </p>
        <motion.section
          {...staggerContainer}
          className="mx-auto mt-[2.5rem] flex flex-wrap justify-center gap-x-[2.5rem] gap-y-[2rem]"
        >
          {endorsements.map((artist) => (
            <motion.div
              key={artist.name}
              {...staggerItem}
              className="flex w-[100px] flex-col items-center gap-[0.7rem] max-[500px]:w-[76px]"
            >
              <LazyImage
                src={cloudinaryTransform(artist.image)}
                type="image"
                rounded="full"
                alt={artist.name}
              />
              <p className="text-center text-[0.7rem] leading-tight font-medium text-muted uppercase max-[500px]:text-[0.6rem]">
                {artist.name}
              </p>
            </motion.div>
          ))}
        </motion.section>
      </div>

      <div className="w-full">
        <motion.div {...fadeUp}>
          <h2 className={heading}>CAREER HIGHLIGHTS</h2>
          <ul className="my-[1.2rem] w-full">
            <li className="relative flex items-start gap-[0.8rem]">
              <BulletPoint />
              <p className="pl-[15px] leading-[2.5em] text-muted text-justify">
                SOLD OUT HEADLINE SHOWS
              </p>
            </li>
            <li className="relative flex items-start gap-[0.8rem]">
              <BulletPoint />
              <p className="pl-[15px] leading-[2.5em] text-muted text-justify">
                LOG RIDDIMS, SUMMER WAVS VOL. 1 & 2 PEAKED AT NUMBER 2 ON APPLE MUSIC DANCE CHART
              </p>
            </li>
            <li className="relative flex items-start gap-[0.8rem]">
              <BulletPoint />
              <p className="pl-[15px] leading-[2.5em] text-muted text-justify">
                PERFORMED ON THE SAME STAGE AS{' '}
                <span className="font-bold">
                  MAJOR LEAGUE DJZ, MR JAZZI Q, BOOHLE, NJELIC, ROSEY GOLD, SKYLA TYLA, OMARION,
                  AYRA STARR, LOJAY, VICTONY, TENI.
                </span>
              </p>
            </li>
            <li className="relative flex items-start gap-[0.8rem]">
              <BulletPoint />
              <p className="pl-[15px] leading-[2.5em] text-muted text-justify">
                GOOD BEACH RESIDENCY.
              </p>
            </li>
            <li className="relative flex items-start gap-[0.8rem]">
              <BulletPoint />
              <p className="pl-[15px] leading-[2.5em] text-muted text-justify">QATAR TOUR.</p>
            </li>
          </ul>
        </motion.div>

        <motion.div {...fadeUp}>
          <h2 className={heading}>AWARDS</h2>
          <ul className="my-[1.2rem] w-full">
            <li className="relative flex items-start gap-[0.8rem]">
              <BulletPoint />
              <p className="pl-[15px] leading-[2.5em] text-muted text-justify">
                Male DJ of the year - <span className="font-bold">Beatz Award 2024</span>.
              </p>
            </li>
          </ul>
        </motion.div>
      </div>

      <div className="w-full">
        <h2 className={heading}>SETS</h2>
        <div className="relative mt-[0.75rem] min-h-[150px]">
          {isSiteContentPending ? (
            <Loading />
          ) : isSiteContentSuccess && sets.length > 0 ? (
            <div className="mt-[1.7rem] grid grid-cols-2 gap-[1.5rem] max-[700px]:grid-cols-1">
              {sets.map((set, index) => (
                <div key={index} className="flex h-[450px] w-full flex-col gap-[1rem]">
                  <VideoPlayer url={toYoutubeEmbedUrl(set.url)} />
                  <p className="leading-[2.5em]">{set.label}</p>
                </div>
              ))}
            </div>
          ) : isSiteContentSuccess && sets.length === 0 ? (
            <p className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center text-[0.85rem] font-medium text-[var(--color-muted)]">
              <span className="mt-[0.6rem] block">
                <img className="mx-auto h-[45px] w-[45px]" src={LOGO_URL} alt="" />
              </span>
              NO VIDEOS YET.
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
      </div>

      <div className="w-full">
        <h2 className={heading}>CONTACT</h2>
        <div className="relative mt-[1em] flex items-start gap-[0.8rem]">
          <BulletPoint />
          <p className="pl-[15px] leading-[2.5em] text-muted">
            KINDLY SEND A MAIL TO <span className="font-bold">TOBIPETERMANAGEMENT@GMAIL.COM</span>{' '}
            FOR MORE INFORMATION
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default Epk
