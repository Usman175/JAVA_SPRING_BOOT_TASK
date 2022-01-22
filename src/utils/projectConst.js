import { useSelector } from "react-redux";

export const ProjectStepConst = {
  Step1: "Step1",
  Step2: "Step2",
  Step3: "Step3",
  Profession: "Profession",
};

export const ProjectType = {
  Contest: "Contest",
  FreeContract: "FreeContract",
  Hourly: "Hourly",
  Milestone: "Milestone",
  OfficeWork: "OfficeWork",
};

export const ProjectStatus = {
  Active: "Active",
  Closed: "Closed",
  WaitingForInitialDeposit: "WaitingForInitialDeposit",
  OnHold: "OnHold",
};

export const ProjectTypeConst = [
  {
    value: ProjectType.Contest,
    name_en: "Contest",
    name_kr: "콘테스트",
    name_jp: "마일스톤",
  },
  {
    value: ProjectType.FreeContract,
    name_en: "Free Contract",
    name_kr: "상주및시간제 복합",
    name_jp: "마일스톤",
  },
  {
    value: ProjectType.Hourly,
    name_en: "Hourly",
    name_kr: "시간제",
    name_jp: "마일스톤",
  },
  {
    value: ProjectType.Milestone,
    name_en: "Milestone",
    name_kr: "마일스톤",
    name_jp: "마일스톤",
  },

  {
    value: ProjectType.OfficeWork,
    name_en: "Office Work",
    name_kr: "상주",
    name_jp: "마일스톤",
  },
];

export function GetProjectTypes(language) {
  let _pType = [];
  ProjectTypeConst.forEach((x) => {
    if (language === "english") {
      _pType.push({ value: x.value, text: x.name_en });
    } else if (language === "korean") {
      _pType.push({ value: x.value, text: x.name_kr });
    } else if (language === "japanese") {
      _pType.push({ value: x.value, text: x.name_jp });
    }
  });

  return _pType;
}
export const EducationTypeConst = [
  {
    value: "Primary education",
    name_en: "Primary education",
    name_kr: "초등 교육",
    name_jp: "初等教育",
  },
  {
    value: "Secondary education or high school",
    name_en: "Secondary education or high school",
    name_kr: "중등 교육 또는 고등학교",
    name_jp: "中等教育または高校",
  },
  {
    value: "Vocational qualification",
    name_en: "Vocational qualification",
    name_kr: "직업 자격",
    name_jp: "職業資格",
  },
  {
    value: "Bachelor's degree",
    name_en: "Bachelor's degree",
    name_kr: "학사 학위",
    name_jp: "学士号",
  },
  {
    value: "Master's degree",
    name_en: "Master's degree",
    name_kr: "석사 학위",
    name_jp: "修士号",
  },
  {
    value: "Doctorate or higher",
    name_en: "Doctorate or higher",
    name_kr: "박사 이상",
    name_jp: "博士号以上",
  },
];
export function GetEducationTypes(language) {
  let _pType = [];
  EducationTypeConst.forEach((x) => {
    if (language === "english") {
      _pType.push({ value: x.value, text: x.name_en });
    } else if (language === "korean") {
      _pType.push({ value: x.value, text: x.name_kr });
    } else if (language === "japanese") {
      _pType.push({ value: x.value, text: x.name_jp });
    }
  });

  return _pType;
}
export const noOfContracts = [
  {
    value: 0,
    name_en: "No Contract",
    name_kr: "계약 없음",
    name_jp: "コントラクトがない",
  },
  {
    value: "Less than 10",
    name_en: "Less than 10 contracts",
    name_kr: "10계약 미만",
    name_jp: "10契約未満",
  },
  {
    value: "Less than 20",
    name_en: "Less than 20 contracts",
    name_kr: "20계약 미만",
    name_jp: "20契約未満",
  },
  {
    value: "Less than 30",
    name_en: "Less than 30 contracts",
    name_kr: "30계약 미만",
    name_jp: "30契約未満",
  },
  {
    value: "Less than 50",
    name_en: "Less than 50 contracts",
    name_kr: "50계약 미만",
    name_jp: "50契約未満",
  },
  {
    value: "More that 50",
    name_en: "More than 50 contracts",
    name_kr: "50개 이상의 계약",
    name_jp: "50以上の契約",
  },
];
export function GetContractTypes(language) {
  let _pType = [];
  noOfContracts.forEach((x) => {
    if (language === "english") {
      _pType.push({ value: x.value, text: x.name_en });
    } else if (language === "korean") {
      _pType.push({ value: x.value, text: x.name_kr });
    } else if (language === "japanese") {
      _pType.push({ value: x.value, text: x.name_jp });
    }
  });

  return _pType;
}

