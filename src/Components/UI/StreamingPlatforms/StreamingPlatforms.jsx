import { BiSolidMusic, BiLogoSpotify, BiLogoYoutube } from 'react-icons/bi'
import { SiAudiomack } from 'react-icons/si'
import { PiTidalLogoBold } from 'react-icons/pi'
import useAlert from '../../../Hooks/useAlert'
import { cloudinaryTransform } from '../../../lib/cloudinary'

const PLATFORMS = [
  { id: 'appleMusic', label: 'APPLE MUSIC', Icon: BiSolidMusic },
  { id: 'spotify', label: 'SPOTIFY', Icon: BiLogoSpotify },
  { id: 'audiomack', label: 'AUDIOMACK', Icon: SiAudiomack },
  { id: 'youtube', label: 'YOUTUBE', Icon: BiLogoYoutube },
  { id: 'tidal', label: 'TIDAL', Icon: PiTidalLogoBold },
  {
    id: 'boomPlay',
    label: 'BOOMPLAY',
    iconSrc: cloudinaryTransform(
      'https://res.cloudinary.com/dlgzlrzfh/image/upload/v1784421295/boomplay-svgrepo-com_go1ecr.svg',
    ),
  },
  { id: 'youtubeMusic', label: 'YOUTUBE MUSIC', Icon: BiLogoYoutube },
]

const StreamingPlatforms = (props) => {
  const { setAlert } = useAlert()
  const links = props.song?.streamingLink

  const notify = (e) => {
    if (links[e.target.id] === '') {
      setAlert('failure', 'Link unavailable')
    }
    if (Object.values(props.song.streamingLink).every((link) => link === '') && !props.isEmpty) {
      setAlert('failure', "Song isn't released")
    }
    if (props.isEmpty) {
      setAlert('failure', 'No Song available')
    }
  }

  const linkClasses =
    'flex flex-row items-center gap-2 cursor-pointer text-[0.7rem] hover:text-[0.88rem] [transition:all_0.3s_ease] max-[500px]:relative max-[500px]:m-auto max-[500px]:w-full max-[500px]:justify-center max-[500px]:gap-[0.7rem] max-[500px]:rounded-[0.5rem] max-[500px]:bg-[#d9d9d936] max-[500px]:p-[0.8rem] max-[500px]:text-[0.9rem]'
  const liClasses = 'max-[500px]:w-full'

  return (
    <ul className="mx-auto mt-[2.5em] flex w-[90%] flex-row items-center justify-between max-[900px]:flex-wrap max-[900px]:justify-center max-[900px]:gap-[1.2rem] max-[500px]:flex-col max-[500px]:flex-nowrap max-[500px]:gap-[0.7rem]">
      {PLATFORMS.map(({ id, label, Icon, iconSrc }) => (
        <li key={id} id={id} className={liClasses}>
          <a
            rel="noreferrer"
            target="_blank"
            onClick={notify}
            href={links?.[id] !== '' ? links?.[id] : undefined}
            className={linkClasses}
          >
            {Icon ? (
              <Icon size={20} aria-hidden="true" />
            ) : (
              <img className="w-5" src={iconSrc} alt="" />
            )}
            {label}
          </a>
        </li>
      ))}
    </ul>
  )
}

export default StreamingPlatforms
