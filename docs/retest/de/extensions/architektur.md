
Der Aufbau von retest
=====================

retest hat einen sehr modularen Aufbau, sodass es prinzipiell für beliebige Plattformen, Technologien und Schnittstellen/Interfaces erweitert werden kann.
Dazu gehören nicht ausschließlich *User* Interfaces sondern prinzipiell beliebige Interfaces.

Hier der Aufbau von retest im Überblick (noch sind nicht alle gezeigten Technologien und Plattformen integriert):

retest interagiert mit der [SUT](../testprozess/was-ist-die-sut.md), so wie andere Capture&Replay-Tools auch.
Zusätzlich benötigt retest jedoch noch weitere Informationen. Dazu gehören:

*   den kompletten zu erfassenden (UI-) Zustand
*   alle derzeit möglichen Aktionen
*   ob die SUT einen für den Nutzer stabilen Zustand erreicht hat
*   ob Fehler aufgetreten sind
*   ob die SUT beendet wurde
*   Informationen über Code-Abdeckung und bestimmte Code-Analyse-Ergebnisse.

Möglich wird die Modularität und Erweiterbarkeit durch den `TestContext`.

