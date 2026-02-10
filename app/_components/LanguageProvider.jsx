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
    hero: "Every Answer Counts",
    description_Hero: "Join a community where every question gives you answers, and every answer earns you points. Swap skills, ideas, and knowledge effortlessly.",
    

    Features_heading: "Measure How Your Skills Make a Difference",
    Features_subheading:
      "Share knowledge, ask questions, and earn points — all in one smart, interactive community platform.",
    Features_Brand_title: "Video Lessons",
    Features_Brand_description:
      "Share your own skill videos or explore high-quality short lessons from the community, learn new techniques, get inspired, and connect with others who are passionate about growing together.",
    Features_Detailed_title: "AI Recommendations",
    Features_Detailed_description:
      "Receive personalized suggestions for topics, questions, and challenges based on your activity and interests. Explore areas you haven't tried yet, discover new skills, and stay engaged with content tailored just for you.",
    Features_Customizable_title: "Voice Q&A",
    Features_Customizable_description:
      "Ask questions or provide answers using your voice for faster, more natural interaction. Participate in real-time discussions, explain your ideas clearly, and connect with the community without typing a single word.",
    Weekly_Challenges:"Weekly Challenges",  
    Features_Weekly_Challenges: "Compete weekly, earn points, and climb the leaderboard.",
    Community_Chat:"Community Chat",
    Features_Community_Chat:"Discuss topics, share tips, and help each other.",

    AI_Accuracy_Score:"Skill Accuracy Score",
    Features_AI_Accuracy_Score:"Track how accurate your contributions are rated by the community.",

    About_Headline:"100% Free Knowledge Sharing for Everyone",
    About_SubTitle:"Join SkillSwap and explore a community where sharing knowledge is rewarding. Ask questions, provide answers, and discover new skills — all for free.",

    About_Security:"Reputation",
    About_Security_sub:"Build your reputation by sharing valuable insights and helping others. Earn recognition in the community as your contributions grow and make a real impact.",
    About_Performance:"Progress Tracking",
    About_Performance_sub:"Keep track of all your questions, answers, and challenges. See your progress, points earned, and how your skills are developing over time",
    About_Ability:"Personalized Experience",
    About_Ability_sub:"Customize your learning path and notifications. Get suggested topics, challenges, and skill swaps tailored to your interests and activity.",

    how_it_works_title:"Get Started in 3 Easy Steps",
    how_it_works_subtitle:"Turn knowledge into action — summarize, translate, and create smarter content in second.",
    step1_title:"Discover Skills",
    step1_description:"Browse skills, topics, and short videos shared by the community.",
    step2_title:"Swap Knowledge",
    step2_description:"Ask questions, share answers, or exchange skills with other members.",
    step3_title:"Grow & Earn",
    step3_description:"Build your reputation, earn points, and unlock new learning opportunities",
    free_trial_text:"Learn and share your skills 100% free.",

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
    hero: "كل إجابة مميزه",
    description_Hero: "انضم إلى مجتمع حيث يمنحك كل سؤال إجابات، وكل إجابة تكسبك نقاطًا. تبادل المهارات والأفكار والمعرفة دون عناء.",
    Features_heading:"قم بقياس مدى تأثير مهاراتك",
    Features_subheading:
      "سواء كنت تريد تلخيص المقالات والفيديوهات، إنشاء أسئلة تلقائيًا، ترجمة محتوى الفيديو، أو تحدي مهاراتك، منصتنا تمنحك تجربة AI شاملة وممتعة.",
    Features_Brand_title:"شرح فيديو",
    Features_Brand_description:"شارك مقاطع فيديو مهاراتك الخاصة أو استكشف دروسًا قصيرة عالية الجودة من المجتمع، وتعلم تقنيات جديدة، واحصل على الإلهام، وتواصل مع الآخرين المتحمسين للنمو معًا.",
    Features_Detailed_title: "توصيات الذكاء الاصطناعي",
    Features_Detailed_description:
  "احصل على اقتراحات مخصصة للموضوعات والأسئلة والتحديات بناءً على نشاطك واهتماماتك. استكشف المجالات التي لم تجربها بعد، واكتشف مهارات جديدة، وابقَ منخرطًا في المحتوى المصمم خصيصًا لك.",
    Features_Customizable_title: "أسئلة وأجوبة صوتية",
    Features_Customizable_description:
      "اطرح الأسئلة أو قدم الإجابات باستخدام صوتك للتفاعل بشكل أسرع وأكثر طبيعية. شارك في المناقشات في الوقت الفعلي، واشرح أفكارك بوضوح، وتواصل مع المجتمع دون كتابة كلمة واحدة.",

    Weekly_Challenges:"التحديات الاسبوعية",  
    Features_Weekly_Challenges:"تنافس أسبوعيًا واكسب النقاط وتسلق قائمة المتصدرين",

    Community_Chat:"الدردشة المجتمعية",
    Features_Community_Chat:"انضم إلى غرف المناقشة لمشاركة الأفكار والتعلم معًا",

    AI_Accuracy_Score:"درجة دقة المهارة",
    Features_AI_Accuracy_Score:"تتبع مدى دقة تقييم مساهماتك من قبل المجتمع.",


    About_Headline:"مشاركة المعرفة مجانًا بنسبة 100% للجميع",
    About_SubTitle:"انضم إلى SkillSwap واستكشف مجتمعًا يكون فيه تبادل المعرفة أمرًا مجزيًا. اطرح الأسئلة، وقدم الإجابات، واكتشف مهارات جديدة — كل ذلك مجانًا.",

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
