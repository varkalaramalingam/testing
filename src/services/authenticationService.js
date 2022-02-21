import { io } from "../components/api/io";

export default {
  Login(user) {
    const { code: tenant, emailid, password } = user;

    return new Promise(function(resolve, reject) {
      io({
        url: `/tenant/login?code=${tenant}`,
        method: "POST",
        data: { emailid, password },
        headers: {
          tenant
        }
      })
        .then(function(res) {
          resolve(res);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  }
};
