export function GetSpecificYearsList(start,end) {
   let years=[]
    for(let i=start;i<=end;i++){
        years.push(i)
    }
    let _pType = [];
    years.forEach((x) => {
        _pType.push({ value: x, text: x });
  
    });
  
    return _pType;
  }