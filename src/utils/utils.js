// 배열을 무작위로 섞는 함수
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        // 0부터 i 사이의 임의의 인덱스를 선택
        const j = Math.floor(Math.random() * (i + 1));
        // 배열의 i번째 요소와 j번째 요소를 교환
        [array[i], array[j]] = [array[j], array[i]];
    }
};

// 주어진 시작 시간과 사람 목록을 이용하여 스케줄을 생성하는 함수
const generateSchedule = (startTime, people) => {
    // 유효성 검사: 사람들이 없을 때 오류 반환
    if (!people || people.length === 0) {
        return { error: "사람 목록이 비어 있습니다. 스케줄을 생성할 수 없습니다." };
    }
    
    let schedule = []; // 최종 스케줄을 저장할 배열
    let intervalMinutes; // 각 스케줄 사이의 간격(분)
    let totalDuration = 120; // 전체 스케줄 시간을 의미하나, 현재 코드에서는 사용되지 않음

    let currentTime = new Date(); // 현재 시간을 기준으로 시간 생성
    const [startHour, startMinute] = startTime.split(':'); // 시작 시간을 시와 분으로 분리
    currentTime.setHours(startHour); // 시작 시간을 설정
    currentTime.setMinutes(startMinute); // 시작 분을 설정

    // 유효성 검사: 잘못된 시작 시간이 입력되었을 때 오류 반환
    if (isNaN(currentTime.getTime())) {
        return { error: "잘못된 시작 시간이 입력되었습니다. 올바른 시간 형식으로 입력해 주세요 (예: '09:00')." };
    }

    // 참여자가 8명일 경우 15분 간격, 4명 이상 8명 이하일 경우 20분 간격, 4명 이하일 경우 30분 간격 설정
    if (people.length === 8) {
        intervalMinutes = 15;
    } else if (people.length >= 4 && people.length < 8) {
        intervalMinutes = 20;
    } else if (people.length < 4) {
        intervalMinutes = 30;
    } else {
        return { error: "참여자 수가 너무 많습니다. 최대 8명까지만 허용됩니다." };
    }
    // 사람 배열을 무작위로 섞음
    shuffleArray(people);

    try {
        // 첫 번째 스케줄을 생성하는 루프
        let i = 0;
        while (i < people.length) {
            const person1 = people[i]; // 첫 번째 사람 선택
            const person2 = (i + 1 < people.length) ? people[i + 1] : null; // 두 번째 사람 선택 또는 null

            // 현재 시간을 HH:MM 형식으로 변환
            let timeString = currentTime.toTimeString().split(' ')[0].substring(0, 5);

            // 두 명이 있으면 두 명을 스케줄에 추가, 아니면 한 명만 추가
            schedule.push({
                time: timeString,
                people: person2 ? [person1, person2] : [person1]
            });

            // 다음 스케줄 시간을 설정
            currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes);
            i += 2; // 두 명씩 처리하기 때문에 인덱스를 2씩 증가
        }

        // 시간을 1시간 후로 설정
        currentTime.setHours(currentTime.getHours() + 1);
        currentTime.setMinutes(startMinute);

        // 두 번째 스케줄을 생성하는 루프
        let j = 0;
        while (j < people.length) {
            const person1 = people[j]; // 첫 번째 사람 선택
            const person2 = (j + 1 < people.length) ? people[j + 1] : null; // 두 번째 사람 선택 또는 null

            // 현재 시간을 HH:MM 형식으로 변환
            let timeString = currentTime.toTimeString().split(' ')[0].substring(0, 5);

            // 두 명이 있으면 두 명을 스케줄에 추가, 아니면 한 명만 추가
            schedule.push({
                time: timeString,
                people: person2 ? [person1, person2] : [person1]
            });

            // 다음 스케줄 시간을 설정
            currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes);
            j += 2; // 두 명씩 처리하기 때문에 인덱스를 2씩 증가
        }
    } catch (error) {
        // 오류가 발생하면 콘솔에 오류 메시지를 출력하고 오류 객체를 반환
        console.error("스케줄 생성 중 오류 발생:", error);
        return { error: "스케줄 생성 중 오류가 발생했습니다. 다시 시도해 주세요." };
    }

    // 스케줄이 정상적으로 생성되었는지 확인
    if (schedule.length === 0) {
        return { error: "스케줄 생성에 실패했습니다. 올바른 데이터를 입력했는지 확인해 주세요." };
    }

    // 생성된 스케줄을 반환
    return { success: "스케줄이 성공적으로 생성되었습니다.", schedule };
};

// shuffleArray와 generateSchedule 함수를 외부로 내보내기
module.exports = { shuffleArray, generateSchedule };