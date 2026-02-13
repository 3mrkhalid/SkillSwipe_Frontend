"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Features from "./Features";
import { register } from "next/dist/next-devtools/userspace/pages/pages-dev-overlay-setup";


const LangContext = createContext();

const translations = {
  en: {
    NotFound:"The page you are looking for does not exist.",
    return_home:"Return to the home page",
    GetStarted: "Get Started",
    ContactUs: "Contact Us",
    About_us: "About us",
    About_us_sub:"A team that believes that learning should be simple and accessible to everyone, and we strive to provide tools that facilitate access to knowledge.",
    AmrKhalid:"Full-Stack Developer & Team Lead",
    AmrKhalid_des:"Leads the technical vision of the project and handles full-stack development, system architecture, and scalable solutions.",
    Mostafa_Ali:"Frontend Developer & UI/UX Specialist",
    Mostafa_Ali_des:"Designs and builds modern, responsive user interfaces with a strong focus on performance and user experience.",
    Ziad_Yasser:"Backend Developer",
    Ziad_Yasser_des:"Builds secure and scalable backend systems, APIs, and handles data flow between services and AI components.",
    Home: "Home",
    hero: "Code Together. Build Together",
    description_Hero: "Join a community where developers collaborate, share projects, and grow skills together. Work solo or team up — all in one platform.",
    
    Welcome:"Welcome",
    Welcome_sub:"We wish you a wonderful day with our app!",

    Features_heading: "Your Developer Dashboard",
    Features_subheading:
      "Manage your projects, track contributions, and see real-time collaboration in action.",
    Features_Collaboration: "Real-Time Code Collaboration",
    Features_Collaboration_description:
      "Code with your team or community in real-time. Track edits, discuss changes, and see everyone’s work live.",
    Features_Host: "Host & Share Your Projects",
    Features_Host_description:
      "Upload your projects, make them public or private, and invite collaborators to contribute.",
    Features_Learn_title: "Learn & Share Knowledge",
    Features_Learn_description:
      "Upload short video tutorials, watch community lessons, and exchange coding techniques.",
    Features_Suggestions:"Smart Suggestions",  
    Features_Suggestions_description: "Get recommendations for projects, challenges, or topics based on your activity. Explore areas you haven’t tried yet.",
    Community_Voice:"Voice Collaboration",
    Features_Community_Voice:"Ask questions or explain code using your voice. Participate in real-time discussions without typing a single line.",
    Weekly_Coding_Challenges:"Weekly Coding Challenges",
    Weekly_Coding_Challenges_description:"Participate in challenges, earn points, and climb the leaderboard. Track your progress and skill accuracy over time.",

    About_Headline:"100% Free Collaboration for Developers",
    About_SubTitle:"Join our platform and explore a community where building, coding, and collaborating is rewarding. Share projects, work together in real-time, and grow your skills — completely free.",

    About_Security:"Reputation",
    About_Security_sub:"Showcase your contributions, help others in the community, and get recognized for your work. Earn credibility as your projects, edits, and collaborations make an impact.",
    About_Performance:"Progress Tracking",
    About_Performance_sub:"Keep detailed records of your projects, code contributions, and collaborative sessions. Monitor how your skills are improving and see your achievements over time.",
    About_Ability:"Personalized Experience",
    About_Ability_sub:"Customize your dashboard, notifications, and project view. Get recommendations for projects, tutorials, or collaborators based on your activity and interests.",

    how_it_works_title:"Get Started in 3 Easy Steps",
    how_it_works_subtitle:"Turn ideas into real projects — code, collaborate, and grow your skills with the community.",
    step1_title:"Discover Projects & Collaborators",
    step1_description:"Browse community projects, explore coding challenges, and find developers to team up with.",
    step2_title:"Collaborate & Build Together",
    step2_description:"Join live coding sessions, contribute to projects, share your own code, or work solo — all in one platform.",
    step3_title:"Grow Your Skills & Reputation",
    step3_description:"Track your contributions, earn recognition, and unlock new features as you improve and collaborate more.",
    free_trial_text:"Get Started — 100% Free",

    Footer_Heading: "Learn, and Share Skills",
    Footer_Description:
      "Discover new skills, exchange knowledge, and grow your expertise — all in one place.",
    Footer_copyright:"© 2026 Kernel Syndicators. All rights reserved.",
    //Login && Register
    register:"Register",
    sign_in: "Sign In",
    sign_up: "Sign Up",
    email_address: "Email Address",
    password: "Password",
    forgot_password: "Forgot Password?",
    dont_have_account: "Don't have an account?",
    already_have_account: "Already have an account?",
    create_account: "Create an account",
    remember_me: "Remember Me",
    forget_password: "Forgot Password?",
    sign_in_google: "Sign in with Google",
    sign_in_facebook: "Sign in with Facebook",
    no_account: "Don't have an account?",
    username: "Username",
    username_placeholder: "Username",
    email_placeholder: "Email Address",
    password_placeholder: "Password",
    repeat_password: "Repeat Password",
    repeat_password_placeholder: "Repeat Password",
    accept_terms_text: "I accept the",
    terms_of_use: "Terms of Use",
    privacy_policy: "Privacy Policy",
    creating_account: "Creating account...",
    signing_in: "Signing in...",
    or: "or",
    sign_up_google: "Sign up with Google",
    sign_up_facebook: "Sign up with Facebook",
    fill_all_fields:"All fields must be filled out",

    

   

    //Support Chat
    Support_Chat_Title: "Support Chat",
    Support_Chat_Desc: "Connect with our support team for instant assistance.",
    Secure: "Secure & Encrypted Chat",
    Fast_Resloution: "Fast Issue Resolution",
    Minimal_waiting_time:"Minimal waiting time",
    Always_available: "Always available to assist you",
    Instant_responses: "Instant responses",
    Your_privacy_matters: "End-to-end protected",
    h24_7_Support: "24/7 Support",
    Real_Time_chat:"Real-Time Chat",
    Fast_Resolution: "Fast Resolution",
    Minimal_waiting_time: "Minimal waiting time",
    Support_Chat: "Support Chat",
    Type_your_message: "Type your message...",

    //Profile Page
    Profile:"Profile",
    Profile_Settings: "Profile Settings",
    Update_Profile_Info: "Update your profile information",
    Username_Profile: "Username",
    Email_Profile: "Email",
    Save_Changes: "Save Changes",
    Profile_updated_successfully: "Profile updated successfully!",
    Change_Picture: "Change Picture",
    Change_Password: "Change Password",
    text_Profile:"Manage your account settings and preferences",
    Personal_Information: "Personal Information",
    Full_Name: "Full Name",
    Phone_Number: "Phone Number",
    Enter_Phone_Number: "Enter Phone Number",
    Current_Password: "Current Password",
    New_Password: "New Password",
    Confirm_New_Password: "Confirm New Password",
    Password_Changed_Successfully: "Password changed successfully.",
    Timezone:"Timezone",
    Account_Details:"Account Details",
    Referral_Code:"Referral Code",
    Copy:"Copy",
    Currency:"Currency",
    USD:"USD",
    Max_Links:"Max Links",
    Account_Timeline:"Account Timeline",
    Account_Created:"Account Created",
    Last_Login:"Last Login",
    Last_Updated:"Last Updated",
    Danger_Zone:"Danger Zone",
    delete_text:"Permanently delete your account. This action cannot be undone.",
    Delete_Account:"Delete Account",
    Confirm_Delete_Account:"Confirm Delete Account",
    Type_DELETE_to_confirm:"Type DELETE to confirm",
    Account_Deleted_Successfully:"Account deleted successfully.",
    Save_Changes: "Save Changes",
    Discard_Changes: "Discard Changes",
    Email_Notifications: "Email Notifications",
    Enable_Notifications: "Enable email notifications for your account",
    Cancel: "Cancel"
    
  },
  ar: {
    NotFound:"الصفحة اللي بتدور عليها مش موجودة.",
    return_home:"ارجع للصفحة الرئيسية",
    GetStarted: "ابدأ الآن",
    ContactUs: "اتصل بنا",
    Home:"الصفحة الرئيسية",
    About_us: "من نحن",
    About_us_sub:"فريق يؤمن بأن التعلّم يجب أن يكون بسيطًا ومتاحًا للجميع، ونسعى لتقديم أدوات تسهّل الوصول إلى المعرفة.",
    AmrKhalid:"مطور برامج متكامل ورئيس فريق",
    AmrKhalid_des:"يقود الرؤية الفنية للمشروع ويتولى التطوير الكامل وهندسة النظام والحلول القابلة للتطوير.",
    Mostafa_Ali:"مطور الواجهة الأمامية ومتخصص واجهة المستخدم/UX",
    Mostafa_Ali_des:"يقوم بتصميم وبناء واجهات مستخدم حديثة وسريعة الاستجابة مع التركيز القوي على الأداء وتجربة المستخدم.",
    Ziad_Yasser:"مطور الواجهة الخلفية",
    Ziad_Yasser_des:"يقوم ببناء أنظمة خلفية وواجهات برمجة تطبيقات آمنة وقابلة للتطوير، ويتعامل مع تدفق البيانات بين الخدمات ومكونات الذكاء الاصطناعي.",
    
    Welcome:"مرحبا ",
    Welcome_sub:"نتمنى لك يوماً رائعاً مع تطبيقنا!",

    hero: "نبرمج ونبني معا",
    description_Hero: "انضم إلى مجتمع يتعاون فيه المطورون ويشاركون المشاريع ويزرعون المهارات معًا. العمل منفردًا أو كفريق واحد — كل ذلك في منصة واحدة.",
   
    Features_heading: "لوحة معلومات المطور الخاصة بك",
    Features_subheading:
      "قم بإدارة مشاريعك، وتتبع المساهمات، وشاهد التعاون في الوقت الفعلي أثناء العمل.",
    Features_Collaboration: "التعاون في مجال الكود في الوقت الحقيقي",
    Features_Collaboration_description:
      "قم بالبرمجة مع فريقك أو مجتمعك في الوقت الفعلي. تتبع التعديلات، وناقش التغييرات، وشاهد أعمال الجميع مباشرة.",
    Features_Host: "استضافة ومشاركة مشاريعك",
    Features_Host_description:
      "قم بتحميل مشاريعك، واجعلها عامة أو خاصة، وقم بدعوة المتعاونين للمساهمة.",
    Features_Learn_title: "تعلم وشارك المعرفة",
    Features_Learn_description:
      "قم بتحميل مقاطع فيديو تعليمية قصيرة، وشاهد دروس المجتمع، وتبادل تقنيات البرمجة.",
    Features_Suggestions:"اقتراحات ذكية",  
    Features_Suggestions_description: "احصل على توصيات للمشاريع أو التحديات أو المواضيع بناءً على نشاطك. استكشف المناطق التي لم تجربها بعد.",
    Community_Voice:"التعاون الصوتي",
    Features_Community_Voice:"اطرح الأسئلة أو اشرح الكود باستخدام صوتك. شارك في المناقشات في الوقت الفعلي دون كتابة سطر واحد.",
    Weekly_Coding_Challenges:"تحديات البرمجة الأسبوعية",
    Weekly_Coding_Challenges_description:"شارك في التحديات واكسب النقاط وتسلق لوحة المتصدرين. تتبع تقدمك ودقة مهاراتك بمرور الوقت.",


    About_Headline:"تعاون مجاني 100% للمطورين",
    About_SubTitle:"انضم إلى منصتنا واستكشف مجتمعًا يكون فيه البناء والبرمجة والتعاون أمرًا مجزيًا. شارك المشاريع، واعمل معًا في الوقت الفعلي، وقم بتنمية مهاراتك — مجانًا تمامًا.",

    About_Security:"السمعه",
    About_Security_sub:"قم ببناء سمعتك من خلال مشاركة الأفكار القيمة ومساعدة الآخرين. احصل على التقدير في المجتمع مع نمو مساهماتك وإحداث تأثير حقيقي.",
    About_Performance:"تتبع التقدم",
    About_Performance_sub:"تتبع جميع أسئلتك وأجوبتك وتحدياتك. شاهد تقدمك والنقاط التي حصلت عليها وكيف تتطور مهاراتك بمرور الوقت",
    About_Ability:"تجربة شخصية",
    About_Ability_sub:"قم بتخصيص مسار التعلم والإشعارات الخاصة بك. احصل على مواضيع مقترحة وتحديات وتبادلات مهارات مصممة خصيصًا لتناسب اهتماماتك ونشاطك.",
    

    how_it_works_title:"ابدأ في 3 خطوات سهلة",
    how_it_works_subtitle:"قم بتلخيص المحتوى وترجمته وإنشائه بسهولة باستخدام أدوات الذكاء الاصطناعي المجانية لدينا.",
    step1_title:"اكتشف المهارات",
    step1_description:"تصفح المهارات والموضوعات ومقاطع الفيديو القصيرة التي يشاركها المجتمع.",
    step2_title:"تبادل المعرفة",
    step2_description:"اطرح الأسئلة، وقم بتعليم الآخرين، وتبادل المهارات الحقيقية مع أشخاص حقيقيين.",
    step3_title:"تنمو معا",
    step3_description:"اكتسب سمعة طيبة، وقم برفع مستوى ملفك الشخصي، وافتح فرصًا جديدة.",
    free_trial_text:"تعلم وشارك مهاراتك مجانًا بنسبة 100%.",

    

    Footer_Heading: "تعلم وشارك المهارات",
    Footer_Description:
      "اكتشف مهارات جديدة، وتبادل المعرفة، وتنمية خبرتك — كل ذلك في مكان واحد.",


    Footer_copyright:"جميع الحقوق محفوظة . 2026© Kernel Syndicators.",  

    //Login && Register
    register:"التسجيل",
    sign_in: "تسجيل الدخول",
    sign_up: "إنشاء حساب",
    logout: "خروج",
    email_address: "عنوان البريد الإلكتروني",
    password: "كلمة المرور",
    forgot_password: "هل نسيت كلمة المرور؟",
    dont_have_account: "ليس لديك حساب؟",
    already_have_account: "هل لديك حساب بالفعل؟",
    create_account: "إنشاء حساب",
    remember_me: "تذكرني",
    forget_password: "هل نسيت كلمة المرور؟",
    sign_in_google: "تسجيل الدخول باستخدام جوجل",
    sign_in_facebook: "تسجيل الدخول باستخدام فيسبوك",
    no_account: "ليس لديك حساب؟",
    username: "اسم المستخدم",
    username_placeholder: "اسم المستخدم",
    email_placeholder: "البريد الإلكتروني",
    password_placeholder: "كلمة المرور",
    repeat_password: "تكرار كلمة المرور",
    repeat_password_placeholder: "تكرار كلمة المرور",
    accept_terms_text: "أوافق على",
    terms_of_use: "شروط الاستخدام",
    privacy_policy: "سياسة الخصوصية",
    creating_account: "جارٍ إنشاء الحساب...",
    signing_in: "جارٍ تسجيل الدخول...",
    or: "أو",
    sign_up_google: "إنشاء حساب باستخدام جوجل",
    sign_up_facebook: "إنشاء حساب باستخدام فيسبوك",
    fill_all_fields:"يجب أن تملأ جميع الحقول",

    //Dashboard Sidebar
    Dashboard_Home: "لوحه التحكم",
    Dashboard_Links: "روابطي",
    Dashboard_Manage_Links: "إدارة الروابط",
    Dashboard_Statistics: "الإحصائيات",
    Dashboard_Profile: " الملف الشخصي",
    Dashboard_Settings: "الإعدادات",
    Dashboard_Competition: "المسابقات",
    Dashboard_Support: "الدعم",
    Dashboard_Logout: "تسجيل الخروج",
    Dashboard_Withdraw : "السحب",
    Dashboard_Referrals : "الإحالات",

    //Dashboard Stats
    Total_Earnings: "إجمالي الأرباح",
    Balance : "الرصيد",
    Total_Withdraw: "إجمالي السحب",
    Referral_Earning: "أرباح الإحالة",

    //Dashboard General
    New_Shorten_Link: "رابط مختصر جديد",

    //Dashboard Manage Links
    Manage_Links: "إدارة الروابط",
    Create_New_Link: "إنشاء رابط جديد، وإدارته، وتتبع روابطك المختصرة",
    Refresh: "تحديث",
    total_links: "إجمالي الروابط",
    total_clicks: "إجمالي النقرات",
    Active_links:"الروابط المفعله",
    Pause_links:"إيقاف الروابط",

    //Manage Table for Manage Links
    Title_ShortLink:"الاسم/الرابط المختصر",
    Orginal_link:"الرابط الاصلي",
    Status:"الحالة",
    Created_At:"تاريخ الإنشاء",
    Expires_At:"تاريخ الانتهاء",
    Actions:"الإجراءات",

    //Withdraw Page
    Withdraw:"استلام الارباح",
    Withdraw_Funds:"سحب الأموال",
    Show_Method:"اختار انسب طريقه لاستلام الارباح",
    Available_Balance:"الرصيد المتاح",
    Withdraw_Amount:"مبلغ السحب",
    Minimum_Withdraw_Amount:"الحد الأدنى لمبلغ السحب : 10 دولارات.",
    Select_Withdraw_Method:"اختر طريقة السحب",
    Withdraw_Now:"اسحب الآن",
    Withdraw_History:"تاريخ السحب",
    No_Withdrawals_Yet:"لا توجد عمليات سحب حتى الآن.",
    Amount:"المبلغ",
    Method:"الطريقة",
    Status_Withdraw:"الحالة",
    Date:"التاريخ",
    Ready_Withdraw:"جاهز للسحب",
    Recent_Withdrawals:"عمليات السحب الأخيرة",
    View_Details:"عرض التفاصيل",

    //Support Chat
    Support_Chat_Title: "دردشة الدعم",
    Support_Chat_Desc: "تواصل مع فريق الدعم لدينا للمساعدة الفورية.",
    Secure: "دردشة آمنة ومشفرة",
    Fast_Resloution: "حل سريع للمشاكل",
    Minimal_waiting_time:"Minimal waiting time",
    Always_available: "متاح دائمًا لمساعدتك",
    Instant_responses: "ردود فورية",
    Your_privacy_matters: "محمي من البدايه إلى النهاية",
    h24_7_Support: "دعم طوال أيام الأسبوع",
    Real_Time_chat:"الدردشة اللحظية",
    Fast_Resolution: "ردود فوري",
    Minimal_waiting_time: "متاح دائمًا لمساعدتك",
    Support_Chat: "دردشة الدعم",
    Type_your_message: "اكتب رسالتك...",

    //Profile Page
    Profile:"حسابي",
    Profile_Settings: "الملف الشخصي",
    Update_Profile_Info: "تحديث معلومات الملف الشخصي الخاصة بك",
    Username_Profile: "اسم المستخدم",
    Email_Profile: "البريد الإلكتروني",
    Save_Changes: "حفظ التغييرات",
    Profile_updated_successfully: "تم تحديث الملف الشخصي بنجاح.",
    Change_Picture: "تغيير الصورة",
    Change_Password: "تغيير كلمة المرور",
    text_Profile:"إدارة إعدادات حسابك و الاعدادت المفضله لديك",
    Personal_Information: "المعلومات الشخصية",
    Full_Name: "الاسم الكامل",
    Phone_Number: "رقم الهاتف",
    Enter_Phone_Number: "أدخل رقم الهاتف",
    Current_Password: "كلمة المرور الحالية",
    New_Password: "كلمة المرور الجديدة",
    Confirm_New_Password: "تأكيد كلمة المرور الجديدة",
    Password_Changed_Successfully: "تم تغيير كلمة المرور بنجاح.",
    Timezone:"المنطقة الزمنية",
    Account_Details:"تفاصيل الحساب",
    Referral_Code:"كود الإحالة",
    Copy:"نسخ",
    Currency:"العملة",
    USD:"دولار أمريكي",
    Max_Links:"أقصى عدد للروابط",
    Account_Timeline:"الجدول الزمني للحساب",
    Account_Created:"تاريخ إنشاء الحساب",
    Last_Login:"آخر تسجيل دخول",
    Last_Updated:"آخر تحديث",
    Danger_Zone:"المنطقة الخطرة",
    delete_text:"حذف حسابك نهائيًا. لا يمكن التراجع عن هذا الإجراء.",
    Delete_Account:"حذف الحساب",
    Confirm_Delete_Account:"تأكيد حذف الحساب",
    Type_DELETE_to_confirm:"أدخل كلمة المرور الخاصة بك للتأكيد",
    Account_Deleted_Successfully:"تم حذف الحساب بنجاح.",
    Save_Changes: "حفظ التغييرات",
    Discard_Changes: "تجاهل التغييرات",
    Email_Notifications: "إشعارات البريد الإلكتروني",
    Enable_Notifications: "تمكين إشعارات البريد الإلكتروني لحسابك",
    Cancel: "إلغاء"
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  // load language from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  // save language to localStorage
  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const t = (key) => translations[lang][key] || key;

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      <div dir={lang === "ar" ? "rtl" : "ltr"}>
        {children}
      </div>
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
