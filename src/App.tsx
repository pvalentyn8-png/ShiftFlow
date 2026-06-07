/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Trash2, 
  X, 
  Save, 
  Clock, 
  Wallet, 
  Calendar as CalendarIcon,
  User,
  Users,
  Globe,
  CheckCircle2,
  AlertCircle,
  Info,
  RefreshCw,
  FileSpreadsheet,
  Database,
  Download,
  Upload,
  MoreHorizontal,
  Lock,
  Unlock
} from "lucide-react";

const HOURS_IN_DAY = 24;
const APP_VERSION = "4.0";

const T = {
  ua: {
    appTitle: "Трекер Змін",
    version: "Версія",
    onboardingTitle: "Фінальна версія v4.0! 🏆",
    onboarding1: "Захист календаря: Натисніть на замок 🔒 у верхній панелі для захисту від випадкових натискань.",
    onboarding2: "Оптимальний дизайн: Зручні швидкі кнопки-іконки у шапці для миттєвого доступу.",
    onboarding3: "Автономність: Повністю автономне збереження та робота без розряду батареї.",
    onboarding4: "Пам'ять Профілів: Кожен водій має незалежні розрахунки, аванси та історію.",
    onboarding5: "PWA Додаток: Встановіть на робочий стіл Android/iOS для автономного доступу.",
    gotIt: "Зрозумів",
    perShift: "зміна",
    perHour: "год",
    history: "Історія",
    historyLog: "Лог місяців",
    noHistory: "Історія порожня",
    months: ["Січень","Лютий","Березень","Квітень","Травень","Червень","Липень","Серпень","Вересень","Жовтень","Листопад","Грудень"],
    monthsShort: ["Січ","Лют","Бер","Кві","Тра","Чер","Лип","Сер","Вер","Жов","Лис","Гру"],
    days: ["Пн","Вт","Ср","Чт","Пт","Сб","Нд"],
    driverPlaceholder: "Ім'я водія...",
    shifts: "Змін",
    hours: "Годин",
    earned: "Зароблено",
    advances: "Аванси",
    advancesTitle: "Аванси за",
    addAdvance: "Додати аванс",
    advanceAmount: "Сума авансу (zł)",
    advanceNote: "Примітка (необов'язково)",
    save: "Зберегти",
    cancel: "Скасувати",
    delete: "Видалити",
    summary: "Підсумок за",
    shiftList: "Список змін",
    advanceList: "Список авансів",
    progress: "з ~30 можливих змін",
    hint: "👆 натисни — добу · утримуй — обрати години",
    shiftModal: "Налаштування зміни",
    start: "Початок",
    end: "Кінець",
    hoursEarned: "годин → заробіток",
    saveShift: "Зберегти",
    manualAmountLabel: "Сума вручну (опц.)",
    timeError: "⚠ Час кінця має бути пізніше початку",
    hourlyRateLabel: "zł / год",
    shiftDurationLabel: "год / зміна",
    dailyRateLabel: "zł / зміна",
    balance: "Нараховано",
    totalEarned: "Сума за період",
    totalAdvances: "Аванси",
    toReceive: "До отримання",
    noAdvances: "Авансів немає",
    enterAmount: "Введіть суму",
    theme: "Тема",
    start24: "Виїзд піс. 24",
    start45: "Виїзд піс. 45",
    restTitle: "Тижневий цикл (6 днів)",
    restSince: "Початок роботи:",
    restUntil: "Наст. пауза до:",
    restRemaining: "Залишилось часу",
    restDone: "Цикл вичерпано! 🛑",
    restClean: "Скинути",
    selectStart: "Оберіть дату та час виїзду",
    activeRest: "Робочий тиждень",
    after24Notice: "⚠️ Скорочений відпочинок. Наступний має бути 45г + компенсація!",
    after45Notice: "✅ Регулярний відпочинок. Початок нового циклу.",
    compensation: "Компенсація",
    compHours: "год необхідно додати",
    compWarning: "Потрібно повернути 21г до кінця 3-го тижня!",
    menu24: "Меню 24ч",
    menu45: "Меню 45ч",
    clearData: "Очистити дані",
    confirmReset: "Видалити все?",
    resetWarning: "Це видалить всю історію змін, авансів та налаштування. Цю дію неможливо скасувати.",
    confirmAdvance: "Підтвердити аванс?",
    hoursDoneLabel: "Скільки годин паузи вже зроблено?",
    yesAdd: "OK",
    manageProfiles: "Профілі",
    addProfile: "Додати профіль",
    profileName: "Ім'я водія",
    dailyRate: "Ставка (zł)",
    deleteProfile: "Видалити",
    selectProfile: "Вибрати",
    noProfiles: "Немає профілів",
    newUpdate: "Доступне оновлення! 📥",
    updating: "Оновлюємо програму...",
    pdfReminder: "Нагадування: Сьогодні 1-ше число! Створіть та збережіть PDF звіт.",
    exportPdf: "Експорт в PDF",
    exportPdfBtn: "Експорт в PDF",
    reportTitle: "ЗВІТ ЗМІН ТА АВАНСІВ",
    period: "Період",
    driver: "Водій",
    date: "Дата",
    totalHoursLabel: "Всього годин",
    totalShiftsLabel: "Всього змін",
    shiftNoteLabel: "Примітка до зміни (рейс, авто тощо)",
    exportCsv: "Експорт в CSV (Excel)",
    backupJson: "Резервна копія JSON",
    notePlaceholder: "Маршрут, завантаження, номер авто...",
    noteLabel: "Примітка",
    calendarLockedToast: "🔒 Календар заблоковано! Натисніть на замок 🔓 вгорі, щоб редагувати.",
  },
  pl: {
    appTitle: "Tracker Zmian",
    version: "Wersja",
    onboardingTitle: "Wersja finałowa v4.0! 🏆",
    onboarding1: "Ochrona kalendarza: Kliknij kłódkę 🔒 u góry, aby chronić przed przypadkowymi zmianami.",
    onboarding2: "Optymalny design: Wygodne, szybkie przyciski-ikony w nagłówku do natychmiastowego dostępu.",
    onboarding3: "Szybka autonomia: W pełni autonomiczne zapisywanie i działanie bez rozładowywania baterii.",
    onboarding4: "Pamięć Profilów: Każdy kierowca posiada oddzielne rozliczenia, zaliczki i historię.",
    onboarding5: "Aplikacja PWA: Zainstaluj na ekranie głównym Android/iOS dla dostępu offline.",
    gotIt: "Rozumiem",
    perShift: "zmiana",
    perHour: "godz",
    history: "Historia",
    historyLog: "Log miesięcy",
    noHistory: "Historia jest pusta",
    months: ["Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"],
    monthsShort: ["Sty","Lut","Mar","Kwi","Maj","Cze","Lip","Sie","Wrz","Paź","Lis","Gru"],
    days: ["Pon","Wt","Śr","Czw","Pt","Sob","Nd"],
    driverPlaceholder: "Imię kierowcy...",
    shifts: "Zmian",
    hours: "Godzin",
    earned: "Zarobiono",
    advances: "Zaliczki",
    advancesTitle: "Zaliczki za",
    addAdvance: "Dodaj zaliczkę",
    advanceAmount: "Kwota zaliczki (zł)",
    advanceNote: "Notatka (opcjonalnie)",
    save: "Zapisz",
    cancel: "Anuluj",
    delete: "Usuń",
    summary: "Podsumowanie za",
    shiftList: "Lista zmian",
    advanceList: "Lista zaliczek",
    progress: "z ~30 możliwych zmian",
    hint: "👆 dotknij — cała doba · przytrzymaj — wybierz godziny",
    shiftModal: "Ustawienia zmiany",
    start: "Początek",
    end: "Koniec",
    hoursEarned: "godz → zarobek",
    saveShift: "Zapisz",
    manualAmountLabel: "Kwota ręcznie (opcj.)",
    timeError: "⚠ Koniec musi być późniejszy niż początek",
    hourlyRateLabel: "zł / godz",
    shiftDurationLabel: "godz / zmiana",
    dailyRateLabel: "zł / zmiana",
    balance: "Do wypłaty",
    totalEarned: "Naliczono",
    totalAdvances: "Zaliczki",
    toReceive: "Suma netto",
    noAdvances: "Brak zaliczek",
    enterAmount: "Podaj kwotę",
    theme: "Motyw",
    start24: "Wyjazd po 24",
    start45: "Wyjazd po 45",
    restTitle: "Cykl tygodniowy (6 dni)",
    restSince: "Początek pracy:",
    restUntil: "Nast. pauza do:",
    restRemaining: "Pozostało czasu",
    restDone: "Czas cyklu minął! 🛑",
    restClean: "Resetuj",
    selectStart: "Wybierz datę i godzinę wyjazdu",
    activeRest: "Tydzień pracy",
    after24Notice: "⚠️ Odpoczynek skrócony. Następny musi być 45h + rekompensata!",
    after45Notice: "✅ Odpoczynek regularny. Początek nowego cyklu.",
    compensation: "Rekompensata",
    compHours: "godz należy dodać",
    compWarning: "Pamiętaj o oddaniu 21h do końca 3. tygodnia!",
    menu24: "Menu 24h",
    menu45: "Menu 45h",
    clearData: "Wyczyść dane",
    confirmReset: "Usunąć wszystko?",
    resetWarning: "To usunie całą historię zmian, zaliczek i ustawienia. Tej operacji nie można cofnąć.",
    confirmAdvance: "Potwierdzić zaliczkę?",
    hoursDoneLabel: "Ile godzin pauzy już zrobiono?",
    yesAdd: "OK",
    manageProfiles: "Profile",
    addProfile: "Dodaj profil",
    profileName: "Imię kierowcy",
    dailyRate: "Stawka (zł)",
    deleteProfile: "Usuń",
    selectProfile: "Wybierz",
    noProfiles: "Brak profilów",
    newUpdate: "Dostępna aktualizacja! 📥",
    updating: "Aktualizowanie aplikacji...",
    pdfReminder: "Przypomnienie: Dzisiaj jest 1. dzień miesiąca! Wygeneruj i zapisz raport PDF.",
    exportPdf: "Eksportuj do PDF",
    exportPdfBtn: "Eksportuj do PDF",
    reportTitle: "RAPORT ZMIAN I ZALICZEK",
    period: "Okres",
    driver: "Kierowca",
    date: "Data",
    totalHoursLabel: "Suma godzin",
    totalShiftsLabel: "Suma zmian",
    shiftNoteLabel: "Notatka do zmiany (trasa, auto itp.)",
    exportCsv: "Eksportuj do CSV (Excel)",
    backupJson: "Kopia zapasowa JSON",
    notePlaceholder: "Trasa, załadunek, numer auta...",
    noteLabel: "Notatka",
    calendarLockedToast: "🔒 Kalendarz zablokowany! Kliknij kłódkę 🔓 u góry, aby edytować.",
  }
};

