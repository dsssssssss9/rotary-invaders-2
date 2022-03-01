/**
 * using new version of KY-040 extension !!
 * 
 *  
 * 
 *  now allows pin assignment
 * 
 *  
 * 
 *   ************************
 * 
 *  
 * 
 *  
 * 
 *  
 * 
 *  
 * 
 *  
 * 
 *  
 * 
 *  
 * 
 *  
 * 
 *  
 * 
 *   have asked herr klein if can have user select Pin?
 * 
 *  
 * 
 *  
 * 
 *  
 * 
 *   debouncer works fine - just need to only allow 1 shot - extra pushes are buffered
 * 
 *  
 * 
 *  
 * 
 *  
 * 
 *   TO DO
 * 
 *  
 * 
 *  
 * 
 *  
 * 
 *   ----------
 * 
 *  
 * 
 *  
 * 
 *  
 * 
 *   ADD SCORING
 * 
 *  
 * 
 *  
 * 
 *  
 * 
 *   add sound
 * 
 *  
 * 
 *  
 * 
 *  
 * 
 *   enemy movement
 * 
 *  
 * 
 *  
 * 
 *  
 * 
 *   enemy time limit
 * 
 *  
 * 
 *  
 * 
 *  
 * 
 *   bonus ships?
 * 
 *  
 * 
 *  
 * 
 *  
 * 
 *   2 player / 2 bits?
 */
function Show_Base () {
    callimatrix.SetMatrixColorbright(0x000000, 0, Pos + 1, cbrightness.hp6)
    callimatrix.SetMatrixColorbright(0x000000, 0, Pos - 1, cbrightness.hp6)
    callimatrix.SetMatrixColorbright(0x00ff00, 0, Pos, cbrightness.hp6)
    callimatrix.callimatrix_show()
}
function Show_Enemy () {
    callimatrix.SetMatrixColorbright(0xff0000, 7, Enemy)
    callimatrix.callimatrix_show()
}
function Shoot () {
    basic.showIcon(IconNames.Sword)
    for (let index = 0; index <= 7; index++) {
        callimatrix.SetMatrixColorbright(0xffff00, index + 1, Pos, cbrightness.hp2)
        callimatrix.callimatrix_show()
        basic.pause(500)
        if (Pos == Enemy && index == 7) {
            Hit()
            break;
        }
        callimatrix.SetMatrixColorbright(0x000000, index + 1, Pos, cbrightness.hp2)
        callimatrix.callimatrix_show()
    }
    basic.pause(200)
    basic.clearScreen()
}
KY040.onTurned(direction.clockwise, function () {
    Move_Left()
})
function Move_Right () {
    Pos += -1
    if (Pos <= 0) {
        Pos = 0
    }
    basic.pause(25)
    basic.clearScreen()
}
KY040.onPressEvent(DigitalPin.P14, function () {
    Shoot()
})
function Hit () {
    basic.showIcon(IconNames.Angry)
    basic.pause(200)
    callimatrix.SetMatrixColorbright(0x000000, 7, Enemy)
    callimatrix.callimatrix_show()
    Enemy = randint(0, 7)
    basic.clearScreen()
}
KY040.onTurned(direction.counterclockwise, function () {
    Move_Right()
})
function Move_Left () {
    Pos += 1
    if (Pos >= 7) {
        Pos = 7
    }
    basic.pause(25)
    basic.clearScreen()
}
let Enemy = 0
let Pos = 0
basic.showIcon(IconNames.Tortoise)
KY040.setKY040(DigitalPin.P1, DigitalPin.P15)
callimatrix.initNeoMatrix(DigitalPin.P2)
callimatrix.callimatrix_del()
Pos = 0
callimatrix.SetMatrixColorbright(0x00ff00, 0, 0, cbrightness.hp25)
callimatrix.callimatrix_show()
Enemy = randint(0, 7)
basic.pause(1000)
basic.forever(function () {
    Show_Enemy()
})
basic.forever(function () {
    Show_Base()
})
