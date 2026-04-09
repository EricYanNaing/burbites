import type { Locale } from "./config";

const en = {
  languageSwitcher: {
    label: "Language",
    english: "English",
    burmese: "Burmese",
  },
  header: {
    logoAlt: "Burbites logo",
  },
  home: {
    todaysSpecial: "Today's Special",
    featuredShop: "Featured Shop",
    subtitle: "Burmese food for everyone",
  },
  loadingPage: {
    loading: "Loading",
    discoverDishes: "Discover our delicious dishes",
    preparingMenu: "Preparing your menu",
  },
  dishes: {
    searchPlaceholder: "Search dishes, cuisines...",
    browseByCategory: "Browse by category",
    browseHintAll:
      "Swipe through Burmese favorites and tap a lane to narrow the list.",
    browseHintFocused: (categoryLabel: string) =>
      `Focused on ${categoryLabel}. Tap another category to compare quickly.`,
    clear: "Clear",
    nearbyKitchens: "Nearby kitchens",
    nearbyKitchensTitle: "Burmese spots worth the trip",
    resultSummarySearchCategory: (total: number, categoryLabel: string) =>
      `${total} ${categoryLabel.toLowerCase()} matches`,
    resultSummarySearchOnly: (total: number) => `${total} matches`,
    resultSummaryCategoryOnly: (total: number, categoryLabel: string) =>
      `${total} ${categoryLabel.toLowerCase()} picks`,
    resultSummaryDefault: (total: number) => `${total} open picks`,
    sectionDescriptionSearchCategory: (search: string, categoryLabel: string) =>
      `Showing nearby Burmese kitchens for "${search}" in ${categoryLabel}.`,
    sectionDescriptionSearchOnly: (search: string) =>
      `Showing the best Burmese kitchens for "${search}".`,
    sectionDescriptionCategoryOnly: (categoryLabel: string) =>
      `${categoryLabel} picks from nearby Burmese kitchens with strong ratings and quick pickup.`,
    sectionDescriptionDefault:
      "Strong broths, tea-house classics, and fast pickup spots near you.",
    emptyTitle: "No kitchens found",
    emptyDescriptionSearchCategory: (search: string, categoryLabel: string) =>
      `No kitchens matched "${search}" in ${categoryLabel}. Try a different keyword or switch categories.`,
    emptyDescriptionSearchOnly: (search: string) =>
      `No kitchens matched "${search}". Try a different dish, neighborhood, or cuisine.`,
    emptyDescriptionCategoryOnly: (categoryLabel: string) =>
      `No nearby kitchens are showing ${categoryLabel} right now. Try another category.`,
    emptyDescriptionDefault: "No nearby kitchens are available right now.",
    findingNearbyKitchens: "Finding nearby kitchens",
    findingCategoryKitchens: (categoryLabel: string) =>
      `Finding ${categoryLabel.toLowerCase()} kitchens`,
    loadingMoreKitchens: "Loading more kitchens",
    endOfPicks: "You have reached the end of today's nearby picks.",
  },
  shopCard: {
    openNow: "Open now",
    closed: "Closed",
    burmeseKitchen: "Burmese kitchen",
    eta: "ETA",
    distance: "Distance",
    reviews: "Reviews",
    status: "Status",
    statusTil: (closeTime: string) => `Til ${closeTime}`,
    statusAt: (openTime: string) => `At ${openTime}`,
    pickupWindow: "Pickup window",
    openNowCloses: (closeTime: string) => `Open now • closes ${closeTime}`,
    closedOpens: (openTime: string) => `Closed • opens ${openTime}`,
  },
  shopDetail: {
    freshPicks: "Fresh picks from the kitchen",
    sectionPreviewMore: (preview: string, remaining: number) =>
      `${preview} +${remaining} more`,
    housePicks: "House picks",
    openNow: "Open Now",
    closedNow: "Closed Now",
    backToHome: "Back to home",
    guestRating: "Guest rating",
    serviceWindow: "Service window",
    opensAt: (openTime: string) => `Opens ${openTime}`,
    address: "Address",
    contact: "Contact",
    todaysMenu: "Today's menu",
    menuHeading: "Built for faster scanning and easier deciding",
    menuDescription:
      "Jump between sections, compare dishes side by side, and see price, category, and standout tags without digging through a long plain list.",
    sections: "Sections",
    dishes: "Dishes",
    highlight: "Highlight",
    eta: "ETA",
    browseSections: "Browse sections",
    browseSectionsDescription:
      "Jump straight to the lane you want instead of scanning one long list.",
    menuSectionsCount: (count: number) => `${count} menu sections`,
    dishesCount: (count: number) => `${count} dishes`,
    jumpToSection: "Jump to section",
    sectionLabel: (index: number) => `Section ${String(index).padStart(2, "0")}`,
    dishesInLane: (count: number) => `${count} dishes in this lane`,
    freshlyPrepared: "Freshly prepared for pickup",
    defaultDishDescription:
      "Prepared fresh with the kitchen's signature Burmese flavors.",
    price: "Price",
    availableToday: "Available today",
    unavailable: "Unavailable",
    freshFromKitchen: "Fresh from the kitchen",
  },
  admin: {
    openMenu: "Open dashboard menu",
    closeMenu: "Close dashboard menu",
    adminWorkspace: "Admin workspace",
    liveDashboard: "Live dashboard",
    notifications: "Notifications",
    dashboardMenu: "Dashboard menu",
    internalWorkspace: "Internal workspace",
    controlCenter: "Control center",
    controlCenterDescription:
      "Start from overview, then grow this menu as new dashboard pages land.",
    mainMenu: "Main menu",
    system: "System",
    session: "Session",
    sessionDescription:
      "Dashboard shell is responsive and ready for mobile navigation.",
    signOut: "Sign out",
    soon: "Soon",
    pageTitleDashboard: "Dashboard",
    pageTitleShops: "Shops",
    nav: {
      overview: {
        label: "Overview",
        description: "Summary, alerts, and daily activity.",
      },
      shops: {
        label: "Shops",
        description: "Manage storefronts and availability.",
      },
      customers: {
        label: "Customers",
        description: "Review users and account activity.",
      },
      analytics: {
        label: "Analytics",
        description: "Track performance and growth.",
      },
      security: {
        label: "Security",
        description: "Permissions, sessions, and controls.",
      },
      settings: {
        label: "Settings",
        description: "Workspace preferences and setup.",
      },
    },
  },
  authShell: {
    authCenter: "Auth center",
    accessModel: "Access model",
    highlights: {
      emailOnly: {
        title: "Email-only auth",
        description:
          "A single credential flow keeps access predictable and easier to manage.",
      },
      roleAware: {
        title: "Role-aware access",
        description:
          "Accounts can exist without automatically unlocking every dashboard view.",
      },
      managedPermissions: {
        title: "Managed permissions",
        description:
          "Sensitive privileges stay under manual control even when signup is enabled.",
      },
    },
    modes: {
      "sign-in": {
        badge: "Secure access",
        eyebrow: "Dashboard login",
        title: "Sign in to your Burbites account.",
        description:
          "Use your registered email and password to continue. New users can create an account from the sign-up page.",
        switchLabel: "No account yet?",
        switchCta: "Create account",
        policyDescription:
          "Anyone can register for an account. Elevated dashboard permissions are still assigned separately by the owner.",
      },
      "sign-up": {
        badge: "New account",
        eyebrow: "User onboarding",
        title: "Create your Burbites account.",
        description:
          "Register with your name, email, and password. After signup, role-based permissions still determine what you can access.",
        switchLabel: "Already registered?",
        switchCta: "Go to sign in",
        policyDescription:
          "Signup is open for users, but admin privileges are not granted automatically. Those remain provisioned separately.",
      },
      "verify-email": {
        badge: "Verification required",
        eyebrow: "Email confirmation",
        title: "Enter the verification code from your email.",
        description:
          "Neon sent a verification code to your inbox. Confirm the code here before you continue into the app.",
        switchLabel: "Entered the wrong email?",
        switchCta: "Start again",
        policyDescription:
          "Verification confirms ownership of the email address. Account roles and elevated permissions still stay separate from signup.",
      },
    },
  },
  authForm: {
    infoAuth: "Auth",
    infoAuthValue: "Email only",
    infoPermissions: "Permissions",
    infoPermissionsValue: "Role based",
    infoNextStep: "Next step",
    fullName: "Full name",
    yourName: "Your name",
    emailAddress: "Email address",
    password: "Password",
    hidePassword: "Hide password",
    showPassword: "Show password",
    verifiedSuccess: "Your email is verified. Sign in to continue.",
    working: "Working...",
    modes: {
      "sign-in": {
        label: "Sign in",
        title: "Welcome back",
        description: "Enter your account credentials to continue into Burbites.",
        submitLabel: "Sign in",
        footerLabel: "Need an account?",
        footerCta: "Create one",
        helperText:
          "Use the email and password already registered to your account.",
        nextStep: "Dashboard",
        passwordPlaceholder: "Enter your password",
      },
      "sign-up": {
        label: "Create account",
        title: "Set up your account",
        description: "Create a user account with your name, email, and password.",
        submitLabel: "Create account",
        footerLabel: "Already have an account?",
        footerCta: "Sign in",
        helperText:
          "Admin permissions, if needed, are assigned separately after signup.",
        nextStep: "Verify email",
        passwordPlaceholder: "Create a password",
      },
    },
  },
  verifyEmail: {
    verifyEmail: "Verify email",
    confirmYourEmail: "Confirm your email",
    sourceVerified: "Your email is verified. You can sign in now.",
    sourceSignUp:
      "Your account was created. Enter the verification code Neon emailed you.",
    sourceSignIn:
      "Your account exists, but the email still needs to be verified before sign-in.",
    sourceDefault: "Enter the email verification code to continue.",
    enterBothFields: "Enter both your email address and verification code.",
    verifyFailed: "Could not verify the code. Try again.",
    emailRequiredForResend:
      "Enter your email address before requesting another code.",
    resendFailed: "Could not send a new verification code right now.",
    resendSuccess: "A new verification code was sent to your email.",
    method: "Method",
    methodValue: "Email code",
    requiredFor: "Required for",
    requiredForValue: "First access",
    afterVerify: "After verify",
    afterVerifyValue: "Dashboard or sign in",
    verificationCode: "Verification code",
    verificationCodePlaceholder: "Enter the code",
    verificationCodeHelper: "Paste the code exactly as it appears in the email.",
    verifyPending: "Verifying...",
    verifyAction: "Verify email",
    didntGetCode: "Didn't get the code?",
    resendDescription:
      "Resend a new verification code to the same email address.",
    resendPending: "Sending...",
    resendAction: "Resend code",
    alreadyVerified: "Already verified or want to try signing in?",
    backToSignIn: "Back to sign in",
  },
  dashboard: {
    dashboard: "Dashboard",
    shops: "Shops",
  },
  authAction: {
    fallbackError: "Something went wrong. Please try again.",
  },
};

