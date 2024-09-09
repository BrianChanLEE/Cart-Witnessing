

const { addSchedule, getSchedules } = require('../models/scheduleModel');
const { generateSchedule } = require('../utils/utils');

// 스케줄 목록을 저장할 배열
let schedules = [];

// TTL 설정: 스케줄을 2시간 동안 유지 (밀리초 단위)
const SCHEDULE_TTL = 2 * 60 * 60 * 1000; // 2시간

// const SCHEDULE_TTL = 1 * 60 * 1000; // 1분
// 스케줄 입력 폼 페이지 렌더링
const showAddSchedulePage = (req, res) => {
    res.render('add-schedule');
};

// 스케줄 생성 및 추가 처리
const createSchedule = (req, res) => {
    try {
        const { location, startTime, people } = req.body;

        // 유효성 검사: 필요한 정보가 모두 입력되었는지 확인
        if (!location || !startTime || !people) {
            return res.status(400).send('모든 필드를 채워 주세요. 장소, 시작 시간, 참여자는 필수입니다.');
        }

        let peopleList = people.split(',').map(p => p.trim());

        // 유효성 검사: 참여자 수가 충분한지 확인
        if (peopleList.length < 2) {
            return res.status(400).send('스케줄을 생성하려면 최소 2명의 참여자가 필요합니다.');
        }

        // 스케줄 생성
        let newSchedule = generateSchedule(startTime, peopleList);

        // 스케줄 생성 중 오류가 발생했을 경우 처리
        if (newSchedule.error) {
            return res.status(400).send('스케줄 생성 중 오류가 발생했습니다: ' + newSchedule.error);
        }

        // 스케줄에 생성 시간 추가
        const scheduleWithTime = {
            location,
            schedule: newSchedule,
            createdAt: Date.now() // 생성 시간 기록
        };

        // 메모리 배열에 스케줄 추가
        schedules.push(scheduleWithTime);

        // TTL에 따라 일정 시간 후 스케줄 삭제
        setTimeout(() => {
            schedules = schedules.filter(s => s.createdAt !== scheduleWithTime.createdAt);
        }, SCHEDULE_TTL);

        // 스케줄 생성 완료 후 목록 페이지로 리디렉션
        res.redirect('/schedules');
    } catch (error) {
        // 서버 오류 발생 시 메시지 전송
        res.status(500).send('스케줄 생성 중 서버 오류가 발생했습니다: ' + error.message);
    }
};

// 저장된 스케줄 목록을 보여주는 페이지 렌더링
const showSchedules = (req, res) => {
    try {
        // 유효성 검사: 스케줄이 없는 경우 처리
        if (!schedules || schedules.length === 0) {
            return res.status(404).send('저장된 스케줄이 없습니다.');
        }

        // 스케줄 목록을 성공적으로 렌더링
        res.render('schedules', { schedules });
    } catch (error) {
        // 스케줄 불러오기 중 서버 오류 발생 시 메시지 전송
        res.status(500).send('스케줄 목록을 불러오는 중 서버 오류가 발생했습니다: ' + error.message);
    }
};





module.exports = {
    showAddSchedulePage,
    createSchedule,
    showSchedules,
};