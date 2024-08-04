let element = document.querySelector('.dot')

element.animate([
    { borderRadius: '0%' },
    { borderRadius: '50%' },
    ], {
        duration: 300,
        fill: 'forwards',
    }
)

function bounceDot(height:number, width:number, increaseHeightBy:number, increaseWidthBy:number, bounces:number, bounceDuration: number){
    if(bounces === 0) return

    element.animate([
        { transform: 'translateY(0)' },
        { transform: `translateY(-${height}rem)`, width: `${width}rem` },
        { transform: 'translateY(0)' },
    ], {
        duration: bounceDuration,
        fill: 'forwards',
        easing: 'ease-out'
    })

    setTimeout(() => {
        bounceDot(height + increaseHeightBy, width + increaseWidthBy, increaseHeightBy, increaseWidthBy, bounces - 1, bounceDuration)
    }, bounceDuration)
}
setTimeout(() => {
    bounceDot(1, 0.5, 0.5, 0.1, 5, 500)

    setTimeout(() => {
        element.animate([
            { transform: 'translateY(5.5ch) translateX(1ch)', width: '10ch' }
        ], {
            duration: 200,
            fill: 'forwards',
            easing: 'ease'
        })
    },500*5)
},1000)