type ThemeName = "deep-night" | "midnight" | "forest" | "sunset" | "light";

interface ThemeColors {
  bg: string;
  card: string;
  text: string;
  textMuted: string;
  accent: string;
  accentMuted: string;
  accentText: string;
  border: string;
  glow: string;
  secondary: string;
  secondaryBg: string;
  secondaryBorder: string;
  indicator: string;
  btnIcon: string;
}

const THEMES: Record<ThemeName, ThemeColors> = {
  "deep-night": {
    bg: "bg-[#0a0a1a]",
    card: "bg-white/[0.03]",
    text: "text-[#e8e0f0]",
    textMuted: "text-purple-400/60",
    accent: "purple-600",
    accentMuted: "bg-purple-500/10",
    accentText: "text-purple-400",
    border: "border-white/10",
    glow: "shadow-purple-900/40",
    secondary: "amber-500",
    secondaryBg: "bg-amber-500/10",
    secondaryBorder: "border-amber-500/30",
    indicator: "bg-purple-500",
    btnIcon: "text-purple-400",
  },
  "midnight": {
    bg: "bg-[#020617]",
    card: "bg-sky-950/20",
    text: "text-sky-50",
    textMuted: "text-sky-400/60",
    accent: "sky-600",
    accentMuted: "bg-sky-500/10",
    accentText: "text-sky-400",
    border: "border-sky-500/20",
    glow: "shadow-sky-900/40",
    secondary: "emerald-500",
    secondaryBg: "bg-emerald-500/10",
    secondaryBorder: "border-emerald-500/30",
    indicator: "bg-sky-500",
    btnIcon: "text-sky-400",
  },
  "forest": {
    bg: "bg-[#051109]",
    card: "bg-emerald-950/20",
    text: "text-emerald-50",
    textMuted: "text-emerald-400/60",
    accent: "emerald-600",
    accentMuted: "bg-emerald-500/10",
    accentText: "text-emerald-400",
    border: "border-emerald-500/20",
    glow: "shadow-emerald-900/40",
    secondary: "lime-500",
    secondaryBg: "bg-lime-500/10",
    secondaryBorder: "border-lime-500/30",
    indicator: "bg-emerald-500",
    btnIcon: "text-emerald-400",
  },
  "sunset": {
    bg: "bg-[#1a0c0c]",
    card: "bg-orange-950/20",
    text: "text-orange-50",
    textMuted: "text-orange-400/60",
    accent: "orange-600",
    accentMuted: "bg-orange-500/10",
    accentText: "text-orange-400",
    border: "border-orange-500/20",
    glow: "shadow-orange-900/40",
    secondary: "rose-500",
    secondaryBg: "bg-rose-500/10",
    secondaryBorder: "border-rose-500/30",
    indicator: "bg-orange-500",
    btnIcon: "text-orange-400",
  },
  "light": {
    bg: "bg-[#f8fafc]",
    card: "bg-white",
    text: "text-slate-900",
    textMuted: "text-slate-400",
    accent: "purple-600",
    accentMuted: "bg-purple-100",
    accentText: "text-purple-600",
    border: "border-slate-200",
    glow: "shadow-purple-200/50",
    secondary: "amber-600",
    secondaryBg: "bg-amber-100",
    secondaryBorder: "border-amber-300",
    indicator: "bg-purple-600",
    btnIcon: "text-purple-600",
  }
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  let d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1;
}

function formatHour(h: number) {
  return String(h).padStart(2, "0") + ":00";
}

interface Shift {
  start: number;
  end: number;
  hours: number;
  manualAmount?: number;
  note?: string;
}

interface Advance {
  id: number;
  amount: number;
  note: string;
}

interface Profile {
  id: string;
  name: string;
  rate: number;
  shifts?: Record<string, Shift>;
  advances?: Record<string, Advance[]>;
  activeRest?: ActiveRest | null;
  lastRestType?: 24 | 45 | null;
}

interface ActiveRest {
  type: 24 | 45;
  startTime: number; // timestamp
  targetHours: number;
}