export type Messages = typeof en;

const my: Messages = {
  languageSwitcher: {
    label: "ဘာသာစကား",
    english: "အင်္ဂလိပ်",
    burmese: "မြန်မာ",
  },
  header: {
    logoAlt: "Burbites လိုဂို",
  },
  home: {
    todaysSpecial: "ယနေ့အထူး",
    featuredShop: "အထူးရွေးချယ်ထားသောဆိုင်",
    subtitle: "လူတိုင်းအတွက် မြန်မာအစားအစာ",
  },
  loadingPage: {
    loading: "တင်နေသည်",
    discoverDishes: "အရသာရှိသော ဟင်းလျာများကို ရှာဖွေပါ",
    preparingMenu: "မီနူးကို ပြင်ဆင်နေသည်",
  },
  dishes: {
    searchPlaceholder: "ဟင်းလျာ၊ အမျိုးအစား ရှာပါ...",
    browseByCategory: "အမျိုးအစားဖြင့် ကြည့်ရှုပါ",
    browseHintAll:
      "မြန်မာအကြိုက်ဟင်းလျာများကို swipe လုပ်ပြီး အမျိုးအစားကိုနှိပ်ကာ စာရင်းကိုကျဉ်းပါ။",
    browseHintFocused: (categoryLabel: string) =>
      `${categoryLabel} ကိုရွေးထားသည်။ နှိုင်းယှဉ်ရန် အခြားအမျိုးအစားကိုနှိပ်ပါ။`,
    clear: "ဖျက်မည်",
    nearbyKitchens: "အနီးအနား မီးဖိုချောင်များ",
    nearbyKitchensTitle: "သွားစားဖို့တန်တဲ့ မြန်မာဆိုင်များ",
    resultSummarySearchCategory: (total: number, categoryLabel: string) =>
      `${categoryLabel.toLowerCase()} တွင် ရလဒ် ${total}`,
    resultSummarySearchOnly: (total: number) => `ကိုက်ညီမှု ${total}`,
    resultSummaryCategoryOnly: (total: number, categoryLabel: string) =>
      `${categoryLabel.toLowerCase()} ရွေးချယ်စရာ ${total}`,
    resultSummaryDefault: (total: number) => `ဖွင့်ထားသော ရွေးချယ်စရာ ${total}`,
    sectionDescriptionSearchCategory: (search: string, categoryLabel: string) =>
      `"${search}" အတွက် ${categoryLabel} ထဲမှ အနီးအနား မီးဖိုချောင်များကို ပြနေသည်။`,
    sectionDescriptionSearchOnly: (search: string) =>
      `"${search}" အတွက် အကောင်းဆုံး မြန်မာ မီးဖိုချောင်များကို ပြနေသည်။`,
    sectionDescriptionCategoryOnly: (categoryLabel: string) =>
      `${categoryLabel} အမျိုးအစားအတွက် အဆင့်မြင့်ပြီး လာယူရလွယ်ကူသော အနီးအနား ဆိုင်များ။`,
    sectionDescriptionDefault:
      "ဟင်းရည်ကောင်းကောင်း၊ လက်ဖက်ရည်ဆိုင်အကြိုက် နှင့် အနီးအနား လာယူရလွယ်ကူသော ဆိုင်များ။",
    emptyTitle: "မီးဖိုချောင် မတွေ့ပါ",
    emptyDescriptionSearchCategory: (search: string, categoryLabel: string) =>
      `"${search}" အတွက် ${categoryLabel} ထဲတွင် ကိုက်ညီသည့်ဆိုင် မရှိပါ။ အခြားစကားလုံး သို့မဟုတ် အမျိုးအစား ပြောင်းကြည့်ပါ။`,
    emptyDescriptionSearchOnly: (search: string) =>
      `"${search}" အတွက် ကိုက်ညီသည့်ဆိုင် မရှိပါ။ ဟင်းအမည်၊ နေရာ သို့မဟုတ် အမျိုးအစား အသစ်ဖြင့် စမ်းကြည့်ပါ။`,
    emptyDescriptionCategoryOnly: (categoryLabel: string) =>
      `ယခုအချိန် ${categoryLabel} ပြသနေသော အနီးအနားဆိုင် မရှိပါ။ အခြားအမျိုးအစား စမ်းကြည့်ပါ။`,
    emptyDescriptionDefault: "ယခုအချိန် အနီးအနားဆိုင် မရှိသေးပါ။",
    findingNearbyKitchens: "အနီးအနား မီးဖိုချောင်များ ရှာနေသည်",
    findingCategoryKitchens: (categoryLabel: string) =>
      `${categoryLabel.toLowerCase()} ဆိုင်များ ရှာနေသည်`,
    loadingMoreKitchens: "ဆိုင်များကို ထပ်မံတင်နေသည်",
    endOfPicks: "ယနေ့အတွက် အနီးအနား ရွေးချယ်စရာများ အဆုံးသို့ ရောက်ပါပြီ။",
  },
  shopCard: {
    openNow: "ယခုဖွင့်ထားသည်",
    closed: "ပိတ်ထားသည်",
    burmeseKitchen: "မြန်မာ မီးဖိုချောင်",
    eta: "ETA",
    distance: "အကွာအဝေး",
    reviews: "သုံးသပ်ချက်",
    status: "အခြေအနေ",
    statusTil: (closeTime: string) => `${closeTime} ထိ`,
    statusAt: (openTime: string) => `${openTime} တွင်`,
    pickupWindow: "လာယူနိုင်ချိန်",
    openNowCloses: (closeTime: string) => `ယခုဖွင့်ထား • ${closeTime} တွင်ပိတ်မည်`,
    closedOpens: (openTime: string) => `ယခုပိတ်ထား • ${openTime} တွင်ဖွင့်မည်`,
  },
  shopDetail: {
    freshPicks: "မီးဖိုချောင်မှ အသစ်ရွေးချယ်ထားမှု",
    sectionPreviewMore: (preview: string, remaining: number) =>
      `${preview} +${remaining} ခုနောက်ထပ်`,
    housePicks: "အိမ်ရွေးချယ်မှု",
    openNow: "ယခုဖွင့်ထား",
    closedNow: "ယခုပိတ်ထား",
    backToHome: "ပင်မစာမျက်နှာသို့ ပြန်မည်",
    guestRating: "ဖောက်သည်အဆင့်သတ်မှတ်ချက်",
    serviceWindow: "ဝန်ဆောင်ချိန်",
    opensAt: (openTime: string) => `${openTime} တွင်ဖွင့်မည်`,
    address: "လိပ်စာ",
    contact: "ဆက်သွယ်ရန်",
    todaysMenu: "ယနေ့မီနူး",
    menuHeading: "လွယ်ကူမြန်ဆန်စွာ ရွေးချယ်နိုင်ရန် ဒီဇိုင်းလုပ်ထားသည်",
    menuDescription:
      "ပိုင်းများကြား လျင်မြန်စွာ ပြောင်းကြည့်နိုင်ပြီး စျေးနှုန်း၊ အမျိုးအစားနှင့် ထင်ရှားသော tag များကို ရှည်လျားသောစာရင်းမလိုဘဲ မြင်နိုင်သည်။",
    sections: "ပိုင်းများ",
    dishes: "ဟင်းလျာများ",
    highlight: "အထူးပြု",
    eta: "ETA",
    browseSections: "ပိုင်းများကို ကြည့်ရှုပါ",
    browseSectionsDescription:
      "ရှည်လျားသောစာရင်းတစ်ခုလုံး မကြည့်ဘဲ လိုချင်သောပိုင်းသို့ တိုက်ရိုက်သွားပါ။",
    menuSectionsCount: (count: number) => `မီနူးပိုင်း ${count} ခု`,
    dishesCount: (count: number) => `ဟင်းလျာ ${count} မျိုး`,
    jumpToSection: "ဤပိုင်းသို့ သွားမည်",
    sectionLabel: (index: number) => `ပိုင်း ${String(index).padStart(2, "0")}`,
    dishesInLane: (count: number) => `ဤပိုင်းတွင် ဟင်းလျာ ${count} မျိုး`,
    freshlyPrepared: "လာယူရန် လတ်လတ်ဆတ်ဆတ် ပြင်ဆင်ထားသည်",
    defaultDishDescription:
      "မီးဖိုချောင်၏ မြန်မာစတိုင် အရသာဖြင့် လတ်လတ်ဆတ်ဆတ် ပြင်ဆင်ထားသည်။",
    price: "စျေးနှုန်း",
    availableToday: "ယနေ့ရနိုင်",
    unavailable: "မရနိုင်",
    freshFromKitchen: "မီးဖိုချောင်မှ လတ်ဆတ်",
  },
  admin: {
    openMenu: "ဒက်ရှ်ဘုတ်မီနူး ဖွင့်မည်",
    closeMenu: "ဒက်ရှ်ဘုတ်မီနူး ပိတ်မည်",
    adminWorkspace: "စီမံခန့်ခွဲမှု အလုပ်ခွင်",
    liveDashboard: "တိုက်ရိုက် ဒက်ရှ်ဘုတ်",
    notifications: "အသိပေးချက်များ",
    dashboardMenu: "ဒက်ရှ်ဘုတ် မီနူး",
    internalWorkspace: "အတွင်းပိုင်း အလုပ်ခွင်",
    controlCenter: "ထိန်းချုပ်မှု စင်တာ",
    controlCenterDescription:
      "Overview မှ စတင်ပြီး ဒက်ရှ်ဘုတ်စာမျက်နှာအသစ်များလာသလို မီနူးကို တိုးချဲ့ပါ။",
    mainMenu: "အဓိက မီနူး",
    system: "စနစ်",
    session: "ဆက်ရှင်",
    sessionDescription:
      "ဒက်ရှ်ဘုတ် shell သည် mobile navigation အတွက်လည်း အဆင်သင့် ဖြစ်နေပါသည်။",
    signOut: "အကောင့်ထွက်မည်",
    soon: "မကြာမီ",
    pageTitleDashboard: "ဒက်ရှ်ဘုတ်",
    pageTitleShops: "ဆိုင်များ",
    nav: {
      overview: {
        label: "အကျဉ်းချုပ်",
        description: "အကျဉ်းချုပ်၊ သတိပေးချက်များနှင့် နေ့စဉ်လုပ်ဆောင်မှုများ။",
      },
      shops: {
        label: "ဆိုင်များ",
        description: "ဆိုင်နှင့် ရရှိနိုင်မှုကို စီမံပါ။",
      },
      customers: {
        label: "ဖောက်သည်များ",
        description: "အသုံးပြုသူများနှင့် အကောင့်လုပ်ဆောင်မှုကို စစ်ဆေးပါ။",
      },
      analytics: {
        label: "သုံးသပ်ချက်များ",
        description: "စွမ်းဆောင်ရည်နှင့် တိုးတက်မှုကို ခြေရာခံပါ။",
      },
      security: {
        label: "လုံခြုံရေး",
        description: "ခွင့်ပြုချက်၊ session နှင့် ထိန်းချုပ်မှုများ။",
      },
      settings: {
        label: "ဆက်တင်များ",
        description: "အလုပ်ခွင် preference နှင့် setup များ။",
      },
    },
  },
  authShell: {
    authCenter: "အထောက်အထား စင်တာ",
    accessModel: "ဝင်ရောက်ခွင့် မော်ဒယ်",
    highlights: {
      emailOnly: {
        title: "အီးမေးလ်တစ်ခုတည်း အတည်ပြုမှု",
        description:
          "တစ်မျိုးတည်းသော credential flow ကြောင့် ဝင်ရောက်မှုကို ခန့်မှန်းရလွယ်ကူပြီး စီမံရလွယ်ကူစေသည်။",
      },
      roleAware: {
        title: "Role အလိုက် ဝင်ရောက်မှု",
        description:
          "အကောင့်ရှိရုံဖြင့် ဒက်ရှ်ဘုတ်မြင်ကွင်းအားလုံးကို အလိုအလျောက် ဖွင့်မပေးပါ။",
      },
      managedPermissions: {
        title: "စီမံထားသော ခွင့်ပြုချက်",
        description:
          "Signup ဖွင့်ထားသော်လည်း အရေးကြီး privilege များကို လက်ဖြင့်သာ ထိန်းချုပ်ထားနိုင်သည်။",
      },
    },
    modes: {
      "sign-in": {
        badge: "လုံခြုံသော ဝင်ရောက်မှု",
        eyebrow: "ဒက်ရှ်ဘုတ် လော့ဂ်အင်",
        title: "သင်၏ Burbites အကောင့်သို့ ဝင်ပါ။",
        description:
          "ဆက်လက်အသုံးပြုရန် မှတ်ပုံတင်ထားသော အီးမေးလ်နှင့် စကားဝှက်ကို အသုံးပြုပါ။ အသစ်ဖြစ်သူများသည် sign-up စာမျက်နှာမှ အကောင့်ဖန်တီးနိုင်သည်။",
        switchLabel: "အကောင့်မရှိသေးပါသလား?",
        switchCta: "အကောင့်ဖန်တီးမည်",
        policyDescription:
          "မည်သူမဆို အကောင့်ဖွင့်နိုင်သည်။ ဒက်ရှ်ဘုတ်အတွက် မြင့်မားသောခွင့်ပြုချက်များကို ပိုင်ရှင်က သီးခြား သတ်မှတ်ပေးရမည်။",
      },
      "sign-up": {
        badge: "အကောင့်အသစ်",
        eyebrow: "အသုံးပြုသူ စတင်ခြင်း",
        title: "သင်၏ Burbites အကောင့် ဖန်တီးပါ။",
        description:
          "အမည်၊ အီးမေးလ်နှင့် စကားဝှက်ဖြင့် မှတ်ပုံတင်ပါ။ Signup ပြီးနောက်လည်း role-based permission များအရသာ ဝင်ရောက်ခွင့်ရမည်။",
        switchLabel: "ပြီးသား မှတ်ပုံတင်ထားပါသလား?",
        switchCta: "Sign in သို့ သွားမည်",
        policyDescription:
          "Signup ကို ဖွင့်ထားသော်လည်း admin privilege များကို အလိုအလျောက် မပေးပါ။ ထိုခွင့်ပြုချက်များကို သီးခြား ပေးအပ်ရသည်။",
      },
      "verify-email": {
        badge: "အတည်ပြုရန် လိုအပ်",
        eyebrow: "အီးမေးလ် အတည်ပြုမှု",
        title: "အီးမေးလ်ထဲက အတည်ပြုကုဒ်ကို ထည့်ပါ။",
        description:
          "Neon မှ သင့် inbox သို့ verification code ပို့ထားသည်။ App ဆက်မသုံးမီ ဤနေရာတွင် အတည်ပြုပါ။",
        switchLabel: "အီးမေးလ်မှားထည့်မိပါသလား?",
        switchCta: "အသစ်စတင်မည်",
        policyDescription:
          "Verification သည် အီးမေးလ်ပိုင်ဆိုင်မှုကို အတည်ပြုသည်။ အကောင့် role များနှင့် မြင့်မားသော permission များကို signup မှ သီးခြား စီမံထားသည်။",
      },
    },
  },
  authForm: {
    infoAuth: "အတည်ပြုမှု",
    infoAuthValue: "အီးမေးလ်သာ",
    infoPermissions: "ခွင့်ပြုချက်",
    infoPermissionsValue: "Role အလိုက်",
    infoNextStep: "နောက်တစ်ဆင့်",
    fullName: "အမည်အပြည့်အစုံ",
    yourName: "သင့်အမည်",
    emailAddress: "အီးမေးလ်လိပ်စာ",
    password: "စကားဝှက်",
    hidePassword: "စကားဝှက်ဖျောက်မည်",
    showPassword: "စကားဝှက်ပြမည်",
    verifiedSuccess: "သင့်အီးမေးလ် အတည်ပြုပြီးပါပြီ။ ဆက်ရန် sign in ဝင်ပါ။",
    working: "လုပ်ဆောင်နေသည်...",
    modes: {
      "sign-in": {
        label: "Sign in",
        title: "ပြန်လည်ကြိုဆိုပါသည်",
        description: "Burbites သို့ ဆက်လက်ဝင်ရန် သင့်အကောင့်အချက်အလက်များ ထည့်ပါ။",
        submitLabel: "Sign in",
        footerLabel: "အကောင့်လိုပါသလား?",
        footerCta: "ဖန်တီးမည်",
        helperText:
          "သင့်အကောင့်တွင် မှတ်ပုံတင်ထားပြီးသား အီးမေးလ်နှင့် စကားဝှက်ကို အသုံးပြုပါ။",
        nextStep: "ဒက်ရှ်ဘုတ်",
        passwordPlaceholder: "သင့်စကားဝှက် ထည့်ပါ",
      },
      "sign-up": {
        label: "အကောင့်ဖန်တီးမည်",
        title: "သင့်အကောင့်ကို စတင်တပ်ဆင်ပါ",
        description: "အမည်၊ အီးမေးလ်နှင့် စကားဝှက်ဖြင့် user account ဖန်တီးပါ။",
        submitLabel: "အကောင့်ဖန်တီးမည်",
        footerLabel: "အကောင့်ရှိပြီးပါသလား?",
        footerCta: "Sign in",
        helperText:
          "လိုအပ်ပါက admin permission များကို signup ပြီးနောက် သီးခြားပေးအပ်သည်။",
        nextStep: "အီးမေးလ် အတည်ပြုမည်",
        passwordPlaceholder: "စကားဝှက်တစ်ခု ဖန်တီးပါ",
      },
    },
  },
  verifyEmail: {
    verifyEmail: "အီးမေးလ် အတည်ပြုမည်",
    confirmYourEmail: "သင့်အီးမေးလ်ကို အတည်ပြုပါ",
    sourceVerified: "သင့်အီးမေးလ် အတည်ပြုပြီးပါပြီ။ ယခု sign in ဝင်နိုင်ပါသည်။",
    sourceSignUp:
      "သင့်အကောင့် ဖန်တီးပြီးပါပြီ။ Neon ပို့ထားသော verification code ကို ထည့်ပါ။",
    sourceSignIn:
      "အကောင့်ရှိပြီးဖြစ်သော်လည်း sign-in မဝင်မီ အီးမေးလ်အတည်ပြုရန် လိုအပ်သေးသည်။",
    sourceDefault: "ဆက်လုပ်ရန် အီးမေးလ် verification code ကို ထည့်ပါ။",
    enterBothFields: "အီးမေးလ်လိပ်စာနှင့် verification code နှစ်ခုလုံး ထည့်ပါ။",
    verifyFailed: "ကုဒ်အတည်ပြုမရပါ။ ထပ်စမ်းကြည့်ပါ။",
    emailRequiredForResend:
      "ကုဒ်အသစ် တောင်းဆိုမီ သင့်အီးမေးလ်လိပ်စာကို ထည့်ပါ။",
    resendFailed: "ယခုအချိန် verification code အသစ် မပို့နိုင်ပါ။",
    resendSuccess: "verification code အသစ်ကို သင့်အီးမေးလ်သို့ ပို့လိုက်ပါသည်။",
    method: "နည်းလမ်း",
    methodValue: "အီးမေးလ်ကုဒ်",
    requiredFor: "လိုအပ်သောနေရာ",
    requiredForValue: "ပထမဝင်ရောက်မှု",
    afterVerify: "အတည်ပြုပြီးနောက်",
    afterVerifyValue: "ဒက်ရှ်ဘုတ် သို့မဟုတ် sign in",
    verificationCode: "အတည်ပြုကုဒ်",
    verificationCodePlaceholder: "ကုဒ်ကို ထည့်ပါ",
    verificationCodeHelper: "အီးမေးလ်ထဲတွင်ပါတဲ့အတိုင်း အတိအကျ ကူးထည့်ပါ။",
    verifyPending: "အတည်ပြုနေသည်...",
    verifyAction: "အီးမေးလ် အတည်ပြုမည်",
    didntGetCode: "ကုဒ်မရခဲ့ဘူးလား?",
    resendDescription:
      "တူညီသော အီးမေးလ်လိပ်စာသို့ verification code အသစ် ပြန်ပို့မည်။",
    resendPending: "ပို့နေသည်...",
    resendAction: "ကုဒ် ပြန်ပို့မည်",
    alreadyVerified: "အတည်ပြုပြီးသလား သို့မဟုတ် sign in စမ်းမလား?",
    backToSignIn: "Sign in သို့ ပြန်မည်",
  },
  dashboard: {
    dashboard: "ဒက်ရှ်ဘုတ်",
    shops: "ဆိုင်များ",
  },
  authAction: {
    fallbackError: "တစ်ခုခု မှားယွင်းနေပါသည်။ ထပ်မံစမ်းကြည့်ပါ။",
  },
};

export const messages: Record<Locale, Messages> = {
  en,
  my,
};
