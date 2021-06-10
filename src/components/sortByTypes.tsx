import { svalkiExamples } from "./svalki/svalkiExamples";

export const dumpsByTypes = () => {
  let types: any = [];
  for (let i in svalkiExamples) {
    if (!(svalkiExamples[i].status in types)) {
      types[svalkiExamples[i].status] = {};
      types[svalkiExamples[i].status]["count"] = 1;
      types[svalkiExamples[i].status]["text"] = svalkiExamples[i].text;
    } else {
      types[svalkiExamples[i].status]["count"]++;
    }
  }
  return types;
};

export const dumpsByTypesStates = (data: any) => {
  let types: Array<any> = [];
  for (let i in data) {
    if (!(data[i].status in types)) {
      types[data[i].status] = 1;
    } else {
      types[data[i].status]++;
    }
  }
  return types;
};

export const dumpsByStatuses = (data: any) => {
  let statuses: Array<any> = [];
  for (let i in data) {
    if (!(data[i].checkStatus in statuses)) {
      statuses[data[i].checkStatus] = 1;
    } else {
      statuses[data[i].checkStatus]++;
    }
  }
  return statuses;
};
