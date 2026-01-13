export function getCompletedSessions(sessions) {
  return sessions.filter((s) => s.end && !s.active);
}

export function getAllSessionsWithDuration(sessions) {
  const now = Date.now();
  return sessions.map((s) => {
    const endTime = s.end ?? (s.active ? now : null);
    const durationMs = endTime ? Math.max(0, endTime - s.start) : 0;
    return { ...s, durationMs };
  });
}

export function getTotalFocusMs(sessions) {
  return getAllSessionsWithDuration(sessions).reduce(
    (sum, s) => sum + (s.durationMs || 0),
    0
  );
}

export function getTotalDistractionsAll(sessions) {
  return sessions.reduce((sum, s) => sum + (s.distractions || 0), 0);
}

export function getFocusScore(sessions) {
  const totalMs = getTotalFocusMs(sessions);
  const minutes = totalMs / 60000;
  if (minutes <= 0) return 100;

  const distractions = getTotalDistractionsAll(sessions);

  const idealDistractionsPerMinute = 0.3;
  const penalty =
    (distractions / (minutes * idealDistractionsPerMinute)) * 20;

  return Math.max(0, Math.min(100, Math.round(100 - penalty)));
}

export function getDistractionsPerHour(sessions) {
  const totalMs = getTotalFocusMs(sessions);
  const hours = totalMs / 3600000;
  const d = getTotalDistractionsAll(sessions);
  if (hours <= 0) return 0;
  return Math.round((d / hours) * 10) / 10; // 1 decimal
}