export default function ShiftTracker() {
  const [shiftRate, setShiftRate] = useState<number | string>(380);
  const hourRate = (Number(shiftRate) || 0) / HOURS_IN_DAY;

  const today = new Date();
  // State
  const [lang, setLang] = useState<"ua" | "pl">(() => {
    // Try to get language from dedicated key first, then from old storage, then default
    const dedicated = localStorage.getItem("shift_tracker_preferred_lang");
    if (dedicated === "ua" || dedicated === "pl") return dedicated;
    
    // Fallback to main storage if exists
    try {
      const saved = localStorage.getItem("shift_tracker_data_v3");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.lang === "ua" || parsed.lang === "pl") return parsed.lang;
      }
    } catch (e) {}
    
    return "pl"; // Default
  });
  const [themeName, setThemeName] = useState<ThemeName>("light");
  const t = T[lang];
  const theme = THEMES[themeName];

  // Persistence Key
  const STORAGE_KEY = "shift_tracker_data_v3";

  // State
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [shifts, setShifts] = useState<Record<string, Shift>>({});
  const [advances, setAdvances] = useState<Record<string, Advance[]>>({});
  const [driverName, setDriverName] = useState("");
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [activeProfileId, setActiveProfileId] = useState<string | null>(null);
  
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragCurrent, setDragCurrent] = useState<number | null>(null);

  // Modals / Selection state
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [modalStart, setModalStart] = useState(8);
  const [modalEnd, setModalEnd] = useState(20);
  const [modalManualAmount, setModalManualAmount] = useState("");
  const [modalShiftNote, setModalShiftNote] = useState("");
  const [showAdvancesList, setShowAdvancesList] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [newProfileName, setNewProfileName] = useState("");
  const [newProfileRate, setNewProfileRate] = useState<number | string>(380);
  const [advanceModal, setAdvanceModal] = useState(false);
  const [advanceAmount, setAdvanceAmount] = useState("");
  const [advanceNote, setAdvanceNote] = useState("");
  const [needsAdvanceConfirm, setNeedsAdvanceConfirm] = useState(false);
  const [advanceToDelete, setAdvanceToDelete] = useState<number | null>(null);
  const [editAdvanceId, setEditAdvanceId] = useState<number | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [activeRest, setActiveRest] = useState<ActiveRest | null>(null);
  const [lastRestType, setLastRestType] = useState<24 | 45 | null>(null);
  const [now, setNow] = useState(Date.now());
  const [isUpdating, setIsUpdating] = useState(false);
  const [pullProgress, setPullProgress] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [dismissedPdfReminder, setDismissedPdfReminder] = useState(() => {
    try {
      const saved = localStorage.getItem("dismiss_pdf_reminder");
      const currentLabel = `${today.getFullYear()}-${today.getMonth()}`;
      return saved === currentLabel;
    } catch {
      return false;
    }
  });

  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLocked, setIsLocked] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("calendar_locked");
      return saved !== null ? saved === "true" : true;
    } catch {
      return true;
    }
  });
  const [showLockToast, setShowLockToast] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("calendar_locked", String(isLocked));
    } catch {}
  }, [isLocked]);

  useEffect(() => {
    if (showLockToast) {
      const timer = setTimeout(() => setShowLockToast(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [showLockToast]);

  const dismissPdfReminder = () => {
    try {
      const currentLabel = `${today.getFullYear()}-${today.getMonth()}`;
      localStorage.setItem("dismiss_pdf_reminder", currentLabel);
    } catch {}
    setDismissedPdfReminder(true);
  };

  const handleExportPdf = () => {
    const oldTitle = document.title;
    const cleanDriverName = driverName ? driverName.trim().replace(/\s+/g, "_") : "Driver";
    const monthIndexFormatted = String(currentMonth + 1).padStart(2, '0');
    document.title = `Raport_${cleanDriverName}_${currentYear}_${monthIndexFormatted}`;
    
    window.print();
    
    setTimeout(() => {
      document.title = oldTitle;
    }, 1000);
  };

  const handleExportCsv = () => {
    let csvContent = "\uFEFF";
    csvContent += `Report for ${t.months[currentMonth]} ${currentYear}\n`;
    csvContent += `Driver: ${driverName || "—"}\n\n`;
    csvContent += "SHIFTS\n";
    csvContent += "Date,Start,End,Hours,Amount (zł),Note/Comment\n";
    
    currentMonthShifts.forEach(day => {
      const k = shiftKey(currentYear, currentMonth, day);
      const sh = shifts[k];
      if (sh) {
        const displayEarned = sh.manualAmount !== undefined ? sh.manualAmount : sh.hours * hourRate;
        const note = sh.note ? sh.note.replace(/"/g, '""') : "";
        csvContent += `${day} ${t.monthsShort[currentMonth]} ${currentYear},${formatHour(sh.start)},${formatHour(sh.end)},${sh.hours},${Math.round(displayEarned)},"${note}"\n`;
      }
    });
    
    if (monthAdvances.length > 0) {
      csvContent += "\nADVANCES\n";
      csvContent += "Amount (zł),Note/Comment\n";
      monthAdvances.forEach(adv => {
        const note = adv.note ? adv.note.replace(/"/g, '""') : "";
        csvContent += `${adv.amount},"${note}"\n`;
      });
    }
    
    csvContent += "\nSUMMARY\n";
    csvContent += `Total Shifts,${currentMonthShifts.length}\n`;
    csvContent += `Total Hours,${totalHours}\n`;
    csvContent += `Total Advances,${totalAdvances} zł\n`;
    csvContent += `To Receive,${Math.round(toReceive)} zł\n`;
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const cleanDriverName = driverName ? driverName.trim().replace(/\s+/g, "_") : "Report";
    const monthIndexFormatted = String(currentMonth + 1).padStart(2, '0');
    link.href = url;
    link.setAttribute("download", `Raport_${cleanDriverName}_${currentYear}_${monthIndexFormatted}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportBackupJson = () => {
    // Export full current state including shifts and advances (compatible with import)
    const backupObj = {
      shifts,
      advances,
      driver: driverName,
      year: currentYear,
      month: currentMonth
    };
    const content = JSON.stringify(backupObj, null, 2);
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const cleanDriverName = driverName ? driverName.trim().replace(/\s+/g, "_") : "Driver";
    const monthIndexFormatted = String(currentMonth + 1).padStart(2, '0');
    link.href = url;
    link.setAttribute("download", `Backup_${cleanDriverName}_${currentYear}_${monthIndexFormatted}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const loadPdfJs = async (): Promise<any> => {
    if ((window as any).pdfjsLib) {
      return (window as any).pdfjsLib;
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js";
      script.onload = () => {
        const pdfjsLib = (window as any).pdfjsLib;
        pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js";
        resolve(pdfjsLib);
      };
      script.onerror = () => reject(new Error("Failed to load PDF library"));
      document.head.appendChild(script);
    });
  };

  const extractTextFromPdf = async (file: File): Promise<string> => {
    const pdfjsLib = await loadPdfJs();
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const strings = textContent.items.map((item: any) => item.str);
      fullText += strings.join("\n") + "\n";
    }
    return fullText;
  };

  const parsePdfText = (text: string) => {
    const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
    
    let year = new Date().getFullYear();
    for (const line of lines) {
      const yrMatch = line.match(/\b(20\d{2})\b/);
      if (yrMatch) {
        year = parseInt(yrMatch[1]);
        break;
      }
    }

    let month = new Date().getMonth();
    const uaMonths = ["Січень","Лютий","Березень","Квітень","Травень","Червень","Липень","Серпень","Вересень","Жовтень","Листопад","Грудень"];
    const plMonths = ["Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"];
    
    let foundMonth = false;
    for (const line of lines) {
      for (let m = 0; m < 12; m++) {
        const uaRegex = new RegExp(`\\b${uaMonths[m]}\\b`, "i");
        const plRegex = new RegExp(`\\b${plMonths[m]}\\b`, "i");
        if (uaRegex.test(line) || plRegex.test(line)) {
          month = m;
          foundMonth = true;
          break;
        }
      }
      if (foundMonth) break;
    }

    let driver = "";
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.toLowerCase().includes("водій") || line.toLowerCase().includes("kierowca") || line.toLowerCase().includes("driver")) {
        const colonIndex = line.indexOf(":");
        if (colonIndex !== -1) {
          const after = line.substring(colonIndex + 1).trim();
          if (after && after !== "—") {
            driver = after;
            break;
          }
        }
        if (i + 1 < lines.length) {
          const nextLine = lines[i+1].trim();
          if (nextLine && nextLine !== "—" && !nextLine.toLowerCase().includes("generated") && !nextLine.toLowerCase().includes("version")) {
            driver = nextLine;
            break;
          }
        }
      }
    }

    const uaShorts = ["Січ","Лют","Бер","Кві","Тра","Чер","Лип","Сер","Вер","Жов","Лис","Гру"];
    const plShorts = ["Sty","Lut","Mar","Kwi","Maj","Cze","Lip","Sie","Wrz","Paź","Lis","Gru"];

    const parsedShifts: Record<string, Shift> = {};
    const parsedAdvances: Advance[] = [];

    let inAdvancesSection = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      if (line.toLowerCase().includes("lista zaliczek") || line.toLowerCase().includes("список авансів") || line.toLowerCase().includes("advance list")) {
        inAdvancesSection = true;
        continue;
      }
      if (line.toLowerCase().includes("lista zmian") || line.toLowerCase().includes("список змін") || line.toLowerCase().includes("shift list")) {
        inAdvancesSection = false;
        continue;
      }

      if (!inAdvancesSection) {
        const dateMatch = line.match(/^\s*(\d{1,2})\s+([A-Za-zА-Яа-яЄєІіЇїҐґ]+)/);
        if (dateMatch) {
          const day = parseInt(dateMatch[1]);
          const shortName = dateMatch[2];
          
          const matchUa = uaShorts.findIndex(s => s.toLowerCase() === shortName.toLowerCase());
          const matchPl = plShorts.findIndex(s => s.toLowerCase() === shortName.toLowerCase());
          const matchedMonthIdx = matchUa !== -1 ? matchUa : matchPl;
          
          if (matchedMonthIdx !== -1 && day >= 1 && day <= 31) {
            let hours = 24; 
            let manualAmount: number | undefined = undefined;

            const hoursMatch = line.match(/(\d+)\s*(godz|god|год|perHour|h|H)/);
            if (hoursMatch) {
              hours = parseInt(hoursMatch[1]);
            }

            const zlMatch = line.match(/(\d+)\s*(zł|zl)/);
            if (zlMatch) {
              manualAmount = parseInt(zlMatch[1]);
            }

            const k = shiftKey(year, month, day);
            parsedShifts[k] = {
              start: 0,
              end: hours,
              hours,
              manualAmount
            };
          }
        }
      } else {
        const advMatch = line.match(/^(\d+)\s*(zł|zl)\s*(.*)$/i);
        if (advMatch) {
          const amount = parseInt(advMatch[1]);
          let note = advMatch[3]?.trim();
          if (note === "—") note = "";
          
          parsedAdvances.push({
            id: Date.now() + Math.floor(Math.random() * 100000) + i,
            amount,
            note
          });
        }
      }
    }

    return {
      year,
      month,
      shifts: parsedShifts,
      advances: parsedAdvances,
      driver
    };
  };

  const handleImportFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    let totalShiftsAdded = 0;
    let totalAdvancesAdded = 0;
    const monthsUpdated: string[] = [];

    let tempShifts = { ...shifts };
    let tempAdvances = { ...advances };

    for (let idx = 0; idx < files.length; idx++) {
      const file = files[idx];
      
      if (file.name.endsWith(".json")) {
        try {
          const content = await file.text();
          const parsed = JSON.parse(content);
          
          if (parsed && typeof parsed === "object") {
            if (parsed.shifts) {
              tempShifts = { ...tempShifts, ...parsed.shifts };
              totalShiftsAdded += Object.keys(parsed.shifts).length;
            }
            if (parsed.advances) {
              for (const k in parsed.advances) {
                tempAdvances[k] = parsed.advances[k];
                totalAdvancesAdded += parsed.advances[k].length;
              }
            }
            const label = parsed.month && parsed.year ? `${t.months[parsed.month]} ${parsed.year}` : "Imported JSON";
            monthsUpdated.push(label);
          }
        } catch (err) {
          console.error("JSON parse error:", err);
        }
      } else if (file.name.endsWith(".pdf")) {
        try {
          const text = await extractTextFromPdf(file);
          const result = parsePdfText(text);
          
          if (result) {
            tempShifts = { ...tempShifts, ...result.shifts };
            totalShiftsAdded += Object.keys(result.shifts).length;

            const mk = monthAdvKey(result.year, result.month);
            tempAdvances[mk] = result.advances;
            totalAdvancesAdded += result.advances.length;

            const label = `${t.months[result.month]} ${result.year}`;
            monthsUpdated.push(label);
          }
        } catch (err) {
          console.error("PDF parse error:", err);
        }
      }
    }

    setShifts(tempShifts);
    setAdvances(tempAdvances);

    const uniqueMonths = Array.from(new Set(monthsUpdated));
    const uaMsg = `Успішно імпортовано дані за ${uniqueMonths.join(", ")}! Додано/оновлено ${totalShiftsAdded} змін та ${totalAdvancesAdded} авансів.`;
    const plMsg = `Pomyślnie zaimportowano dane dla ${uniqueMonths.join(", ")}! Dodano/zaktualizowano ${totalShiftsAdded} zmian i ${totalAdvancesAdded} zaliczek.`;
    
    alert(lang === "ua" ? uaMsg : plMsg);
  };

  // Optimized Version Check
  const checkVersion = async () => {
    try {
      const response = await fetch("/version.json?t=" + Date.now());
      if (response.ok) {
        const data = await response.json();
        if (data.version && data.version !== APP_VERSION) {
          setIsUpdating(true);
          setTimeout(() => {
            window.location.reload();
          }, 3000); 
          return true;
        }
      }
    } catch (e) {
      console.error("Version check failed", e);
    }
    return false;
  };

  // Pull to Refresh Logic
  const pullThreshold = 100;
  const startY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    // Only allow pull to refresh if we are at the top of the page
    if (window.scrollY === 0) {
      startY.current = e.touches[0].pageY;
    } else {
      startY.current = 0;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY.current === 0 || isRefreshing || isUpdating) return;
    
    const moveY = e.touches[0].pageY;
    const diff = moveY - startY.current;
    
    if (diff > 0) {
      // Apply some resistance
      const progress = Math.min(diff / 2, pullThreshold);
      setPullProgress(progress);
      
      // If we are actively pulling, prevent scrolling
      if (progress > 10) {
        if (e.cancelable) e.preventDefault();
      }
    }
  };

  const handleTouchEnd = async () => {
    if (pullProgress >= pullThreshold) {
      setIsRefreshing(true);
      setPullProgress(60); // Hold it a bit
      const foundUpdate = await checkVersion();
      if (!foundUpdate) {
        setTimeout(() => {
          setIsRefreshing(false);
          setPullProgress(0);
        }, 1000);
      }
    } else {
      setPullProgress(0);
    }
    startY.current = 0;
  };

  // Timer for active rest
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  // Save language separately for ultimate persistence
  useEffect(() => {
    localStorage.setItem("shift_tracker_preferred_lang", lang);
  }, [lang]);

  const pressTimer = useRef<NodeJS.Timeout | null>(null);
  const didLongPress = useRef(false);

  // Load data logic refactored for reusability (tab sync)
  const loadData = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.shifts) setShifts(parsed.shifts);
        if (parsed.advances) setAdvances(parsed.advances);
        if (parsed.driverName) setDriverName(parsed.driverName);
        if (parsed.lang) setLang(parsed.lang);
        if (parsed.themeName) setThemeName(parsed.themeName);
        if (parsed.shiftRate) setShiftRate(parsed.shiftRate);
        if (parsed.profiles) setProfiles(parsed.profiles);
        if (parsed.activeProfileId) setActiveProfileId(parsed.activeProfileId);
        if (parsed.activeRest) setActiveRest(parsed.activeRest);
        if (parsed.lastRestType) setLastRestType(parsed.lastRestType);
        
        // Show onboarding if version mismatch or never seen
        if (parsed.lastSeenVersion !== APP_VERSION) {
          setShowOnboarding(true);
        }
      } catch (e) {
        console.error("Failed to load data", e);
      }
    } else {
      setShowOnboarding(true);
    }
  };

  // Load data initially
  useEffect(() => {
    loadData();

    // Tab Sync logic
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        loadData();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Save data
  useEffect(() => {
    // Proactively sync current state to active profile in the profiles list
    // so that it's always up to date when saved to localStorage
    let updatedProfiles = profiles;
    if (activeProfileId) {
      updatedProfiles = profiles.map(prof => 
        prof.id === activeProfileId 
          ? { 
              ...prof, 
              shifts, 
              advances, 
              name: driverName, 
              rate: Number(shiftRate) || 380,
              activeRest,
              lastRestType
            }
          : prof
      );
    }

    const data = { 
      shifts, 
      advances, 
      driverName, 
      lang, 
      themeName, 
      shiftRate,
      profiles: updatedProfiles,
      activeProfileId,
      activeRest,
      lastRestType,
      lastSeenVersion: APP_VERSION // Always save current version
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [shifts, advances, driverName, lang, themeName, shiftRate, showOnboarding, activeRest, lastRestType, activeProfileId]);

  const shiftKey = (y: number, m: number, d: number) => `${y}-${m}-${d}`;
  const monthAdvKey = (y: number, m: number) => `${y}-${m}`;

  const daysInMonth = useMemo(() => getDaysInMonth(currentYear, currentMonth), [currentYear, currentMonth]);
  const firstDay = useMemo(() => getFirstDayOfMonth(currentYear, currentMonth), [currentYear, currentMonth]);

  const handleProfileSelect = (p: Profile) => {
    // 1. Sync current state to the PREVIOUS active profile before switching
    if (activeProfileId) {
      setProfiles(prev => prev.map(prof => 
        prof.id === activeProfileId 
          ? { 
              ...prof, 
              shifts, 
              advances, 
              name: driverName, 
              rate: Number(shiftRate) || 380,
              activeRest,
              lastRestType
            }
          : prof
      ));
    }

    // 2. Load NEW profile data into state
    setActiveProfileId(p.id);
    setDriverName(p.name);
    setShiftRate(p.rate);
    setShifts(p.shifts || {});
    setAdvances(p.advances || {});
    setActiveRest(p.activeRest || null);
    setLastRestType(p.lastRestType || null);
    setShowProfileModal(false);
  };

  const addProfile = () => {
    if (!newProfileName.trim()) return;
    const p: Profile = {
      id: Date.now().toString(),
      name: newProfileName,
      rate: Number(newProfileRate) || 380,
      shifts: {},
      advances: {},
      activeRest: null,
      lastRestType: null
    };
    setProfiles(prev => [...prev, p]);
    setNewProfileName("");
    handleProfileSelect(p);
  };

  const deleteProfileById = (id: string) => {
    setProfiles(prev => prev.filter(p => p.id !== id));
    if (activeProfileId === id) setActiveProfileId(null);
  };

  // Shift Logic
  const openShiftModal = (day: number) => {
    const k = shiftKey(currentYear, currentMonth, day);
    if (shifts[k]) {
      setModalStart(shifts[k].start);
      setModalEnd(shifts[k].end);
      setModalManualAmount(shifts[k].manualAmount ? String(shifts[k].manualAmount) : "");
      setModalShiftNote(shifts[k].note || "");
    } else {
      setModalStart(8);
      setModalEnd(20);
      setModalManualAmount("");
      setModalShiftNote("");
    }
    setSelectedDay(day);
  };

  const handleDayClick = (day: number) => {
    const k = shiftKey(currentYear, currentMonth, day);
    if (shifts[k]) {
      setShifts(prev => {
        const n = { ...prev };
        delete n[k];
        return n;
      });
    } else {
      setShifts(prev => ({
        ...prev,
        [k]: { start: 0, end: 24, hours: 24 }
      }));
    }
  };

  const handlePointerDown = (day: number) => {
    if (isLocked) {
      setShowLockToast(true);
      return;
    }
    didLongPress.current = false;
    setDragStart(day);
    setDragCurrent(day);
    pressTimer.current = setTimeout(() => {
      didLongPress.current = true;
      openShiftModal(day);
    }, 550);
  };

  const handlePointerEnter = (day: number) => {
    if (isLocked) return;
    if (dragStart !== null) {
      setDragCurrent(day);
      // If we move to a different day, cancel the long press timer
      if (day !== dragStart && pressTimer.current) {
        clearTimeout(pressTimer.current);
      }
    }
  };

  const handlePointerUp = (day: number) => {
    if (isLocked) return;
    if (pressTimer.current) clearTimeout(pressTimer.current);

    if (dragStart !== null && dragCurrent !== null && dragStart !== dragCurrent) {
      // BATCH TOGGLE
      const start = Math.min(dragStart, dragCurrent);
      const end = Math.max(dragStart, dragCurrent);
      const firstK = shiftKey(currentYear, currentMonth, dragStart);
      const shouldAdd = !shifts[firstK];

      setShifts(prev => {
        const next = { ...prev };
        for (let d = start; d <= end; d++) {
          const k = shiftKey(currentYear, currentMonth, d);
          if (shouldAdd) {
            if (!next[k]) next[k] = { start: 0, end: 24, hours: 24 };
          } else {
            delete next[k];
          }
        }
        return next;
      });
    } else if (!didLongPress.current) {
      // SINGLE CLICK TOGGLE
      handleDayClick(day);
    }
    
    setDragStart(null);
    setDragCurrent(null);
  };

  const handlePointerCancel = () => {
    if (pressTimer.current) clearTimeout(pressTimer.current);
    setDragStart(null);
    setDragCurrent(null);
  };

  const saveShiftCustom = () => {
    if (!selectedDay) return;
    const k = shiftKey(currentYear, currentMonth, selectedDay);
    const hours = modalEnd > modalStart ? modalEnd - modalStart : (24 - modalStart) + modalEnd;
    const manualAmt = parseFloat(modalManualAmount);
    const manualAmount = isNaN(manualAmt) ? undefined : manualAmt;
    
    // finalHours should respect the night shift calculation from above
    const finalHours = hours;
    
    if (finalHours <= 0 && manualAmount === undefined) return;

    setShifts(prev => ({
      ...prev,
      [k]: { start: modalStart, end: modalEnd, hours: finalHours, manualAmount, note: modalShiftNote.trim() || undefined }
    }));
    setSelectedDay(null);
  };

  const removeShift = () => {
    if (!selectedDay) return;
    const k = shiftKey(currentYear, currentMonth, selectedDay);
    setShifts(prev => {
      const n = { ...prev };
      delete n[k];
      return n;
    });
    setSelectedDay(null);
  };

  // Advance Logic
  const mk = monthAdvKey(currentYear, currentMonth);
  const monthAdvances = advances[mk] || [];
  const totalAdvances = monthAdvances.reduce((s, a) => s + a.amount, 0);

  const openAddAdvance = () => {
    setAdvanceAmount("");
    setAdvanceNote("");
    setEditAdvanceId(null);
    setAdvanceModal(true);
    setNeedsAdvanceConfirm(false);
  };

  const openEditAdvance = (id: number) => {
    const adv = monthAdvances.find(a => a.id === id);
    if (!adv) return;
    setAdvanceAmount(String(adv.amount));
    setAdvanceNote(adv.note || "");
    setEditAdvanceId(id);
    setAdvanceModal(true);
    setNeedsAdvanceConfirm(false);
  };

  const advancePressTimer = useRef<NodeJS.Timeout | null>(null);
  const advanceDidLongPress = useRef(false);

  const handleAdvancePointerDown = (id: number) => {
    advanceDidLongPress.current = false;
    advancePressTimer.current = setTimeout(() => {
      advanceDidLongPress.current = true;
      setAdvanceToDelete(id);
      // Haptic feedback if available
      if (window.navigator.vibrate) window.navigator.vibrate(50);
    }, 600);
  };

  const handleAdvancePointerUp = (id: number) => {
    if (advancePressTimer.current) clearTimeout(advancePressTimer.current);
    if (!advanceDidLongPress.current) {
      openEditAdvance(id);
    }
  };

  const handleAdvancePointerCancel = () => {
    if (advancePressTimer.current) clearTimeout(advancePressTimer.current);
  };

  const saveAdvance = () => {
    const amt = parseFloat(advanceAmount);
    if (isNaN(amt) || amt <= 0) return;
    
    setAdvances(prev => {
      const list = prev[mk] ? [...prev[mk]] : [];
      if (editAdvanceId !== null) {
        const idx = list.findIndex(a => a.id === editAdvanceId);
        if (idx !== -1) list[idx] = { ...list[idx], amount: amt, note: advanceNote };
      } else {
        list.push({ id: Date.now(), amount: amt, note: advanceNote });
      }
      return { ...prev, [mk]: list };
    });
    setAdvanceModal(false);
  };

  const deleteAdvance = (id: number) => {
    setAdvances(prev => ({
      ...prev,
      [mk]: (prev[mk] || []).filter(a => a.id !== id)
    }));
  };

  const startRest = (type: 24 | 45) => {
    // Compensation logic
    let target: number = type;
    if (type === 45 && lastRestType === 24) {
      target = 66; // 45 + 21h compensation
    }
    
    setActiveRest({ type, startTime: Date.now(), targetHours: target });
    setLastRestType(type);
  };

  // Calculations
  const currentMonthShifts = useMemo(() => {
    return Array.from({ length: daysInMonth }, (_, i) => i + 1)
      .filter(d => shifts[shiftKey(currentYear, currentMonth, d)]);
  }, [shifts, currentYear, currentMonth, daysInMonth]);

  const monthTotalEarned = useMemo(() => {
    return currentMonthShifts.reduce((acc, d) => {
      const s = shifts[shiftKey(currentYear, currentMonth, d)];
      if (!s) return acc;
      return acc + (s.manualAmount !== undefined ? s.manualAmount : s.hours * hourRate);
    }, 0);
  }, [currentMonthShifts, shifts, currentYear, currentMonth, hourRate]);

  const totalHours = useMemo(() => {
    return currentMonthShifts.reduce((a, d) => a + (shifts[shiftKey(currentYear, currentMonth, d)]?.hours || 0), 0);
  }, [currentMonthShifts, shifts, currentYear, currentMonth]);

  const toReceive = monthTotalEarned - totalAdvances;

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(y => y - 1);
    } else setCurrentMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(y => y + 1);
    } else setCurrentMonth(m => m + 1);
  };

  const nextTheme = () => {
    const names: ThemeName[] = ["deep-night", "midnight", "forest", "sunset", "light"];
    const idx = names.indexOf(themeName);
    setThemeName(names[(idx + 1) % names.length]);
  };

  const fullReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  };

  const cells = useMemo(() => {
    const items = [];
    for (let i = 0; i < firstDay; i++) items.push(null);
    for (let d = 1; d <= daysInMonth; d++) items.push(d);
    // Fill to 42 cells (6 rows) to prevent layout jumps
    while (items.length < 42) items.push(null);
    return items;
  }, [firstDay, daysInMonth]);

  const historyData = useMemo(() => {
    const monthMap: Record<string, { year: number, month: number, shifts: number, hours: number, earned: number, advances: number }> = {};
    
    // Process shifts
    Object.keys(shifts).forEach(key => {
      const [y, m] = key.split('-').map(Number);
      const mk = `${y}-${m}`;
      if (!monthMap[mk]) {
        monthMap[mk] = { year: y, month: m, shifts: 0, hours: 0, earned: 0, advances: 0 };
      }
      const s = shifts[key];
      monthMap[mk].shifts += 1;
      monthMap[mk].hours += s.hours;
      monthMap[mk].earned += s.manualAmount !== undefined ? s.manualAmount : s.hours * hourRate;
    });

    // Process advances
    Object.keys(advances).forEach(key => {
      const [y, m] = key.split('-').map(Number);
      const mk = `${y}-${m}`;
      if (!monthMap[mk]) {
        monthMap[mk] = { year: y, month: m, shifts: 0, hours: 0, earned: 0, advances: 0 };
      }
      monthMap[mk].advances = advances[key].reduce((sum, a) => sum + a.amount, 0);
    });

    return Object.values(monthMap).sort((a, b) => b.year - a.year || b.month - a.month);
  }, [shifts, advances, hourRate]);

  return (
    <div 
      className={`min-h-screen ${theme.bg} ${theme.text} font-mono selection:bg-purple-500/30 transition-colors duration-500`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull Indicator */}
      <div 
        className="fixed top-0 inset-x-0 z-[150] flex items-center justify-center overflow-hidden pointer-events-none"
        style={{ height: pullProgress }}
      >
        <motion.div 
          animate={isRefreshing ? { rotate: 360 } : { rotate: 0 }}
          transition={isRefreshing ? { repeat: Infinity, duration: 1, ease: "linear" } : {}}
          className={`${theme.accent} p-3 rounded-full text-white shadow-xl flex items-center gap-2`}
        >
          <RefreshCw size={16} />
          {pullProgress >= pullThreshold && !isRefreshing && <span className="text-[8px] font-black uppercase pr-1">Release</span>}
        </motion.div>
      </div>
      {/* Update Layer */}
      <AnimatePresence>
        {isUpdating && (
          <motion.div 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="fixed top-0 inset-x-0 z-[200] bg-blue-600 text-white p-4 flex items-center justify-center gap-3 shadow-2xl"
          >
            <div className="animate-spin">
              <Globe size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black uppercase tracking-widest">{t.newUpdate}</span>
              <span className="text-[10px] font-bold opacity-80 uppercase tracking-tighter">{t.updating}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none print:hidden">
        <div className={`absolute top-[-10%] right-[-10%] w-[50%] h-[50%] ${themeName === 'light' ? 'bg-purple-200/40' : 'bg-purple-900/20'} rounded-full blur-[120px]`} />
        <div className={`absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] ${themeName === 'light' ? 'bg-amber-100/40' : 'bg-amber-900/10'} rounded-full blur-[120px]`} />
      </div>

      {/* Calendar Lock Toast Alert */}
      <AnimatePresence>
        {showLockToast && (
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
            className="fixed top-20 inset-x-4 mx-auto z-[250] max-w-sm pointer-events-auto"
          >
            <div className="p-4 rounded-2xl bg-rose-600 text-white shadow-2xl flex items-center gap-3 border border-rose-500">
              <div className="p-1.5 bg-white/20 rounded-lg shrink-0">
                <Lock size={16} className="animate-pulse" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold leading-normal">
                  {t.calendarLockedToast}
                </p>
              </div>
              <button 
                onClick={() => setShowLockToast(false)} 
                className="p-1 text-white/60 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-md mx-auto px-4 py-8 pb-24 print:hidden">
        
        {/* Header */}
        <header className="flex items-start justify-between mb-8">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-[10px] tracking-[0.4em] ${theme.accentText} uppercase font-bold mb-1`}
            >
              {t.appTitle}
            </motion.div>
            <div className={`text-[8px] font-medium tracking-[0.2em] uppercase ${theme.textMuted} -mt-1 mb-2 opacity-50`}>
              Create by Valentyn
            </div>
            <div className="flex items-baseline gap-2">
              <input
                type="number"
                value={shiftRate}
                onChange={e => setShiftRate(e.target.value === "" ? "" : Number(e.target.value))}
                onBlur={() => { if (shiftRate === "" || shiftRate === 0) setShiftRate(380) }}
                className={`w-20 bg-transparent border-b ${theme.border} focus:border-${theme.accent} focus:outline-none font-black text-3xl text-current transition-all`}
              />
              <span className={`text-sm font-medium ${theme.textMuted}`}>zł / {t.perShift}</span>
              <span className="text-[9px] opacity-20 font-bold ml-2">v{APP_VERSION}</span>
            </div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.2 }}
              className="text-[11px] mt-1 opacity-60"
            >
              ≈ {hourRate.toFixed(2)} zł / {t.perHour}
            </motion.div>
          </div>

          <div className="flex gap-1.5 items-center shrink-0 select-none">
            {/* Actions Menu */}
            <div className="relative">
              <button
                onClick={() => setShowActionsMenu(!showActionsMenu)}
                className={`w-9 sm:w-10 h-9 sm:h-10 flex items-center justify-center ${theme.accentMuted} border ${theme.border} rounded-xl text-xs font-bold ${theme.accentText} transition-all duration-300 hover:scale-[1.05] active:scale-95`}
                title={lang === "ua" ? "Дії / Експорт" : "Akcje / Eksport"}
              >
                <Download size={14} className="opacity-80" />
              </button>

              <AnimatePresence>
                {showActionsMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-[150]" 
                      onClick={() => setShowActionsMenu(false)}
                    />
                    
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className={`absolute right-0 mt-2 w-56 rounded-2xl ${themeName === 'light' ? 'bg-white shadow-xl' : 'bg-[#1a1a2e]' } shadow-[0_10px_30px_rgba(0,0,0,0.5)] border ${theme.border} p-1.5 z-[160] overflow-hidden`}
                    >
                      <button
                        onClick={() => {
                          setShowActionsMenu(false);
                          handleExportPdf();
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-black uppercase tracking-wider hover:${themeName === 'light' ? 'bg-slate-100' : 'bg-white/5'} transition-all text-emerald-500`}
                      >
                        <Save size={14} />
                        <span>{t.exportPdf}</span>
                      </button>

                      <button
                        onClick={() => {
                          setShowActionsMenu(false);
                          handleExportCsv();
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-black uppercase tracking-wider hover:${themeName === 'light' ? 'bg-slate-100' : 'bg-white/5'} transition-all text-blue-500`}
                      >
                        <FileSpreadsheet size={14} />
                        <span>{(t as any).exportCsv}</span>
                      </button>

                      <button
                        onClick={() => {
                          setShowActionsMenu(false);
                          handleExportBackupJson();
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-black uppercase tracking-wider hover:${themeName === 'light' ? 'bg-slate-100' : 'bg-white/5'} transition-all text-indigo-500`}
                      >
                        <Database size={14} />
                        <span>{(t as any).backupJson}</span>
                      </button>

                      <div className={`h-px ${themeName === 'light' ? 'bg-slate-200' : 'bg-white/10'} my-1`} />

                      <div className="relative">
                        <input 
                          type="file"
                          ref={fileInputRef}
                          accept=".pdf,.json"
                          multiple
                          onChange={(e) => {
                            setShowActionsMenu(false);
                            handleImportFiles(e);
                          }}
                          className="hidden"
                        />
                        <button
                          onClick={() => {
                            fileInputRef.current?.click();
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-black uppercase tracking-wider hover:${themeName === 'light' ? 'bg-slate-100' : 'bg-white/5'} transition-all text-amber-500`}
                        >
                          <Upload size={14} />
                          <span>{lang === "ua" ? "Імпорт PDF/JSON" : "Import PDF/JSON"}</span>
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Calendar Protection Lock */}
            <button
              onClick={() => setIsLocked(!isLocked)}
              className={`w-9 sm:w-10 h-9 sm:h-10 flex items-center justify-center border rounded-xl transition-all duration-300 hover:scale-[1.05] active:scale-95 ${
                isLocked
                  ? 'bg-rose-500/10 border-rose-500/20 text-rose-500 hover:bg-rose-500/25'
                  : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/25'
              }`}
              title={isLocked ? (lang === 'ua' ? "Календар заблоковано. Натисніть, щоб дозволити зміни" : "Kalendarz zablokowany. Kliknij, aby zezwolić na zmiany") : (lang === 'ua' ? "Блокування змін календаря" : "Zablokuj kalendarz przed zmianami")}
            >
              {isLocked ? <Lock size={14} className="opacity-85" /> : <Unlock size={14} className="opacity-85" />}
            </button>

            {/* Theme Selector */}
            <button
              onClick={nextTheme}
              className={`w-9 sm:w-10 h-9 sm:h-10 flex items-center justify-center ${theme.accentMuted} border ${theme.border} rounded-xl text-sm ${theme.accentText} transition-all duration-300 hover:scale-[1.05] active:scale-95`}
              title={t.theme}
            >
              <span className="text-sm select-none">{themeName === 'light' ? '☀️' : themeName === 'deep-night' ? '🌌' : themeName === 'midnight' ? '🌊' : themeName === 'forest' ? '🌲' : '🌇'}</span>
            </button>

            {/* Language Selector */}
            <button
              onClick={() => setLang(l => l === "ua" ? "pl" : "ua")}
              className={`w-9 sm:w-10 h-9 sm:h-10 flex items-center justify-center ${theme.accentMuted} border ${theme.border} rounded-xl text-xs font-black ${theme.accentText} transition-all duration-300 hover:scale-[1.05] active:scale-95`}
              title={lang === "ua" ? "Zmiana języka na Polski" : "Зміна мови на Українську"}
            >
              <Globe size={14} className="opacity-80" />
            </button>
          </div>
        </header>

        {/* Driver Name Input */}
        <div className="flex items-center gap-2 mb-6">
          <div className="relative flex-1 group">
            <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.accentText} opacity-30 group-focus-within:opacity-100 transition-opacity`}>
              <User size={18} />
            </div>
            <input
              value={driverName}
              onChange={e => setDriverName(e.target.value)}
              placeholder={t.driverPlaceholder}
              className={`w-full ${themeName === 'light' ? 'bg-black/5' : 'bg-white/5'} border ${theme.border} rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-${theme.accent}/40 transition-all placeholder:opacity-30`}
            />
          </div>
          <button
            onClick={() => setShowProfileModal(true)}
            className={`p-4 rounded-2xl ${theme.accentMuted} border ${theme.border} ${theme.accentText} hover:scale-105 active:scale-95 transition-all flex items-center justify-center`}
            title={t.manageProfiles}
          >
            <Users size={18} className="opacity-60" />
          </button>
        </div>



        {/* Monthly PDF Export Reminder */}
        {today.getDate() === 1 && !dismissedPdfReminder && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-5 rounded-3xl border border-amber-500/30 bg-amber-500/5 backdrop-blur-xl relative overflow-hidden`}
          >
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-amber-500 text-black rounded-xl">
                <AlertCircle size={18} />
              </div>
              <div className="flex-1 pr-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">
                  {lang === 'ua' ? 'Нагадування' : 'Przypomnienie'}
                </span>
                <p className="text-xs font-bold leading-normal mt-1 opacity-90">
                  {t.pdfReminder}
                </p>
                <button 
                  onClick={handleExportPdf}
                  className="mt-3 text-[10px] font-black uppercase tracking-widest bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded-xl transition-all"
                >
                  {t.exportPdfBtn}
                </button>
              </div>
              <button 
                onClick={dismissPdfReminder}
                className="absolute top-4 right-4 p-1 hover:bg-white/10 rounded-full opacity-40 hover:opacity-100 transition-all text-current"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}



        {/* Calendar Card */}
        <section className={`${theme.card} border ${theme.border} rounded-[32px] p-6 backdrop-blur-xl shadow-2xl mb-6 transition-colors`}>
          <div className="flex items-center justify-between mb-8">
            <button onClick={prevMonth} className={`p-2 rounded-full hover:bg-white/5 ${theme.accentText}`}>
              <ChevronLeft size={24} />
            </button>
            <div className="text-center">
              <div className="text-xl font-bold tracking-wide">{t.months[currentMonth]}</div>
              <div className={`text-[10px] ${theme.textMuted} font-bold tracking-widest uppercase mt-0.5`}>{currentYear}</div>
            </div>
            <button onClick={nextMonth} className={`p-2 rounded-full hover:bg-white/5 ${theme.accentText}`}>
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Days Header */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {t.days.map(d => (
              <div key={d} className={`text-center text-[10px] font-black ${theme.textMuted} tracking-wider uppercase opacity-50`}>{d}</div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {cells.map((day, idx) => {
              if (!day) return <div key={`empty-${currentYear}-${currentMonth}-${idx}`} className="aspect-square" />;
              const k = shiftKey(currentYear, currentMonth, day);
              const shift = shifts[k];
              const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
              
              return (
                <button
                  key={k}
                  onPointerDown={() => handlePointerDown(day)}
                  onPointerEnter={() => handlePointerEnter(day)}
                  onPointerUp={() => handlePointerUp(day)}
                  onPointerLeave={handlePointerCancel}
                  onPointerCancel={handlePointerCancel}
                  className={`
                    relative aspect-square flex flex-col items-center justify-center rounded-xl transition-all duration-200 active:scale-95 touch-none select-none
                    ${shift 
                      ? `bg-${theme.accent} text-white shadow-lg ${theme.glow}` 
                      : `${themeName === 'light' ? 'bg-slate-50' : 'bg-white/[0.04]'} text-current opacity-40 ring-1 ring-inset ${theme.border} hover:opacity-100`
                    }
                    ${isToday && !shift ? `ring-2 ring-${theme.accent}/50 ${theme.accentText} opacity-100` : ''}
                    ${dragStart !== null && dragCurrent !== null && day >= Math.min(dragStart, dragCurrent) && day <= Math.max(dragStart, dragCurrent) ? 'scale-105 ring-2 ring-inset ring-white/50 z-10' : ''}
                  `}
                >
                  <span className={`text-[13px] sm:text-sm leading-none ${shift ? 'font-black text-white -mt-3 pb-0.5' : 'font-medium'}`}>{day}</span>
                  {shift?.note && (
                    <div className="absolute top-1.5 right-1.5 w-1 h-1 bg-amber-400 rounded-full" />
                  )}
                  {shift && (
                    <div className="absolute bottom-1 right-0 left-0 text-center flex flex-col items-center justify-center">
                      <span className="text-[7px] sm:text-[8px] font-black text-white/95 leading-none">
                        {shift.hours}H
                      </span>
                      {shift.manualAmount !== undefined && (
                        <span className="text-[5px] sm:text-[6px] font-black text-amber-300 uppercase leading-none mt-0.5">zł!</span>
                      )}
                    </div>
                  )}
                  {isToday && !shift && (
                    <div className={`absolute -top-1 -right-1 w-2 h-2 ${theme.indicator} rounded-full shadow-[0_0_8px_rgba(0,0,0,0.2)]`} />
                  )}
                </button>
              );
            })}
          </div>

          <div className={`mt-8 flex items-center justify-center gap-2 text-[9px] ${theme.textMuted} uppercase tracking-[0.1em]`}>
            <Clock size={12} className="opacity-50" />
            {t.hint}
          </div>
        </section>

        {/* Summary Dashboard */}
        <section className={`${theme.card} border ${theme.border} rounded-[32px] p-6 backdrop-blur-xl mb-6`}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 ${theme.accentMuted} rounded-lg ${theme.accentText}`}>
              <CalendarIcon size={16} />
            </div>
            <div className={`text-[10px] tracking-widest ${theme.textMuted} uppercase font-black`}>
              {t.summary} {t.months[currentMonth]}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: t.shifts, value: currentMonthShifts.length, icon: CheckCircle2, color: theme.accentText },
              { label: t.hours, value: totalHours, icon: Clock, color: "text-current opacity-70" },
              { label: t.earned, value: `${Math.round(monthTotalEarned)} zł`, icon: Wallet, color: "text-current font-black" }
            ].map((item) => (
              <div key={item.label} className={`${themeName === 'light' ? 'bg-slate-100' : 'bg-white/5'} border ${theme.border} rounded-2xl p-3 text-center transition-colors`}>
                <div className={`text-lg font-black mb-1 ${item.color}`}>{item.value}</div>
                <div className={`text-[9px] ${theme.textMuted} font-bold uppercase tracking-tight`}>{item.label}</div>
              </div>
            ))}
          </div>

          {/* Financial Breakdown */}
          <div className={`${themeName === 'light' ? 'bg-slate-100' : 'bg-black/30'} border ${theme.border} rounded-2xl p-4 mb-6`}>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold ${theme.textMuted} uppercase`}>{t.totalEarned}</span>
                <span className="text-sm font-bold">{Math.round(monthTotalEarned)} zł</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold ${theme.textMuted} uppercase`}>{t.totalAdvances}</span>
                <span className="text-sm font-bold text-red-500">−{Math.round(totalAdvances)} zł</span>
              </div>
              <div className={`h-px ${themeName === 'light' ? 'bg-slate-200' : 'bg-white/10'} my-1`} />
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-black ${theme.accentText} uppercase tracking-wide`}>{t.balance}</span>
                <div className="text-right">
                  <div className={`text-xl font-black ${toReceive >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {Math.round(toReceive)} zł
                  </div>
                  <div className={`text-[9px] ${theme.textMuted} uppercase font-bold`}>{t.toReceive}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          {currentMonthShifts.length > 0 && (
            <div>
              <div className={`${themeName === 'light' ? 'bg-slate-200' : 'bg-white/5'} h-1.5 rounded-full overflow-hidden mb-2`}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((currentMonthShifts.length / 30) * 100, 100)}%` }}
                  className={`h-full ${theme.indicator} shadow-lg`}
                />
              </div>
              <div className={`text-[9px] font-bold ${theme.textMuted} text-right uppercase tracking-[0.2em]`}>
                {currentMonthShifts.length} {t.progress}
              </div>
            </div>
          )}
        </section>

        {/* Advances Panel Trigger */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAdvancesList(prev => !prev)}
          className={`
            w-full flex items-center justify-between p-5 rounded-3xl border transition-all duration-300
            ${showAdvancesList 
              ? `${theme.secondaryBorder} ${theme.secondaryBg} text-current` 
              : `bg-transparent ${theme.secondaryBorder} opacity-60 hover:opacity-100`
            }
          `}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl bg-${theme.secondary} ${themeName === 'light' ? 'text-white' : 'text-black'}`}>
              <Wallet size={18} />
            </div>
            <span className="text-sm font-black uppercase tracking-widest">{t.advances}</span>
          </div>
          {totalAdvances > 0 && (
            <div className={`px-3 py-1 ${theme.secondaryBg} border border-current/20 rounded-lg text-sm font-black`}>
              {Math.round(totalAdvances)} zł
            </div>
          )}
        </motion.button>



        {/* Advances Content */}
        <AnimatePresence>
          {showAdvancesList && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 12 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="overflow-hidden"
            >
              <div className={`${themeName === 'light' ? 'bg-amber-100/30' : 'bg-amber-500/5'} border ${theme.secondaryBorder} rounded-[32px] p-6 backdrop-blur-xl`}>
                <div className="flex items-center justify-between mb-6">
                  <div className={`text-[10px] font-black opacity-60 uppercase tracking-widest`}>
                    {t.advancesTitle} {t.monthsShort[currentMonth]}
                  </div>
                  <button 
                    onClick={openAddAdvance}
                    className={`p-2 ${theme.secondaryBg} rounded-xl hover:bg-current/10 transition-colors`}
                  >
                    <Plus size={20} />
                  </button>
                </div>

                {monthAdvances.length === 0 ? (
                  <div className={`py-8 text-center ${themeName === 'light' ? 'bg-slate-50' : 'bg-black/20'} rounded-2xl border ${theme.border}`}>
                    <div className="opacity-10 mb-2 flex justify-center">
                      <AlertCircle size={32} />
                    </div>
                    <div className={`text-[11px] font-bold ${theme.textMuted} uppercase tracking-widest`}>{t.noAdvances}</div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <AnimatePresence initial={false}>
                      {monthAdvances.map(adv => (
                        <motion.div 
                          key={adv.id}
                          layout
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ x: -200, opacity: 0 }}
                          className="relative overflow-hidden rounded-2xl group"
                        >
                          {/* Deletion Layer (Behind) */}
                          <div className="absolute inset-x-0 inset-y-0 bg-red-500 flex items-center justify-end px-6 z-0 rounded-2xl transition-all">
                             <Trash2 size={20} className="text-white" />
                          </div>

                          {/* Content Layer (Draggable) */}
                          <motion.div 
                            drag="x"
                            dragConstraints={{ left: -100, right: 0 }}
                            dragElastic={0.15}
                            onDragEnd={(_, info) => {
                              if (info.offset.x < -80) {
                                deleteAdvance(adv.id);
                              }
                            }}
                            onPointerDown={() => handleAdvancePointerDown(adv.id)}
                            onPointerUp={() => handleAdvancePointerUp(adv.id)}
                            onPointerLeave={handleAdvancePointerCancel}
                            onPointerCancel={handleAdvancePointerCancel}
                            className={`relative z-10 flex items-center justify-between ${themeName === 'light' ? 'bg-white' : 'bg-[#1a1a2e]'} border ${theme.border} rounded-2xl p-4 cursor-grab active:cursor-grabbing transition-colors duration-300`}
                          >
                            <div className="flex-1 cursor-pointer">
                              <div className={`text-lg font-black text-${theme.secondary}`}>{adv.amount} zł</div>
                              {adv.note && <div className={`text-[10px] ${theme.textMuted} font-medium uppercase truncate mt-0.5`}>{adv.note}</div>}
                            </div>
                            
                            <div className="flex items-center gap-2 opacity-20 group-hover:opacity-100 transition-opacity pointer-events-none">
                              <ChevronLeft size={12} className="animate-pulse" />
                              <span className="text-[10px] font-black uppercase tracking-tighter opacity-50">Swipe</span>
                            </div>
                          </motion.div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* History Action (Moved under calendar and advances) */}
        <div className="mt-8">
          <button 
            onClick={() => setShowHistory(true)}
            className={`w-full py-4 bg-purple-500/5 hover:bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center gap-2 text-purple-400 group transition-all duration-300 shadow-md hover:shadow-purple-500/10`}
          >
            <CalendarIcon size={16} className="opacity-60 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-black uppercase tracking-wider">{t.history}</span>
          </button>
        </div>



        {/* Footer Version */}
        <div className="mt-12 mb-4 text-center">
          <button 
            onClick={() => setShowOnboarding(true)}
            className={`text-[9px] font-bold tracking-[0.2em] uppercase opacity-30 hover:opacity-100 transition-opacity flex flex-col items-center gap-2 mx-auto`}
          >
            <span>{t.appTitle} · {t.version} {APP_VERSION}</span>
          </button>

          <button 
            onClick={() => setShowResetConfirm(true)}
            className="mt-6 text-[8px] font-black uppercase tracking-widest opacity-20 hover:opacity-100 hover:text-red-500 transition-all flex items-center gap-1.5 mx-auto"
          >
            <Trash2 size={10} />
            {t.clearData}
          </button>
        </div>
      </div>

      {/* SHIFT MODAL */}
      <AnimatePresence>
        {selectedDay !== null && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDay(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className={`relative w-full max-w-sm ${themeName === 'light' ? 'bg-white' : 'bg-[#1a1a2e]'} border ${theme.border} rounded-[32px] max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <div className="text-2xl font-black text-current">{selectedDay} {t.months[currentMonth]}</div>
                    <div className={`text-[10px] ${theme.accentText} font-black tracking-widest uppercase mt-1`}>{t.shiftModal}</div>
                  </div>
                  <button onClick={() => setSelectedDay(null)} className={`p-2 ${theme.textMuted} hover:text-current transition-colors`}>
                    <X size={24} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className={`block text-[10px] font-black ${theme.textMuted} uppercase tracking-widest mb-3`}>{t.start}</label>
                    <div className="relative">
                      <select 
                        value={modalStart}
                        onChange={(e) => setModalStart(Number(e.target.value))}
                        className={`w-full appearance-none ${themeName === 'light' ? 'bg-slate-100' : 'bg-white/5'} border ${theme.border} rounded-2xl py-4 px-4 text-current font-black text-lg focus:outline-none focus:ring-2 focus:ring-${theme.accent}/40`}
                      >
                        {Array.from({ length: 25 }, (_, i) => (
                          <option key={i} value={i} className={themeName === 'light' ? 'bg-white' : 'bg-[#1a1a2e]'}>{formatHour(i)}</option>
                        ))}
                      </select>
                      <div className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${theme.textMuted} opacity-30`}>
                        <ChevronRight size={16} className="rotate-90" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className={`block text-[10px] font-black ${theme.textMuted} uppercase tracking-widest mb-3`}>{t.end}</label>
                    <div className="relative">
                      <select 
                        value={modalEnd}
                        onChange={(e) => setModalEnd(Number(e.target.value))}
                        className={`w-full appearance-none ${themeName === 'light' ? 'bg-slate-100' : 'bg-white/5'} border ${theme.border} rounded-2xl py-4 px-4 text-current font-black text-lg focus:outline-none focus:ring-2 focus:ring-${theme.accent}/40`}
                      >
                        {Array.from({ length: 25 }, (_, i) => (
                          <option key={i} value={i} className={themeName === 'light' ? 'bg-white' : 'bg-[#1a1a2e]'}>{formatHour(i)}</option>
                        ))}
                      </select>
                      <div className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${theme.textMuted} opacity-30`}>
                        <ChevronRight size={16} className="rotate-90" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className={`block text-[10px] font-black ${theme.textMuted} uppercase tracking-widest mb-3`}>{t.manualAmountLabel}</label>
                  <input
                    type="number"
                    value={modalManualAmount}
                    onChange={e => setModalManualAmount(e.target.value)}
                    placeholder="0"
                    className={`w-full ${themeName === 'light' ? 'bg-slate-100' : 'bg-white/5'} border ${theme.border} rounded-2xl py-4 px-4 text-current font-black text-lg focus:outline-none focus:ring-2 focus:ring-${theme.accent}/40`}
                  />
                </div>

                <div className="mb-8">
                  <label className={`block text-[10px] font-black ${theme.textMuted} uppercase tracking-widest mb-3`}>{(t as any).shiftNoteLabel}</label>
                  <input
                    type="text"
                    value={modalShiftNote}
                    onChange={e => setModalShiftNote(e.target.value)}
                    placeholder={(t as any).notePlaceholder}
                    className={`w-full ${themeName === 'light' ? 'bg-slate-100' : 'bg-white/5'} border ${theme.border} rounded-2xl py-4 px-4 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-${theme.accent}/40`}
                  />
                </div>

                <div className={`${theme.accentMuted} border ${theme.border} rounded-2xl p-4 text-center mb-8`}>
                  <div className={`text-[10px] font-black ${theme.accentText} uppercase tracking-widest mb-1`}>{t.hoursEarned}</div>
                  <div className="text-xl font-black text-current">
                    {modalEnd > modalStart ? modalEnd - modalStart : 0}h → {
                      modalManualAmount && !isNaN(parseFloat(modalManualAmount)) 
                      ? `${modalManualAmount} zł` 
                      : `${Math.round((modalEnd > modalStart ? modalEnd - modalStart : 0) * hourRate)} zł`
                    }
                  </div>
                </div>

                {modalEnd <= modalStart && modalEnd !== 0 && (
                  <div className="text-[10px] font-bold text-red-500 text-center uppercase tracking-wider mb-6">
                    {t.timeError}
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  <button
                    onClick={saveShiftCustom}
                    disabled={modalEnd <= modalStart && !modalManualAmount}
                    className={`w-full py-4 bg-${theme.accent} hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed rounded-2xl text-white font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2`}
                  >
                    <Save size={18} />
                    {t.saveShift}
                  </button>
                  {shifts[shiftKey(currentYear, currentMonth, selectedDay)] && (
                    <button
                      onClick={removeShift}
                      className="w-full py-4 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-2xl text-red-500 font-bold uppercase tracking-widest transition-all"
                    >
                      {t.delete}
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedDay(null)}
                    className={`w-full py-2 ${theme.textMuted} text-xs font-bold uppercase tracking-widest hover:text-current transition-colors`}
                  >
                    {t.cancel}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ADVANCE MODAL */}
      <AnimatePresence>
        {advanceModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAdvanceModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className={`relative w-full max-w-sm ${themeName === 'light' ? 'bg-white' : 'bg-[#1a1a2e]'} border ${theme.border} rounded-[32px] max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <div className="text-2xl font-black text-current">{t.addAdvance}</div>
                    <div className={`text-[10px] text-${theme.secondary} font-black tracking-widest uppercase mt-1`}>
                      {t.months[currentMonth]} {currentYear}
                    </div>
                  </div>
                  <button onClick={() => setAdvanceModal(false)} className={`p-2 ${theme.textMuted} hover:text-current transition-colors`}>
                    <X size={24} />
                  </button>
                </div>

                <div className="mb-6">
                  <label className={`block text-[10px] font-black text-${theme.secondary} opacity-60 uppercase tracking-widest mb-3`}>{t.advanceAmount}</label>
                  <input
                    type="number"
                    value={advanceAmount}
                    onChange={e => setAdvanceAmount(e.target.value)}
                    placeholder="0"
                    autoFocus
                    className={`w-full ${themeName === 'light' ? 'bg-slate-100' : 'bg-white/5'} border ${theme.border} rounded-2xl py-4 px-4 text-current font-black text-3xl focus:outline-none focus:ring-2 focus:ring-${theme.secondary}/40`}
                  />
                </div>

                <div className="mb-8">
                  <label className={`block text-[10px] font-black text-${theme.secondary} opacity-60 uppercase tracking-widest mb-3`}>{t.advanceNote}</label>
                  <input
                    value={advanceNote}
                    onChange={e => setAdvanceNote(e.target.value)}
                    className={`w-full ${themeName === 'light' ? 'bg-slate-100' : 'bg-white/5'} border ${theme.border} rounded-2xl py-4 px-4 text-current font-medium text-sm focus:outline-none focus:ring-2 focus:ring-${theme.secondary}/40`}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={saveAdvance}
                    disabled={!advanceAmount || parseFloat(advanceAmount) <= 0}
                    className={`w-full py-4 ${
                      !advanceAmount || parseFloat(advanceAmount) <= 0
                        ? 'opacity-30 cursor-not-allowed'
                        : 'hover:opacity-90 active:scale-[0.99]'
                    } bg-${theme.secondary} rounded-2xl ${themeName === 'light' ? 'text-white' : 'text-black'} font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2`}
                  >
                    <CheckCircle2 size={18} />
                    <span>OK</span>
                  </button>
                  <button
                    onClick={() => setAdvanceModal(false)}
                    className={`w-full py-2 ${theme.textMuted} text-xs font-bold uppercase tracking-widest hover:text-current transition-colors`}
                  >
                    {t.cancel}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* HISTORY MODAL */}
      <AnimatePresence>
        {showHistory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHistory(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className={`relative w-full max-w-md ${themeName === 'light' ? 'bg-white' : 'bg-[#1a1a2e]'} border ${theme.border} rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]`}
            >
              <div className="p-8 border-b border-white/5 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black">{t.historyLog}</h3>
                  <div className={`text-[10px] ${theme.textMuted} font-bold tracking-widest uppercase mt-0.5`}>v{APP_VERSION}</div>
                </div>
                <button onClick={() => setShowHistory(false)} className={`p-2 ${theme.textMuted} hover:text-current transition-colors`}>
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {historyData.length === 0 ? (
                  <div className="py-20 text-center opacity-30 uppercase text-[10px] font-black tracking-widest">
                    {t.noHistory}
                  </div>
                ) : (
                  historyData.map((item) => (
                    <button
                      key={`${item.year}-${item.month}`}
                      onClick={() => {
                        setCurrentYear(item.year);
                        setCurrentMonth(item.month);
                        setShowHistory(false);
                      }}
                      className={`w-full text-left p-5 rounded-3xl border ${theme.border} ${themeName === 'light' ? 'bg-slate-50' : 'bg-white/5'} hover:bg-current/[0.03] transition-colors group`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="text-sm font-black text-current">{T[lang].months[item.month]}</div>
                          <div className={`text-[9px] font-bold ${theme.textMuted} tracking-widest uppercase`}>{item.year}</div>
                        </div>
                        <div className={`text-lg font-black ${item.earned - item.advances >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {Math.round(item.earned - item.advances)} zł
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-center p-2 bg-black/5 rounded-xl border border-white/5">
                          <div className="text-[10px] font-black text-current/80">{item.shifts}</div>
                          <div className={`text-[7px] ${theme.textMuted} font-bold uppercase tracking-tight`}>{t.shifts}</div>
                        </div>
                        <div className="text-center p-2 bg-black/5 rounded-xl border border-white/5">
                          <div className="text-[10px] font-black text-current/80">{item.hours}h</div>
                          <div className={`text-[7px] ${theme.textMuted} font-bold uppercase tracking-tight`}>{t.hours}</div>
                        </div>
                        <div className="text-center p-2 bg-black/5 rounded-xl border border-white/5">
                          <div className="text-[10px] font-black text-red-500">−{Math.round(item.advances)}</div>
                          <div className={`text-[7px] ${theme.textMuted} font-bold uppercase tracking-tight`}>{t.advances}</div>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ONBOARDING MODAL */}
      <AnimatePresence>
        {showOnboarding && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowOnboarding(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`relative w-full max-w-sm ${themeName === 'light' ? 'bg-white' : 'bg-[#1a1a2e]'} border ${theme.border} rounded-[40px] overflow-hidden shadow-2xl p-8`}
            >
              <div className="text-center mb-8">
                <div className={`w-16 h-16 ${theme.accentMuted} rounded-3xl flex items-center justify-center mx-auto mb-6`}>
                  <CheckCircle2 size={32} className={theme.accentText} />
                </div>
                <h2 className="text-2xl font-black mb-2">{t.onboardingTitle}</h2>
                <div className={`text-[10px] ${theme.accentText} font-bold tracking-widest uppercase`}>v{APP_VERSION}</div>
              </div>

              <div className="space-y-6 mb-10">
                {[t.onboarding1, t.onboarding2, t.onboarding3, t.onboarding4, t.onboarding5].map((step, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className={`w-6 h-6 shrink-0 ${themeName === 'light' ? 'bg-slate-100' : 'bg-white/5'} rounded-full flex items-center justify-center text-[10px] font-black`}>
                      {i + 1}
                    </div>
                    <p className={`text-[13px] leading-relaxed opacity-80 font-medium`}>{step}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowOnboarding(false)}
                className={`w-full py-5 bg-${theme.accent} hover:opacity-90 rounded-[28px] text-white font-black uppercase tracking-widest transition-all shadow-xl shadow-purple-500/20`}
              >
                {t.gotIt}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>



      {/* RESET CONFIRMATION MODAL */}
      <AnimatePresence>
        {showResetConfirm && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowResetConfirm(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`relative w-full max-w-sm ${themeName === 'light' ? 'bg-white' : 'bg-[#1a1a2e]'} border ${theme.border} rounded-[32px] p-8 shadow-2xl`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-red-500/10 text-red-500 rounded-2xl mb-6">
                  <AlertCircle size={32} />
                </div>
                
                <h3 className="text-xl font-black mb-2">{t.confirmReset}</h3>
                <p className={`text-xs ${theme.textMuted} font-bold leading-relaxed mb-8 uppercase tracking-wide px-2`}>
                  {t.resetWarning}
                </p>
                
                <div className="grid grid-cols-2 gap-4 w-full">
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className={`py-4 rounded-2xl border ${theme.border} text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all`}
                  >
                    {t.cancel}
                  </button>
                  <button
                    onClick={fullReset}
                    className="py-4 rounded-2xl bg-red-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-500/20 active:scale-95 transition-all"
                  >
                    {t.delete}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SINGLE ADVANCE DELETE CONFIRMATION */}
      <AnimatePresence>
        {advanceToDelete !== null && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAdvanceToDelete(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`relative w-full max-w-xs ${themeName === 'light' ? 'bg-white' : 'bg-[#1a1a2e]'} border ${theme.border} rounded-[32px] p-6 shadow-2xl`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-red-500/10 text-red-500 rounded-2xl mb-4">
                  <Trash2 size={24} />
                </div>
                
                <h3 className="text-lg font-black mb-4">{t.delete}?</h3>
                
                <div className="grid grid-cols-2 gap-3 w-full">
                  <button
                    onClick={() => setAdvanceToDelete(null)}
                    className={`py-3 rounded-xl border ${theme.border} text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all`}
                  >
                    {t.cancel}
                  </button>
                  <button
                    onClick={() => {
                      deleteAdvance(advanceToDelete);
                      setAdvanceToDelete(null);
                    }}
                    className="py-3 rounded-xl bg-red-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-500/20 active:scale-95 transition-all"
                  >
                    {t.delete}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PROFILE MODAL */}
      <AnimatePresence>
        {showProfileModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowProfileModal(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ y: 100, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 100, opacity: 0, scale: 0.9 }}
              className={`relative w-full max-w-sm ${themeName === 'light' ? 'bg-white' : 'bg-[#1a1a2e]'} border ${theme.border} rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]`}
            >
              <div className="p-8 overflow-y-auto">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-black">{t.manageProfiles}</h2>
                    <div className={`text-[9px] font-bold ${theme.accentText} uppercase tracking-widest mt-1`}>Manage driver accounts</div>
                  </div>
                  <button onClick={() => setShowProfileModal(false)} className={`p-2 ${theme.textMuted} hover:text-current transition-colors`}>
                    <X size={24} />
                  </button>
                </div>

                {/* Create New Profile */}
                <div className={`p-6 rounded-[32px] ${themeName === 'light' ? 'bg-slate-50' : 'bg-white/5'} border ${theme.border} mb-8`}>
                  <div className={`text-[10px] font-black ${theme.accentText} uppercase tracking-widest mb-4`}>{t.addProfile}</div>
                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      placeholder={t.profileName}
                      value={newProfileName}
                      onChange={e => setNewProfileName(e.target.value)}
                      className={`w-full bg-transparent border-b ${theme.border} py-3 font-bold focus:outline-none focus:border-${theme.accent} placeholder:opacity-20`}
                    />
                    <div className="flex items-center gap-3">
                       <input
                        type="number"
                        placeholder={t.dailyRate}
                        value={newProfileRate}
                        onChange={e => setNewProfileRate(e.target.value)}
                        className={`flex-1 bg-transparent border-b ${theme.border} py-3 font-bold focus:outline-none focus:border-${theme.accent} placeholder:opacity-20`}
                      />
                      <button
                        onClick={addProfile}
                        disabled={!newProfileName.trim()}
                        className={`p-4 rounded-2xl bg-${theme.accent} text-white shadow-lg shadow-${theme.accent}/30 disabled:opacity-30 disabled:grayscale transition-all hover:scale-105 active:scale-95`}
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Profiles List */}
                <div className="flex flex-col gap-3">
                  {profiles.length === 0 ? (
                    <div className={`py-12 text-center text-xs font-bold uppercase tracking-widest ${theme.textMuted} border-2 border-dashed ${theme.border} rounded-3xl opacity-40`}>
                      {t.noProfiles}
                    </div>
                  ) : (
                    profiles.map(p => (
                      <div 
                        key={p.id}
                        className={`group relative flex items-center justify-between p-5 rounded-3xl border transition-all duration-300 ${p.id === activeProfileId ? `border-${theme.accent} bg-${theme.accent}/10` : `${theme.border} ${themeName === 'light' ? 'bg-white shadow-sm' : 'bg-white/5'}`}`}
                      >
                        <div 
                          className="flex-1 cursor-pointer pr-4"
                          onClick={() => handleProfileSelect(p)}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-black text-lg">{p.name}</span>
                            {p.id === activeProfileId && (
                              <span className={`px-2 py-0.5 rounded-full text-[7px] font-black uppercase ${theme.indicator} text-white`}>Active</span>
                            )}
                          </div>
                          <div className={`text-[10px] font-bold ${theme.textMuted} uppercase tracking-wider`}>{p.rate} zł / {t.perShift}</div>
                        </div>
                        <button 
                          onClick={() => deleteProfileById(p.id)}
                          className={`p-3 rounded-xl opacity-0 group-hover:opacity-100 ${theme.textMuted} hover:text-red-500 hover:bg-red-500/10 transition-all`}
                        >
                          <Trash2 size={16} />
                        </button>
                        
                        {p.id === activeProfileId && (
                          <div className={`absolute left-0 top-1/4 bottom-1/4 w-1 ${theme.indicator} rounded-full`} />
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
              
              <div className="p-8 bg-black/10 text-center">
                 <p className="text-[10px] font-medium opacity-40 uppercase tracking-tighter">Switch profiles to auto-load name and rate</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Dynamic Print-Only PDF Layout */}
      <div className="hidden print:block w-full min-h-screen bg-white text-black font-sans px-8 py-10 antialiased">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-slate-300 pb-6 mb-8">
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900">{t.reportTitle}</h1>
              <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-bold">
                {t.period}: <span className="text-slate-800">{t.months[currentMonth]} {currentYear}</span>
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">{t.driver}</span>
              <p className="text-base font-black text-slate-800">{driverName || "—"}</p>
              <p className="text-[9px] text-slate-400 mt-1">Generated via App v{APP_VERSION}</p>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-4 gap-4 pb-6 mb-8 border-b border-slate-200">
            <div className="p-4 bg-slate-50 rounded-xl">
              <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider block mb-1">{t.shifts}</span>
              <span className="text-xl font-extrabold text-slate-800">{currentMonthShifts.length}</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider block mb-1">{t.totalHoursLabel}</span>
              <span className="text-xl font-extrabold text-slate-800">{totalHours} {t.perHour}</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider block mb-1">{t.totalAdvances}</span>
              <span className="text-xl font-extrabold text-red-500 flex items-center">-{totalAdvances} zł</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider block mb-1">{t.toReceive}</span>
              <span className="text-xl font-extrabold text-green-600 font-mono">{Math.round(toReceive)} zł</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10">
            {/* Shifts Table */}
            <div>
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-800 mb-4 pb-2 border-b-2 border-slate-900">{t.shiftList}</h2>
              {currentMonthShifts.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No shifts registered.</p>
              ) : (
                <table className="w-full text-xs text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200 text-[9px] uppercase font-black text-slate-400">
                      <th className="py-2 text-left">{t.date}</th>
                      <th className="py-2 text-center">{t.hours}</th>
                      <th className="py-2 text-right">{t.earned}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentMonthShifts.map(day => {
                      const k = shiftKey(currentYear, currentMonth, day);
                      const sh = shifts[k];
                      const displayEarned = sh?.manualAmount !== undefined ? sh.manualAmount : (sh?.hours || 0) * hourRate;
                      return (
                        <tr key={day} className="border-b border-slate-100">
                          <td className="py-2 text-slate-900">
                            <span className="font-bold">{day} {t.monthsShort[currentMonth]}</span>
                            {sh?.note && <span className="block text-[9px] text-slate-500 font-medium italic mt-0.5 leading-tight">{sh.note}</span>}
                          </td>
                          <td className="py-2 text-center font-semibold">{sh?.hours || 0} {t.perHour}</td>
                          <td className="py-2 text-right font-black text-slate-900">{Math.round(displayEarned)} zł</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            {/* Advances Table */}
            <div>
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-800 mb-4 pb-2 border-b-2 border-slate-900">{t.advanceList}</h2>
              {monthAdvances.length === 0 ? (
                <p className="text-xs text-slate-400 italic">{t.noAdvances}</p>
              ) : (
                <table className="w-full text-xs text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200 text-[9px] uppercase font-black text-slate-400">
                      <th className="py-2 text-left">{t.advanceAmount}</th>
                      <th className="py-2 text-right">{t.advanceNote}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthAdvances.map(adv => (
                      <tr key={adv.id} className="border-b border-slate-100">
                        <td className="py-2 font-black text-red-600">{adv.amount} zł</td>
                        <td className="py-2 text-right font-medium text-slate-600 max-w-[160px] truncate">
                          {adv.note || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
