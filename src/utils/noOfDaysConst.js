
export const NoOfDaysConst =[
    {
        value:"1",
        day_en : "1 days",
        day_kr  : "1 일",
        day_jp: "1 日"
       
    },
    {
        value:"2",
        day_en : "2 days",
        day_kr  : "2 일",
        day_jp: "2 日"
       
    },
    {
        value:"3",
        day_en : "3 days",
        day_kr  : "3 일",
        day_jp: "3 日"
       
    },
    {
        value:"4",
        day_en : "4 days",
        day_kr  : "4 일",
        day_jp: "4 日"
       
    },
    {
        value:"5",
        day_en : "5 days",
        day_kr  : "5 일",
        day_jp: "5 日"
       
    },
    {
        value:"6",
        day_en : "6 days",
        day_kr  : "6 일",
        day_jp: "6 日"
       
    },
    {
        value:"7",
        day_en : "7 days",
        day_kr  : "7 일",
        day_jp: "7 日"
       
    },
    {
        value:"8",
        day_en : "8 days",
        day_kr  : "8 일",
        day_jp: "8 日"
       
    },
    {
        value:"9",
        day_en : "9 days",
        day_kr  : "9 일",
        day_jp: "9 日"
       
    },
    {
        value:"10",
        day_en : "10 days",
        day_kr  : "10 일",
        day_jp: "10 日"
       
    },
    
    {
        value:"11",
        day_en : "11 days",
        day_kr  : "11 일",
        day_jp: "11 日"
       
    },
    {
        value:"12",
        day_en : "12 days",
        day_kr  : "12 일",
        day_jp: "12 日"
       
    },
    {
        value:"13",
        day_en : "13 days",
        day_kr  : "13 일",
        day_jp: "13 日"
       
    },
    {
        value:"14",
        day_en : "14 days",
        day_kr  : "14 일",
        day_jp: "14 日"
       
    },
    {
        value:"15",
        day_en : "15 days",
        day_kr  : "15 일",
        day_jp: "15 日"
       
    },
    {
        value:"16",
        day_en : "16 days",
        day_kr  : "16 일",
        day_jp: "16 日"
       
    },
    {
        value:"17",
        day_en : "17 days",
        day_kr  : "17 일",
        day_jp: "17 日"
       
    },
    {
        value:"18",
        day_en : "18 days",
        day_kr  : "18 일",
        day_jp: "18 日"
       
    },
    {
        value:"19",
        day_en : "19 days",
        day_kr  : "19 일",
        day_jp: "19 日"
       
    },
    {
        value:"20",
        day_en : "20 days",
        day_kr  : "20 일",
        day_jp: "20 日"
       
    },
    {
        value:"21",
        day_en : "21 days",
        day_kr  : "21 일",
        day_jp: "21 日"
       
    },
    {
        value:"22",
        day_en : "22 days",
        day_kr  : "22 일",
        day_jp: "22 日"
       
    },
    {
        value:"23",
        day_en : "23 days",
        day_kr  : "23 일",
        day_jp: "23 日"
       
    },
    {
        value:"24",
        day_en : "24 days",
        day_kr  : "24 일",
        day_jp: "24 日"
       
    },
    {
        value:"25",
        day_en : "25 days",
        day_kr  : "25 일",
        day_jp: "25 日"
       
    },
    {
        value:"26",
        day_en : "26 days",
        day_kr  : "26 일",
        day_jp: "26 日"
       
    },
    {
        value:"27",
        day_en : "27 days",
        day_kr  : "27 일",
        day_jp: "27 日"
       
    },
    {
        value:"28",
        day_en : "28 days",
        day_kr  : "28 일",
        day_jp: "28 日"
       
    },
    {
        value:"29",
        day_en : "29 days",
        day_kr  : "29 일",
        day_jp: "29 日"
       
    },
    {
        value:"30",
        day_en : "30 days",
        day_kr  : "30 일",
        day_jp: "30 日"
       
    },
    {
        value:"31",
        day_en : "31 days",
        day_kr  : "31 일",
        day_jp: "31 日"
       
    },


]

export function GetNoOfDaysTypes(language) {
     let _pType = [];
     NoOfDaysConst.forEach(x => {
      if (language === "english") {
        _pType.push({value: x.value, text: x.day_en})
    } else if (language  === 'korean') {
       _pType.push({value: x.value, text: x.day_kr})
    } else if (language  === 'japanese') {
       _pType.push({value: x.value, text: x.day_jp})
    }
    });
    return _pType;
}
