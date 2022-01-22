export const FreelancerTypeConst = [ 
    {
        value: "Any", 
        name_en: "Any",
        name_kr: "어느",
        name_jp: "どれでも",
    },
    {
        value: "Organization", 
        name_en: "Company",
        name_kr: "회사",
        name_jp: "会社のみ",
    },
    // {
    //     value: "Headhunter", 
    //     name_en: "Headhunter",
    //     name_kr: "헤드헌터",
    //     name_jp: "エージェントのみ",
    // },
    {
        value: "IndividualFreelancer", 
        name_en: "Individual",
        name_kr: "개인",
        name_jp: "個人のみ",
    },
    
]

/*   {
        value: "Any", 
        name_en: "Advanced Search",
        name_kr: "상세 찾기",
        name_jp: "高度な検索",
    }, */
export function GetFreelancerTypeConst(language) {
    let _pType = [];
    FreelancerTypeConst.forEach(x => {
     if (language === "english") {
       _pType.push({value: x.value, text: x.name_en})
   } else if (language  === 'korean') {
      _pType.push({value: x.value, text: x.name_kr})
   } else if (language  === 'japanese') {
      _pType.push({value: x.value, text: x.name_jp})
   }
   });
   return _pType;
}

export const S3_BUCKET_URL = "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/"