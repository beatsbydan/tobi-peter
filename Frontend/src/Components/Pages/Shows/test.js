const date = new Date('2023-7-24')
const myDate = date.getDate()
const myMonth = date.getMonth()
const getMonth = (myMonth) => {
    date.setMonth(myMonth)
    return date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
}
console.log(date, myDate, getMonth(myMonth))

const sortUpcomingShows = (array) => {
    let swapped = false
    do{
        for(let i = 0; i <array.length; i ++){
            for(let j = i + 1; j < array.length; j ++){
                if(array[i].date.day > array[j].date.day){
                    let temp = array[i]
                    array[i] = array[j]
                    array[j] = temp
                    swapped = true
                }
                else{
                    swapped = false
                }
            }
        }
    }
    while(swapped)
    return array
}
const sortPastShows = (array) => {
    let swapped = false
    do{
        for(let i = 0; i <array.length; i ++){
            for(let j = i + 1; j < array.length; j ++){
                if(array[i].date.day < array[j].date.day){
                    let temp = array[i]
                    array[i] = array[j]
                    array[j] = temp
                    swapped = true
                }
                else{
                    swapped = false
                }
            }
        }
    }
    while (swapped)
    return array
}
