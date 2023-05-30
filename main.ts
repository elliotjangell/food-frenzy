enum ActionKind {
    Walking,
    Idle,
    Jumping
}
namespace SpriteKind {
    export const BIGENEMY = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.BIGENEMY, function (sprite, otherSprite) {
    music.play(music.createSoundEffect(WaveShape.Square, 1, 1, 255, 0, 500, SoundExpressionEffect.Warble, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    info.changeLifeBy(-3)
    info.startCountdown(10)
    sprites.destroy(otherSprite, effects.ashes, 500)
})
sprites.onDestroyed(SpriteKind.BIGENEMY, function (sprite) {
    sprite.startEffect(effects.ashes)
})
info.onCountdownEnd(function () {
    info.changeLifeBy(-1)
    info.startCountdown(10)
})
info.onLifeZero(function () {
    characterAnimations.setCharacterAnimationsEnabled(mySprite, false)
    controller.moveSprite(mySprite, 0, 0)
    mySprite.setImage(img`
        . . . . f f f f . . . . . 
        . . f f f f f f f f . . . 
        . f f f f f f c f f f . . 
        f f f f f f c c f f f c . 
        f f f c f f f f f f f c . 
        c c c f f f e e f f c c . 
        f f f f f e e f f c c f . 
        f f f b f e e f b f f f . 
        . f 4 1 f 4 4 f 1 4 f . . 
        e f e 4 4 f f 4 4 e f e . 
        e f f f e f f e f f f e . 
        e 4 f b 7 7 7 7 b f 4 e . 
        f e f 7 7 7 7 7 7 f e f . 
        . . f 6 6 6 6 6 6 f . . . 
        . . . f f f f f f . . . . 
        . . . f f . . f f . . . . 
        `)
    timer.after(100, function () {
        game.gameOver(true)
    })
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    if (controller.B.isPressed()) {
        music.play(music.createSoundEffect(WaveShape.Square, 27, 143, 255, 0, 500, SoundExpressionEffect.Tremolo, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        sprites.destroy(otherSprite, effects.disintegrate, 500)
        if (sprites.readDataString(otherSprite, "foodType") == "pizza") {
            info.changeCountdownBy(4)
        } else if (sprites.readDataString(otherSprite, "foodType") == "taco") {
            info.changeCountdownBy(0.5)
            info.changeScoreBy(1)
        } else if (sprites.readDataString(otherSprite, "foodType") == "iceCream") {
            info.changeLifeBy(1)
            info.changeScoreBy(5)
        } else if (sprites.readDataString(otherSprite, "foodType") == "bigIceCream") {
            foodFrenzy = true
            info.changeLifeBy(2)
            textSprite = textsprite.create("FOOD FRENZY!", 0, 6)
            textSprite.x = scene.cameraProperty(CameraProperty.X)
            textSprite.scale = 2
            textSprite.setOutline(1, 9)
            textSprite.lifespan = 2000
            for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
                value.follow(mySprite, 0)
                value.setStayInScreen(false)
                value.setVelocity(-50, -50)
                value.sayText("No! Run!")
                value.lifespan = 5000
            }
            for (let value of sprites.allOfKind(SpriteKind.BIGENEMY)) {
                value.follow(mySprite, 0)
                value.setStayInScreen(false)
                value.setVelocity(-50, -50)
                value.sayText("WHAT?! NO!")
                value.lifespan = 5000
            }
            pause(10000)
            foodFrenzy = false
        }
    }
})
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    sprite.startEffect(effects.ashes)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    music.play(music.createSoundEffect(WaveShape.Square, 143, 27, 255, 0, 500, SoundExpressionEffect.Tremolo, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    info.changeLifeBy(-1)
    info.startCountdown(10)
    sprites.destroy(otherSprite, effects.ashes, 500)
})
let mySprite6: Sprite = null
let mySprite5: Sprite = null
let mySprite4: Sprite = null
let mySprite3: Sprite = null
let mySprite2: Sprite = null
let textSprite: TextSprite = null
let foodFrenzy = false
let mySprite: Sprite = null
game.setGameOverPlayable(true, music.melodyPlayable(music.buzzer), false)
game.setGameOverEffect(true, effects.none)
game.setGameOverScoringType(game.ScoringType.HighScore)
game.setGameOverMessage(true, "Finish!")
music.play(music.createSong(hex`00a0000408040205001c000f0a006400f4010a00000400000000000000000000000000000000026c0000000400012708000c00012410001400012218001c0001201c00200001222400280001222c003000012230003400012238003c00012240004400012748004c00012450005400012258005c0001205c00600001226400680001246c007000012270007400012278007c00012209010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c80072000000010001040800090001041000110001081800190001041c001d0001042400250001042c002d0001043000310001083800390001083c003d0001084000410001044800490001045000510001085800590001045c005d0001046400650001046c006d000104700071000108780079000108`), music.PlaybackMode.InBackground)
let textSprite2 = textsprite.create("Thanks to Issac Kantz", 0, 1)
textSprite2.setPosition(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y))
let textSprite3 = textsprite.create("for your suggestions")
textSprite3.setPosition(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y) + 10)
pause(2000)
textSprite2.vy = -50
textSprite3.vy = -50
pause(2000)
scene.setBackgroundColor(8)
sprites.destroy(textSprite2)
sprites.destroy(textSprite3)
let textSprite4 = textsprite.create("Food Frenzy", 0, 6)
textSprite4.x = scene.cameraProperty(CameraProperty.X)
textSprite4.y = scene.cameraProperty(CameraProperty.Y) - 12
textSprite4.scale = 2
textSprite4.setOutline(1, 9)
let textSprite5 = textsprite.create("Created by Elliot Angell")
textSprite5.x = scene.cameraProperty(CameraProperty.X)
pause(3000)
game.setDialogFrame(img`
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    `)
game.setDialogCursor(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `)
game.setDialogTextColor(1)
game.showLongText("Press A or down to start", DialogLayout.Bottom)
scene.setBackgroundColor(2)
sprites.destroy(textSprite4)
sprites.destroy(textSprite5)
music.play(music.createSong(hex`00a0000408040205001c000f0a006400f4010a00000400000000000000000000000000000000026c0000000400012708000c00012410001400012218001c0001201c00200001222400280001222c003000012230003400012238003c00012240004400012748004c00012450005400012258005c0001205c00600001226400680001246c007000012270007400012278007c00012209010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c80072000000010001040800090001041000110001081800190001041c001d0001042400250001042c002d0001043000310001083800390001083c003d0001084000410001044800490001045000510001085800590001045c005d0001046400650001046c006d000104700071000108780079000108`), music.PlaybackMode.LoopingInBackground)
mySprite = sprites.create(img`
    . . . . f f f f . . . . . 
    . . f f f f f f f f . . . 
    . f f f f f f c f f f . . 
    f f f f f f c c f f f c . 
    f f f c f f f f f f f c . 
    c c c f f f e e f f c c . 
    f f f f f e e f f c c f . 
    f f f b f e e f b f f f . 
    . f 4 1 f 4 4 f 1 4 f . . 
    . f e 4 4 4 4 4 4 e f . . 
    . f f f e e e e f f f . . 
    f e f b 7 7 7 7 b f e f . 
    e 4 f 7 7 7 7 7 7 f 4 e . 
    e e f 6 6 6 6 6 6 f e e . 
    . . . f f f f f f . . . . 
    . . . f f . . f f . . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
info.setLife(3)
info.startCountdown(10)
characterAnimations.loopFrames(
mySprite,
[img`
    . . . . . . . . . . . . . 
    . . . f f f f f f . . . . 
    . f f f f f f f f f . . . 
    . f f f f f f c f f f . . 
    f f f f c f f f c f f f . 
    f c f f c c f f f c c f f 
    f c c f f f f e f f f f f 
    f f f f f f f e e f f f . 
    f f e e f b f e e f f f . 
    f f e 4 e 1 f 4 4 f f . . 
    . f f f e 4 4 4 4 f . . . 
    . 4 4 4 e e e e f f . . . 
    . e 4 4 e 7 7 7 7 f . . . 
    . f e e f 6 6 6 6 f f . . 
    . f f f f f f f f f f . . 
    . . f f . . . f f f . . . 
    `,img`
    . . . . . . . . . . . . . 
    . . . f f f f f f . . . . 
    . f f f f f f f f f . . . 
    . f f f f f f c f f f . . 
    f f f f c f f f c f f f . 
    f c f f c c f f f c c f f 
    f c c f f f f e f f f f f 
    f f f f f f f e e f f f . 
    f f e e f b f e e f f . . 
    . f e 4 e 1 f 4 4 f f . . 
    . f f f e e 4 4 4 f . . . 
    . . f e 4 4 e e f f . . . 
    . . f e 4 4 e 7 7 f . . . 
    . f f f e e f 6 6 f f . . 
    . f f f f f f f f f f . . 
    . . f f . . . f f f . . . 
    `,img`
    . . . f f f f f . . . . . 
    . f f f f f f f f f . . . 
    . f f f f f f c f f f . . 
    f f f f c f f f c f f . . 
    f c f f c c f f f c c f f 
    f c c f f f f e f f f f f 
    f f f f f f f e e f f f . 
    f f e e f b f e e f f . . 
    . f e 4 e 1 f 4 4 f . . . 
    . f f f e 4 4 4 4 f . . . 
    . . f e e e e e f f . . . 
    . . e 4 4 e 7 7 7 f . . . 
    . . e 4 4 e 7 7 7 f . . . 
    . . f e e f 6 6 6 f . . . 
    . . . f f f f f f . . . . 
    . . . . f f f . . . . . . 
    `],
150,
characterAnimations.rule(Predicate.MovingRight)
)
characterAnimations.loopFrames(
mySprite,
[img`
    . . . . . f f f f f . . . 
    . . . f f f f f f f f f . 
    . . f f f c f f f f f f . 
    . . f f c f f f c f f f f 
    f f c c f f f c c f f c f 
    f f f f f e f f f f c c f 
    . f f f e e f f f f f f f 
    . . f f e e f b f e e f f 
    . . . f 4 4 f 1 e 4 e f . 
    . . . f 4 4 4 4 e f f f . 
    . . . f f e e e e e f . . 
    . . . f 7 7 7 e 4 4 e . . 
    . . . f 7 7 7 e 4 4 e . . 
    . . . f 6 6 6 f e e f . . 
    . . . . f f f f f f . . . 
    . . . . . . f f f . . . . 
    `,img`
    . . . . . . . . . . . . . 
    . . . . f f f f f f . . . 
    . . . f f f f f f f f f . 
    . . f f f c f f f f f f . 
    . f f f c f f f c f f f f 
    f f c c f f f c c f f c f 
    f f f f f e f f f f c c f 
    . f f f e e f f f f f f f 
    . . f f e e f b f e e f f 
    . . f f 4 4 f 1 e 4 e f . 
    . . . f 4 4 4 e e f f f . 
    . . . f f e e 4 4 e f . . 
    . . . f 7 7 e 4 4 e f . . 
    . . f f 6 6 f e e f f f . 
    . . f f f f f f f f f f . 
    . . . f f f . . . f f . . 
    `,img`
    . . . . . . . . . . . . . 
    . . . . f f f f f f . . . 
    . . . f f f f f f f f f . 
    . . f f f c f f f f f f . 
    . f f f c f f f c f f f f 
    f f c c f f f c c f f c f 
    f f f f f e f f f f c c f 
    . f f f e e f f f f f f f 
    . f f f e e f b f e e f f 
    . . f f 4 4 f 1 e 4 e f f 
    . . . f 4 4 4 4 e f f f . 
    . . . f f e e e e 4 4 4 . 
    . . . f 7 7 7 7 e 4 4 e . 
    . . f f 6 6 6 6 f e e f . 
    . . f f f f f f f f f f . 
    . . . f f f . . . f f . . 
    `],
150,
characterAnimations.rule(Predicate.MovingLeft)
)
characterAnimations.loopFrames(
mySprite,
[img`
    . . . . . . . . . . . . . 
    . . . f f f f f f . . . . 
    . f f f f f f f f f . . . 
    . f f f f f f c f f f . . 
    f f f f c f f f c f f f . 
    f c f f c c f f f c c f f 
    f c c f f f f e f f f f f 
    f f f f f f f e e f f f . 
    f f e e f b f e e f f f . 
    f f e 4 e 1 f 4 4 f f . . 
    . f f f e 4 4 4 4 f . . . 
    . 4 4 4 e e e e f f . . . 
    . e 4 4 e 7 7 7 7 f . . . 
    . f e e f 6 6 6 6 f f . . 
    . f f f f f f f f f f . . 
    . . f f . . . f f f . . . 
    `,img`
    . . . . . . . . . . . . . 
    . . . f f f f f f . . . . 
    . f f f f f f f f f . . . 
    . f f f f f f c f f f . . 
    f f f f c f f f c f f f . 
    f c f f c c f f f c c f f 
    f c c f f f f e f f f f f 
    f f f f f f f e e f f f . 
    f f e e f b f e e f f . . 
    . f e 4 e 1 f 4 4 f f . . 
    . f f f e e 4 4 4 f . . . 
    . . f e 4 4 e e f f . . . 
    . . f e 4 4 e 7 7 f . . . 
    . f f f e e f 6 6 f f . . 
    . f f f f f f f f f f . . 
    . . f f . . . f f f . . . 
    `,img`
    . . . f f f f f . . . . . 
    . f f f f f f f f f . . . 
    . f f f f f f c f f f . . 
    f f f f c f f f c f f . . 
    f c f f c c f f f c c f f 
    f c c f f f f e f f f f f 
    f f f f f f f e e f f f . 
    f f e e f b f e e f f . . 
    . f e 4 e 1 f 4 4 f . . . 
    . f f f e 4 4 4 4 f . . . 
    . . f e e e e e f f . . . 
    . . e 4 4 e 7 7 7 f . . . 
    . . e 4 4 e 7 7 7 f . . . 
    . . f e e f 6 6 6 f . . . 
    . . . f f f f f f . . . . 
    . . . . f f f . . . . . . 
    `],
150,
characterAnimations.rule(Predicate.MovingRight, Predicate.MovingUp)
)
characterAnimations.loopFrames(
mySprite,
[img`
    . . . . . f f f f f . . . 
    . . . f f f f f f f f f . 
    . . f f f c f f f f f f . 
    . . f f c f f f c f f f f 
    f f c c f f f c c f f c f 
    f f f f f e f f f f c c f 
    . f f f e e f f f f f f f 
    . . f f e e f b f e e f f 
    . . . f 4 4 f 1 e 4 e f . 
    . . . f 4 4 4 4 e f f f . 
    . . . f f e e e e e f . . 
    . . . f 7 7 7 e 4 4 e . . 
    . . . f 7 7 7 e 4 4 e . . 
    . . . f 6 6 6 f e e f . . 
    . . . . f f f f f f . . . 
    . . . . . . f f f . . . . 
    `,img`
    . . . . . . . . . . . . . 
    . . . . f f f f f f . . . 
    . . . f f f f f f f f f . 
    . . f f f c f f f f f f . 
    . f f f c f f f c f f f f 
    f f c c f f f c c f f c f 
    f f f f f e f f f f c c f 
    . f f f e e f f f f f f f 
    . . f f e e f b f e e f f 
    . . f f 4 4 f 1 e 4 e f . 
    . . . f 4 4 4 e e f f f . 
    . . . f f e e 4 4 e f . . 
    . . . f 7 7 e 4 4 e f . . 
    . . f f 6 6 f e e f f f . 
    . . f f f f f f f f f f . 
    . . . f f f . . . f f . . 
    `,img`
    . . . . . . . . . . . . . 
    . . . . f f f f f f . . . 
    . . . f f f f f f f f f . 
    . . f f f c f f f f f f . 
    . f f f c f f f c f f f f 
    f f c c f f f c c f f c f 
    f f f f f e f f f f c c f 
    . f f f e e f f f f f f f 
    . f f f e e f b f e e f f 
    . . f f 4 4 f 1 e 4 e f f 
    . . . f 4 4 4 4 e f f f . 
    . . . f f e e e e 4 4 4 . 
    . . . f 7 7 7 7 e 4 4 e . 
    . . f f 6 6 6 6 f e e f . 
    . . f f f f f f f f f f . 
    . . . f f f . . . f f . . 
    `],
150,
characterAnimations.rule(Predicate.MovingLeft, Predicate.MovingUp)
)
characterAnimations.loopFrames(
mySprite,
[img`
    . . . . . . . . . . . . . 
    . . . f f f f f f . . . . 
    . f f f f f f f f f . . . 
    . f f f f f f c f f f . . 
    f f f f c f f f c f f f . 
    f c f f c c f f f c c f f 
    f c c f f f f e f f f f f 
    f f f f f f f e e f f f . 
    f f e e f b f e e f f f . 
    f f e 4 e 1 f 4 4 f f . . 
    . f f f e 4 4 4 4 f . . . 
    . 4 4 4 e e e e f f . . . 
    . e 4 4 e 7 7 7 7 f . . . 
    . f e e f 6 6 6 6 f f . . 
    . f f f f f f f f f f . . 
    . . f f . . . f f f . . . 
    `,img`
    . . . . . . . . . . . . . 
    . . . f f f f f f . . . . 
    . f f f f f f f f f . . . 
    . f f f f f f c f f f . . 
    f f f f c f f f c f f f . 
    f c f f c c f f f c c f f 
    f c c f f f f e f f f f f 
    f f f f f f f e e f f f . 
    f f e e f b f e e f f . . 
    . f e 4 e 1 f 4 4 f f . . 
    . f f f e e 4 4 4 f . . . 
    . . f e 4 4 e e f f . . . 
    . . f e 4 4 e 7 7 f . . . 
    . f f f e e f 6 6 f f . . 
    . f f f f f f f f f f . . 
    . . f f . . . f f f . . . 
    `,img`
    . . . f f f f f . . . . . 
    . f f f f f f f f f . . . 
    . f f f f f f c f f f . . 
    f f f f c f f f c f f . . 
    f c f f c c f f f c c f f 
    f c c f f f f e f f f f f 
    f f f f f f f e e f f f . 
    f f e e f b f e e f f . . 
    . f e 4 e 1 f 4 4 f . . . 
    . f f f e 4 4 4 4 f . . . 
    . . f e e e e e f f . . . 
    . . e 4 4 e 7 7 7 f . . . 
    . . e 4 4 e 7 7 7 f . . . 
    . . f e e f 6 6 6 f . . . 
    . . . f f f f f f . . . . 
    . . . . f f f . . . . . . 
    `],
150,
characterAnimations.rule(Predicate.MovingRight, Predicate.MovingDown)
)
characterAnimations.loopFrames(
mySprite,
[img`
    . . . . . f f f f f . . . 
    . . . f f f f f f f f f . 
    . . f f f c f f f f f f . 
    . . f f c f f f c f f f f 
    f f c c f f f c c f f c f 
    f f f f f e f f f f c c f 
    . f f f e e f f f f f f f 
    . . f f e e f b f e e f f 
    . . . f 4 4 f 1 e 4 e f . 
    . . . f 4 4 4 4 e f f f . 
    . . . f f e e e e e f . . 
    . . . f 7 7 7 e 4 4 e . . 
    . . . f 7 7 7 e 4 4 e . . 
    . . . f 6 6 6 f e e f . . 
    . . . . f f f f f f . . . 
    . . . . . . f f f . . . . 
    `,img`
    . . . . . . . . . . . . . 
    . . . . f f f f f f . . . 
    . . . f f f f f f f f f . 
    . . f f f c f f f f f f . 
    . f f f c f f f c f f f f 
    f f c c f f f c c f f c f 
    f f f f f e f f f f c c f 
    . f f f e e f f f f f f f 
    . . f f e e f b f e e f f 
    . . f f 4 4 f 1 e 4 e f . 
    . . . f 4 4 4 e e f f f . 
    . . . f f e e 4 4 e f . . 
    . . . f 7 7 e 4 4 e f . . 
    . . f f 6 6 f e e f f f . 
    . . f f f f f f f f f f . 
    . . . f f f . . . f f . . 
    `,img`
    . . . . . . . . . . . . . 
    . . . . f f f f f f . . . 
    . . . f f f f f f f f f . 
    . . f f f c f f f f f f . 
    . f f f c f f f c f f f f 
    f f c c f f f c c f f c f 
    f f f f f e f f f f c c f 
    . f f f e e f f f f f f f 
    . f f f e e f b f e e f f 
    . . f f 4 4 f 1 e 4 e f f 
    . . . f 4 4 4 4 e f f f . 
    . . . f f e e e e 4 4 4 . 
    . . . f 7 7 7 7 e 4 4 e . 
    . . f f 6 6 6 6 f e e f . 
    . . f f f f f f f f f f . 
    . . . f f f . . . f f . . 
    `],
150,
characterAnimations.rule(Predicate.MovingLeft, Predicate.MovingDown)
)
characterAnimations.loopFrames(
mySprite,
[img`
    . . . . f f f f . . . . . 
    . . f f c c c c f f . . . 
    . f f c c c c c c f f . . 
    f f c c c c c c c c f f . 
    f f c c f c c c c c c f . 
    f f f f f c c c f c c f . 
    f f f f c c c f c c f f . 
    f f f f f f f f f f f f . 
    f f f f f f f f f f f f . 
    . f f f f f f f f f f . . 
    . f f f f f f f f f f . . 
    f e f f f f f f f f e f . 
    e 4 f 7 7 7 7 7 7 c 4 e . 
    e e f 6 6 6 6 6 6 f e e . 
    . . . f f f f f f . . . . 
    . . . f f . . f f . . . . 
    `,img`
    . . . . . . . . . . . . . 
    . . . . . f f f f . . . . 
    . . . f f c c c c f f . . 
    . f f f c c c c c c f f . 
    f f c c c c c c c c c f f 
    f c c c c f c c c c c c f 
    . f f f f c c c c f c c f 
    . f f f f c c f c c c f f 
    . f f f f f f f f f f f f 
    . f f f f f f f f f f f f 
    . . f f f f f f f f f f . 
    . . e f f f f f f f f f . 
    . . e f f f f f f f f e f 
    . . 4 c 7 7 7 7 7 e 4 4 e 
    . . e f f f f f f f e e . 
    . . . f f f . . . . . . . 
    `,img`
    . . . . . . . . . . . . . 
    . . . . . f f f f . . . . 
    . . . f f c c c c f f . . 
    . . f f c c c c c c f f . 
    . f f f c c c c c c c f f 
    f f f c c c c c c c c c f 
    f f c c c f c c c c c c f 
    . f f f f f c c c f c f f 
    . f f f f c c f f c f f f 
    . . f f f f f f f f f f f 
    . . f f f f f f f f f f . 
    . . f f f f f f f f f e . 
    . f e f f f f f f f f e . 
    . e 4 4 e 7 7 7 7 7 c 4 . 
    . . e e f f f f f f f e . 
    . . . . . . . . f f f . . 
    `],
150,
characterAnimations.rule(Predicate.MovingUp)
)
characterAnimations.loopFrames(
mySprite,
[img`
    . . . . f f f f . . . . . 
    . . f f f f f f f f . . . 
    . f f f f f f c f f f . . 
    f f f f f f c c f f f c . 
    f f f c f f f f f f f c . 
    c c c f f f e e f f c c . 
    f f f f f e e f f c c f . 
    f f f b f e e f b f f f . 
    . f 4 1 f 4 4 f 1 4 f . . 
    . f e 4 4 4 4 4 4 e f . . 
    . f f f e e e e f f f . . 
    f e f b 7 7 7 7 b f e f . 
    e 4 f 7 7 7 7 7 7 f 4 e . 
    e e f 6 6 6 6 6 6 f e e . 
    . . . f f f f f f . . . . 
    . . . f f . . f f . . . . 
    `,img`
    . . . . . . . . . . . . . 
    . . . . . f f f f . . . . 
    . . . f f f f f f f f . . 
    . . f f f f f f c f f f . 
    f f f f f f f c c f f f c 
    f f f f c f f f f f f f c 
    . c c c f f f e e f f c c 
    . f f f f f e e f f c c f 
    . f f f b f e e f b f f f 
    . f f 4 1 f 4 4 f 1 4 f f 
    . . f e 4 4 4 4 4 e e f e 
    . f e f b 7 7 7 e 4 4 4 e 
    . e 4 f 7 7 7 7 e 4 4 e . 
    . . . f 6 6 6 6 6 e e . . 
    . . . f f f f f f f . . . 
    . . . f f f . . . . . . . 
    `,img`
    . . . . . . . . . . . . . 
    . . . . f f f f . . . . . 
    . . f f f f f f f f . . . 
    . f f f c f f f f f f . . 
    c f f f c c f f f f f f f 
    c f f f f f f f c f f f f 
    c c f f e e f f f c c c . 
    f c c f f e e f f f f f . 
    f f f b f e e f b f f f . 
    f f 4 1 f 4 4 f 1 4 f f . 
    e f e e 4 4 4 4 4 e f . . 
    e 4 4 4 e 7 7 7 b f e f . 
    . e 4 4 e 7 7 7 7 f 4 e . 
    . . e e 6 6 6 6 6 f . . . 
    . . . f f f f f f f . . . 
    . . . . . . . f f f . . . 
    `],
150,
characterAnimations.rule(Predicate.MovingDown)
)
characterAnimations.loopFrames(
mySprite,
[img`
    . . . . f f f f . . . . . 
    . . f f f f f f f f . . . 
    . f f f f f f c f f f . . 
    f f f f f f c c f f f c . 
    f f f c f f f f f f f c . 
    c c c f f f e e f f c c . 
    f f f f f e e f f c c f . 
    f f f b f e e f b f f f . 
    . f 4 1 f 4 4 f 1 4 f . . 
    . f e 4 4 4 4 4 4 e f . . 
    . f f f e e e e f f f . . 
    f e f b 7 7 7 7 b f e f . 
    e 4 f 7 7 7 7 7 7 f 4 e . 
    e e f 6 6 6 6 6 6 f e e . 
    . . . f f f f f f . . . . 
    . . . f f . . f f . . . . 
    `],
150,
characterAnimations.rule(Predicate.NotMoving)
)
game.onUpdateInterval(1000, function () {
    if (Math.percentChance(20)) {
        mySprite2 = sprites.create(img`
            . . . . . . . e e e e . . . . . 
            . . . . . e e 4 5 5 5 e e . . . 
            . . . . e 4 5 6 2 2 7 6 6 e . . 
            . . . e 5 6 6 7 2 2 6 4 4 4 e . 
            . . e 5 2 2 7 6 6 4 5 5 5 5 4 . 
            . e 5 6 2 2 8 8 5 5 5 5 5 4 5 4 
            . e 5 6 7 7 8 5 4 5 4 5 5 5 5 4 
            e 4 5 8 6 6 5 5 5 5 5 5 4 5 5 4 
            e 5 c e 8 5 5 5 4 5 5 5 5 5 5 4 
            e 5 c c e 5 4 5 5 5 4 5 5 5 e . 
            e 5 c c 5 5 5 5 5 5 5 5 4 e . . 
            e 5 e c 5 4 5 4 5 5 5 e e . . . 
            e 5 e e 5 5 5 5 5 4 e . . . . . 
            4 5 4 e 5 5 5 5 e e . . . . . . 
            . 4 5 4 5 5 4 e . . . . . . . . 
            . . 4 4 e e e . . . . . . . . . 
            `, SpriteKind.Food)
        mySprite2.z = -50
        mySprite2.setPosition(randint(0, scene.screenWidth()), randint(0, scene.screenHeight()))
        mySprite2.setStayInScreen(true)
        sprites.setDataString(mySprite2, "foodType", "taco")
    }
    if (Math.percentChance(10)) {
        mySprite3 = sprites.create(img`
            . . . . . . b b b b . . . . . . 
            . . . . . . b 4 4 4 b . . . . . 
            . . . . . . b b 4 4 4 b . . . . 
            . . . . . b 4 b b b 4 4 b . . . 
            . . . . b d 5 5 5 4 b 4 4 b . . 
            . . . . b 3 2 3 5 5 4 e 4 4 b . 
            . . . b d 2 2 2 5 7 5 4 e 4 4 e 
            . . . b 5 3 2 3 5 5 5 5 e e e e 
            . . b d 7 5 5 5 3 2 3 5 5 e e e 
            . . b 5 5 5 5 5 2 2 2 5 5 d e e 
            . b 3 2 3 5 7 5 3 2 3 5 d d e 4 
            . b 2 2 2 5 5 5 5 5 5 d d e 4 . 
            b d 3 2 d 5 5 5 d d d 4 4 . . . 
            b 5 5 5 5 d d 4 4 4 4 . . . . . 
            4 d d d 4 4 4 . . . . . . . . . 
            4 4 4 4 . . . . . . . . . . . . 
            `, SpriteKind.Food)
        mySprite3.z = -50
        mySprite3.setPosition(randint(0, scene.screenWidth()), randint(0, scene.screenHeight()))
        mySprite3.setStayInScreen(true)
        sprites.setDataString(mySprite3, "foodType", "pizza")
    }
    if (Math.percentChance(5)) {
        mySprite4 = sprites.create(img`
            . . . . . 3 3 b 3 3 d d 3 3 . . 
            . . . . 3 1 1 d 3 d 1 1 1 1 3 . 
            . . . 3 d 1 1 1 d 1 1 1 d 3 1 3 
            . . 3 d d 1 1 1 d d 1 1 1 3 3 3 
            . 3 1 1 d 1 1 1 1 d d 1 1 b . . 
            . 3 1 1 1 d 1 1 1 1 1 d 1 1 3 . 
            . b d 1 1 1 d 1 1 1 1 1 1 1 3 . 
            . 4 b 1 1 1 1 d d 1 1 1 1 d 3 . 
            . 4 4 d 1 1 1 1 1 1 d d d b b . 
            . 4 d b d 1 1 1 1 1 1 1 1 3 . . 
            4 d d 5 b d 1 1 1 1 1 1 1 3 . . 
            4 5 d 5 5 b b d 1 1 1 1 d 3 . . 
            4 5 5 d 5 5 d b b b d d 3 . . . 
            4 5 5 5 d d d d 4 4 b 3 . . . . 
            . 4 5 5 5 4 4 4 . . . . . . . . 
            . . 4 4 4 . . . . . . . . . . . 
            `, SpriteKind.Food)
        mySprite4.z = -50
        mySprite4.setPosition(randint(0, scene.screenWidth()), randint(0, scene.screenHeight()))
        mySprite4.setStayInScreen(true)
        sprites.setDataString(mySprite4, "foodType", "iceCream")
    }
    if (Math.percentChance(1)) {
        if (Math.percentChance(10)) {
            mySprite5 = sprites.create(img`
                ............3333bb..bb33333.....
                ........3bb31111d3b311d111d33...
                .......3bdd11111dbd11d11111113..
                .......bdddd1111bd11d111dd11113.
                ......3d111dd111b11d111dd33d11d3
                ......3d11111dd1d11d111d11d33113
                ....bb3d111111dd13dd111d1dd3b31b
                ...b3d3dd111111dd13dd11d1dddbbdb
                ...3ddd31d111111dd133dddddddb.b.
                ..311111d1ddd1111dd11dddddd33...
                ..3111111d111dd111dd1111dd3313..
                ..bddd1111ddd11dd111d111111113..
                ..311ddd111dddd11dd11ddd1111ddb.
                ..31111dd111dddd11dd111dddddddb.
                ...bd1111d1113ddd11dd1111111d3b.
                ...4dd1111d1113ddd11ddd111d333b.
                ..4dbdddd11d11133ddddddddddddb..
                .4ddbddddd11d111d33ddddddddd3b..
                .4dddb11ddd11dd111d333dddd3bb...
                .4dd55b111d11dd11111d3333bbb....
                .445555b111d11dddd111111ddb.....
                .4455555bd1d311ddddddddddd3.....
                .45455555bb1d3111ddddddd113.....
                .4554555555b333d1111111113......
                455554555555bbb33d11111d33......
                4d555545555555dbbb3d11d33.......
                4dd5555455555ddddd43333.........
                45dd555544ddddddd4..............
                .45dd5555d44dddd4...............
                ..45dd55dddd4444................
                ...45dd55444....................
                ....44444.......................
                `, SpriteKind.Food)
            mySprite5.z = -50
            mySprite5.setPosition(randint(0, scene.screenWidth()), randint(0, scene.screenHeight()))
            mySprite5.setStayInScreen(true)
            sprites.setDataString(mySprite5, "foodType", "bigIceCream")
        }
    }
    if (Math.percentChance(7)) {
        mySprite6 = sprites.create(img`
            .........................
            ............fff..........
            ..........ff666ff........
            .........f6666666f.......
            .....ff.ff6666666ff.ff...
            ....f66f66f66666f66f66f..
            ...f6666666f666f6666666f.
            ...f6666666f666f6666666f.
            ....f66666f66666f66666f..
            ...f6666666f666f6666666f.
            ...f66666fff666fff66666f.
            ....f666ff77f6f77ff666f..
            .....fff.f777f777f.fff...
            ..........f77777f........
            ..........f77777f........
            ..........ff777ff........
            ..........ff7f7ff........
            ..........f37773f........
            ..........f77777f........
            ..........f77777f........
            ...........f777f.........
            ...........fffff.........
            .........................
            .........................
            .........................
            `, SpriteKind.Enemy)
        mySprite6.z = -50
        mySprite6.setPosition(randint(0, scene.screenWidth()), randint(0, scene.screenHeight()))
        mySprite6.follow(mySprite, 20)
        mySprite6.setStayInScreen(true)
        mySprite6.lifespan = 5000
        for (let index = 0; index < 10; index++) {
            if (mySprite6.overlapsWith(mySprite)) {
                mySprite6.setPosition(randint(0, scene.screenWidth()), randint(0, scene.screenHeight()))
            }
        }
    }
    if (Math.percentChance(1)) {
        mySprite6 = sprites.create(img`
            .........................
            ............fff..........
            ..........ff666ff........
            .........f6666666f.......
            .....ff.ff6666666ff.ff...
            ....f66f66f66666f66f66f..
            ...f6666666f666f6666666f.
            ...f6666666f666f6666666f.
            ....f66666f66666f66666f..
            ...f6666666f666f6666666f.
            ...f66666fff666fff66666f.
            ....f666ff77f6f77ff666f..
            .....fff.f777f777f.fff...
            ..........f77777f........
            ..........f77777f........
            ..........ff777ff........
            ..........ff7f7ff........
            ..........f37773f........
            ..........f77777f........
            ..........f77777f........
            ...........f777f.........
            ...........fffff.........
            .........................
            .........................
            .........................
            `, SpriteKind.BIGENEMY)
        mySprite6.scale = 2
        mySprite6.z = -50
        mySprite6.setPosition(randint(0, scene.screenWidth()), randint(0, scene.screenHeight()))
        mySprite6.follow(mySprite, 10)
        mySprite6.setStayInScreen(true)
        mySprite6.lifespan = 10000
        for (let index = 0; index < 10; index++) {
            if (mySprite6.overlapsWith(mySprite)) {
                mySprite6.setPosition(randint(0, scene.screenWidth()), randint(0, scene.screenHeight()))
            }
        }
    }
})
game.onUpdateInterval(500, function () {
    if (foodFrenzy) {
        if (Math.percentChance(10)) {
            mySprite3 = sprites.create(img`
                . . . . . . b b b b . . . . . . 
                . . . . . . b 4 4 4 b . . . . . 
                . . . . . . b b 4 4 4 b . . . . 
                . . . . . b 4 b b b 4 4 b . . . 
                . . . . b d 5 5 5 4 b 4 4 b . . 
                . . . . b 3 2 3 5 5 4 e 4 4 b . 
                . . . b d 2 2 2 5 7 5 4 e 4 4 e 
                . . . b 5 3 2 3 5 5 5 5 e e e e 
                . . b d 7 5 5 5 3 2 3 5 5 e e e 
                . . b 5 5 5 5 5 2 2 2 5 5 d e e 
                . b 3 2 3 5 7 5 3 2 3 5 d d e 4 
                . b 2 2 2 5 5 5 5 5 5 d d e 4 . 
                b d 3 2 d 5 5 5 d d d 4 4 . . . 
                b 5 5 5 5 d d 4 4 4 4 . . . . . 
                4 d d d 4 4 4 . . . . . . . . . 
                4 4 4 4 . . . . . . . . . . . . 
                `, SpriteKind.Food)
            mySprite3.z = -50
            mySprite3.setPosition(randint(0, scene.screenWidth()), randint(0, scene.screenHeight()))
            mySprite3.setStayInScreen(true)
            sprites.setDataString(mySprite3, "foodType", "pizza")
        } else {
            if (Math.percentChance(5)) {
                mySprite4 = sprites.create(img`
                    . . . . . 3 3 b 3 3 d d 3 3 . . 
                    . . . . 3 1 1 d 3 d 1 1 1 1 3 . 
                    . . . 3 d 1 1 1 d 1 1 1 d 3 1 3 
                    . . 3 d d 1 1 1 d d 1 1 1 3 3 3 
                    . 3 1 1 d 1 1 1 1 d d 1 1 b . . 
                    . 3 1 1 1 d 1 1 1 1 1 d 1 1 3 . 
                    . b d 1 1 1 d 1 1 1 1 1 1 1 3 . 
                    . 4 b 1 1 1 1 d d 1 1 1 1 d 3 . 
                    . 4 4 d 1 1 1 1 1 1 d d d b b . 
                    . 4 d b d 1 1 1 1 1 1 1 1 3 . . 
                    4 d d 5 b d 1 1 1 1 1 1 1 3 . . 
                    4 5 d 5 5 b b d 1 1 1 1 d 3 . . 
                    4 5 5 d 5 5 d b b b d d 3 . . . 
                    4 5 5 5 d d d d 4 4 b 3 . . . . 
                    . 4 5 5 5 4 4 4 . . . . . . . . 
                    . . 4 4 4 . . . . . . . . . . . 
                    `, SpriteKind.Food)
                mySprite4.z = -50
                mySprite4.setPosition(randint(0, scene.screenWidth()), randint(0, scene.screenHeight()))
                mySprite4.setStayInScreen(true)
                sprites.setDataString(mySprite4, "foodType", "iceCream")
            } else {
                mySprite2 = sprites.create(img`
                    . . . . . . . e e e e . . . . . 
                    . . . . . e e 4 5 5 5 e e . . . 
                    . . . . e 4 5 6 2 2 7 6 6 e . . 
                    . . . e 5 6 6 7 2 2 6 4 4 4 e . 
                    . . e 5 2 2 7 6 6 4 5 5 5 5 4 . 
                    . e 5 6 2 2 8 8 5 5 5 5 5 4 5 4 
                    . e 5 6 7 7 8 5 4 5 4 5 5 5 5 4 
                    e 4 5 8 6 6 5 5 5 5 5 5 4 5 5 4 
                    e 5 c e 8 5 5 5 4 5 5 5 5 5 5 4 
                    e 5 c c e 5 4 5 5 5 4 5 5 5 e . 
                    e 5 c c 5 5 5 5 5 5 5 5 4 e . . 
                    e 5 e c 5 4 5 4 5 5 5 e e . . . 
                    e 5 e e 5 5 5 5 5 4 e . . . . . 
                    4 5 4 e 5 5 5 5 e e . . . . . . 
                    . 4 5 4 5 5 4 e . . . . . . . . 
                    . . 4 4 e e e . . . . . . . . . 
                    `, SpriteKind.Food)
                mySprite2.z = -50
                mySprite2.setPosition(randint(0, scene.screenWidth()), randint(0, scene.screenHeight()))
                mySprite2.setStayInScreen(true)
                sprites.setDataString(mySprite2, "foodType", "taco")
            }
        }
        info.changeScoreBy(1)
    }
})
