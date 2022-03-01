# // using new version of KY-040 extension !!
# 
# //
# 
# // ************************
# 
# //
# 
# // Switch must currently be on p2
# 
# //
# 
# // reconnected callimatrix so that = P0
# 
# //
# 
# // have asked herr klein if can have user select Pin?
# 
# //
# 
# // debouncer works fine - just need to only allow 1 shot - extra pushes are buffered
# 
# //
# 
# // TO DO
# 
# //
# 
# // ----------
# 
# //
# 
# // ADD SCORING
# 
# //
# 
# // add sound
# 
# //
# 
# // enemy movement
# 
# //
# 
# // enemy time limit
# 
# //
# 
# // bonus ships?
# 
# //
# 
# // 2 player / 2 bits?
def Show_Base():
    callimatrix.set_matrix_colorbright(0x000000, 0, Pos + 1, cbrightness.HP6)
    callimatrix.set_matrix_colorbright(0x000000, 0, Pos - 1, cbrightness.HP6)
    callimatrix.set_matrix_colorbright(0x00ff00, 0, Pos, cbrightness.HP6)
    callimatrix.callimatrix_show()
def Show_Enemy():
    callimatrix.set_matrix_colorbright(0xff0000, 7, Enemy)
    callimatrix.callimatrix_show()
def Shoot():
    basic.show_icon(IconNames.SWORD)
    for index in range(8):
        callimatrix.set_matrix_colorbright(0xffff00, index + 1, Pos, cbrightness.HP2)
        callimatrix.callimatrix_show()
        basic.pause(500)
        if Pos == Enemy and index == 7:
            Hit()
            break
        callimatrix.set_matrix_colorbright(0x000000, index + 1, Pos, cbrightness.HP2)
        callimatrix.callimatrix_show()
    basic.pause(200)
    basic.clear_screen()

def on_turned_clockwise():
    Move_Left()
KY040.on_turned(direction.CLOCKWISE, on_turned_clockwise)

def Move_Right():
    global Pos
    Pos += -1
    if Pos <= 0:
        Pos = 0
    basic.pause(25)
    basic.clear_screen()

def on_press_p14():
    Shoot()
KY040.on_press_event(DigitalPin.P14, on_press_p14)

def Hit():
    global Enemy
    basic.show_icon(IconNames.ANGRY)
    basic.pause(200)
    callimatrix.set_matrix_colorbright(0x000000, 7, Enemy)
    callimatrix.callimatrix_show()
    Enemy = randint(0, 7)
    basic.clear_screen()

def on_turned_counterclockwise():
    Move_Right()
KY040.on_turned(direction.COUNTERCLOCKWISE, on_turned_counterclockwise)

def Move_Left():
    global Pos
    Pos += 1
    if Pos >= 7:
        Pos = 7
    basic.pause(25)
    basic.clear_screen()
Enemy = 0
Pos = 0
basic.show_icon(IconNames.TORTOISE)
KY040.set_ky040(DigitalPin.P1, DigitalPin.P15)
callimatrix.init_neo_matrix(DigitalPin.P2)
callimatrix.callimatrix_del()
Pos = 0
callimatrix.set_matrix_colorbright(0x00ff00, 0, 0, cbrightness.HP25)
callimatrix.callimatrix_show()
Enemy = randint(0, 7)
basic.pause(1000)

def on_forever():
    Show_Enemy()
basic.forever(on_forever)

def on_forever2():
    Show_Base()
basic.forever(on_forever2)
