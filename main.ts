function kehrwendung () {
    kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor1, kitronik_motor_driver.MotorDirection.Reverse, 25)
    basic.pause(800)
    motoren_aus()
    basic.pause(2000)
    vorwaerts()
}
input.onButtonPressed(Button.A, function () {
    notaus = 0
    vorwaerts()
})
function zurueck () {
    kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor1, kitronik_motor_driver.MotorDirection.Reverse, 25)
    kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor2, kitronik_motor_driver.MotorDirection.Reverse, 25)
}
function notzurueck () {
    zurueck()
    basic.pause(800)
    kehrwendung()
}
function vorwaerts () {
    kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor1, kitronik_motor_driver.MotorDirection.Forward, 25)
    kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor2, kitronik_motor_driver.MotorDirection.Forward, 25)
}
input.onButtonPressed(Button.B, function () {
    motoren_aus()
    notaus = 1
})
function motoren_aus () {
    kitronik_motor_driver.motorOff(kitronik_motor_driver.Motors.Motor1)
    kitronik_motor_driver.motorOff(kitronik_motor_driver.Motors.Motor2)
}
let notaus = 0
basic.showIcon(IconNames.SmallDiamond)
let distanz = 100
notaus = 1
basic.forever(function () {
    if (notaus == 0) {
        distanz = sonar.ping(
        DigitalPin.P1,
        DigitalPin.P2,
        PingUnit.Centimeters
        )
        if (distanz < 5) {
            notzurueck()
        } else if (distanz < 15) {
            kehrwendung()
        }
        basic.pause(500)
    }
})
