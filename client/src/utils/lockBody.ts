export default function lockBody(active: boolean) {
    active
        ? document.body.classList.add('lock')
        : document.body.classList.remove('lock')
}
