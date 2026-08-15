import { useContext, useState } from 'react'
import InputComponent from '../../../../UI/InputComponent/InputComponent'
import Dropdown from '../../../../UI/Dropdown/Dropdown'
import RadioButton from '../../../../UI/RadioButton/RadioButton'
import Context from '../../../Context/Context'
import useAlert from '../../../../../Hooks/useAlert'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { IoArrowBackOutline } from 'react-icons/io5'
import { pageTransition, tapScale } from '../../../../../lib/motion'

const Book = () => {
  const ctx = useContext(Context)
  const navigate = useNavigate()
  const { setAlert } = useAlert()
  const showTypes = ['Free', 'Ticketed']
  const [isClicked, setIsClicked] = useState(new Array(showTypes.length).fill(false))
  const handleTypeClick = (indexPosition, showType) => {
    for (let i = 0; i < showTypes.length; i++) {
      if (indexPosition === i) {
        isClicked[i] = true
        setIsClicked(isClicked)
      } else {
        isClicked[i] = false
        setIsClicked(isClicked)
      }
    }
    ctx.setShowType(showType)
  }
  const guestsList = ['0-200', '200-500', '500-1000', '1000-10000']
  const descriptions = [
    'Pool party',
    'Festival',
    'Project launch',
    'Corporate event',
    'Rave',
    'Fashion show',
    'Dance battle event',
    'Birthday party',
    'Normal party',
    'Themed party',
    'Wedding',
    'Tour appearance',
    'Others',
  ]
  const handleSubmit = (e) => {
    e.preventDefault()
    ctx.handleBookFieldsSubmit().then((success) => {
      if (success.yes) {
        setAlert('success', 'Successful')
        navigate('/shows')
      }
    })
  }
  return (
    <motion.div className="mx-auto w-full max-w-[800px]" {...pageTransition}>
      <h1 className="sr-only">Book Tobi Peter</h1>
      <button
        type="button"
        aria-label="Go back"
        onClick={() => navigate(-1)}
        className="border-0 bg-transparent p-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
      >
        <IoArrowBackOutline color="#1D3557" size={22} />
      </button>
      <form action="" onSubmit={handleSubmit} className="mx-auto mt-10 flex flex-col gap-[1.7rem]">
        <InputComponent
          id={'name'}
          label={'Name:'}
          error={ctx.bookFieldsErrors.name}
          type={'text'}
          placeholder={'Enter your name'}
          value={ctx.bookFieldsRegular.name}
          onChange={ctx.handleBookFieldsChange}
        />
        <InputComponent
          id={'eventName'}
          label={"Event's name:"}
          error={ctx.bookFieldsErrors.eventName}
          type={'text'}
          placeholder={"Enter event's name"}
          value={ctx.bookFieldsRegular.eventName}
          onChange={ctx.handleBookFieldsChange}
        />
        <InputComponent
          id={'email'}
          label={'Email:'}
          error={ctx.bookFieldsErrors.email}
          type={'text'}
          placeholder={'Enter your email'}
          value={ctx.bookFieldsRegular.email}
          onChange={ctx.handleBookFieldsChange}
        />
        <InputComponent
          id={'companyName'}
          label={"Company's name:"}
          error={ctx.bookFieldsErrors.companyName}
          type={'text'}
          placeholder={"Enter your company's name"}
          value={ctx.bookFieldsRegular.companyName}
          onChange={ctx.handleBookFieldsChange}
        />
        <InputComponent
          id={'location'}
          label={'Location:'}
          error={ctx.bookFieldsErrors.location}
          type={'text'}
          placeholder={"Enter event's location"}
          value={ctx.bookFieldsRegular.location}
          onChange={ctx.handleBookFieldsChange}
        />
        <div className="grid grid-cols-[60%_30%] gap-[10%] max-[730px]:grid-cols-2 max-[450px]:grid-cols-none max-[450px]:mb-[0.4rem]">
          <InputComponent
            id={'date'}
            label={'Date:'}
            error={ctx.bookFieldsErrors.date}
            type={'date'}
            placeholder={"Enter event's Date"}
            value={ctx.bookFieldsRegular.date}
            onChange={ctx.handleBookFieldsChange}
          />
          <div className="flex w-full flex-col gap-2 max-[450px]:my-4">
            <label
              htmlFor="radio"
              className="flex flex-row items-center justify-between gap-2 text-[0.85rem] font-medium text-[var(--color-muted)]"
            >
              Type:
              <small className="text-[0.75rem] font-semibold text-[rgba(255,0,0,0.936)]">
                {ctx.bookFieldsErrors.type}
              </small>
            </label>
            <div className="mt-[0.8rem] flex w-full flex-row items-center justify-between gap-6 max-[450px]:mt-0 max-[450px]:justify-normal">
              {showTypes.map((showType, id) => {
                return (
                  <RadioButton
                    key={id}
                    myId={id}
                    error={ctx.bookFieldsErrors.type}
                    radioInput={showType}
                    isClicked={isClicked[id]}
                    onClick={() => handleTypeClick(id, showType)}
                  />
                )
              })}
            </div>
          </div>
        </div>
        <div className="flex w-full flex-row items-center gap-[5%] max-[500px]:flex-col max-[500px]:gap-[1.7rem]">
          <div className="flex w-full flex-col gap-2">
            <label
              htmlFor="description"
              className="flex flex-row items-center justify-between gap-2 text-[0.85rem] font-medium text-[var(--color-muted)]"
            >
              Description:
              <small className="text-[0.75rem] font-semibold text-[rgba(255,0,0,0.936)]">
                {ctx.bookFieldsErrors.description}
              </small>
            </label>
            <Dropdown
              error={ctx.bookFieldsErrors.description}
              list={descriptions}
              onClick={ctx.setShowDescription}
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <label
              htmlFor="guests"
              className="flex flex-row items-center justify-between gap-2 text-[0.85rem] font-medium text-[var(--color-muted)]"
            >
              Guests:
              <small className="text-[0.75rem] font-semibold text-[rgba(255,0,0,0.936)]">
                {ctx.bookFieldsErrors.guests}
              </small>
            </label>
            <Dropdown
              error={ctx.bookFieldsErrors.guests}
              list={guestsList}
              onClick={ctx.setShowGuests}
            />
          </div>
        </div>
        <div className="mx-auto my-8 w-full text-center">
          <motion.button
            {...tapScale}
            type="submit"
            className="mx-auto w-full max-w-[150px] cursor-pointer rounded-[0.3rem] border-[0.1rem] border-[var(--color-ink)] bg-transparent p-[0.8rem] text-[13.3333px] text-center font-medium text-[var(--color-ink)] transition-colors duration-300 ease-in-out hover:bg-[var(--color-ink)] hover:text-[var(--color-cream)]"
          >
            SUBMIT
          </motion.button>
        </div>
      </form>
    </motion.div>
  )
}

export default Book
