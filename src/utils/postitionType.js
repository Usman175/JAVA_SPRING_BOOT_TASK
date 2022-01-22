

export const PositionType = [
    {
      value: "Owner",
      name_en: 'Owner',
      name_kr: '소유자',
      name_jp: 'オーナー',
    },
    {
      value: 'CEO',
      name_en: 'CEO',
      name_kr: '최고 경영자',
      name_jp: '最高経営責任者',
    },


  ];
  export function GetPositionTypes(language) {
    let _pType = [];
    PositionType.forEach((x) => {
      if (language === 'english') {
        _pType.push({ value: x.value, text: x.name_en });
      } else if (language === 'korean') {
        _pType.push({ value: x.value, text: x.name_kr });
      } else if (language === 'japanese') {
        _pType.push({ value: x.value, text: x.name_jp });
      }
    });
  
    return _pType;
  }
  