export const purposalSearch = [
  {
    value: "My Region only",
    name_en: "My Region only",
    name_kr: "내 지역만",
    name_jp: "私の地域のみ",
    key : "isSameOrigin",
  },
  {
    value: "The Lowest propose",
    name_en: "The Lowest propose",
    name_kr: "최저 제안",
    name_jp: "最も低い提案",
    key : "isLowesProspose",
  },
  {
    value: "No on-going project",
    name_en: "No on-going project",
    name_kr: "진행 중인 프로젝트 없음",
    name_jp: "進行中のプロジェクトはありません",
    key : "isNoOnGoingProject",
  },
  {
    value: "Company only",
    name_en: "Company only",
    name_kr: "회사만",
    name_jp: "会社のみ",
    key : "isCompany",
  },
  {
    value: "Individual only",
    name_en: "Individual only",
    name_kr: "개인 전용",
    name_jp: "個人のみ",
    key : "isIndividual",
  },
  {
    value: "Agent only",
    name_en: "Agent only",
    name_kr: "에이전트 전용",
    name_jp: "エージェントのみ",
    key : "isAgent",
  },
  {
    value: "Favorite only",
    name_en: "Favorite only",
    name_kr: "즐겨찾기만",
    name_jp: "お気に入りのみ",
    key: "isFavorite",
  },
  {
    value: "Blocked only",
    name_en: "Blocked only",
    name_kr: "차단된 항목만",
    name_jp: "ブロックのみ",
    key: "isBlocked",
  },
];
export function GetPurposalSearchTypes(language) {
  let _pType = [];
  purposalSearch.forEach((x) => {
    if (language === "english") {
      _pType.push({ value: x.value, text: x.name_en, key: x.key });
    } else if (language === "korean") {
      _pType.push({ value: x.value, text: x.name_kr, key: x.key });
    } else if (language === "japanese") {
      _pType.push({ value: x.value, text: x.name_jp, key: x.key });
    }
  });

  return _pType;
}

export const Currencies = [
  {
    text: "USD",
    value: "USD",
  },
  {
    text: "원화결제",
    value: "KRW",
  },
  {
    text: "JPY",
    value: "JPY",
  },
  {
    text: "Jungle Points",
    value: "JP",
  },
];
export function GetCurrencyTypes(language) {
  let _pType = [];
  Currencies.forEach((x) => {
    if (language === "english") {
      _pType.push({ value: x.value, text: x.text });
    } else if (language === "korean") {
      _pType.push({ value: x.value, text: x.text });
    } else if (language === "japanese") {
      _pType.push({ value: x.value, text: x.text });
    }
  });

  return _pType;
}

export const ProjectPeriod = [
  {
    value: "Less than 1 week",
    name_en: "Less than 1 week",
    name_kr: "1 주일 미만",
    name_jp: "1週間未満",
  },
  {
    value: "Less than 1 month",
    name_en: "Less than 1 month",
    name_kr: "1 개월 미만",
    name_jp: "1ヶ月以内",
  },
  {
    value: "Less than 2 months",
    name_en: "Less than 2 months",
    name_kr: "2 개월 미만",
    name_jp: "2か月未満",
  },
  {
    value: "Less than 3 months",
    name_en: "Less than 3 months",
    name_kr: "3개월 미만",
    name_jp: "3か月未満",
  },
  {
    value: "Over 3 months (long term)",
    name_en: "Over 3 months (long term)",
    name_kr: "3개월 이상 장기 프로젝트",
    name_jp: "3ヶ月以上（長期）",
  },
];
export function GetPeriodTypes(language) {
  let _pType = [];
  ProjectPeriod.forEach((x) => {
    if (language === "english") {
      _pType.push({ value: x.value, text: x.name_en });
    } else if (language === "korean") {
      _pType.push({ value: x.value, text: x.name_kr });
    } else if (language === "japanese") {
      _pType.push({ value: x.value, text: x.name_jp });
    }
  });

  return _pType;
}

