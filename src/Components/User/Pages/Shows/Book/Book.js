import {useContext} from 'react'
import InputComponent from '../../../../UI/InputComponent/InputComponent'
import Dropdown from '../../../../UI/Dropdown/Dropdown'
import RadioButton from '../../../../UI/RadioButton/RadioButton'
import './Book.css'
import Context from '../../../Context/Context'

const Book = () => {
    const ctx = useContext(Context)
    return (
        <div className="book">
            <h2>I'M AVAILABLE</h2>
            <form action="">
                <InputComponent
                    id={"name"}
                    label={"Name"}
                    error={ctx.bookFieldsErrors.name}
                    type={"text"}
                    placeholder={"Enter your name"}
                    value={ctx.bookFields.name}
                    onChange={ctx.handleBookFieldsChange}
                />
                <InputComponent
                    id={"email"}
                    label={"Email"}
                    error={ctx.bookFieldsErrors.email}
                    type={"text"}
                    placeholder={"Enter your email"}
                    value={ctx.bookFields.email}
                    onChange={ctx.handleBookFieldsChange}
                />
                <InputComponent
                    id={"company"}
                    label={"Company-Name"}
                    error={ctx.bookFieldsErrors.company}
                    type={"text"}
                    placeholder={"Enter your company name"}
                    value={ctx.bookFields.company}
                    onChange={ctx.handleBookFieldsChange}
                />
                <InputComponent
                    id={"location"}
                    label={"Location"}
                    error={ctx.bookFieldsErrors.location}
                    type={"text"}
                    placeholder={"Enter location"}
                    value={ctx.bookFields.location}
                    onChange={ctx.handleBookFieldsChange}
                />
                <div className='innerFlex'>
                    <InputComponent
                        id={"date"}
                        label={"Date"}
                        error={ctx.bookFieldsErrors.date}
                        type={"date"}
                        placeholder={"Enter Date"}
                        value={ctx.bookFields.date}
                        onChange={ctx.handleBookFieldsChange}
                    />
                    <div className="innerFormElement">
                        <label htmlFor="radio">
                            Type:
                            <small className = "error">{ctx.bookFieldsErrors.type}</small>
                        </label>
                        <div className="showTypes">
                            <RadioButton/>
                            <RadioButton/>
                            <div className="showType">
                                <input type="radio" name="type" value={ctx.bookFields.type}/>
                                <label htmlFor="type">Free</label>
                            </div>
                            <div className="showType">
                                <input type="radio" name="type" value={ctx.bookFields.type}/>
                                <label htmlFor="type">Ticketed</label>
                            </div>
                        </div>
                    </div>
                </div>
                <Dropdown/> {/**Description */}
                <Dropdown/> {/**guests */}
            </form>
        </div>
    )
}

export default Book