const isDebug = true // toggle this to turn on / off for global controll

let dd


// This custom debugger was inspired by Arctelix
// Where he posted it as a solution on this stackoverflow thread:
// https://stackoverflow.com/questions/13815640/a-proper-wrapper-for-console-log-with-correct-line-number
if (isDebug){
    dd = console.log.bind(window.console)
} else {
    dd = function(){}
}

export default dd