export const ProjectApplyProbation = [
  {
    value: "3 days",
    name_en: "3 days",
    name_kr: "3 일",
    name_jp: "3日",
  },
  {
    value: "1 week",
    name_en: "1 week",
    name_kr: "일주",
    name_jp: "1週間",
  },
  {
    value: "4 weeks",
    name_en: "4 weeks",
    name_kr: "4 주",
    name_jp: "4週間",
  },
  {
    value: "3 months",
    name_en: "3 months",
    name_kr: "3 개월",
    name_jp: "3ヶ月",
  },
];
export function GetApplyProbationTypes(language) {
  let _pType = [];
  ProjectApplyProbation.forEach((x) => {
    if (language === "english") {
      _pType.push({ value: x.value, text: x.name_en });
    } else if (language === "korean") {
      _pType.push({ value: x.value, text: x.name_kr });
    } else if (language === "japanese") {
      _pType.push({ value: x.value, text: x.name_jp });
    }
  });

  return _pType;
}

export const ProjectCompletedTime = [
  {
    value: "Within 1 week",
    name_en: "Within 1 week",
    name_kr: "1주일 이내",
    name_jp: "1주일 이내",
  },
  {
    value: "Within 2 Weeks",
    name_en: "Within 2 Weeks",
    name_kr: "2주일 이내",
    name_jp: "2주일 이내",
  },
  {
    value: "Within 3 weeks",
    name_en: "Within 3 weeks",
    name_kr: "3주 이내",
    name_jp: "3주 이내",
  },
  {
    value: " Within 1 month",
    name_en: " Within 1 month",
    name_kr: "1개월 이내",
    name_jp: "1개월 이내",
  },
  {
    value: "Within 2 months",
    name_en: "Within 2 months",
    name_kr: " 2개월 이내",
    name_jp: " 2개월 이내",
  },
  {
    value: "Within 3 months",
    name_en: "Within 3 months",
    name_kr: " 3개월이내",
    name_jp: "3개월이내",
  },
  {
    value: "Over 3months",
    name_en: "Over 3 months",
    name_kr: "3개월이상",
    name_jp: "3개월이상",
  },
  {
    value: "Others",
    name_en: "Others",
    name_kr: "기타",
    name_jp: "기타",
  },
];
export function GetProjectCompletedTimeTypes(language) {
  let _pType = [];
  ProjectCompletedTime.forEach((x) => {
    if (language === "english") {
      _pType.push({ value: x.value, text: x.name_en });
    } else if (language === "korean") {
      _pType.push({ value: x.value, text: x.name_kr });
    } else if (language === "japanese") {
      _pType.push({ value: x.value, text: x.name_jp });
    }
  });

  return _pType;
}

