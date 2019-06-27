# Die retest Konfigurationsdatei

Diese Datei enthält die Konfiguration von retest für ein Projekt.
Das Format ist das normale Java [`.properties`-Dateiformat](https://de.wikipedia.org/wiki/Java-Properties-Datei).

Der Standardname dieser Datei ist `retest.properties` und sie befindet sich im retest Workspace.
Name und Pfad können mit dem System-Property `de.retest.configFile` überschrieben werden.
Der Wert dieses Properties kann ein absoluter Pfad oder ein Pfad relativ zum Workspace oder Ausführungsverzeichnis sein.

Konfiguration von Hooks
-----------------------

Da retest [eine stabile Testumgebung und das häufige Zusrücksetzen auf den Ursprungszustand](../testprozess/stabile-testumgebung.md) empfiehlt,
gibt es eine direkte Unterstützung dazu.

Man kann in der Konfigurationdatei einen allgemeinen "Haken" (Englisch "hook") mittels dem Parameter `de.retest.suite.beforeHook` konfigurieren.
Der Wert dieses Parameters sollte der Name einer Skript-Datei sein.
retest wird versuchen dieses Skript auszuführen, und solchermaßend die Testumgebung zurückzusetzen.
Es empfieht sich, dass dieses Skript zusammen mit den von retest erzeugten Tests im [Versionsverwaltungssystem](https://de.wikipedia.org/wiki/Versionsverwaltung) eingecheckt ist.
Je nach Umgebung ist es häufig auch nötig nach Durchführung der Tests bestimmte Dinge zu tun (z.B. Server-Verbindung trennen oder Server herunterfahren).
Dazu stellt retest den Konfigurationsparameter `de.retest.suite.afterHook` bereit, welcher analog zum `de.retest.suite.beforeHook` funktioniert.
Zusätzlich kann es nötig sein für einzelne Suiten bestimmte abweichende Systemzustände und Vorbedingungen zu schaffen.
Dazu kann man pro Suite einen `before`/`after`-Hook definieren. 
Dazu setzt man den Parameter `de.retest.suite.` + suiteName + `.beforeHook` bzw. `de.retest.suite.` + suiteName + `.afterHook`.
Damit dieser Mechanismus funktioniert darf allerdings derzeit der Name der Suite keine Leer- und Sonderzeichen enthalten.   

