export const amountPerDayConst = [
    {
      value_en: '40',
      name_en: '$40.00',
      name_kr: '9만원',
      value_kr: '90000',
      name_jp: '9,000円',
      value_jp: '9000',
    },
    {
        value_en: '50',
        name_en: '$50.00',
        name_kr: '10만원',
        value_kr: '100000',
        name_jp: '1万円',
        value_jp: '1000',
      },
      {
        value_en: '70',
        name_en: '$70.00',
        name_kr: '12만원',
        value_kr: '120000',
        name_jp: '1万2,000円',
        value_jp: '12000',
      },
      {
        value_en: '90',
        name_en: '$90.00',
        name_kr: '14만원',
        value_kr: '140000',
        name_jp: '1万4,000円',
        value_jp: '14000',
      },
      {
        value_en: '100',
        name_en: '$100.00',
        name_kr: '16만원',
        value_kr: '160000',
        name_jp: '1万6,000円',
        value_jp: '16000',
      },
      {
        value_en: '120',
        name_en: '$120.00',
        name_kr: '18만원',
        value_kr: '180000',
        name_jp: '1万8,000円',
        value_jp: '18000',
      },
      {
        value_en: '140',
        name_en: '$140.00',
        name_kr: '20만원',
        value_kr: '200000',
        name_jp: '2万円',
        value_jp: '20000',
      },
      {
        value_en: '160',
        name_en: '$160.00',
        name_kr: '22만원',
        value_kr: '220000',
        name_jp: '2万2,000円',
        value_jp: '22000',
      },
      {
        value_en: '180',
        name_en: '$180.00',
        name_kr: '24만원',
        value_kr: '240000',
        name_jp: '2万4,000円',
        value_jp: '24000',
      },
      {
        value_en: '200',
        name_en: '$200.00',
        name_kr: '26만원',
        value_kr: '260000',
        name_jp: '2万6,000円',
        value_jp: '26000',
      },
      {
        value_en: '220',
        name_en: '$220.00',
        name_kr: '28만원',
        value_kr: '280000',
        name_jp: '2万8,000円',
        value_jp: '28000',
      },
      {
        value_en: '240',
        name_en: '$240.00',
        name_kr: '30만원',
        value_kr: '300000',
        name_jp: '3万円',
        value_jp: '30000',
      },
      {
        value_en: '260',
        name_en: '$260.00',
        name_kr: '35만원',
        value_kr: '350000',
        name_jp: '3万5,000円',
        value_jp: '35000',
      },
      {
        value_en: '280',
        name_en: '$280.00',
        name_kr: '40만원',
        value_kr: '400000',
        name_jp: '4万円',
        value_jp: '40000',
      },
      {
        value_en: '300',
        name_en: '$300.00',
        name_kr: '45만원',
        value_kr: '450000',
        name_jp: '4万5,000円',
        value_jp: '45000',
      },
      {
        value_en: '400',
        name_en: '$400.00',
        name_kr: '50만원',
        value_kr: '500000',
        name_jp: '4万円',
        value_jp: '50000',
      },
      {
        value_en: '500',
        name_en: '$500.00',
        name_kr: '60만원',
        value_kr: '600000',
        name_jp: '5万5,000円',
        value_jp: '55000',
      },
  
  ];
  
  export function GetAmountPerDay(type) {
    let _pType = [];
    amountPerDayConst.forEach((x) => {
      if (type === 'USD') {
        _pType.push({ value: x.value_en , text: x.name_en });
      } else if (type === 'KRW') {
        _pType.push({ value: x.value_kr, text: x.name_kr });
      } else if (type === 'JPY') {
        _pType.push({ value: x.value_jp, text: x.name_jp });
      }
    });
  
    return _pType;
  }


  export const amountPerHourConst = [
    {
      value_en: '8',
      name_en: '$8.00',
      name_kr: '1만원',
      value_kr: '10000',
      name_jp: '1,000円',
      value_jp: '1000',
    },
    {
        value_en: '10',
        name_en: '$10.00',
        name_kr: '1만2천원',
        value_kr: '12000',
        name_jp: '1200円',
        value_jp: '1200',
      },
      {
        value_en: '12',
        name_en: '$12.00',
        name_kr: '1만5천원',
        value_kr: '15000',
        name_jp: '1500円',
        value_jp: '1500',
      },
      {
        value_en: '14',
        name_en: '$14.00',
        name_kr: '1만8천원',
        value_kr: '18000',
        name_jp: '1800円',
        value_jp: '1800',
      },
      {
        value_en: '16',
        name_en: '$16.00',
        name_kr: '2만원',
        value_kr: '20000',
        name_jp: '2000円',
        value_jp: '2000',
      },
      {
        value_en: '18',
        name_en: '$18.00',
        name_kr: '2만2천원',
        value_kr: '22000',
        name_jp: '2200円',
        value_jp: '2200',
      },
      {
        value_en: '20',
        name_en: '$20.00',
        name_kr: '2만5천원',
        value_kr: '25000',
        name_jp: '2500円',
        value_jp: '2500',
      },
      {
        value_en: '22',
        name_en: '$22.00',
        name_kr: '2만8천원',
        value_kr: '28000',
        name_jp: '2800円',
        value_jp: '2800',
      },
      {
        value_en: '24',
        name_en: '$24.00',
        name_kr: '3만원',
        value_kr: '30000',
        name_jp: '3000円',
        value_jp: '3000',
      },
      {
        value_en: '26',
        name_en: '$26.00',
        name_kr: '3만5천원',
        value_kr: '35000',
        name_jp: '3500円',
        value_jp: '3500',
      },
      {
        value_en: '28',
        name_en: '$28.00',
        name_kr: '4만원',
        value_kr: '40000',
        name_jp: '4000円',
        value_jp: '4000',
      },
      {
        value_en: '30',
        name_en: '$30.00',
        name_kr: '4만5천원',
        value_kr: '45000',
        name_jp: '4500円',
        value_jp: '4500',
      },
      {
        value_en: '35',
        name_en: '$35.00',
        name_kr: '5만원',
        value_kr: '50000',
        name_jp: '5,000円',
        value_jp: '5000',
      },
      {
        value_en: '40',
        name_en: '$40.00',
        name_kr: '5만5천원',
        value_kr: '55000',
        name_jp: '5500円',
        value_jp: '5500',
      },
      {
        value_en: '45',
        name_en: '$45.00',
        name_kr: '6만원',
        value_kr: '60000',
        name_jp: '6000円',
        value_jp: '6000',
      },
      {
        value_en: '50',
        name_en: '$50.00',
        name_kr: '5만5천원',
        value_kr: '65000',
        name_jp: '6500円',
        value_jp: '6500',
      },
      
  ];
  
  export function GetAmountPerHour(type) {
    let _pType = [];
    amountPerHourConst.forEach((x) => {
      if (type === 'USD') {
        _pType.push({ value: x.value_en , text: x.name_en });
      } else if (type === 'KRW') {
        _pType.push({ value: x.value_kr, text: x.name_kr });
      } else if (type === 'JPY') {
        _pType.push({ value: x.value_jp, text: x.name_jp });
      }
    });
  
    return _pType;
  }