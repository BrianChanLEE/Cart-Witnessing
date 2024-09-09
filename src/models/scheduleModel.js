let schedules = [];

// 스케줄 추가 함수
const addSchedule = (location, schedule) => {
    try {
        // 유효성 검사: location과 schedule이 유효한지 확인
        if (!location || !schedule || schedule.length === 0) {
            throw new Error("유효하지 않은 장소 또는 스케줄 정보입니다.");
        }

        // 스케줄 배열에 새로운 스케줄 추가
        schedules.push({ location, schedule });
    } catch (error) {
        console.error("스케줄 추가 중 오류 발생:", error);
        throw new Error("스케줄을 추가하는 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
};

// 저장된 스케줄 가져오는 함수
const getSchedules = () => {
    try {
        // 스케줄이 없는 경우 처리
        if (schedules.length === 0) {
            throw new Error("저장된 스케줄이 없습니다.");
        }

        return schedules;
    } catch (error) {
        console.error("스케줄 불러오기 중 오류 발생:", error);
        throw new Error("스케줄을 불러오는 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
};

module.exports = { addSchedule, getSchedules };