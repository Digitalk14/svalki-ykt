import { svalkiExamples } from './svalki/svalkiExamples'

export const dumpsByTypes = () => {
    let types = []
    for (let i in svalkiExamples) {
        if (!(svalkiExamples[i].status in types)) {
            types[svalkiExamples[i].status] = {}
            types[svalkiExamples[i].status]['count'] = 1
            types[svalkiExamples[i].status]['text'] = svalkiExamples[i].text
        } else {
            types[svalkiExamples[i].status]['count']++
        }
    }
    return types
}
export const dumpsByTypesStates = (data) =>{
    let types = []
    for(let i in data){
        if (!(data[i].status in types)) {
            types[data[i].status] = {}
            types[data[i].status]['count'] = 1
        } else {
            types[data[i].status]['count']++
        }
    }
    return types
}