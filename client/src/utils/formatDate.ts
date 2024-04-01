const formatDate = (inputDate: any) => {
    const date = new Date(inputDate)

    const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ]
    const month = monthNames[date.getMonth()]

    const day = date.getDate()
    const hours = date.getHours()
    const minutes = date.getMinutes()

    let formattedDate = `${month} ${day < 10 ? '0' + day : day} at ${hours > 12 ? hours - 12 : hours}:${minutes < 10 ? '0' + minutes : minutes}`

    formattedDate += hours >= 12 ? ' pm' : ' am'

    return formattedDate
}
export default formatDate

// "Mar 23 at 2:26 pm"
