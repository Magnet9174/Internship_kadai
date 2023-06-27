const week = ["日", "月", "火", "水", "木", "金", "土"];
const today = new Date();
// 月末だとずれる可能性があるため、1日固定で取得
var showDate = new Date(today.getFullYear(), today.getMonth(), 1);

// 初期表示
window.onload = function () {
    showProcess(today, calendar);
};

// 前の月表示
function prev(){
    showDate.setMonth(showDate.getMonth() - 1);
    showProcess(showDate);
}

// 次の月表示
function next(){
    showDate.setMonth(showDate.getMonth() + 1);
    showProcess(showDate);
}

// カレンダー表示
function showProcess(date) {
    var year = date.getFullYear();
    var month = date.getMonth(); // 0始まり
    document.querySelector('#header').innerHTML = year + "年 " + (month + 1) + "月";

    var calendar = createProcess(year, month);
    document.querySelector('#calendar').innerHTML = calendar;
}

// カレンダー作成
function createProcess(year, month) {
    // 曜日
    var calendar = "<table><tr class='dayOfWeek'>";
    for (var i = 0; i < week.length; i++) {
        calendar += "<th>" + week[i] + "</th>";
    }
    calendar += "</tr>";

    var count = 0;      // 日付けのカウント
    var startDayOfWeek = new Date(year, month, 1).getDay();     // 表示する月の1日の曜日
    var endDate = new Date(year, month + 1, 0).getDate();       // 表示する月の末日
    var lastMonthEndDate = new Date(year, month, 0).getDate();      // 表示する先月の末日
    var row = Math.ceil((startDayOfWeek + endDate) / week.length);     // カレンダー（日付部分）の行数

    // 1行ずつ設定
    for (var i = 0; i < row; i++) {
        calendar += "<tr>";
        // 1colum単位で設定
        for (var j = 0; j < week.length; j++) {
            if (i == 0 && j < startDayOfWeek) {
                // 1行目で1日まで先月の日付を設定
                calendar += "<td class='disabled'>" + (lastMonthEndDate - startDayOfWeek + j + 1) + "</td>";
            } else if (count >= endDate) {
                // 最終行で最終日以降、翌月の日付を設定
                count++;
                calendar += "<td class='disabled'>" + (count - endDate) + "</td>";
            } else {
                // 当月の日付を曜日に照らし合わせて設定
                count++;
                var dateInfo = checkDate(year, month, count);
                if(dateInfo.isToday){
                    calendar += "<td class='today'>" + count + "</td>";
                } else if(dateInfo.isHoliday) {
                    calendar += "<td class='holiday'>" + count + "</td>";
                } else {
                    calendar += "<td>" + count + "</td>";
                }
            }
        }
        calendar += "</tr>";
    }
    return calendar;
}

// 日付チェック
function checkDate(year, month, day) {
    if(isToday(year, month, day)){
        return {
            isToday: true,
            isHoliday: false
        };
    }

    var checkHoliday = isHoliday(year, month, day);
    return {
        isToday: false,
        isHoliday: checkHoliday
    };
}

// 当日かどうか
function isToday(year, month, day) {
    return (year == today.getFullYear()
        && month == today.getMonth()
        && day == today.getDate());
    }

// 〇週目の〇曜日にある祝日の判定用
function howday(year, month, n, WantDayWeek){
    var nichi;
    var FirstDay = new Date(year, month-1, 1);
    
    var FirstDayWeek = FirstDay.getDay();	// 1日の曜日
    if ((WantDayWeek - FirstDayWeek) >= 0) {
        // 求めたい日付(0かプラスの場合)
        nichi = 1 + (WantDayWeek - FirstDayWeek) + 7 * (n - 1);
    }
    if ((WantDayWeek - FirstDayWeek) < 0) {
        // 求めたい日付(マイナスの場合)
        nichi = 1 + (WantDayWeek - FirstDayWeek) + (7 * n);
    }
        return nichi;
}

// 祝日かどうか
function isHoliday(year, month, day) {

    if (month + 1 == 1 && day == 1) {                       // 元旦
        return true
    }
    if (month + 1 == 1 && day == howday(year, 1, 2, 1)) {   // 成人の日
        return true
    }
    if (month + 1 == 2 && day == 11) {                      // 建国記念日
        return true
    }
    if (month + 1 == 2 && day == 23) {                      // 天皇誕生日
        return true 
    }
    if (month + 1 == 4 && day == 29) {                      // 昭和の日
        return true 
    }
    if (month + 1 == 5 && day == 3) {                       // 憲法記念日
        return true
    }
    if (month + 1 == 5 && day == 4) {                       // みどりの日
        return true
    }
    if (month + 1 == 5 && day == 5) {                        // こどもの日
        return true
    }
    if (month + 1 == 7 && day == howday(year, 7, 3, 1)) {   // 海の日
        return true
    }
    if (month + 1 == 8 && day == 11) {                      // 山の日
        return true 
    }
    if (month + 1 == 9 && day == howday(year, 9, 3, 1)) {   // 敬老の日
        return true 
    }
    if (month + 1 == 10 && day == howday(year, 10, 2, 1)) { // スポーツの日
        return true 
    }
    if (month + 1 == 11 && day == 3) {                      // 文化の日
        return true
    }
    if (month + 1 == 11 && day == 23) {                     // 勤労感謝の日
        return true
    }
    if (month + 1 == 3 && day == 21) {                      // 春分の日
        return true
    }
    if (month + 1 == 9 && day == 23) {                      // 秋分の日
        return true
    }

    return false;
}

