export type SystemMsg = {
  type: "join-chat" | "leave-chat" | "subscribe" | "unsubscribe" | "welcome";
  name?: string;
  uid: string;
};

export type UserMsg = {
  msg: string;
  msgcolor: string;
  namecolor: string;
  name: string;
  room?: string;
  sid?: string;
  time: number;
  uid: string;
};

export type UserInfo = {
  session: string[];
  name: string;
  uid: string;
};

export type UserList = UserInfo[];

export type ChatData = {
  messageList: UserMsg[];
  replyMsg: UserMsg;
  userList: string[];
  systemMsg: string;
  uid: string;
  name: string;
  msgcolor: string;
  namecolor: string;
  room: string;
};

export type SubscriptionData = {
  state: "yes" | "no" | "disabled";
  swRegistration: ServiceWorkerRegistration;
};
