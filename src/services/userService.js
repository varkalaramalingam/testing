import { io } from "../components/api/io.js";

export default {
  getTenantDetails(id) {
    return io({ method: "GET", url: `/tenant/for/dev.wisereads.in` });
  },

  getSchoolMeta(url) {
    return io({ method: "GET", url: `/tenant/for/${url}` });
  },

  BoardOfEducation(id) {
    return io({ method: "GET", url: `/${id}/syllabus` });
  },
  AddSyllabus(id, syllabus){
    return io({
      method: "POST",
      url: `/${id}/addsyllabus`,
      data: syllabus
    });
  },
  GradesForStudentBasedOnBoard(boardforgrade, id) {
    return io({
      method: "POST",
      url: `/${id}/listgradesofsyllabustype`,
      data: boardforgrade
    });
  },
  GradesForStudentBasedOnAcademic(academicId, id) {
    return io({
      method: "POST",
      url: `/${id}/listgradesbyacademic`,
      data: academicId
    });
  },
  academicGradesBasedOnAcademic(academicId, id) {
    return io({
      method: "GET",
      url: `/${id}/listacademicgrades?academicid=${academicId}`,
    });
  },
  subjectsBasedOnacademicGrade(academicGradeId, id) {
    return io({
      method: "GET",
      url: `/${id}/academicgradesubjects?academicgradeid=${academicGradeId}`,
    });
  },
  AcademicYears(id) {
    return io({
      method: "GET",
      url: `/${id}/academicsandboards`
    });
  },
  getAcademicYearsOnly(id) {
    return io({
      method: "GET",
      url: `/${id}/academicyear-list`
    });
  },
  AddAcademicyear(addacademicyear, id) {
    return io({
      method: "POST",
      url: `/${id}/addacademicyear`,
      data: addacademicyear
    });
  },
  UpdateAcademiYear(updateacademicyear, id) {
    return io({
      method: "POST",
      url: `/${id}/addacademicyear`,
      data: updateacademicyear
    });
  },
  Subjects(id) {
    return io({
      method: "GET",
      url: `/${id}/subjects`
    });
  },
  NewSubject(subject, id) {
    return io({
      method: "POST",
      url: `/${id}/addsubjects`,
      data: subject
    });
  },
  TestTypes(id) {
    return io({
      method: "GET",
      url: `/${id}/listtesttype`
    });
  },
  NewTestType(testtype, id) {
    return io({
      method: "POST",
      url: `/${id}/addtesttype`,
      data: testtype
    });
  },
  Houses(id) {
    return io({
      method: "GET",
      url: `/${id}/listhouses`
    });
  },
  NewHouse(house, id) {
    return io({
      method: "",
      url: `/${id}/addhousedetails`,
      data: house
    });
  },
  DeleteHouse(houseid, id) {
    return io({
      method: "POST",
      url: `/${id}/deletehousedetails`,
      data: houseid
    });
  },
  EditHouse(house, id) {
    return io({
      method: "POST",
      url: `/${id}/edithousedetails`,
      data: house
    });
  },
  NumberOfStudentsInHouse(housename, id) {
    return io({
      method: "POST",
      url: `/${id}/listnoofstudentsinhouse`,
      data: housename
    });
  },
  Students(id, classdetails) {
    return io({
      method: "POST",
      url: `/${id}/students`,
      data: classdetails
    });
  },
  yetToAdmitStudents(id, classdetails) {
    return io({
      method: "POST",
      url: `/${id}/students/notassigned`,
      data: classdetails
    });
  },
  changeStudentStatus(id, studentdetails) {
    return io({
      method: "POST",
      url: `/${id}/updatestudentstatus`,
      data: studentdetails
    });
  },
  Interviewees(id) {
    return io({
      method: "GET",
      url: `/${id}/interviewees`
    });
  },
  NewStudent(student, id) {
    return io({
      method: "POST",
      url: `/${id}/addstudent`,
      data: student
    });
  },
  NewInterviewee(interviewee, id) {
    return io({
      method: "POST",
      url: `/${id}/addinterviewee`,
      data: interviewee
    });
  },
  NewParent(parent, id) {
    return io({
      method: "POST",
      url: `/${id}/addparent`,
      data: parent
    });
  },
  GetParents(student, id) {
    return io({
      method: "POST",
      url: `/${id}/getparents`,
      data: student
    });
  },
  UpdateStudent(student, id) {
    return io({
      method: "POST",
      url: `/${id}/updatestudent`,
      data: student
    });
  },
  ResetPassword(password, id){
    return io({
      method: "POST",
      url: `/${id}/resetstudentpassword`,
      data: password
    });
  },
  UpdateInterviewee(interviewee, id) {
    return io({
      method: "POST",
      url: `/${id}/updateinterviewee`,
      data: interviewee
    });
  },
  UpdateParent(parent, id) {
    return io({
      method: "POST",
      url: `/${id}/updateparent`,
      data: parent
    });
  },
  DeleteParentStudentRelationship(parentStudent, id){
    return io({
      method: "POST",
      url: `/${id}/deleteparentstudent`,
      data: parentStudent
    });
  },
  Roles(id) {
    return io({
      method: "GET",
      url: `/${id}/roles`
    });
  },
  Teachers(id) {
    return io({
      method: "GET",
      url: `/${id}/teachers`
    });
  },
  getUsers(id) {
      return io({
        method: "GET",
        url: `/${id}/adduser`
      });
  },
  getRoles(id) {
    return io({
      method: "GET",
      url: `/${id}/userroles`
    });
  },
  NewTeacher(teacher, id) {
    return io({
      method: "POST",
      url: `/${id}/addteacher`,
      data: teacher
    });
  },
  newUser(user, id) {
    return io({
      method: "POST",
      url: `/${id}/adduser`,
      data: user
    });
  },
  UpdateStaff(user, id) {
    return io({
      method: "PUT",
      url: `/${id}/adduser`,
      data: user
    });
  },
  UpdateTeacher(teacher, id) {
    return io({
      method: "POST",
      url: `/${id}/addteacher`,
      data: teacher
    });
  },
  GetTeachers(id){
    return io({
      method: "GET",
      url: `/${id}/getteachers`

    });
  },
  Grades(syllabustype, id) {
    return io({
      method: "GET",
      url: `/${id}/admin/listgrades?syllabusType=${syllabustype}`
    });
  },
  AllGrades(id) {
    return io({
      method: "GET",
      url: `/${id}/admin/listgrades`
    });
  },
  getRecommendedGroups(id) {
    return io({
      method: "GET",
      url: `/${id}/admin/recGroups`
    });
  },
  ClassroomGrades(syllabustype, id) {
    return io({
      method: "GET",
      url: `/${id}/listgrades?syllabusType=${syllabustype}`
    });
  },
  NewGrade(grade, id) {
    return io({
      method: "POST",
      url: `/${id}/addgrade`,
      data: grade
    });
  },
  Sections(yearandboard, id) {
    return io({
      method: "GET",
      url: `/${id}/classrooms/${yearandboard.academicyearid}/${
        yearandboard.syllabustype
      }`
    });
  },
  NewSection(section, id) {
    return io({
      method: "POST",
      url: `/${id}/createclass`,
      data: section
    });
  },
  UpdateSection(section, id) {
    return io({
      method: "POST",
      url: `/${id}/updateclassteacher`,
      data: section
    });
  },
  Events(id) {
    return io({
      method: "GET",
      url: `/${id}/events`
    });
  },
  NewEvent(event, id) {
    return io({
      method: "POST",
      url: `/${id}/postevent`,
      data: event
    });
  },
  DeleteEvent(eventid, id) {
    return io({
      method: "POST",
      url: `/${id}/deleteevent`,
      data: eventid
    });
  },
  UpdateEvent(editevent, id) {
    return io({
      method: "PATCH",
      url: `/${id}/editevent`,
      data: editevent
    });
  },
  News(id) {
    return io({
      method: "GET",
      url: `/${id}/news`
    });
  },
  PostNews(news, id) {
    return io({
      method: "POST",
      url: `/${id}/postnews`,
      data: news
    });
  },
  DeleteNews(newsid, id) {
    return io({
      method: "POST",
      url: `/${id}/deletenews`,
      data: newsid
    });
  },
  EditNews(editnews, id) {
    return io({
      method: "POST",
      url: `/${id}/editnews`,
      data: editnews
    });
  },
  Holidays(id) {
    return io({
      method: "GET",
      url: `/${id}/holidays`
    });
  },
  NewHoliday(holiday, id) {
    return io({
      method: "POST",
      url: `/${id}/postholiday`,
      data: holiday
    });
  },
  DeleteHoliday(holidayid, id) {
    return io({
      method: "POST",
      url: `/${id}/deleteholiday`,
      data: holidayid
    });
  },
  EditHoliday(editholiday, id) {
    return io({
      method: "POST",
      url: `/${id}/editholiday`,
      data: editholiday
    });
  },
  TestWorksheetCreatedby(id, createdby, gradeid, subjectid){
    return io({
      method:"GET",
      url:`/${id}/gettestworksheetcreatedby?createdby=${createdby}&gradeid=${gradeid}&subjectid=${subjectid}`
    })
  },
  
  TestGradeWorsksheets(id,gradeid,subjectid,createdby){
    return io({
      method:"GET",
      url:`/${id}/getTestGradeWorksheets?gradeid=${gradeid}&subjectid=${subjectid}&createdby=${createdby}`
    })
  },

  ListOfTestWorksheets(id,testid,subjectid){
    return io({
      method:"GET",
      url:`/${id}/getlistoftestworksheets?testid=${testid}&subjectid=${subjectid}`
    })
  },

  getPublishStatus(tenantId,online_exam_id){
    return io({
      method:"GET",
      url:`/${tenantId}/getpublishstatus?id=${online_exam_id}`
    })
  },

  updateTestSyllabus(id,obj){
    return io({
      method:"PUT",
      url:`/${id}/updatetest-syllabus`,
      data:obj
    })

  },

  ListOfTests(grade, id) {
    return io({
      method: "POST",
      url: `/${id}/listtests`,
      data: grade
    });
  },
  StatusOfTests(id) {
    return io({
      method: "GET",
      url: `/${id}/liststatusoftests`
    });
  },
  Testmodes(id) {
    return io({
      method: "GET",
      url: `/${id}/listtestmode`
    });
  },
  NewTest(test, id) {
    return io({
      method: "POST",
      url: `/${id}/createtest`,
      data: test
    });
  },
  SectionDetails(sectionid, id) {
    return io({
      method: "POST",
      url: `/${id}/classroomdetails`,
      data: sectionid
    });
  },
  studentListByGrade(id,academicid,grade) {
    return io({
      method: "GET",
      url: `/${id}/gradewise/student-details/${academicid}/${grade}`,
    });
  },
  getNumberOfBirthdaysByMonth(id,passingyear,syllabus) {
    return io({
      method: "GET",
      url: `/${id}/analytics/api/birthdays/${passingyear}/${syllabus}`,
    });
  },
  AssigningTeacherToSubject(addingteachersubject, id) {
    return io({
      method: "POST",
      url: `/${id}/assignteachertosubject`,
      data: addingteachersubject
    });
  },
  StudentsOfGrade(sectionid, id) {
    return io({
      method: "GET",
      url: `/${id}/${sectionid.id}/studentsofgrade`
    });
  },
  NewStudentToSection(studentid, id) {
    return io({
      method: "POST",
      url: `/${id}/addstudenttoclassroom`,
      data: studentid
    });
  },
  GenerateRollnumbers(classdetails, id){
    return io({
      method: "POST",
      url: `/${id}/classrolldetails`,
      data: classdetails
    });
  },
  UpdateRollnumbers(rollsortdetails, id){
    return io({
      method: "POST",
      url: `/${id}/updaterollnumbers`,
      data: rollsortdetails
    });
  },
  TestDetailsOfSection(sectionid, id) {
    return io({
      method: "POST",
      url: `/${id}/listtests`,
      data: sectionid
    });
  },
  SubjectDetailsOfATest(testid, id) {
    return io({
      method: "POST",
      url: `/${id}/testsubjectdetails`,
      data: testid
    });
  },
  NewUser(user) {
    console.log(user);
    return io({
      method: "POST",
      url: `/tenant/register`,
      data: user
    });
  },
  UpdateUser(user) {
    console.log(user);
    return io({
      method: "POST",
      url: `/schools/updateschool`,
      data: user
    });
  },
  MyClass(userid, id) {
    return io({
      method: "POST",
      url: `/${id}/myclassroom`,
      data: userid
    });
  },
  MySubjects(userid, id) {
    return io({
      method: "POST",
      url: `/${id}/mysubjects`,
      data: userid
    });
  },

  NewPeriodType(periodtype, id) {
    return io({
      method: "POST",
      url: `/${id}/tt/periodtype`,
      data: periodtype
    });
  },
  MyClassStudents(sectionid, id) {
    return io({
      method: "POST",
      url: `/${id}/liststudentsofclassroom`,
      data: sectionid
    });
  },

  Getperiodtypes(id) {
    return io({
      method: "GET",
      url: `/${id}/tt/periodtypes`
    });
  },
  getGradesAndSections(id,academicyear,syllabustype) {
    return io({
      method: "GET",
      url: `/${id}/grades-sections/${academicyear}/${syllabustype}`
    });
  },
   getStudentMarksBySubject(id, academicyearid, classroomid,studentid) {
    return io({
      method: "GET",
      url: `/${id}/api/boxplot-analytics/${academicyearid}/${classroomid}/${studentid}`
    });
  },
getStudentMarksInClusteredBar(id,academicyearid, classroomid, studentid) {
    return io({
      method: "GET",
      url: `/${id}/api/clusterbar-analytics/${academicyearid}/${classroomid}/${studentid}`
    });
  },
  getBoysAndGirlsAverageMarks(id,academicyearid, classroomid) {
    return io({
      method: "GET",
      url: `/${id}/analytics/girls-boys/average/${academicyearid}/${classroomid}`
    });
  },
  getWorksheetAnalyseDataForStudent(id,studentid,classroomid,subjectid) {
    if (classroomid != undefined) {
      return io({
        method: "GET",
        url: `/${id}/analytics/ws/test/student?classroomid=${classroomid}&studentid=${studentid}&subjectid=${subjectid}`
      });
    }
    else{
      return io({
        method: "GET",
        url: `/${id}/analytics/ws/test/student?studentid=${studentid}`
      });
    }
  },
  getStudentAcademicyearsAndSyllabus(id,studentid) {
    return io({
      method: "GET",
      url: `/${id}/academicyears-syllabus/${studentid}`
    });
  },
  getBooksAnalyticsData(id,classroomid,studentid) {
    return io({
      method: "GET",
      url: `/${id}/student/books-analytics/${classroomid}/${studentid}`
    });
  },
  getProjectAnalytics(id,teacherid,subjectid) {
    return io({
      method: "GET",
      url: `/${id}/student/project-analytics/${teacherid}/${subjectid}`
    });
  },
  getBooksAnalyticsByTeacherId(id,teacherid) {
    return io({
      method: "GET",
      url: `/${id}/books-analytics/${teacherid}`
    });
  },
  NewPeriod(periods, id) {
    return io({
      method: "POST",
      url: `/${id}/tt/period`,
      data: periods
    });
  },
  GetperiodsList(id) {
    return io({
      method: "GET",
      url: `/${id}/tt/periodslist`
    });
  },
  GetperiodsListForClassroom(id, classroomid) {
    return io({
      method: "GET",
      url: `/${id}/periods/${classroomid}`
    });
  },
  SubjectTests(mysubject, id) {
    return io({
      method: "GET",
      url: `/${id}/subjectstests/${mysubject.id}/${mysubject.subjectname}`
    });
  },
  SubjectSyllabus(mysubject, id,testid) {
    return io({
      method: "GET",
      url: `/${id}/subjectsyllabus/${mysubject.id}/${mysubject.subjectname}/${testid}`
    });
  },
  SubjectTestEdit(subjectdetails, id) {
    return io({
      method: "POST",
      url: `/${id}/addoreditsyllabus`,
      data: subjectdetails
    });
  },
  EnterMarks(testdetails, id) {
    return io({
      method: "POST",
      url: `/${id}/entermarks`,
      data: testdetails
    });
  },
  AddMarks(marks, id) {
    return io({
      method: "POST",
      url: `/${id}/addmarks`,
      data: marks
    });
  },

  GetTimingsforsection(sections, id) {
    return io({
      method: "GET",
      url: `/${id}/tt/periods/${sections.id}`
    });
  },
  AddingsubjectToPeriod(addingsubjects, id) {
    return io({
      method: "POST",
      url: `/${id}/tt/periodcell`,
      data: addingsubjects
    });
  },

  MyClassAssignments(subject, id) {
    return io({
      method: "GET",
      url: `/${id}/assignments/classroom/${subject.classroomid}`
    });
  },

  MySubjectAssignments(subject, id) {
    return io({
      method: "GET",
      url: `/${id}/assignments/classroom/${subject.classroomid}/${
        subject.subjectid
      }`
    });
  },
  AddMySubjectAssignment(assignment, id) {
    return io({
      method: "POST",
      url: `/${id}/assignments/assign`,
      data: assignment
    });
  },
  DeleteMySubjectAssignment(assignmentid, id) {
    return io({
      method: "POST",
      url: `/${id}/assignments/delete`,
      data: assignmentid
    });
  },
  AllEventsData(id) {
    return io({
      method: "GET",
      url: `/${id}/events`
    });
  },
  AllNewsData(id) {
    return io({
      method: "GET",
      url: `/${id}/news`
    });
  },
  AllHolidaysData(id) {
    return io({
      method: "GET",
      url: `/${id}/holidays`
    });
  },
  GetTimingsForMyclass(sectionid, id) {
    return io({
      method: "GET",
      url: `/${id}/tt/periods/${sectionid.id}`
    });
  },
  GetTeacherTodaySchedule(schedules, id) {
    return io({
      method: "POST",
      url: `/${id}/teacherschedule/today`,
      data: schedules
    });
  },
  Dairy(sectionid, id) {
    return io({
      method: "POST",
      url: `/${id}/listinformation`,
      data: sectionid
    });
  },
  AddDairy(dairy, id) {
    return io({
      method: "POST",
      url: `/${id}/addentry`,
      data: dairy
    });
  },
  UpdateDairy(dairy, id) {
    return io({
      method: "POST",
      url: `/${id}/updateentry`,
      data: dairy
    });
  },
  GetTodaySchedules(schedules, id) {
    return io({
      method: "POST",
      url: `/${id}/teacherschedule/today/schedule`,
      data: schedules
    });
  },
  AllStudentstomorrowBirthday(id) {
    return io({
      method: "GET",
      url: `/${id}/birthday/tomorrow`
    });
  },
  AllStudentsBirthdayData(id) {
    return io({
      method: "GET",
      url: `/${id}/birthday/today`
    });
  },
  NumberOfStudentByGrades(id,acadamicYear,syllabusType) {
    return io({
      method: "GET",
      url: `/${id}/analytics/api/students_summary/${acadamicYear}/${syllabusType}`
    });
  },
  NumberOfStudentByBoards(id,acadamicYear) {
    return io({
      method: "GET",
      url: `/${id}/analytics/api/board_summary/${acadamicYear}`
    });
  },
  ViewResults(id, classroomdetails) {
    return io({
      method: "POST",
      url: `/${id}/viewresults`,
      data: classroomdetails
    });
  },
  Attendance(id, classroom) {
    return io({
      method: "POST",
      url: `/${id}/attendance/${classroom.id}`,
      data: classroom
    });
  },
  SubjectAttendance(id, classroom) {
    return io({
      method: "POST",
      url: `/${id}/attendance/${classroom.id}/${classroom.subjectid}`,
      data: classroom
    });
  },
  RecordAttendance(id, attendance) {
    return io({
      method: "POST",
      url: `/${id}/recordattendance`,
      data: attendance
    });
  },
  Studentdetails(id, student) {
    return io({
      method: "POST",
      url: `/${id}/students/${student.id}`
    });
  },
  ClassTeacherMessages(id, teacherid) {
    return io({
      method: "POST",
      url: `/${id}/teachermessages`,
      data: teacherid
    });
  },
  ClassRoomStudents(id, sectionid) {
    return io({
      method: "GET",
      url: `/${id}/${sectionid.id}/classroomstudents`
    });
  },
  MyclassNewMessage(id, newmessage) {
    return io({
      method: "POST",
      url: `/${id}/sendmessagetoparent`,
      data: newmessage
    });
  },
  ChangeTestStatus(id, testidforstatus) {
    return io({
      method: "POST",
      url: `/${id}/changeteststatus`,
      data: testidforstatus
    });
  },
  TransportDashboard(id) {
    return io({
      method: "GET",
      url: `/${id}/bussummery`
    });
  },
  TransportStaff(id) {
    return io({
      method: "GET",
      url: `/${id}/staff`
    });
  },
  getActiveBusDetails(id) {
    return io({
      method: "GET",
      url: `/${id}/get-active-bus-details`
    });
  },
  TransportStops(id) {
    return io({
      method: "GET",
      url: `/${id}/stops`
    });
  },
  TransportNewStop(stop, id) {
    return io({
      method: "POST",
      url: `/${id}/addstop`,
      data: stop
    });
  },
  TransportBuses(id) {
    return io({
      method: "GET",
      url: `/${id}/buses`
    });
  },
  TransportNewBus(bus, id) {
    return io({
      method: "POST",
      url: `/${id}/busregistration`,
      data: bus
    });
  },
  addStaffToBus(id, staff) {
    return io({
      method: "POST",
      url: `/${id}/add-staff-to-bus`,
      data: staff
    });
  },
  updateStaffInBus(id, staff) {
    return io({
      method: "POST",
      url: `/${id}/update-staff-in-bus`,
      data: staff
    });
  },
  addStudentsToBus(id, students) {
    return io({
      method: "POST",
      url: `/${id}/add-students-to-bus`,
      data: students
    });
  },
  TransportRoutes(id) {
    return io({
      method: "GET",
      url: `/${id}/routes`
    });
  },
  getAllTransportDetails(id) {
    return io({
      method: "GET",
      url: `/${id}/get-all-transport-details`
    });
  },
  TransportBusDrivers(id) {
    return io({
      method: "GET",
      url: `/${id}/bus/drivers`
    });
  },
  busMaintainerDetails(id){
    return io({
      method: "GET",
      url: `/${id}/get-bus-maintainer-details`
    });
  },
  studentsDetailsInBus(id){
    return io({
      method: "GET",
      url: `/${id}/get-stundets-in-bus-details`
    });
  },
  TransportBusAttenders(id) {
    return io({
      method: "GET",
      url: `/${id}/bus/attenders`
    });
  },
  TransportBusTeachers(id) {
    return io({
      method: "GET",
      url: `/${id}/bus/teachers`
    });
  },
  TransportMoreBusDetails(id, busdetails) {
    return io({
      method: "POST",
      url: `/${id}/addbusdetails`,
      data: busdetails
    });
  },
  TransportNewRoute(id, route) {
    return io({
      method: "POST",
      url: `/${id}/addroute`,
      data: route
    });
  },
  assignStopsToRoutes(id,routeid, stops) {
    return io({
      method: "POST",
      url: `/${id}/${routeid}/assign-stops-to-routes`,
      data: stops
    });
  },
  activateTheBus(id,activateBus) {
    return io({
      method: "POST",
      url: `/${id}/activate-the-bus`,
      data: activateBus
    });
  },
  TransportDeleteRoute(id, routeid) {
    return io({
      method: "POST",
      url: `/${id}/deleteroutes`,
      data: routeid
    });
  },
  TransportDeleteBus(id, bus) {
    return io({
      method: "POST",
      url: `/${id}/deletebus`,
      data: bus
    });
  },
  TransportDeleteStop(id, stop) {
    return io({
      method: "POST",
      url: `/${id}/deletestop`,
      data: stop
    });
  },
  TransportDeleteStaff(id, driver) {
    return io({
      method: "POST",
      url: `/${id}/deletestaff`,
      data: driver
    });
  },
  deleteBusRoute(id, busdeatils) {
    return io({
      method: "POST",
      url: `/${id}/delete-bus-route`,
      data: busdeatils
    });
  },
  TransportNewStaff(id, newstaff) {
    return io({
      method: "POST",
      url: `/${id}/staffregistration`,
      data: newstaff
    });
  },
  MyChild(id, userid) {
    return io({
      method: "POST",
      url: `/${id}/parentchildrens`,
      data: userid
    });
  },
  publishExam(obj, id) {
    return io({
      method: "POST",
      url: `/${id}/test/publish`,
      data: obj
    });
  },
  MyChildforstudentlogin(id, userid) {
    return io({
      method: "POST",
      url: `/${id}/children`,
      data: userid
    });
  },
  ChildTests(id, sendchildids) {
    return io({
      method: "POST",
      url: `/${id}/listtestsbystudent`,
      data: sendchildids
    });
  },
  ChildViewResults(id, childclassdetails) {
    return io({
      method: "POST",
      url: `/${id}/marks`,
      data: childclassdetails
    });
  },
  AttendanceOfStudent(id, childclassdetails) {
    return io({
      method: "POST",
      url: `/${id}/studentattendance`,
      data: childclassdetails
    });
  },
  ChildWorksheets(id, classid,studentid) {
    return io({
      method: "GET",
      url: `/${id}/ws/viewAssignedWorksheet?classroomid=${classid}&studentid=${studentid}`
    });
  },
  ChildJournal(id, classid) {
    return io({
      method: "POST",
      url: `/${id}/listinformation`,
      data: classid
    });
  },
  ChildAssignments(id, classid) {
    return io({
      method: "GET",
      url: `/${id}/assignments/classroom/${classid}`
    });
  },
  parentMessages(id, teacherid) {
    return io({
      method: "POST",
      url: `/${id}/parentmessages`,
      data: teacherid
    });
  },
  parentReply(id, newmessage) {
    return io({
      method: "POST",
      url: `/${id}/sendmessagetoteacher`,
      data: newmessage
    });
  },
  newBook(book, id) {
    return io({
      method: "POST",
      url: `/${id}/api/books`,
      data: book
    });
  },

  getListOfBooks(id) {
    return io({
      method: "GET",
      url: `/${id}/api/books`
    });
  },
  getListOfSimilarBooks(id,book) {
    return io({
      method: "POST",
      url: `/${id}/api/books/similarbooks/`,
      data: book
    });
  },
  updateBook(book, id) {
    return io({
      method: "PATCH",
      url: `/${id}/books/${book.id}`,
      data: book
    });
  },
  newWorksheet(id, worksheet) {
    return io({
      method: "POST",
      url: `/${id}/ws/worksheets`,
      data: worksheet
    });
  },
  updateWorksheet(id, worksheet) {
    return io({
      method: "PUT",
      url: `/${id}/ws/worksheets/${worksheet.w_id}`,
      data: worksheet
    });
  },
  editWorksheetStatus(id, w_id,status_id) {
    return io({
      method: "PUT",
      url: `/${id}/ws/worksheets/status?w_id=${w_id}&status_id=${status_id}`,
    });
  },
  updatePublishStatus(id, w_id,publish_status){
    return io({
      method: "PUT",
      url: `/${id}/ws/worksheets/updatepublish?w_id=${w_id}&publish=${publish_status}`
    })
  },
  getMaxMarks(id, w_id) {
    return io({
      method: "GET",
      url: `/${id}/ws/totalmarks/${w_id}`,
    });
  },
  academicgrades(id) {
    return io({
      method: "GET",
      url: `/${id}/academicgrade`,
    });
  },
  saveAcademicGrades(id,academicgrades){
    return io({
      method: "POST",
      url: `/${id}/academicgrade`,
      data: academicgrades
    });
  },
  UpdateAcademicGrades(id,academicgrades){
    return io({
      method: "PUT",
      url: `/${id}/academicgrade`,
      data: academicgrades
    });
  },
  autocorrect(id,selectedStudents){
    return io({
      method: "POST",
      url: `/${id}/ws/autoevaluate`,
      data: selectedStudents
    });
  },
  getListOfWorksheets(id) {
    return io({
      method: "GET",
      url: `/${id}/ws/worksheets`
    });
  },
  getListOfWorksheetsByTagId(tagid, id) {
    return io({
      method: "GET",
      url: `/${id}/ws/worksheets/tagid?tagid=${tagid}`
    });
  },
  getListOfWorksheetsByTags(tagids, id) {
    return io({
      method: "POST",
      url: `/${id}/ws/worksheets/searchworksheetsforlistoftags`,
      data: tagids
    });
  },
  getWorksheetDesignAnalyse(wid, id) {
    return io({
      method: "GET",
      url: `/${id}/ws/worksheet-analyse?w_id=${wid}`
    });
  },
  getAnalyseStudentForATest(testid, id) {
    return io({
      method: "GET",
      url: `/${id}/ws/worksheet/testanalyse?id=${testid}`
    });
  },
  getAnalysedDataForListOfTests(id, classroomid, studentid, testidlist) {
    return io({
      method:"POST",
      url: `/${id}/analytics/ws/test/overallperformanceofstudentinselectedtests?classroomid=${classroomid}&studentid=${studentid}`,
      data: testidlist
    });
  },
  getAnalysedStudentForAStudent(id, classroomid, studentid, subjectid) {
    return io({
      method: "GET",
      url: `/${id}/analytics/ws/test/overallperformanceofstudent?classroomid=${classroomid}&studentid=${studentid}&subjectid=${subjectid}`
    });
  },
  getAnalysedStudentForAClassroom(id, classroomid, subjectid) {
    return io({
      method: "GET",
      url: `/${id}/analytics/ws/test/overallperformanceofstudentsofclass?classroomid=${classroomid}&subjectid=${subjectid}`
    });
  },
  getAnalysedDataOfStudentsForAGrade(id, academicgradeid, subjectid) {
    return io({
      method: "GET",
      url: `/${id}/analytics/ws/test/overallperformanceofstudentsofgrade?academicgradeid=${academicgradeid}&subjectid=${subjectid}`
    });
  },
  newQuestion(question, id,w_id) {
    return io({
      method: "POST",
      url: `/${id}/ws/questions/${w_id}`,
      data: question
    });
  },
  updateQuestionToWs(question, id) {
    return io({
      method: "PUT",
      url: `/${id}/ws/${question.questionid}/worksheets`,
      data: question
    });
  },
  updateQuestionToLibrary(questionData,questionid, id) {
    return io({
      method: "POST",
      url: `/${id}/ws/questions/update/${questionid}`,
      data: questionData
    });
  },
  getListOfQuestions(worksheetId, id) {
    return io({
      method: "GET",
      url: `/${id}/ws/worksheets/${worksheetId}/questions`
    });
  },
  getPassageQuestionsList(id, questionId) {
    return io({
      method: "GET",
      url: `/${id}/ws/questions/passagequestions/${questionId}`
    });
  },
  getWorksheetDocument(worksheetId, id) {
    return io({
      method: "GET",
      url: `/${id}/ws/${worksheetId}/document`
    });
  },
  addWorksheetDocument(worksheetId, id,data) {
    return io({
      method: "POST",
      url: `/${id}/ws/${worksheetId}/document`,
      data:data
    });
  },
  saveSubmittedDocuments(id,data) {
    return io({
      method: "POST",
      url: `/${id}/ws/submit/document`,
      data:data
    });
  },
  getSubmittedDocs(id,ws_test_id,student_id) {
    return io({
      method: "GET",
      url: `/${id}/ws/submit/document/${ws_test_id}/${student_id}`,
    });
  },
  getListOfInventoryBooks(id) {
    return io({
      method: "GET",
      url: `/${id}/classroom/books`
    });
  },
  getBookRecommendationsList(id) {
    return io({
      method: "GET",
      url: `/${id}/api/booksRec`
    });
  },
  recommendBook(id, obj) {
    return io({
      method: "POST",
      url: `/${id}/api/booksRec/`,
      data: obj
    });
  },
  updateRecommendBook(id, obj) {
    return io({
      method: "PATCH",
      url: `/${id}/api/booksRec/${obj.id}`,
      data: obj
    });
  },
  getMasterInventoryBooksList(id, obj) {
    return io({
      method: "GET",
      url: `/${id}/api/masterbooks`
    });
  },
  getMovedBooksList(id, bookId) {
    return io({
      method: "GET",
      url: `/${id}/classroom/books`
    });
  },
  moveBook(id, obj) {
    return io({
      method: "POST",
      url: `/${id}/api/clsrmbooksAssign`,
      data: obj
    });
  },
  updateMovedBook(id, obj) {
    return io({
      method: "PATCH",
      url: `/${id}/api/clsrmbooksAssign/${obj.id}`,
      data: obj
    });
  },
  getClassRoomInventoryBooks(id, gradeId, classroomId, syllabustype) {
    return io({
      method: "GET",
      url: `/${id}/classroomInventory/assigned-books/${gradeId}/${classroomId}?syllabusType=${syllabustype}`
    });
  },
  getMarksOfAStudent(id, passingyear, syllabustype,studentid,obj) {
    return io({
      method: "POST",
      url: `/${id}/myclass/student-marks/${passingyear}/${syllabustype}/${studentid}`,  
      data:obj   
    });
  },
  getTestAndSubjectWiseAnalytics(id, passingyear, syllabustype, obj) {
    return io({
      method: "POST",
      url: `/${id}/myclass/analytics/testwise-subjectwise/${passingyear}/${syllabustype}`,     
      data: obj
    });
  },
  randomAssignBooksToStudents(id, obj) {
    return io({
      method: "POST",
      url: `/${id}/classroomInventory/assigned-books`,
      data: obj
    });
  },
  assignToStudent(id, obj, studentId) {
    return io({
      method: "POST",
      url: `/${id}/classroom-inventory/students/${studentId}/assign-books`, 
      data: obj
    });
  },
  getListOfBooksAssigned(id, gradeId, classroomId, status) {
    return io({
      method: "GET",
      url: `/${id}/classroomInventory/assigned-books/${gradeId}/${classroomId}/${status}`
    });
  },
  getBooksAssignedToStudent(id, gradeId, classroomId, studentId, status) {
    return io({
      method: "GET",
      url: `/${id}/classroomInventory/assigned-books/${gradeId}/${classroomId}/student/${studentId}/${status}`
    });
  },
  updateReturnedStatus(id, obj) {
    return io({
      method: "PUT",
      url: `/${id}/classroomInventory/assigned-books`,
      data: obj
    });
  },
  updateReturnedBooksStatus(id, obj) {
    return io({
      method: "PUT",
      url: `/${id}/classroomInventory/assigned-books/update-status`,
      data: obj
    });
  },
  uploadBooksListFile(id, obj) {
    const formData = new FormData();
    formData.append("file", obj.file);
    return io({
      method: "POST",
      url: `/${id}/api/books/uploadBooksFile`,
      data: formData,
      headers: {
        "Content-Type": undefined
      }
    });
  },
  getListOfConditions(id) {
    return io({
      method: "GET",
      url: `/${id}/api/books/book-conditions`
    });
  },
  getListOfPenatlyStatus(id) {
    return io({
      method: "GET",
      url: `/${id}/api/books/penaltyStatus`
    });
  },
  getListOfStatuses(id) {
    return io({
      method: "GET",
      url: `/${id}/api/books/book-statuses`
    });
  },
  getListOfGenres(id) {
    return io({
      method: "GET",
      url: `/${id}/api/books/book-genres`
    });
  },
  moveSelectedBooks(id, obj) {
    return io({
      method: "POST",
      url: `/${id}/classroom/moved-books`,
      data: obj
    });
  },
  verifyImageUrl(id,obj) {
    return io({
      method: "POST",
      url: `/${id}/api/books/verify_imageUrl`,
      data: obj
    });
  },
  returnBooksToMaster(id, obj) {
    return io({
      method: "POST",
      url: `/${id}/classroom/return_books`,
      data: obj
    });
  },
  addGenres(id, obj) {
    return io({
      method: "POST",
      url: `/${id}/api/add_genres`,
      data: obj
    });
  },
  addRecommendGroup(id, obj) {
    return io({
      method: "POST",
      url: `/${id}/api/booksRec/add-recommened-group`,
      data: obj
    });
  },
  getListOfGroups(id) {
    return io({
      method: "GET",
      url: `/${id}/books/getGroupslist`
    });
  },
  removeGenre(id,obj) {
      return io({
        method: "POST",
        url: `/${id}/api/remove_genre`,
        data: obj
      });
   },
  getLibraryQuestions(id) {
    return io({
      method: "GET",
      url: `/${id}/ws/questions`
    });
  },
  getLibraryQuestionsByTagId(tagid, id) {
    return io({
      method: "GET",
      url: `/${id}/ws/tagid/questions?tagid=${tagid}`
    });
  },
  getLibraryQuestionsByTags(tagids, id) {
    return io({
      method: "POST",
      url: `/${id}/ws/questions/searchquestionsforlistoftags`,
      data: tagids
    });
  },
  getListoftagnamesBysearchkeyword(tagname, id) {
    return io({
      method: "GET",
      url: `/${id}/ws/tags/tagname?tagname=${tagname}`
    });
  },
  saveLibraryQuesToWS(id, worksheetId, questionIds, marksList) {
    return io({
      method: "POST",
      url: `/${id}/ws/${worksheetId}/questions`,
      data: {
        questionIds: questionIds,
        marksList: marksList
      }
    });
  },
  
  saveQuestionToLibrary(questionOb, id) {
    return io({
      method: "POST",
      url: `/${id}/ws/questions`,
      data: questionOb
    });
  },
  getTagsList(id) {
    return io({
      method: "GET",
      url: `/${id}/ws/tags/`,
    });
  },
  getTagsListWithId(id) {
    return io({
      method: "GET",
      url: `/${id}/ws/tags-list/`,
    });
  },
  addTag(id, tags) {
    return io({
      method: "POST",
      url: `/${id}/ws/tags`,
      data: tags
    });
  },
  saveQuestionImages(formdata,tenantid){
    return io({
      method: "POST",
      url: `/${tenantid}/ws/questions/uploadimage`,
      data: formdata
    });
  },
  getMCQAnsTypes(id) {
    return io({
      method: "GET",
      url: `/${id}/ws/questions/answer-types`
    });
  },
  getQuestionTypes(id) {
    return io({
      method: "GET",
      url: `/${id}/ws/questions/question-types`
    });
  },
  getDegreeOfDifficulties(id) {
    return io({
      method: "GET",
      url: `/${id}/ws/questions/degree-of-difficulties`
    });
  },
  getWorksheetStatuses(id) {
    return io({
      method: "GET",
      url: `/${id}/ws/worksheets/statuses`
    });
  },
  getBookRecListByGrade(id, gradeid) {
    return io({
      method: "GET",
      url: `/${id}/api/booksRec/grade/${gradeid}`
    });
  },
  getTeacherDetails(id, academicyear,syllabus) {
    return io({
      method: "GET",
      url:`/${id}/api/teacher-details/${academicyear}/${syllabus}`
    });
  },
  getTeachersPerformanceBasedOnTheClassMarks(id, teacherid,academicyear,syllabusType) {
    return io({
      method: "GET",
      url:`/${id}/analytics/class-teacher-performnce/${teacherid}/${academicyear}/${syllabusType}`
    });
  },
  assignWorkSheet(assignedWorkSheet, tenantId) {
    return io({
      method: "POST",
      url: `/${tenantId}/ws/test/`,
      data: assignedWorkSheet
    });
  },
  getListOfAssignedWorksheets(tenantId) {
    return io({
      method: "GET",
      url: `/${tenantId}/ws/test/`
    });
  },
  getClassroomWorksheets(tenantId, classroomid, subjectid) {
    if (subjectid != undefined) {
      return io({
        method: "GET",
        url: `/${tenantId}/ws/test/classroom?classroomid=${classroomid}&subjectid=${subjectid}`
      });
    } else {
      return io({
        method: "GET",
        url: `/${tenantId}/ws/test/classroom?classroomid=${classroomid}`
      });
    }
  },
  getClassroomWorksheetsAnalyse(tenantId, wid, classroomid) {
    return io({
      method: "GET",
      url: `/${tenantId}/ws/worksheet/analyse?w_id=${wid}&classroomid=${classroomid}`
    });
  },
  saveTestQueSubmittedAns(tenantId, selectedQAList) {
    return io({
      method: "POST",
      url: `/${tenantId}/ws/test-submitanswer`,
      data: selectedQAList
    });
  },
  getSubmittedQuestions(tenantId, obj) {
    return io({
      method: "GET",
      url: `/${tenantId}/ws/test-answer1?ws_testid=${obj.wsTestId}&studentid=${
        obj.studentId
      }`
    });
  },
  getClassSessionKeys(tenantId, classDetails) {
    return io({
      method: "POST",
      url: `/${tenantId}/class/session`,
      data: classDetails
    });
  },
  listOfTenants() {
    return io({
      method: "GET",
      url: `/schools/tenants`
    });
  },
  listOfClients() {
    return io({
      method: "GET",
      url: `/schools/clients`
    });
  },
  spinTenant(tenantdata){
    return io({
      method: "POST",
      url: `/tenant/spin`,
      data: tenantdata
    });
  },
  submitStudentWorksheet(tenantId, submitData) {
    return io({
      method: "PUT",
      url: `/${tenantId}/ws/updatestatus`,
      data: submitData
    });
  },
  getSubmittedWorksheets(tenantId, w_id,classroomid) {
    return io({
      method: "GET",
      url: `/${tenantId}/ws/test-submit/ws_test?w_id=${w_id}&classroomid=${classroomid}`
    });
  },
  getStudentAnswers(tenantId, worksheetid, studentid) {
    return io({
      method: "GET",
      url: `/${tenantId}/ws/test-answer1?ws_testid=${worksheetid}&studentid=${studentid}`
    });
  },
  updateStudentMarksInWorksheet(tenantId, submittedId, payload) {
    return io({
      method: "PUT",
      url: `/${tenantId}/ws/studentsubmit/${submittedId}`,
      data: payload
    });
  },
  updateEvaluation(tenantId,payload){
    return io({
        method: "PUT",
        url: `/${tenantId}/ws/test-update`,
        data: payload
      });      
},
isAttempted(tenantId,wsTestId , studentid){
    return io({
        method: "GET",
        url: `/${tenantId}/ws/test-list?ws_testid=${wsTestId}&studentid=${studentid}`
      });  
},
uploadFile(file){
    return io({
        method: "POST",
        url:"/uploadfile",
        data: file
    })
},
updateQuestionStatus(tenantId,questionId,status){
  console.log(" in updateQuestionStatus");
  return io({
    method: "POST",
    url: `/${tenantId}/ws/questions/updatequestionstatus?questionid=${questionId}&status=${status}`
  });
},
deleteQuestionFromWSByQId(tenantId,questionId,wsId){
  console.log(" in deleteQuestionFromWSByQId");
  return io({
    method: "POST",
    url: `/${tenantId}/ws/questions/deletequestionfromwsbyqid?questionid=${questionId}&wsid=${wsId}`
  });
},
getHMDataForAcademicAttendanceByMonth(tenantId,passingYear,grade,section,syllabusId)
  {
    console.log(" in gethmdataforacademicattendancebymonth");
    return io({
      method: "GET",
      url: `/${tenantId}/analytics/api/gethmdataforacademicattendancebymonth?passingyear=${passingYear}&grade=${grade}&section=${section}&syllabusid=${syllabusId}`
    });
},
getMonthlyAttendanceByStudentid(tenantId,studentId,acadamicYear,startdate,enddate)
{
  console.log(" in getMonthlyAttendanceByStudentid");
  return io({
    method: "POST",
    url: `/${tenantId}/getmonthlyattendancebystudentid?studentId=${studentId}&acadamicYear=${acadamicYear}&startdate=${startdate}&enddate=${enddate}`
  });

},
getClassRoomAttendanceType(tenantId,gradeId,sectionName)
{
  console.log(" in getClassRoomAttendanceType");
  return io({
    method: "GET",
    url: `/${tenantId}/getclassroomattendancetype?gradeId=${gradeId}&sectionName=${sectionName}`
  });

},
listSubjectsOfGrade(tenantId,grade)
{
  console.log(" in listSubjectsOfGrade");
  return io({
    method: "POST",
    url:`/${tenantId}/listsubjectsofgrade`,
    data: grade
});

},
getMonthlyAttendanceByStudentidSubjectIds(tenantId,studentId,subjectId,acadamicYear,gradeId,sectionName,startdate,enddate)
{
  console.log(" in getMonthlyAttendanceByStudentidSubjectIds");
  return io({
    method: "POST",
    url: `/${tenantId}/getmonthlyattendancebystudentsubjectids?studentId=${studentId}&subjectId=${subjectId}&acadamicYear=${acadamicYear}&gradeId=${gradeId}&sectionName=${sectionName}&startdate=${startdate}&enddate=${enddate}`
  });

},
uploadImages(images){
  console.log(images.get('images'))
  return io({
    method: "POST",
    url:"/uploadfile/images",
    data: images
})

},

AssignProject(tenantId,projectData){
  return io({
   method:"POST",
   url:`/${tenantId}/assign-project/assign`,
   data:projectData
})
},

getListOfAssignedProject(tenantId){
return io({
  method:'GET',
  url:`/${tenantId}/assign-project/AssignedProjects`

})
},

ChildProjects(id, classid, studentid){
  return io({
    method:"GET",
    url:`/${id}/assign-project/viewAssignedProjects?classroomid=${classid}&studentid=${studentid}`

  })

},

SubmitProjectImageUrls (tenantId,data){
  return io({
    method:"POST",
    url:`/${tenantId}/assign-project/uploadProjectReport`,
    data:data

  })

},

GetDocUrls(tenantId,studentid,project_id,assignid){
  return io({
    method:"GET",
    url:`/${tenantId}/assign-project/getdoc-urls?studentid=${studentid}&project_id=${project_id}&assignid=${assignid}`

  })

},

DeleteDocUrl(tenantId,url){
  return io({
    method:"DELETE",
    url:`/${tenantId}/assign-project/delete?url=${url}`

  })
},

SubmitProjectReport(tenantId,data){
  return io({
    method:"POST",
    url:`/${tenantId}/assign-project/document-report`,
    data:data

  })
},

DeleteProjectReport(tenantId,id){
  return io({
    method:"DELETE",
    url:`/${tenantId}/assign-project/delete-urls?id=${id}`

  })

},

getClassroomProjects(tenantId,classroomid,subjectid){
  if(subjectid != undefined){
  return io({
    method:"GET",
    url:`/${tenantId}/assign-project/classroom-projects?classroomid=${classroomid}&subjectid=${subjectid}`
  })

  }else{
    return io({
      method:"GET",
      url:`/${tenantId}/assign-project/classroom-projects?classroomid=${classroomid}`
    })

  }

},

getStudentSubmittedProjects(tenantId,classroomid,project_id){
  return io({
    method:"GET",
    url:`/${tenantId}/assign-project/studentSubmitted-projects?classroomid=${classroomid}&project_id=${project_id}`

  })
},

getSkills(tenantId){
  return io({
    method:"GET",
    url:`/${tenantId}/assign-project/getskills`
  })

},

updateProjectStatus(tenantId,id,studentid,project_id,obj){
  return io({
    method:"PATCH",
    url:`/${tenantId}/assign-project/update-status/${id}/${studentid}/${project_id}`,
    data:obj

  })
},

ProjectSkillScores(tenantId,skillScore){
  return io({
    method:"POST",
    url:`/${tenantId}/assign-project/addskillscores`,
    data:skillScore
  })

},

updateProjectScore(tenantId,studentid,assign_id,data){
  return io({
    method:"PATCH",
    url:`/${tenantId}/assign-project/update-projectscore/${studentid}/${assign_id}`,
    data:data

  })

},

getProjectScoresById(tenantId,studentid,assign_id){
  return io({
    method:"GET",
    url:`/${tenantId}/assign-project/getScoresbyId?studentid=${studentid}&project_assign_id=${assign_id}`,

  })

},

updateProjectSkillScore(tenantId,studentid,project_assign_id,updatedScore){
  return io({
    method:"PUT",
    url:`/${tenantId}/assign-project/updateproject-skillscore/${studentid}/${project_assign_id}`,
    data:updatedScore

  })

},

GetSkillGroups(tenantId){
  return io({
    method:"GET",
    url:`/${tenantId}/assign-project/getskill-groups`

  })
},

GetProjectSkills(tenantId){
  return io({
    method:"GET",
    url:`/${tenantId}/assign-project/getproject-skills`

  })

},

AddProjectSkills(tenantId,data){
  return io({
    method:"POST",
    url:`/${tenantId}/assign-project/addproject-skills`,
    data:data

  })
},

AddSkillGroups(tenantId,data){
  return io({
    method:"POST",
    url:`/${tenantId}/assign-project/addskill-groups`,
    data:data

  })

},

UpdateSkillGroups(tenantId,id,updatedObj){
  return io({
    method:"PATCH",
    url:`/${tenantId}/assign-project/updateskillgroup-status/${id}`,
    data:updatedObj

  });

},

UpdateProjectSkills(tenantId,id,updatedObj){
  return io({
    method:"PATCH",
    url:`/${tenantId}/assign-project/updateproject-skills/${id}`,
    data:updatedObj

  })

},

uploadStudentImage(id, studentid, obj){
  const formData = new FormData();
  formData.append("file", obj.file);
  formData.append("studentid", studentid);
  return io({
    method: "POST",
    url: `/${id}/student/uploadimage`,
    data: formData
  });
},

uploadSchoolLogo(id, obj){
  const formData = new FormData();
  formData.append("file", obj.file);
  formData.append("tenantId", id);
  return io({
    method: "POST",
    url: `/schools/uploadlogo`,
    data: formData
  });
},

promoteStudents(promoteDetails, tenantId) {
  return io({
    method:"POST",
    url:`/${tenantId}/promotestudents`,
    data:promoteDetails
 })
}
}
