const supabaseUrl = 'https://rdbruokyngxxrcgewdtm.supabase.co'; // URL الخاص بـ Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkYnJ1b2t5bmd4eHJjZ2V3ZHRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA0ODYxNjgsImV4cCI6MjA0NjA2MjE2OH0.yH7DNI6shkNkUy-ntZxxO7SgkI944VjjuXSX0yvnwrg';

const supabase = supabase.createClient(supabaseUrl, supabaseKey); // إنشاء عميل Supabase

// دالة تسجيل الدخول
async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { user, error } = await supabase.auth.signIn({
        email: email,
        password: password
    });

    if (error) {
        alert("فشل تسجيل الدخول: " + error.message);
    } else {
        alert("تم تسجيل الدخول بنجاح!");
        document.getElementById("login-form").style.display = "none"; // إخفاء نموذج تسجيل الدخول
        document.querySelector(".calculator").style.display = "block"; // عرض الآلة الحاسبة
    }
}

// دالة حساب BMI
function calculateBMI() {
    const weight = document.getElementById("weight").value;
    const height = document.getElementById("height").value;

    if (!weight || !height) {
        document.getElementById("result").innerText = "الرجاء إدخال الوزن والطول.";
        return;
    }

    const heightInMeters = height / 100; // تحويل الطول إلى متر
    const bmi = weight / (heightInMeters * heightInMeters); // حساب BMI
    document.getElementById("result").innerText = "مؤشر كتلة الجسم (BMI): " + bmi.toFixed(2);
}

// دالة حساب العمر (قابلة للتعديل حسب الحاجة)
function calculateAge() {
    const b3Input = document.getElementById("input").value;
    // إضافة منطق لحساب العمر بناءً على مدخلات B3 هنا
    document.getElementById("result").innerText = "يتم حساب العمر بناءً على المدخلات.";
}
