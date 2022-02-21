export const handleClearCookies = cookie =>{
  [
    "userrole",
    "userid",
    "username",
    "authorization",
    "tenant",
    "id",
    "academicyearid",
    "syllabustype"
  ].forEach(key => {
    cookie.delete(key);
  });
}
