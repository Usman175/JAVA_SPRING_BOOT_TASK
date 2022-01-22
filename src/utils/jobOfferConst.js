export const JobOfferStatusConst = [
  {
    value: "All",
    name_en: "All",
    name_kr: "All",
    name_jp: "All",
    isAdmin: false,
  },
  {
    value: "Offered",
    name_en: "Offered",
    name_kr: "Offered",
    name_jp: "Offered",
    isAdmin: false,
  },

  {
    value: "Applied",
    name_en: "Applied",
    name_kr: "Applied",
    name_jp: "Applied",
    isAdmin: false,
  }
];

export function GetJobOfferStatuses(language) {
  let _pType = [];
  JobOfferStatusConst.forEach((x) => {
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
