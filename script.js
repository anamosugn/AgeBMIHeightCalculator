// إعداد الاتصال مع Supabase
const supabaseUrl = 'https://rdbruokyngxxrcgewdtm.supabase.co';
const supabaseKey = 'YOUR_SUPABASE_KEY'; // استبدل YOUR_SUPABASE_KEY بمفتاح Supabase الخاص بك
const supabase = createClient(supabaseUrl, supabaseKey);

// دالة تسجيل الدخول
async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { user, error } = await supabase.auth.signIn({
        email: email,
        password: password,
    });

    if (error) {
        alert('فشل تسجيل الدخول: ' + error.message);
    } else {
        alert('تم تسجيل الدخول بنجاح!');
        document.getElementById("login-form").style.display = "none"; // إخفاء نموذج تسجيل الدخول
        document.querySelector(".calculator").style.display = "block"; // إظهار الآلة الحاسبة
    }
}

// دالة حساب العمر
function calculateAge() {
    // تصفير النتائج
    document.getElementById("result").innerText = "";

    const input = document.getElementById("input").value;

    if (input.length !== 6) {
        document.getElementById("result").innerText = "الرجاء إدخال تاريخ بصيغة صحيحة (6 أرقام).";
        return;
    }

    const firstDigit = parseInt(input.charAt(0));
    const yearPrefix = (firstDigit === 3) ? "20" : "19";
    const year = parseInt(yearPrefix + input.slice(1, 3));
    const month = parseInt(input.slice(3, 5)) - 1;
    const day = parseInt(input.slice(5, 6));

    const birthDate = new Date(year, month, day);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();

    if (months < 0) {
        years--;
        months += 12;
    }
    if (today.getDate() < birthDate.getDate()) {
        months--;
    }

    document.getElementById("result").innerText = `العمر: ${years} سنة و ${months} شهر`;
}

// دالة حساب BMI
function calculateBMI() {
    // تصفير النتائج
    document.getElementById("result").innerText = "";

    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value);
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const ageOption = document.querySelector('input[name="age-option"]:checked').value;

    if (ageOption === "age") {
        const input = document.getElementById("input").value;

        if (input.length !== 6) {
            document.getElementById("result").innerText = "الرجاء إدخال تاريخ الميلاد بصيغة صحيحة (6 أرقام).";
            return;
        }

        const firstDigit = parseInt(input.charAt(0));
        const yearPrefix = (firstDigit === 3) ? "20" : "19";
        const year = parseInt(yearPrefix + input.slice(1, 3));
        const month = parseInt(input.slice(3, 5)) - 1;
        const day = parseInt(input.slice(5, 6));

        const birthDate = new Date(year, month, day);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        if (today.getMonth() < birthDate.getMonth() || 
           (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age < 5 || age > 19) {
            document.getElementById("result").innerText = "حساب BMI متاح فقط للأطفال والمراهقين بين 5 و19 سنة.";
            return;
        }

        document.getElementById("result").innerText += `العمر: ${age} سنة\n`;
    }

    if (!weight || !height) {
        document.getElementById("result").innerText = "الرجاء إدخال الوزن والطول.";
        return;
    }

    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);

    let category = "";

    if (ageOption === "age") {
        if (gender === "male") {
            if (bmi < 13.5) category = "نحافة شديدة";
            else if (bmi >= 13.5 && bmi < 15) category = "نحافة معتدلة";
            else if (bmi >= 15 && bmi < 18.5) category = "نحافة خفيفة";
            else if (bmi >= 18.5 && bmi < 24.5) category = "وزن طبيعي";
            else category = "وزن زائد";
        } else {
            if (bmi < 14) category = "نحافة شديدة";
            else if (bmi >= 14 && bmi < 15.5) category = "نحافة معتدلة";
            else if (bmi >= 15.5 && bmi < 19) category = "نحافة خفيفة";
            else if (bmi >= 19 && bmi < 25) category = "وزن طبيعي";
            else category = "وزن زائد";
        }
    } else {
        if (bmi < 18.5) category = "نحافة";
        else if (bmi >= 18.5 && bmi < 24.9) category = "وزن طبيعي";
        else if (bmi >= 25 && bmi < 29.9) category = "وزن زائد";
        else category = "سمنة";
    }

    document.getElementById("result").innerText += `مؤشر كتلة الجسم (BMI): ${bmi} - الفئة: ${category}`;
}
