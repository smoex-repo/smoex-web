const xx = ['1']
const xxx = pipe(
    range(xx.length),
    map(x => xx[x]),
    filter(x => x === 1),
    merge(x => ({ [x.key]: x.value }))
)
const xxx = pipe(
    xx,
    map(x => xx[x]),
    filter(x => x === 1),
    merge(x => ({ [x.key]: x.value }))
)
const a = {
    'key': 1
}
const x = pipe(
    range(a),
    map(key, value => [ key, value ])
)

a.key = 2

const role = {

}

const roles = [
    {}
]
const action = {
    role_id: 1,
    card_id: 1,
    target_id: 1,
}