export const ProjectScopeConst = [
  {
    value: "design",
    name_en: "Design",
    name_kr: "디자인",
    name_jp: "디자인",
    subScopes: [
      // {
      //   value: "all",
      //   name_en: "All",
      //   name_kr: "전체",
      //   name_jp: "로고/브랜드",
      // },
      {
        value: "graphic",
        name_en: "Graphic Design",
        name_kr: "그래픽디자인",
        name_jp: "로고/브랜드",
      },
      {
        value: "industrial",
        name_en: "Industrial Design",
        name_kr: "산업디자인",
        name_jp: "[jp] Design sub 2",
      },
      {
        value: "character",
        name_en: "Character/Comics/Animation",
        name_kr: "캐릭터/만화/애니메이션",
        name_jp: "로고/브랜드",
      },
      {
        value: "fashion",
        name_en: "Fashion",
        name_kr: "패션",
        name_jp: "[jp] Design sub 2",
      },
      {
        value: "ppt",
        name_en: "Presentation",
        name_kr: "프레센테이션",
        name_jp: "[jp] Design sub 2",
      },
      {
        value: "web",
        name_en: "Web/Mobile UI",
        name_kr: "웹/모바일 UI",
        name_jp: "[jp] Design sub 2",
      },
      {
        value: "aftereffect",
        name_en: "After Effect/Premiere",
        name_kr: "애프터이팩트/프리미어",
        name_jp: "로고/브랜드",
      },
      {
        value: "signboard",
        name_en: "Sign Board",
        name_kr: "간판/사인보드",
        name_jp: "로고/브랜드",
      },
      {
        value: '3d',
        name_en: '3D Design',
        name_kr: '3D 디자인',
        name_jp: '[jp] Design sub 2',
      }, 
      {
        value: "others",
        name_en: "Others",
        name_kr: "기타 디자인",
        name_jp: "[jp] Design sub 2",
      },
    ],
  },
  {
    value: "web",
    name_en: "Web/Software",
    name_kr: "웹/소프트웨어",
    name_jp: "웹/소프트웨어",
    subScopes: [
      // {
      //   value: "all",
      //   name_en: "All",
      //   name_kr: "전체",
      //   name_jp: "[jp] Web sub 1",
      // },
      {
        value: "website",
        name_en: "Web Development",
        name_kr: "웹사이트",
        name_jp: "[jp] Web sub 1",
      },
      {
        value: "mobile",
        name_en: "Mobile Development",
        name_kr: "모바일 앱 개발",
        name_jp: "[jp] Web sub 1",
      },
      {
        value: "frontend",
        name_en: "Frontend Development",
        name_kr: "프론트엔드 개발",
        name_jp: "[jp] Web sub 1",
      },
      {
        value: "backend",
        name_en: "Backend Development",
        name_kr: "백엔드 개발",
        name_jp: "[jp] Web sub 1",
      },
      {
        value: "system",
        name_en: "Cloud/System",
        name_kr: "클라우드/시스템",
        name_jp: "[jp] Web sub 1",
      },
      {
        value: "others",
        name_en: "Others",
        name_kr: "기타 IT관련",
        name_jp: "[jp] Web sub 1",
      },
    ],
  },
  {
    value: "legal",
    name_en: "Legal/Accounting",
    name_kr: "법무/세무",
    name_jp: "법무/세무",
    subScopes: [
      // {
      //   value: "all",
      //   name_en: "All",
      //   name_kr: "전체",
      //   name_jp: "[jp] Web sub 1",
      // },
      {
        value: "Labor",
        name_en: "Labor/Employment",
        name_kr: "노무/고용관련",
        name_jp: "[jp] Legal sub 1",
      },
      {
        value: "business",
        name_en: "Business",
        name_kr: "상업/회사",
        name_jp: "[jp] Legal sub 1",
      },
      {
        value: "immigration",
        name_en: "Immigration",
        name_kr: "이민",
        name_jp: "[jp] Legal sub 1",
      },
      {
        value: "intellectual",
        name_en: "Intellectual",
        name_kr: "상표/지적재산",
        name_jp: "[jp] Legal sub 1",
      },
      {
        value: "bankruptcy",
        name_en: "Bankruptcy",
        name_kr: "파산/회생",
        name_jp: "[jp] Legal sub 1",
      },
      {
        value: "notarization",
        name_en: "Notarization",
        name_kr: "등기/공증 사무",
        name_jp: "[jp] Legal sub 2",
      },
      {
        value: "accounting",
        name_en: "Accounting/Bookeeping",
        name_kr: "회계/기장사무",
        name_jp: "[jp] Legal sub 3",
      },
      /*  {
        value: 'Insurance',
        name_en: 'Insurance',
        name_kr: '보험',
        name_jp: '[jp] Legal sub 3',
      },
      {
        value: 'financing',
        name_en: 'Financing',
        name_kr: '대출',
        name_jp: '[jp] Legal sub 3',
      }, */
      {
        value: "others",
        name_en: "Others",
        name_kr: "기타 법률/회계사무",
        name_jp: "[jp] Legal sub 3",
      },
    ],
  },
  {
    value: "marketing",
    name_en: "Marketing",
    name_kr: "마케팅/홍보",
    name_jp: "마케팅/홍보",
    subScopes: [
      // {
      //   value: "all",
      //   name_en: "All",
      //   name_kr: "전체",
      //   name_jp: "[jp] Web sub 1",
      // },
      {
        value: "research",
        name_en: "Research",
        name_kr: "시장조사",
        name_jp: "[jp] Legal sub 1",
      },
      {
        value: "telemarketing",
        name_en: "Telemarketing",
        name_kr: "텔레마케팅",
        name_jp: "[jp] Legal sub 2",
      },
      {
        value: "onlinemarketing",
        name_en: "Online Marketing",
        name_kr: "온라인 마케팅",
        name_jp: "[jp] Legal sub 3",
      },
      {
        value: "youtubemarketing",
        name_en: "Youtube Marketing",
        name_kr: "유투브 마케팅",
        name_jp: "[jp] Legal sub 3",
      },
      {
        value: "others",
        name_en: "Others",
        name_kr: "기타 마케팅관련",
        name_jp: "[jp] Legal sub 3",
      },
    ],
  },
  {
    value: "video",
    name_en: "Video/Photo Edit",
    name_kr: "비디오/사진편집",
    name_jp: "비디오/사진편집",
    subScopes: [
      // {
      //   value: "all",
      //   name_en: "All",
      //   name_kr: "전체",
      //   name_jp: "[jp] Web sub 1",
      // },
      {
        value: "video",
        name_en: "After Effect/Premiere",
        name_kr: "애프터이팩트/프리미어",
        name_jp: "[jp] Legal sub 1",
      },
      {
        value: "shooting",
        name_en: "Video/Photo Shoot",
        name_kr: "비디오/사진 촬영",
        name_jp: "[jp] Legal sub 2",
      },
      {
        value: "showhost",
        name_en: "Show Host",
        name_kr: "쇼호스트",
        name_jp: "[jp] Legal sub 3",
      },
      {
        value: "others",
        name_en: "Others",
        name_kr: "기타 비디오관련",
        name_jp: "[jp] Legal sub 3",
      },
    ],
  },
  {
    value: "engineering",
    name_en: "Engineering",
    name_kr: "기술/설계",
    name_jp: "기술/설계",
    subScopes: [
      // {
      //   value: "all",
      //   name_en: "All",
      //   name_kr: "전체",
      //   name_jp: "[jp] Web sub 1",
      // },
      {
        value: "construction",
        name_en: "Construction",
        name_kr: "건축설계",
        name_jp: "[jp] Legal sub 1",
      },
      {
        value: "electronic",
        name_en: "Eletronic/Electricity",
        name_kr: "전기/전자",
        name_jp: "[jp] Legal sub 2",
      },
      {
        value: "interior",
        name_en: "Interior Design",
        name_kr: "인테리어 설계",
        name_jp: "[jp] Legal sub 3",
      },
      {
        value: "cad",
        name_en: "CAD",
        name_kr: "CAD업무",
        name_jp: "[jp] Legal sub 1",
      },
      {
        value: "mechanic",
        name_en: "Auto Mechanic",
        name_kr: "자동 기계",
        name_jp: "自動車整備士",
      },
      {
        value: "interior",
        name_en: "Interior Design",
        name_kr: "인테리어 설계",
        name_jp: "[jp] Legal sub 3",
      },
      {
        value: "others",
        name_en: "Others",
        name_kr: "기타 비디오관련",
        name_jp: "[jp] Legal sub 3",
      },
    ],
  },
  {
    value: "translation",
    name_en: "Translation",
    name_kr: "통번역",
    name_jp: "통번역",
    subScopes: [
      // {
      //   value: "all",
      //   name_en: "All",
      //   name_kr: "전체",
      //   name_jp: "[jp] Web sub 1",
      // },
      {
        value: "interpreting",
        name_en: "Interpreting",
        name_kr: "통역",
        name_jp: "[jp] Legal sub 1",
      },
      {
        value: "translation",
        name_en: "Translation",
        name_kr: "번역",
        name_jp: "[jp] Legal sub 2",
      },
      {
        value: "legal/medical",
        name_en: "Legal/Medical Translation",
        name_kr: "법률/의료 통번역",
        name_jp: "[jp] Legal sub 1",
      },
      {
        value: "technical",
        name_en: "Technical/Localization",
        name_kr: "기술/로컬라이제이션",
        name_jp: "[jp] Legal sub 1",
      },
      {
        value: "others",
        name_en: "Others",
        name_kr: "기타 통/번역 관련",
        name_jp: "[jp] Legal sub 3",
      },
    ],
  },
  {
    value: "writing",
    name_en: "Writing",
    name_kr: "기획/글쓰기",
    name_jp: "기획/글쓰기",
    subScopes: [
      // {
      //   value: "all",
      //   name_en: "All",
      //   name_kr: "전체",
      //   name_jp: "[jp] Web sub 1",
      // },
      {
        value: "contentwriting",
        name_en: "Contents Writing",
        name_kr: "컨텐츠 기획",
        name_jp: "[jp] Legal sub 1",
      },
      {
        value: "copywriting",
        name_en: "Copy Writing",
        name_kr: "카피라이팅",
        name_jp: "[jp] Legal sub 2",
      },
      {
        value: "business",
        name_en: "Business/Career",
        name_kr: "사업/자기소개서",
        name_jp: "[jp] Legal sub 2",
      },
      {
        value: "editing",
        name_en: "Editing/Proofreading",
        name_kr: "편집/교정",
        name_jp: "[jp] Legal sub 2",
      },
      {
        value: "others",
        name_en: "Others",
        name_kr: "기타 통/번역 관련",
        name_jp: "[jp] Legal sub 3",
      },
    ],
  },
  {
    value: "tutorial",
    name_en: "Teaching",
    name_kr: "온/오프라인 강의",
    name_jp: "온/오프라인 강의",
    subScopes: [
      // {
      //   value: "all",
      //   name_en: "All",
      //   name_kr: "전체",
      //   name_jp: "[jp] Web sub 1",
      // },
      {
        value: "middleschool",
        name_en: "Middle School",
        name_kr: "중학과정",
        name_jp: "[jp] Legal sub 1",
      },
      {
        value: "highschool",
        name_en: "High School",
        name_kr: "고교과정",
        name_jp: "[jp] Legal sub 1",
      },
      {
        value: "programming",
        name_en: "Programming",
        name_kr: "프로그래밍",
        name_jp: "[jp] Legal sub 1",
      },
      {
        value: "sports",
        name_en: "Sports",
        name_kr: "스포츠",
        name_jp: "[jp] Legal sub 2",
      },
      {
        value: "language",
        name_en: "Language",
        name_kr: "어학",
        name_jp: "[jp] Legal sub 2",
      },
      {
        value: "mathematics",
        name_en: "Methematics",
        name_kr: "수학",
        name_jp: "[jp] Legal sub 2",
      },
      {
        value: "essay",
        name_en: "Essay",
        name_kr: "에세이/논술",
        name_jp: "[jp] Legal sub 3",
      },
      {
        value: "technical",
        name_en: "Technical",
        name_kr: "기술관련",
        name_jp: "[jp] Legal sub 3",
      },
      {
        value: "hobby",
        name_en: "Hobby",
        name_kr: "취미",
        name_jp: "[jp] Legal sub 3",
      },
      {
        value: "others",
        name_en: "Others",
        name_kr: "기타 강의/강좌",
        name_jp: "[jp] Legal sub 3",
      },
    ],
  },
  {
    value: "realEstate",
    name_en: "Real Estate",
    name_kr: "부동산 사무",
    name_jp: "부동산 사무",
    subScopes: [
      // {
      //   value: "all",
      //   name_en: "All",
      //   name_kr: "전체",
      //   name_jp: "[jp] Web sub 1",
      // },
      {
        value: "commercial",
        name_en: "Commercial",
        name_kr: "분양/개발 기획",
        name_jp: "[jp] Legal sub 1",
      },
      {
        value: "mortgage",
        name_en: "Mortgage/Loan",
        name_kr: "대출/담보",
        name_jp: "[jp] Legal sub 2",
      },
      {
        value: "brokerage",
        name_en: "Brokerage",
        name_kr: "공인중개",
        name_jp: "[jp] Legal sub 2",
      },
      {
        value: "others",
        name_en: "Others",
        name_kr: "기타 통/번역 관련",
        name_jp: "[jp] Legal sub 3",
      },
    ],
  },
  {
    value: "admin",
    name_en: "Administration",
    name_kr: "사무/기획",
    name_jp: "일반사무",
    subScopes: [
      // {
      //   value: "all",
      //   name_en: "All",
      //   name_kr: "전체",
      //   name_jp: "[jp] Web sub 1",
      // },
      {
        value: "admin",
        name_en: "Admin Support",
        name_kr: "일반사무",
        name_jp: "[jp] Admin sub 1",
      },
      {
        value: "hr",
        name_en: "HR",
        name_kr: "인사/총무",
        name_jp: "[jp] Admin sub 1",
      },
      {
        value: "ceo",
        name_en: "CEO",
        name_kr: "CEO",
        name_jp: "[jp] Admin sub 1",
      },
      {
        value: "cfo",
        name_en: "CFO",
        name_kr: "CFO",
        name_jp: "[jp] Admin sub 1",
      },
      {
        value: "cto",
        name_en: "CTO",
        name_kr: "CTO",
        name_jp: "[jp] Admin sub 1",
      },
      {
        value: "virtual",
        name_en: "Virtual Assistant",
        name_kr: "온라인 비서업무",
        name_jp: "[jp] Admin sub 2",
      },
      {
        value: "others",
        name_en: "Others",
        name_kr: "기타 일반 사무",
        name_jp: "[jp] Legal sub 3",
      },
    ],
  },
  {
    value: "internationalTrade",
    name_en: "International Trade",
    name_kr: "무역 사무",
    name_jp: "무역 사무",
    subScopes: [
      // {
      //   value: "all",
      //   name_en: "All",
      //   name_kr: "전체",
      //   name_jp: "[jp] Web sub 1",
      // },
      {
        value: "clearance",
        name_en: "Custom Clearance",
        name_kr: "통관사무",
        name_jp: "[jp] Admin sub 1",
      },
      {
        value: "Importexport",
        name_en: "Import/Export",
        name_kr: "수출입업무",
        name_jp: "[jp] Admin sub 2",
      },
      {
        value: "forwarding",
        name_en: "Forwarding/Logistics",
        name_kr: "포워딩/물류",
        name_jp: "[jp] Admin sub 2",
      },
      {
        value: "others",
        name_en: "Others",
        name_kr: "기타 수출입관련",
        name_jp: "[jp] Legal sub 3",
      },
    ],
  },
  {
    value: "customerService",
    name_en: "Customer Service",
    name_kr: "고객센터",
    name_jp: "고객센터",
    subScopes: [
      // {
      //   value: "all",
      //   name_en: "All",
      //   name_kr: "전체",
      //   name_jp: "[jp] Web sub 1",
      // },
      {
        value: "customerservice",
        name_en: "Customer Service",
        name_kr: "인/아웃바운드 상담",
        name_jp: "[jp] Admin sub 1",
      },
      {
        value: "email",
        name_en: "Email/Blog",
        name_kr: "이메일/블로그",
        name_jp: "[jp] Admin sub 2",
      },
      {
        value: "others",
        name_en: "Others",
        name_kr: "기타 고객관리",
        name_jp: "[jp] Legal sub 3",
      },
    ],
  },
  {
    value: "others",
    name_en: "Others",
    name_kr: "기타",
    name_jp: "その他",
    subScopes: []
  }
];

