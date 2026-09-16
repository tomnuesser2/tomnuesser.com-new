'use client';

import { useLayoutEffect, useState } from 'react';

const SESSION_KEY = 'tn_entered_session';
const TIME_KEY = 'tn_last_entered_at';
// Wie viel Zeit muss zwischen Besuchen vergehen, bis das Landing-Overlay
// erneut gezeigt wird, obwohl im selben Browser noch localStorage-Daten liegen.
const REVEAL_AGAIN_AFTER_MS = 30 * 60 * 1000; // 30 Minuten

/**
 * Entscheidet, ob die Landing-Page (mit "enter"-Button) angezeigt werden soll.
 *
 * - sessionStorage merkt sich "schon betreten" NUR für den aktuellen Tab.
 *   Wird der Tab/das Fenster geschlossen, ist sessionStorage danach leer
 *   -> Overlay kommt beim nächsten Besuch wieder ("Seite geschlossen").
 * - localStorage merkt sich zusätzlich einen Zeitstempel, damit das Overlay
 *   auch dann wiederkommt, wenn seit dem letzten Besuch genug Zeit vergangen
 *   ist – selbst wenn derselbe Tab (theoretisch) offen bliebe.
 *
 * Während der Server-Render-Phase (kein window) wird "true" angenommen,
 * damit beim allerersten Laden kein Layout-Flackern entsteht.
 */
export function useShouldShowLanding() {
  const [shouldShow, setShouldShow] = useState(true);
  const [ready, setReady] = useState(false);

  // useLayoutEffect statt useEffect, damit die Entscheidung (Overlay ja/nein)
  // vor dem ersten sichtbaren Frame feststeht und es nicht kurz aufblitzt.
  useLayoutEffect(() => {
    try {
      const enteredThisTab = window.sessionStorage.getItem(SESSION_KEY);
      const lastEnteredAt = window.localStorage.getItem(TIME_KEY);
      const recentEnough =
        lastEnteredAt && Date.now() - Number(lastEnteredAt) < REVEAL_AGAIN_AFTER_MS;

      setShouldShow(!enteredThisTab && !recentEnough);
    } catch {
      // Falls Storage blockiert ist (Private Mode etc.), zeigen wir das Overlay sicherheitshalber.
      setShouldShow(true);
    } finally {
      setReady(true);
    }
  }, []);

  const markEntered = () => {
    try {
      window.sessionStorage.setItem(SESSION_KEY, '1');
      window.localStorage.setItem(TIME_KEY, String(Date.now()));
    } catch {
      // ignorieren – reines Komfort-Feature
    }
    setShouldShow(false);
  };

  return { shouldShow, ready, markEntered };
}
