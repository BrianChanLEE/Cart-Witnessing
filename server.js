const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4040;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// 메모리 내 스케줄 데이터
let schedules = [];

// 랜덤하게 사람을 섞는 함수 (Optional)
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

 // 짝짓기 및 시간 배정 함수
 const generateSchedule = (startTime, people) => {
    let schedule = [];
    let intervalMinutes; // 시간 간격을 동적으로 설정
    let totalDuration = 120; // 기본 2시간

    // 입력된 시작 시간을 Date 객체로 변환
    let currentTime = new Date();
    const [startHour, startMinute] = startTime.split(':');
    currentTime.setHours(startHour);
    currentTime.setMinutes(startMinute);

    // 사람 수에 따라 시간 간격 설정
    if (people.length === 8) {
        intervalMinutes = 15; // 8명일 경우 15분 간격
    } else {
        intervalMinutes = 20; // 그 외 5명 또는 6명일 경우 20분 간격
    }

    // 사람 배열을 랜덤으로 섞거나 그대로 사용할 수 있음
    shuffleArray(people);

    // 짝짓기 로직 (홀수일 경우 마지막 사람은 혼자 배정)
    let i = 0;
    while (i < people.length) {
        const person1 = people[i]; // 첫 번째 사람 선택
        const person2 = (i + 1 < people.length) ? people[i + 1] : null; // 두 번째 사람이 있으면 선택, 없으면 null

        // 시간 업데이트
        let timeString = currentTime.toTimeString().split(' ')[0].substring(0, 5);

        // 스케줄에 시간과 짝을 추가
        schedule.push({
            time: timeString,
            people: person2 ? [person1, person2] : [person1] // 짝이 있으면 두 명, 없으면 한 명 배정
        });

        // 시간 간격을 더함
        currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes);

        // 인덱스 증가 (짝을 이루면 두 명 처리)
        i += 2;
    }

    // 1시간 후에 동일한 패턴 반복
    currentTime.setHours(currentTime.getHours() + 1);
    currentTime.setMinutes(startMinute); // 시작 분으로 초기화

    // 두 번째 1시간 동안 같은 짝으로 스케줄을 반복
    let j = 0;
    while (j < people.length) {
        const person1 = people[j];
        const person2 = (j + 1 < people.length) ? people[j + 1] : null;

        let timeString = currentTime.toTimeString().split(' ')[0].substring(0, 5);

        schedule.push({
            time: timeString,
            people: person2 ? [person1, person2] : [person1]
        });

        currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes);

        j += 2;
    }

    return schedule;
};

// 스케줄 입력 폼 표시
app.get('/add-schedule', (req, res) => {
    res.render('add-schedule');
});

// 스케줄 추가 처리
app.post('/add-schedule', (req, res) => {
    const { location, startTime, people } = req.body;
    let peopleList = people.split(',').map(p => p.trim()); // 쉼표로 사람 분리 및 공백 제거

    // 스케줄 생성
    let newSchedule = generateSchedule(startTime, peopleList);

    // 스케줄을 위치와 함께 저장
    schedules.push({ location, schedule: newSchedule });
    res.redirect('/schedules');
});

// 스케줄 목록 표시
app.get('/schedules', (req, res) => {
    res.render('schedules', { schedules });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});