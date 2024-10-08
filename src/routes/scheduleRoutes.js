const express = require("express");
const router = express.Router();
const scheduleController = require("../controllers/scheduleController");

// 메인 페이지 라우트
router.get("/main", (req, res) => {
  res.render("main", { title: "스케줄 관리 시스템" });
});

// 기본 홈 라우트 (메인 페이지로 리다이렉트)
router.get("/", (req, res) => {
  res.redirect("/main");
});

// 스케줄 입력 폼 라우트
router.get("/add-schedule", (req, res) => {
  try {
    scheduleController.showAddSchedulePage(req, res);
  } catch (error) {
    console.error("스케줄 입력 페이지 로드 중 오류 발생:", error);
    res
      .status(500)
      .send(
        "스케줄 입력 페이지를 로드하는 중 오류가 발생했습니다. 다시 시도해 주세요."
      );
  }
});

// 스케줄 생성 및 추가 라우트
router.post("/add-schedule", (req, res) => {
  try {
    scheduleController.createSchedule(req, res);
  } catch (error) {
    console.error("스케줄 생성 중 오류 발생:", error);
    res
      .status(500)
      .send("스케줄을 생성하는 중 오류가 발생했습니다. 다시 시도해 주세요.");
  }
});

// 스케줄 목록 표시 라우트
router.get("/schedules", (req, res) => {
  try {
    scheduleController.showSchedules(req, res);
  } catch (error) {
    console.error("스케줄 목록 불러오기 중 오류 발생:", error);
    res
      .status(500)
      .send(
        "스케줄 목록을 불러오는 중 오류가 발생했습니다. 다시 시도해 주세요."
      );
  }
});

// 스케줄 수정 페이지로 이동
router.get(
  "/schedules/:location/edit",
  scheduleController.showEditSchedePage
);

// 스케줄 업데이트 처리
router.post("/schedules/:location/update", scheduleController.updateSchedule);

// 스케줄 삭제 처리
router.post("/schedules/:location/delete", scheduleController.deleteSchedule);

module.exports = router;
