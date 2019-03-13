
Häufig gestellte Fragen
=======================

### Java nicht erkannt

Ich erhalte folgenden Fehler (unter Windows):

`Der Befehl "java" ist entweder falsch geschrieben oder konnte nicht gefunden werden.`

*Lösung:* Der Fehler entsteht, weil sich der `java`-Befehl (welcher für retest benötigt wird) nicht im Pfad befindet.
Bitte stellen Sie sicher, dass Sie Java installiert haben und die `JAVA_HOME`-Variable gesetzt ist.
Mehr Infos finden Sie in [diesem Tutorial](https://java.com/de/download/help/windows_manual_download.xml). 

### Fehlende Menüeinträge

Wenn Sie ReTest starten und prompt einen Fehler erhalten, gefolgt von einer GUI ohne Menüeinträge, dann ist dies mit großer Wahrscheinlichkeit Java 9 geschuldet. Wir unterstützen derzeit nur Java 6, 7 oder 8.