export function GetProjectScopes(language) {
  let _pScope = [];
  ProjectScopeConst.forEach((x) => {
    if (language === "english") {
      _pScope.push({
        value: x.value,
        text: x.name_en,
        subScopes: x.subScopes.map((n) => ({
          value: n.value,
          text: n.name_en,
        })),
      });
    } else if (language === "korean") {
      _pScope.push({
        value: x.value,
        text: x.name_kr,
        subScopes: x.subScopes.map((n) => ({
          value: n.value,
          text: n.name_kr,
        })),
      });
    } else if (language === "japanese") {
      _pScope.push({
        value: x.value,
        text: x.name_jp,
        subScopes: x.subScopes.map((n) => ({
          value: n.value,
          text: n.name_jp,
        })),
      });
    }
  });
  return _pScope;
}

export const ProjectStatusConst = [
  {
    value: "Archived",
    name_en: "Archived",
    name_kr: "일시완료",
    name_jp: "アーカイブ",
    isAdmin: true,
  },
  {
    value: "Created",
    name_en: "Created",
    name_kr: "신규",
    name_jp: "作成した",
    isAdmin: true,
  },

  {
    value: "Closed",
    name_en: "Closed",
    name_kr: "완료",
    name_jp: "閉まっている",
    isAdmin: false,
  },
  {
    value: "Draft",
    name_en: "Draft",
    name_kr: "초안",
    name_jp: "ドラフト",
    isAdmin: true,
  },

  {
    value: "In Progress",
    name_en: "In Progress",
    name_kr: "진행중",
    name_jp: "進行中",
    isAdmin: true,
  },
  {
    value: "On Hold",
    name_en: "On Hold",
    name_kr: "보류",
    name_jp: "ホールド",
    isAdmin: false,
  },
  // {
  //   value: "On Recruitment",
  //   name_en: "On Recruitment",
  //   name_kr: "모집중",
  //   name_jp: "募集",
  //   isAdmin: false,
  // },
  {
    value: "On Going",
    name_en: "On Going",
    name_kr: "진행 중",
    name_jp: "進行中",
    isAdmin: false,
  },
  {
    value: "Reopen",
    name_en: "Reopen",
    name_kr: "재오픈",
    name_jp: "再開する",
    isAdmin: true,
  },
];

