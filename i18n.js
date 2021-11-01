import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import Backend from "react-i18next";
import common_en from "./public/Assets/Translations/en/common.json";
import common_tr from "./public/Assets/Translations/tr/common.json";
i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			en: {
				common: common_en,
			},
			tr: {
				common: common_tr,
			},
		},
		lng: locale.includes("tr") ? "tr" : "en",
		ns: "common",
		defaultNS: "common",
		fallbackNS: "common",
		keySeparator: ".",
		interpolation: {
			escapeValue: false,
			formatSeparator: ",",
		},
		react: {
			bindI18n: "languageChanged loaded",
			bindStore: "added removed",
			nsMode: "default",
			useSuspense: true,
		},
	});
export default i18n;
