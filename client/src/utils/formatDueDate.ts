function formatDueDate(inputDate: string | undefined): string {
    if (!inputDate) return ''

    const dateParts = inputDate.split('/')
    const year = dateParts[2]
    const month = new Date(
        +dateParts[2],
        +dateParts[0] - 1,
        +dateParts[1]
    ).toLocaleString('en-US', { month: 'short' })
    const day = dateParts[1]

    return `${getDayOfWeek(inputDate)}, ${day} ${month}`
}

function getDayOfWeek(inputDate: string): string {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const date = new Date(inputDate)
    const dayOfWeekIndex = date.getDay()
    return daysOfWeek[dayOfWeekIndex]
}
export default formatDueDate