// 祝日表示
function addAnswer() 
{
    shukuday = document.getElementById("shukuday"); 
    month = document.getElementById("month");
    shukudayMonth = month.value;
    toshi = today.getFullYear();

    seizin = howday(toshi, 1, 2, 1);    // 成人の日　〇日
    umi = howday(toshi, 7, 3, 1);       // 海の日　〇日
    keirou = howday(toshi, 9, 3, 1);    // 敬老の日　〇日
    sports = howday(toshi, 10, 2, 1);   // スポーツの日　〇日


    if (shukudayMonth == 1) {
        shukuday.innerText = 
        '2023年1月の祝日\n1/1 元旦\n1/' + seizin + ' 成人の日\n\n祝日の意味\n元旦：年のはじめを祝う。\n成人の日：おとなになったことを自覚し、みずから生き抜こうとする青年を祝いはげます。\n 出典：日本の祝日のついて -内閣府';
    }
    if (shukudayMonth == 2) {
        shukuday.innerText = 
        '2023年2月の祝日\n2/11 建国記念日\n2/23 天皇誕生日\n\n祝日の意味\n建国記念日：建国をしのび、国を愛する心を養う。\n天皇誕生日：天皇の誕生日を祝う。\n 出典：日本の祝日のついて -内閣府';
    }
    if (shukudayMonth == 3) {
        shukuday.innerText = 
        '2023年3月の祝日\n 3/21 春分の日\n\n祝日の意味\n春分の日：自然をたたえ、生物をいつくしむ。\n 出典：日本の祝日のついて -内閣府';
    }
    if (shukudayMonth == 4) {
        shukuday.innerText = 
        '2023年4月の祝日\n4/29 昭和の日\n\n祝日の意味\n昭和の日：激動の日々を経て、復興を遂げた昭和の時代を顧み、国の将来に思いをいたす。\n 出典：日本の祝日のついて -内閣府';
    }
    if (shukudayMonth == 5) {
        shukuday.innerText = 
        '2023年5月の祝日\n5/3 憲法記念日\n5/4 みどりの日\n5/5 こどもの日\n\n祝日の意味\n憲法記念日：日本国憲法の施行を記念し、国の成長を期する。\nみどりの日：自然に親しむとともにその恩恵に感謝し、豊かな心をはぐくむ。\nこどもの日：こどもの人格を重んじ、こどもの幸福をはかるとともに、母に感謝する。\n 出典：日本の祝日のついて -内閣府';
    }
    if (shukudayMonth == 6) {
        shukuday.innerText = 
        '2023年6月の祝日\n2023年現在 なし';
    }
    if (shukudayMonth == 7) {
        shukuday.innerText = 
        '2023年7月の祝日\n7/' + umi + ' 海の日\n\n祝日の意味\n海の日：海の恩恵に感謝するとともに、海洋国日本の繁栄を願う。\n 出典：日本の祝日のついて -内閣府';
    }
    if (shukudayMonth == 8) {
        shukuday.innerText = 
        '2023年8月の祝日\n8/11 山の日\n\n祝日の意味\n山の日：山に親しむ機会を得て、山の恩恵に感謝する。\n 出典：日本の祝日のついて -内閣府';
    }
    if (shukudayMonth == 9) {
        shukuday.innerText = 
        '2023年9月の祝日\n9/' + keirou + ' 敬老の日\n9/23 秋分の日\n\n祝日の意味\n敬老の日：多年にわたり社会につくしてきた老人を敬愛し、長寿を祝う。\n秋分の日：祖先をうやまい、なくなった人々をしのぶ。\n 出典：日本の祝日のついて -内閣府';
    }
    if (shukudayMonth == 10) {
        shukuday.innerText = 
        '2023年10月の祝日\n10/' + sports + ' スポーツの日\n\n祝日の意味\nスポーツの日：スポーツを楽しみ、他者を尊重する精神を培うとともに、健康で活力ある社会の実現を願う。\n 出典：日本の祝日のついて -内閣府';
    }
    if (shukudayMonth == 11) {
        shukuday.innerText = 
        '2023年11月の祝日\n11/3 文化の日\n11/23 勤労感謝の日\n\n祝日の意味\n文化の日：自由と平和を愛し、文化をすすめる。\n勤労感謝の日：勤労をたっとび、生産を祝い、国民たがいに感謝しあう。\n 出典：日本の祝日のついて -内閣府';
    }
    if (shukudayMonth == 12) {
        shukuday.innerText = 
        '2023年12月の祝日\n2023年現在 なし';
    }
}