const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export function validateBookingFields(entry) {
  const errors = {}
  if (entry.name === '') errors.name = 'Name cannot be empty.'
  if (entry.eventName === '') errors.eventName = "Event's name cannot be empty."
  if (!emailRegex.test(entry.email)) errors.email = 'Enter a valid email.'
  if (entry.companyName === '') errors.companyName = "Company's name cannot be empty."
  if (entry.date === '') errors.date = 'Date cannot be empty.'
  if (entry.location === '') errors.location = 'Location cannot be empty.'
  if (entry.type === '') errors.type = 'Type cannot be empty .'
  if (entry.description === '') errors.description = 'Description cannot be empty.'
  if (entry.expectedGuests === '') errors.guests = 'Guests cannot be empty.'
  return errors
}
