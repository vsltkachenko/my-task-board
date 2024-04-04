function formatDueDate(inputDate: string | undefined): string {
    if (!inputDate) return ''

    const date = new Date(inputDate)
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
    })
}
export default formatDueDate