export function GetProjectStatuses(language) {
  let _pType = [];
  ProjectStatusConst.forEach((x) => {
    if (language === "english") {
      _pType.push({ value: x.value, text: x.name_en, isAdmin: x.isAdmin });
    } else if (language === "korean") {
      _pType.push({ value: x.value, text: x.name_kr, isAdmin: x.isAdmin });
    } else if (language === "japanese") {
      _pType.push({ value: x.value, text: x.name_jp, isAdmin: x.isAdmin });
    }
  });
  return _pType;
}
export const ProjectLanguageConst = [
  {
    value: "Any Location",
    name_en: "Any Location",
    name_kr: "모든 위치",
    name_jp: "任意の場所",
  },
  {
    value: "North America",
    name_en: "North America",
    name_kr: "북아메리카",
    name_jp: "北米",
  },
  {
    value: "Asia",
    name_en: "Asia",
    name_kr: "아시아",
    name_jp: "アジア",
  },
  {
    value: "Europe",
    name_en: "Europe",
    name_kr: "유럽",
    name_jp: "ヨーロッパ",
  },
  {
    value: "Africa",
    name_en: "Africa",
    name_kr: "아프리카",
    name_jp: "アフリカ",
  },
  {
    value: "Middle East",
    name_en: "Middle East",
    name_kr: "중동",
    name_jp: "中東",
  },
  {
    value: "South America",
    name_en: "South America",
    name_kr: "남아메리카",
    name_jp: "南アメリカ",
  }
]
export function GetProjectLanguages(language) {
  let _pType = [];
  ProjectLanguageConst.forEach((x) => {
    if (language === "english") {
      _pType.push({ value: x.value, text: x.name_en, isAdmin: x.isAdmin });
    } else if (language === "korean") {
      _pType.push({ value: x.value, text: x.name_kr, isAdmin: x.isAdmin });
    } else if (language === "japanese") {
      _pType.push({ value: x.value, text: x.name_jp, isAdmin: x.isAdmin });
    }
  });
  return _pType;
}
// export const FreelancerTypeConst = {
//     Any: "Any",
//     CompanyOnly: "Company Only",
//     AgentOnly: "AgentOnly",
//     IndividualOnly: "Individual Only",

// }

export const S3_BUCKET_URL =
  "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/";
