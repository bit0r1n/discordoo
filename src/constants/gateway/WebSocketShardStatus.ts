export enum WebSocketShardStatus {
  CREATED,
  READY,
  CONNECTING,
  RECONNECTING,
  CONNECTED,
  DISCONNECTED,
  WAITING_FOR_GUILDS,
  IDENTIFYING,
  RESUMING,
}
