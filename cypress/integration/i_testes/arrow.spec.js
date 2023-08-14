it('nada agora', () => {
//    const soma = (a, b) => {
//        return a + b
//    }

//const soma = (a, b) => a + b

//const soma = (a, b) => {//
   // return a + b
//}
   const soma = () => 5 + 5

    console.log(soma(1, 4))
})

it(' a function test...', function () {
    console.log('Function', this)
} )

it(' a Arrow function test...',  () => {
    console.log('Arrow', this)
} )