const validateTeamName = (name) => {
  // 정규식: 2~15글자, 특수기호 제외
  const regex = /^[a-zA-Z0-9가-힣]{2,15}$/;
  return regex.test(name);
};

export {validateTeamName}