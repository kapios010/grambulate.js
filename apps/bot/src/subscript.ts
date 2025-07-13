export function toSubstring(input: number): string {
    let output = ""
    if(input < 0)
        output = '₋'
        input = -input
    let arr = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉']
    let inStr = input.toString()
    for(let i = 0; i < inStr.length; i++) {
        output += arr[Number(inStr[i])]
    }
    return output
}