import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    worksheet: null,
    book: null,
    acdemicyearandboard: null,
    selectedTestClass: {},
    selectedSection: {},
    myClass: {},
    mySubject: {},
    sectionDetails: {},
    userDetails: {},
    school: {},
    testsubjectdetails: {},
    listoftests: [],
    gradeid: {},
    selectedTestObj: {},
    selectedClassRoomTest: {},
    selectedClassRoomObj: {},
    setPath: "",
    boardofeducation: [],
    houses: [],
    parentSelectedWorksheet: {},
    myChild: {},
    singleStudent: {},
    parentDetails: {},
    isEducationSchool: null,
    selectedQuestion:{},
    reportDetails:{},
    projectDetails:{},
    submittedStudentProj:{},
    isEducationSchool: null,
    academicgradeid:null,
    staffUser:{}
  },
  plugins: [createPersistedState()],
  getters: {
    GET_SELECTED_WORKSHEET: state => {
      return state.worksheet;
    },
    GET_SELECTED_BOOK: state => {
      return state.book;
    },
    GET_ACADEMICYEAR: state => {
      return state.academicYearId;
    },
    GET_STAFFUSER: state =>{
      return state.staffUser;
    },
    GET_SYLLABUSTYPE: state => {
      return state.syllabusTypeId;
    },
    GET_ACADEMICYEAR_OBJ: state => {
      return state.acdemicyearandboard;
    },
    GET_SELECTED_TEST_CLASS: state => {
      return state.selectedTestClass;
    },
    GET_SELECTED_SECTION: state => {
      return state.selectedSection;
    },
    GET_MY_CLASS: state => {
      return state.myClass;
    },
    GET_MY_SUBJECT: state => {
      return state.mySubject;
    },
    GET_SECTION_DETAILS: state => {
      return state.sectionDetails;
    },
    SELECTED_QUESTION: state => {
      return state.selectedQuestion;
    } ,
    GET_ACADEMICGRADEID: state =>{
      return state.academicgradeid;
    },
    // GET_SINGLE_STUDENT : state => {
    //     return state.singleStudent;
    // },
    GET_PROJECT_REPORT_DETAILS: state =>{
      return state.reportDetails;
    },
    GET_PROJECT_DETAILS: state =>{
      return state.projectDetails;
    },
    GET_SUBMITTED_STUDENT: state =>{
      return state.submittedStudentProj;
    }
  },
  mutations: {
    SET_SELETECTED_WORKSHEET: (state, worksheet) => {
      state.worksheet = worksheet;
    },
    SET_SELETECTED_BOOK: (state, book) => {
      state.book = book;
    },
    SET_ACADEMICYEAR: (state, academicYearId) => {
      state.academicYearId = academicYearId;
    },
    SET_STAFFUSER: (state , staffUser) => {
      state.staffUser = staffUser;
    },
    SET_SYLLABUSTYPE: (state, syllabusTypeId) => {
      state.syllabusTypeId = syllabusTypeId;
    },
    SET_ACADEMICYEAR_OBJ: (state, acdemicYearAndBoard) => {
      state.acdemicyearandboard = acdemicYearAndBoard;
    },
    SELECTED_TEST_CLASS: (state, classObj) => {
      state.selectedTestClass = classObj;
    },
    SELECTED_SECTION: (state, selectedSection) => {
      state.selectedSection = selectedSection;
    },
    MY_CLASS: (state, myClass) => {
      state.myClass = myClass;
    },
    MY_SUBJECT: (state, mySubject) => {
      state.mySubject = mySubject;
    },
    SECTION_DETAILS: (state, sectionDetails) => {
      state.sectionDetails = sectionDetails;
    },
    USER_DETAILS: (state, userDetails) => {
      state.userDetails = userDetails;
    },
    SCHOOL: (state, school) => {
      state.school = school;
    },
    testsubjectdetails: (state, testsubjectdetails) => {
      state.school = testsubjectdetails;
    },
    listoftests: (state, listoftests) => {
      state.listoftests = listoftests;
    },
    gradeid: (state, gradeid) => {
      state.gradeid = gradeid;
    },
    SET_ACADEMICGRADEID:(state,academicgradeid) =>{
      state.academicgradeid = academicgradeid;
    },
    SELECTED_TEST: (state, selectedTestObj) => {
      state.selectedTestObj = selectedTestObj;
    },
    SELECTED_CLASSROOM_TEST: (state, selectedClassRoomTest) => {
      state.selectedClassRoomTest = selectedClassRoomTest;
    },
    SET_SELECTED_CLASSOBJ: (state, selectedClassRoomObj) => {
      state.selectedClassRoomObj = selectedClassRoomObj;
    },
    SET_TESTS_PATH: (state, setPath) => {
      state.setPath = setPath;
    },
    SET_BOARDOF_EDUCATION: (state, boardofeducation) => {
      state.boardofeducation = boardofeducation;
    },
    HOUSES: (state, houses) => {
      state.houses = houses;
    },
    SET_PARENT_SEL_WORKSHEET: (state, worksheet) => {
      state.parentSelectedWorksheet = worksheet;
    },
    SET_MY_CHILD: (state, myChild) => {
      state.myChild = myChild;
    },
    SET_SINGLE_STUDENT: (state, singleStudent) => {
      state.singleStudent = singleStudent;
    },
    SET_PARENT_DETAILS: (state, parentDetails) => {
      state.parentDetails = parentDetails;
    },

    SET_IS_EDUCATION_SCHOOL: (state, isEducationSchool) => {
      state.isEducationSchool = isEducationSchool;
    },
    SELECTED_QUESTION: (state,question) => {
      state.selectedQuestion = question
    },
    SET_PROJECT_DETAILS:(state,projectDetails) => {
      state.projectDetails = projectDetails;
    },
    
    SET_PROJECT_REPORT_DETAILS:(state,details) => {
      state.reportDetails = details;
    },
    SET_SUBMITTED_STUDENT_PROJECT:(state,submittedStudent) => {
      state.submittedStudentProj = submittedStudent;
    }
  },
  actions: {}
});
