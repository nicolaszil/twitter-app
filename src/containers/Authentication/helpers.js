export const handleUserInfoData = data => (data ? formatUserInfo(data.user) : {});

const formatUserInfo = data => ({
  id: data.userId || undefined,
  userName: data.screenName || undefined,
});
