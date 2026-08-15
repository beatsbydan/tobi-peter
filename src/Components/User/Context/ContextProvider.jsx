import Context from './Context'
import { useState } from 'react'
import useAlert from '../../../Hooks/useAlert'
import { useSendBookingMutation } from '../../../queries/useBooking'
import { validateBookingFields } from '../../../validators/validateBooking'

const ContextProvider = (props) => {
  const { setAlert } = useAlert()
  const sendBookingMutation = useSendBookingMutation()

  // BOOK TOBI PETER

  const [bookFieldsRegular, setBookFieldsRegular] = useState({
    name: '',
    eventName: '',
    email: '',
    companyName: '',
    date: '',
    location: '',
  })

  const [bookFieldsSpecifics, setBookFieldsSpecifics] = useState({
    type: '',
    expectedGuests: '',
    description: '',
  })
  const [bookFieldsErrors, setBookFieldsErrors] = useState({})

  const handleBookFieldsChange = (e) => {
    const { id, value } = e.target
    setBookFieldsRegular((prev) => {
      return { ...prev, [id]: value }
    })
  }

  const setShowType = (showType) => {
    setBookFieldsSpecifics({
      type: showType,
      expectedGuests: bookFieldsSpecifics.expectedGuests,
      description: bookFieldsSpecifics.description,
    })
  }
  const setShowGuests = (guests) => {
    setBookFieldsSpecifics({
      type: bookFieldsSpecifics.type,
      expectedGuests: guests,
      description: bookFieldsSpecifics.description,
    })
  }
  const setShowDescription = (desc) => {
    setBookFieldsSpecifics({
      type: bookFieldsSpecifics.type,
      expectedGuests: bookFieldsSpecifics.expectedGuests,
      description: desc,
    })
  }

  const handleBookFieldsSubmit = async () => {
    const bookFields = {
      name: bookFieldsRegular.name,
      eventName: bookFieldsRegular.eventName,
      email: bookFieldsRegular.email,
      companyName: bookFieldsRegular.companyName,
      date: bookFieldsRegular.date,
      location: bookFieldsRegular.location,
      type: bookFieldsSpecifics.type,
      expectedGuests: bookFieldsSpecifics.expectedGuests,
      description: bookFieldsSpecifics.description,
    }
    const fieldErrors = validateBookingFields(bookFields)
    if (Object.keys(fieldErrors).length > 0) {
      setBookFieldsErrors(fieldErrors)
      setAlert('failure', 'Something went wrong!')
      return { yes: false }
    }
    try {
      await sendBookingMutation.mutateAsync(bookFields)
      setBookFieldsErrors({})
      return { yes: true }
    } catch {
      setAlert('failure', 'Something went wrong!')
      return { yes: false }
    }
  }

  // CONTEXT VALUES

  const value = {
    bookFieldsRegular: bookFieldsRegular,
    bookFieldsSpecifics: bookFieldsSpecifics,
    bookFieldsErrors: bookFieldsErrors,
    isSubmitting: sendBookingMutation.isPending,
    setShowType: setShowType,
    setShowGuests: setShowGuests,
    setShowDescription: setShowDescription,
    handleBookFieldsChange: handleBookFieldsChange,
    handleBookFieldsSubmit: handleBookFieldsSubmit,
  }

  return <Context.Provider value={value}>{props.children}</Context.Provider>
}
export default ContextProvider
