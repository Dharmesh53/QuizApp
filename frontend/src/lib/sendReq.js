const sendReq = async () => {
  try {
    const userData = {
      email: data.email,
      password: data.password,
    };
    const res = await axios.post("https://quizapp-1e1n.onrender.com/api/login", userData);
    const result = await res.data;
    return result;
  } catch (error) {
    console.log(error);
  }
};
export default sendReq;
