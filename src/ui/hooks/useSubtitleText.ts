import { useMemo } from "react";

export function useSubtitleText({
  isOnline,
  isTyping,
  isWebSocketConnected,
}: {
  isOnline: boolean;
  isTyping: boolean;
  isWebSocketConnected: boolean;
}) {
  return useMemo(() => {
    if (isTyping) return "typing...";
    if (isOnline) return "Online";
    return isWebSocketConnected ? "Offline" : "";
  }, [isOnline, isTyping, isWebSocketConnected]);
}
