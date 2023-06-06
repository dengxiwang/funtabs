export default function showBoxShadow() {
    const localBoxShadow = window.localStorage.getItem('boxShadow')
    const localBoxShadowOpen = window.localStorage.getItem('boxShadowOpen')
    if (localBoxShadowOpen) {
        if (localBoxShadowOpen === 'true') {
            if (localBoxShadow) {
                return localBoxShadow
            } else {
                return null
            }
        } else {
            return null
        }
    }
}